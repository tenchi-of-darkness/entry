import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {useTheme} from "@/hooks/use-theme";
import {mix} from "chroma.ts";
import {useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import * as chroma from "chroma.ts"
import {Canvas, LinearGradient, Rect, vec} from "@shopify/react-native-skia";
import {Colors} from "@/constants/theme";

const {width} = Dimensions.get("window");
const ITEM_LENGTH = width;

export interface RateModalState {
    visible: boolean;
    dayOfWeek: number;
}

export const getRatingColor: (theme: typeof Colors.dark & typeof Colors.light, rating: number) => string = (theme, rating) => {
    const remainder = rating % 1;

    if(remainder === 0){
        switch(rating){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return theme.rating[rating];
        }
    } else {
        const floorRating = Math.floor(rating);
        const ceilingRating = Math.ceil(rating);
        let firstColor: string;
        switch(floorRating){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                firstColor = theme.rating[floorRating];
                break;
            default:
                firstColor = theme.rating[0];
                break;
        }
        let secondColor: string;
        switch(ceilingRating){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                secondColor = theme.rating[ceilingRating];
                break;
            default:
                secondColor = theme.rating[0];
                break;
        }
        return mix(firstColor, secondColor, 0.5, "lch").hex();
    }
    return theme.rating[0];
}

export function useRateModal() {
    const [state, setState] = useState<RateModalState>({visible: false, dayOfWeek: 1});

    return {
        state,
        setState,
    };
}

export interface RateModalProps {
    state: RateModalState;
    setVisible: (visible: boolean) => void;
    setDayOfWeekRating: (dayOfWeek: number, rating: number, weekYear: string) => void;
}

const RatingValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

export function RateModal(props: RateModalProps) {
    const {width, height} = useWindowDimensions();
    const theme = useTheme();

    const [activeIndex, setActiveIndex] = useState(0);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 90
    }).current;

    // @ts-ignore
    const onViewableItemsChanged = useRef(({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const styles = React.useMemo(() => StyleSheet.create({
        modalContainer: {
            flex: 1,
        },
        backgroundCanvas: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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

    const color = useSharedValue(chroma.css(getRatingColor(theme, RatingValues[activeIndex])).hex());

    useEffect(() => {
        color.set(withTiming(getRatingColor(theme, RatingValues[activeIndex])))
    }, [activeIndex]);

    const colors = useDerivedValue(() => {
        return [color.value];
    }, []);

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
                <Text style={styles.modalText}>How are you feeling today?</Text>
                <FlatList
                    style={{flexGrow: 0}}
                    initialScrollIndex={6}
                    data={RatingValues}
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <Text style={[styles.modalText, {width, height, textAlign: "center"}]}>
                                    {item}
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
                />
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        props.setVisible(false);
                        props.setDayOfWeekRating(props.state.dayOfWeek, RatingValues[activeIndex], props.state.dayOfWeek.toString())
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