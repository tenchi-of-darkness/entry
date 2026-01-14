import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Emotion, getEmotionEnumValues, getEmotionIcon, getEmotionTitle,} from "@/constants/emotions";
import {useTheme} from "@/hooks/use-theme";
import {Canvas, LinearGradient, Rect, vec} from "@shopify/react-native-skia";
import {useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import * as chroma from 'chroma.ts'
import {saveMoodData} from "@/lib/storage/moodStorage";
import {Colors} from "@/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
    weekYear: string;
    setVisible: (visible: boolean) => void;
    setDayOfWeekEmotion: (
        dayOfWeek: number,
        emotion: Emotion,
        weekYear: string
    ) => void;
}

const EmotionValues = getEmotionEnumValues()

export function MoodModal(props: MoodModalProps) {
    const {width, height} = useWindowDimensions();
    const theme = useTheme();

    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const [showArrows, setShowArrows] = useState(true);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 90
    }).current;

    // @ts-ignore
    const onViewableItemsChanged = useRef(({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const scrollLeft = () => {
        if (activeIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: activeIndex - 1, animated: true });
        }
    };

    const scrollRight = () => {
        if (activeIndex < EmotionValues.length - 1) {
            flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
        }
    };

    const styles = React.useMemo(() => StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        backgroundCanvas: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        iconContainer: {
            padding: 32,
            height: ITEM_LENGTH,
            width: ITEM_LENGTH,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            alignSelf: "center",
            padding: 12,
            elevation: 2,
            borderRadius: 15
        },
        buttonApply: {
            backgroundColor: theme.accent,
            marginTop: 30,
        },
        buttonClose: {
            backgroundColor: theme.secondary,
            marginTop: 10,
        },
        buttonText: {
            color: Colors.light.text,
            fontWeight: "bold",
        },
        modalText: {
            fontSize: 30,
            color: theme.text,
            fontWeight: '600',
            alignSelf: "center",
            paddingTop: 20,
        },
        arrowButton: {
            position: 'absolute',
            top: '50%',
            marginTop: -25, // Half of button height
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
        },
        leftArrow: {
            left: 10,
        },
        rightArrow: {
            right: 10,
        },
    }), [theme]);

    const leftColor = useSharedValue(chroma.css(theme.cats[EmotionValues[activeIndex]]).brighter(0.5).hex());
    const rightColor = useSharedValue(chroma.css(theme.cats[EmotionValues[activeIndex]]).darker(0.5).hex());

    useEffect(() => {
        leftColor.set(withTiming(chroma.css(theme.cats[EmotionValues[activeIndex]]).brighter(0.5).hex()))
        rightColor.set(withTiming(chroma.css(theme.cats[EmotionValues[activeIndex]]).darker(0.5).hex()))
    }, [activeIndex]);


    const colors = useDerivedValue(() => {
        return [leftColor.value, rightColor.value];
    }, []);

    const showLeftArrow = activeIndex > 0 && showArrows;
    const showRightArrow = activeIndex < EmotionValues.length - 1 && showArrows;


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
            <Canvas style={styles.backgroundCanvas}>
                <Rect x={0} y={0} width={width} height={height}>
                    <LinearGradient
                        start={vec(500, 0)}
                        end={vec(width, height)}
                        colors={colors}
                    />
                </Rect>
            </Canvas>
            <View style={styles.modalContainer}>
                {showLeftArrow && (
                    <TouchableOpacity style={[styles.arrowButton, styles.leftArrow]} onPress={scrollLeft}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                )}
                {showRightArrow && (
                    <TouchableOpacity style={[styles.arrowButton, styles.rightArrow]} onPress={scrollRight}>
                        <FontAwesome name="chevron-right" size={24} color="white" />
                    </TouchableOpacity>
                )}
                <Text style={styles.modalText}>How are you feeling today?</Text>
                <FlatList
                    ref={flatListRef}
                    style={{flexGrow: 0}}
                    data={EmotionValues}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.iconContainer}>
                                {getEmotionIcon(item)}
                                <Text style={styles.modalText}>
                                    {getEmotionTitle(item)}
                                </Text>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => String(item)}
                    horizontal
                    pagingEnabled
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    initialScrollIndex={activeIndex}
                    getItemLayout={(data, index) => ({
                        length: ITEM_LENGTH,
                        offset: ITEM_LENGTH * index,
                        index,
                    })}
                    onScrollBeginDrag={() => setShowArrows(false)}
                    onMomentumScrollEnd={() => setShowArrows(true)}
                />
                <Pressable
                    style={[styles.button, styles.buttonApply]}

                    onPress={() => {
                        props.setVisible(false);
                        props.setDayOfWeekEmotion(props.state.dayOfWeek, EmotionValues[activeIndex], props.weekYear)
                    }}
                >
                    <Text style={styles.buttonText}>Apply</Text>
                </Pressable>
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