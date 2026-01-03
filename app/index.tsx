import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from "@/constants/theme";
import {Link} from "expo-router";
import {useColorScheme} from '@/hooks/use-color-scheme';

const HomeScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';

    const styles = React.useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme].background,
        },
        text: {
            fontSize: 24,
            paddingLeft: 20,
            color: Colors[colorScheme].text,
        },
        heart: {
            width: 100,
            height: 100,
            borderRadius: 999,
            backgroundColor: Colors[colorScheme].tint,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
        },
        heartContainer: {
            justifyContent: 'space-between',
        },
        heartTopContainer: {
            justifyContent: 'space-between',
        }
    }), [colorScheme]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
                <ScrollView>
                    {/*This link takes you to profile.js */}
                    <Link href="/mood" asChild>
                        <TouchableOpacity
                            style={{padding: 10, marginTop: 20, alignSelf: "center"}}>
                            <Text style={{color: '#fff'}}>Go to Mood</Text>
                        </TouchableOpacity>
                    </Link>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;