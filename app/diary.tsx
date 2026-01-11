import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/hooks/use-theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinedPaper from '@/components/lined-paper';

const PASSCODE_KEY = 'diary_passcode_v1';
const DIARY_CONTENT_KEY = 'diary_content_v1';

type AuthStatus = 'CHECKING' | 'NO_PASSCODE' | 'LOCKED' | 'UNLOCKED';

export default function DiaryPage() {
    const theme = useTheme();
    const [authStatus, setAuthStatus] = useState<AuthStatus>('CHECKING');
    const [passcode, setPasscode] = useState('');
    const [enteredPasscode, setEnteredPasscode] = useState('');
    const [newPasscode, setNewPasscode] = useState('');
    const [confirmPasscode, setConfirmPasscode] = useState('');
    const [diaryContent, setDiaryContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const checkPasscode = async () => {
            const storedPasscode = await AsyncStorage.getItem(PASSCODE_KEY);
            if (storedPasscode) {
                setPasscode(storedPasscode);
                setAuthStatus('LOCKED');
            } else {
                setAuthStatus('NO_PASSCODE');
            }
        };
        checkPasscode();
    }, []);

    useEffect(() => {
        const loadDiaryContent = async () => {
            if (authStatus === 'UNLOCKED') {
                const content = await AsyncStorage.getItem(DIARY_CONTENT_KEY);
                setDiaryContent(content || '');
            }
        };
        loadDiaryContent();
    }, [authStatus]);

    const handleSetPasscode = async () => {
        if (newPasscode.length < 4) {
            setError('Passcode must be at least 4 digits.');
            return;
        }
        if (newPasscode !== confirmPasscode) {
            setError('Passcodes do not match.');
            return;
        }
        await AsyncStorage.setItem(PASSCODE_KEY, newPasscode);
        setPasscode(newPasscode);
        setAuthStatus('UNLOCKED');
        setError('');
    };

    const handleUnlock = () => {
        if (enteredPasscode === passcode) {
            setAuthStatus('UNLOCKED');
            setError('');
        } else {
            setError('Incorrect passcode.');
            setEnteredPasscode('');
        }
    };
    
    const handleSaveNote = async () => {
        await AsyncStorage.setItem(DIARY_CONTENT_KEY, diaryContent);
        Alert.alert('Saved', 'Your diary has been saved.');
    };

    const styles = React.useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        passcodeScreenContainer: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
        },
        passcodeContainer: {
            padding: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 10,
        },
        diaryContainer: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 15,
        },
        diaryInput: {
            flex: 1,
            fontSize: 18,
            lineHeight: 28,
            fontFamily: 'serif',
            textAlignVertical: 'top',
            paddingHorizontal: 0,
            paddingTop: 0,
            color: '#333',
            backgroundColor: 'transparent',
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            color: theme.text,
        },
        input: {
            height: 50,
            borderColor: theme.secondary,
            backgroundColor: theme.background,
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 20,
            paddingHorizontal: 10,
            fontSize: 18,
            color: theme.text,
        },
        errorText: {
            color: 'red',
            textAlign: 'center',
            marginTop: 10,
        }
    }), [theme]);

    const renderPasscodeScreen = () => (
        <View style={styles.passcodeScreenContainer}>
            {authStatus === 'NO_PASSCODE' && (
                <View style={styles.passcodeContainer}>
                    <Text style={styles.title}>Set a Passcode for your Diary</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter 4+ digit passcode"
                        keyboardType="numeric"
                        secureTextEntry
                        value={newPasscode}
                        onChangeText={setNewPasscode}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm passcode"
                        keyboardType="numeric"
                        secureTextEntry
                        value={confirmPasscode}
                        onChangeText={setConfirmPasscode}
                    />
                    <Button title="Set Passcode" onPress={handleSetPasscode} color={theme.accent} />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
            )}
            {authStatus === 'LOCKED' && (
                <View style={styles.passcodeContainer}>
                    <Text style={styles.title}>Enter Passcode</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter passcode"
                        keyboardType="numeric"
                        secureTextEntry
                        value={enteredPasscode}
                        onChangeText={setEnteredPasscode}
                    />
                    <Button title="Unlock" onPress={handleUnlock} color={theme.accent} />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
            )}
        </View>
    );

    const renderDiary = () => (
        <KeyboardAvoidingView 
            style={styles.diaryContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <LinedPaper contentPaddingTop={15} contentPaddingBottom={15} />
            <TextInput
                style={styles.diaryInput}
                multiline
                placeholder="Start writing..."
                value={diaryContent}
                onChangeText={setDiaryContent}
                placeholderTextColor="#888"
            />
            <Button title="Save Note" onPress={handleSaveNote} color={theme.accent} />
        </KeyboardAvoidingView>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {authStatus === 'UNLOCKED' ? renderDiary() : renderPasscodeScreen()}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
