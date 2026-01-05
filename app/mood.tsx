import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/constants/theme";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {HeartButton, HeartButtonSize} from "@/components/heart-button";
import {MoodModal, useMoodModal} from "@/components/mood-modal";

export default function MoodScreen() {
    const modal = useMoodModal();
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
            height: HeartButtonSize,
            paddingHorizontal: 24,
        },
        heartContainer: {
            gap: 5,
        },
        modalContainer: {
            flex: 1,
        },
        button: {
            alignSelf: "center",
            padding: 12,
            elevation: 2,
            borderRadius: 15
        },
        buttonOpen: {
            backgroundColor: Colors[colorScheme].accent,
        },
        buttonClose: {
            backgroundColor: Colors[colorScheme].accent,
            marginTop: 30
        },
        buttonText: {
            color: Colors[colorScheme].background,
            fontWeight: "bold",
        },
        modalText: {
            fontSize: 30,
            color: Colors[colorScheme].text,
            fontWeight: '600',
            alignSelf: "center",
            paddingTop: 20,
        },
    }), [colorScheme]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
                <MoodModal state={modal.state} setVisible={(visible) => {
                    modal.setState((prevState) => ({
                        visible: visible,
                        dayOfWeek: prevState.dayOfWeek
                    }));
                }}/>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>December 1</Text>
                    <Text style={styles.dateText}>weekly</Text>
                </View>
                <Text style={styles.titleText}>Rate my</Text>
                <Text style={styles.titleText}>mood</Text>
                <View style={styles.heartContainer}>
                    <View style={styles.heartRow}>
                        <HeartButton
                            onPress={() => {
                                modal.setState({
                                    visible: true,
                                    dayOfWeek: 1
                                });
                            }}
                            centeredText={"1"}/>
                        <HeartButton
                            onPress={() => {
                                modal.setState({
                                    visible: true,
                                    dayOfWeek: 2
                                });
                            }}
                            centeredText={"2"}/>
                    </View>
                    <View style={{...styles.heartRow, justifyContent: "center"}}>
                        <HeartButton
                            onPress={() => {
                                modal.setState({
                                    visible: true,
                                    dayOfWeek: 3
                                });
                            }}
                            centeredText={"3"}/>
                    </View>
                    <View style={styles.heartRow}>
                        <HeartButton
                            onPress={() => {
                                modal.setState({
                                    visible: true,
                                    dayOfWeek: 4
                                });
                            }}
                            centeredText={"4"}/>
                        <HeartButton
                            onPress={() => {
                                modal.setState({
                                    visible: true,
                                    dayOfWeek: 5
                                });
                            }}
                            centeredText={"5"}/>
                    </View>
                    <View style={styles.heartRow}>
                    </View>
                    <View style={styles.heartRow}>
                        <HeartButton
                            onPress={() => {
                                modal.setState({
                                    visible: true,
                                    dayOfWeek: 6
                                });
                            }}
                            centeredText={"6"}
                            reversed={true}
                        />
                        <HeartButton
                            onPress={() => {
                                modal.setState({
                                    visible: true,
                                    dayOfWeek: 7
                                });
                            }}
                            centeredText={"7"}
                            reversed={true}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
