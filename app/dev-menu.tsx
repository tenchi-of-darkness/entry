import React from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { clearMoodData } from '@/lib/storage/moodStorage';
import { clearRateData } from '@/lib/storage/rateStorage';
import { clearSleepData } from '@/lib/storage/sleepStorage';
import { clearPagesData } from '@/lib/storage/pagesStorage';
import { clearBooksData } from '@/lib/storage/booksStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRefresh } from '@/contexts/refresh-context';

const DIARY_PASSCODE_KEY = 'diary_passcode_v1';
const DIARY_CONTENT_KEY = 'diary_content_v1';

const DevMenuScreen = () => {
    const theme = useTheme();
    const { triggerRefresh } = useRefresh();

    const createClearHandler = (name: string, clearFunction: () => Promise<void>) => async () => {
        Alert.alert(
            `Confirm Clear`,
            `Are you sure you want to clear all ${name} data? This cannot be undone.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear Data',
                    style: 'destructive',
                    onPress: async () => {
                        await clearFunction();
                        triggerRefresh();
                        Alert.alert('Success', `${name} data has been cleared.`);
                    },
                },
            ]
        );
    };

    const clearAllData = async () => {
        await clearMoodData();
        await clearRateData();
        await clearSleepData();
        await clearPagesData();
        await clearBooksData();
        await AsyncStorage.removeItem(DIARY_PASSCODE_KEY);
        await AsyncStorage.removeItem(DIARY_CONTENT_KEY);
    };

    const clearDiaryData = async () => {
        await AsyncStorage.removeItem(DIARY_PASSCODE_KEY);
        await AsyncStorage.removeItem(DIARY_CONTENT_KEY);
    }

    const menuOptions = [
        { name: 'All Data', action: createClearHandler('All', clearAllData), color: 'red' },
        { name: 'Mood', action: createClearHandler('Mood', clearMoodData) },
        { name: 'Day Rating', action: createClearHandler('Day Rating', clearRateData) },
        { name: 'Sleep', action: createClearHandler('Sleep', clearSleepData) },
        { name: 'Pages', action: createClearHandler('Pages', clearPagesData) },
        { name: 'Books', action: createClearHandler('Books', clearBooksData) },
        { name: 'Diary', action: createClearHandler('Diary', clearDiaryData) },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            padding: 20,
            textAlign: 'center',
        },
        buttonContainer: {
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        buttonSpacer: {
            marginVertical: 8,
        }
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.header}>Developer Menu</Text>
                    <View style={styles.buttonContainer}>
                        {menuOptions.map((option) => (
                            <View key={option.name} style={styles.buttonSpacer}>
                                <Button title={`Clear ${option.name} Data`} onPress={option.action} color={option.color || theme.accent} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default DevMenuScreen;
