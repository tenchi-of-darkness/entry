import React, {useState} from 'react';
import {Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {Emotion, getEmotionIcon, getEmotionTitle} from "@/constants/emotions";
import {useTheme} from "@/hooks/use-theme";
import {CarouselItem} from "@/lib/mood/carousel-item";
import {HeartButtonSize} from "@/components/heart-button";
import {useMoodReducer} from "@/hooks/use-mood-reducer";

const DATA: CarouselItem[] = [
    {id: "1", emotion: Emotion.Happy, Icon: getEmotionIcon(Emotion.Happy)!},
    {id: "2", emotion: Emotion.Angry, Icon: getEmotionIcon(Emotion.Angry)!},
    {id: "3", emotion: Emotion.Sad, Icon: getEmotionIcon(Emotion.Sad)!}
];

const {width} = Dimensions.get("window");
const ITEM_LENGTH = width;

export interface MoodModalState {
    visible: boolean;
    dayOfWeek: number;
}

export function useMoodModal() {
    const [state, setState] = useState<MoodModalState>({visible: false, dayOfWeek: 1});

    return {
        state,
        setState,
    };
}

export interface MoodModalProps {
    state: MoodModalState;
    setVisible: (visible: boolean) => void;
}

export function MoodModal(props: MoodModalProps) {
    const theme = useTheme();

    const styles = React.useMemo(() => StyleSheet.create({
        modalContainer: {
            flex: 1,
        },
        iconContainer: {
            paddingTop: 32,
            height: ITEM_LENGTH,
            width: ITEM_LENGTH
        },
        button: {
            alignSelf: "center",
            padding: 12,
            elevation: 2,
            borderRadius: 15
        },
        buttonClose: {
            backgroundColor: theme.accent,
            marginTop: 30
        },
        buttonText: {
            color: theme.background,
            fontWeight: "bold",
        },
        modalText: {
            fontSize: 30,
            color: theme.text,
            fontWeight: '600',
            alignSelf: "center",
            paddingTop: 20,
        },
    }), [theme]);
    const [moodData, setMoodData] = useMoodReducer();

    return (
        <Modal
            animationType="slide"
            backdropColor={theme.background}
            visible={props.state.visible}
            onRequestClose={() => {
                Alert.alert("Modal closed");
                props.setVisible(false);
            }}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.modalText}>How are you feeling today?</Text>
                <FlatList
                    style={{flexGrow: 0}}
                    data={DATA}
                    renderItem={({item, index}) => {
                        return (
                            <View>
                                <View style={styles.iconContainer}>
                                    {item.Icon}
                                </View>
                                <Text style={styles.modalText}>
                                    {getEmotionTitle(item.emotion)}
                                </Text>
                            </View>

                        );
                    }}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                />
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        props.setVisible(false);
                    }}
                >
                    <Text style={styles.buttonText}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    );
}