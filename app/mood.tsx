
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {Colors} from "@/constants/theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from "@/hooks/use-color-scheme";

const heartSize = 115;

export default function MoodScreen() {
    const colorScheme = useColorScheme() ?? 'light';

    const styles = React.useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme].background,
        },
        dateContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingTop: 4
        },
        dateText: {
            fontSize: 14,
            color: Colors[colorScheme].text,
        },
        titleText: {
            fontSize: 30,
            textAlign: 'center',
            alignSelf: 'center',
            color: Colors[colorScheme].text,
        },
        heartRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: heartSize,
            paddingHorizontal: 24,
        },
        heartContainer: {
            gap: 5,
        }
    }), [colorScheme]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>December 1</Text>
                    <Text style={styles.dateText}>weekly</Text>
                </View>
                <Text style={styles.titleText}>Rate my</Text>
                <Text style={styles.titleText}>mood</Text>
                <View style={styles.heartContainer}>
                    <View style={styles.heartRow}>
                        <FontAwesome name="heart" size={heartSize} color="yellow" />
                        <FontAwesome name="heart" size={heartSize} color={Colors[colorScheme].icon} />
                    </View>
                    <View style={{...styles.heartRow, justifyContent: "center"}}>
                        <FontAwesome name="heart" size={heartSize} color={Colors[colorScheme].icon} />
                    </View>
                    <View style={styles.heartRow}>
                        <FontAwesome name="heart" size={heartSize} color={Colors[colorScheme].icon} />
                        <FontAwesome name="heart" size={heartSize} color={Colors[colorScheme].icon} />
                    </View>
                    <View style={styles.heartRow}>
                    </View>
                    <View style={styles.heartRow}>
                        <FontAwesome name="heart" size={heartSize} color={Colors[colorScheme].icon} />
                        <FontAwesome name="heart" size={heartSize} color={Colors[colorScheme].icon} />
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
