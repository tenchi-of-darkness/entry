import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from "@/constants/theme";
import {Link} from "expo-router";
import {useColorScheme} from '@/hooks/use-color-scheme';
import {HappyCat} from "@/components/icons/cats/happy-cat";
import {AngryCat} from "@/components/icons/cats/angry-cat";
import {SadCat} from "@/components/icons/cats/sad-cat";


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
            backgroundColor: Colors[colorScheme].background,
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
                    <Link href="/mood" asChild>
                        <TouchableOpacity
                            style={{padding: 10, marginTop: 20, alignSelf: "center"}}>
                            <Text style={{color: Colors[colorScheme].text}}>Go to Mood</Text>
                        </TouchableOpacity>
                    </Link>
                    <HappyCat/>
                    <AngryCat/>
                    <SadCat/>
                    <HappyCat/>
                    <HappyCat/>
                    <HappyCat/>
                    <HappyCat/>
                    <HappyCat/>
                    <HappyCat/>
                    <HappyCat/>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;