import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import {Colors} from "@/constants/theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useColorScheme} from "@/hooks/use-color-scheme";

const heartSize = 115;

interface HeartButtonProps extends TouchableOpacityProps {
    reversed?: boolean;
    color?: string;
    centeredText?: string;
}

function HeartButton({reversed, children, color, ...props}: HeartButtonProps) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <TouchableOpacity {...props}>
            <FontAwesome
                name="heart"
                size={heartSize}
                color={color ?? Colors[colorScheme].accent}
                style={reversed && {transform: [{rotate: "180deg"}]}}
            />
            {props.centeredText && (
                <Text style={{
                    alignSelf: "center",
                    verticalAlign: "middle",
                    position: "absolute",
                    height: reversed ? heartSize + 5 : heartSize - 5,
                    fontSize: 24
                }}>
                    {props.centeredText}
                </Text>
            )}
        </TouchableOpacity>
    )
}

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
                        <HeartButton centeredText={"4"}></HeartButton>
                        <HeartButton centeredText={"4"}></HeartButton>
                    </View>
                    <View style={{...styles.heartRow, justifyContent: "center"}}>
                        <HeartButton centeredText={"4"}></HeartButton>
                    </View>
                    <View style={styles.heartRow}>
                        <HeartButton centeredText={"4"}></HeartButton>
                        <HeartButton centeredText={"4"}></HeartButton>
                    </View>
                    <View style={styles.heartRow}>
                    </View>
                    <View style={styles.heartRow}>
                        <HeartButton centeredText={"4"} reversed={true}></HeartButton>
                        <HeartButton centeredText={"4"} reversed={true}></HeartButton>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
