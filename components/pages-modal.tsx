import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {useTheme} from "@/hooks/use-theme";
import {Canvas, LinearGradient, Rect, vec} from "@shopify/react-native-skia";
import {useDerivedValue} from "react-native-reanimated";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const {width} = Dimensions.get("window");
const ITEM_LENGTH = width;
const pageOptions = Array.from({ length: 15 }, (_, i) => i * 5); // 0–70 by 5

export interface PagesModalState {
    visible: boolean;
    dayOfMonth: number;
}

export function usePagesModal() {
    const [state, setState] = useState<PagesModalState>({visible: false, dayOfMonth: 1});
    return {state, setState};
}

export interface PagesModalProps {
    state: PagesModalState;
    setVisible: (visible: boolean) => void;
    setDayOfMonthHours: (dayOfMonth: number, hours: number) => void;
}

export function PagesModal(props: PagesModalProps) {
    const theme = useTheme();
    const {width, height} = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(2);
    const flatListRef = useRef<FlatList>(null);
    const [showArrows, setShowArrows] = useState(true);


    const viewabilityConfig = useRef({itemVisiblePercentThreshold: 90}).current;
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
        if (activeIndex < pageOptions.length - 1) {
            flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
        }
    };

    const styles = React.useMemo(() => StyleSheet.create({
        modalContainer: {flex: 1, justifyContent: 'center', alignItems: 'center',},
        backgroundCanvas: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
        itemContainer: {width: ITEM_LENGTH, justifyContent: 'center', alignItems: 'center', height: 200},
        hoursText: {fontSize: 80, color: theme.text, fontWeight: 'bold'},
        labelText: {fontSize: 20, color: theme.text},
        button: {alignSelf: "center", padding: 12, elevation: 2, borderRadius: 15, marginVertical: 10, width: '80%'},
        buttonApply: {backgroundColor: theme.accent},
        buttonClose: {backgroundColor: theme.secondary},
        buttonText: {color: theme.background, fontWeight: "bold", textAlign: 'center'},
        modalTitle: {
            fontSize: 30,
            color: theme.text,
            fontWeight: "600",
            alignSelf: "center",
            paddingTop: 60,
            paddingBottom: 20,
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

    const colors = useDerivedValue(() => [theme.primary, theme.accent], [theme]);

    const showLeftArrow = activeIndex > 0 && showArrows;
    const showRightArrow = activeIndex < pageOptions.length - 1 && showArrows;

    return (
        <Modal
            animationType="slide"
            visible={props.state.visible}
            onRequestClose={() => props.setVisible(false)}
        >
            <Canvas style={styles.backgroundCanvas}>
                <Rect x={0} y={0} width={width} height={height}>
                    <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={colors}/>
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
                <Text style={styles.modalTitle}>How many pages did you read today?</Text>
                <FlatList
                    ref={flatListRef}
                    style={{flexGrow: 0}}
                    data={pageOptions}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.hoursText}>{item.toFixed(0)}</Text>
                            <Text style={styles.labelText}>pages</Text>
                        </View>
                    )}
                    keyExtractor={(item) => String(item)}
                    horizontal
                    pagingEnabled
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    initialScrollIndex={activeIndex}
                    getItemLayout={(data, index) => ({length: ITEM_LENGTH, offset: ITEM_LENGTH * index, index})}
                    onScrollBeginDrag={() => setShowArrows(false)}
                    onMomentumScrollEnd={() => setShowArrows(true)}
                />
                <Pressable
                    style={[styles.button, styles.buttonApply]}
                    onPress={() => {
                        props.setDayOfMonthHours(props.state.dayOfMonth, pageOptions[activeIndex]);
                        props.setVisible(false);
                    }}
                >
                    <Text style={styles.buttonText}>Apply</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => props.setVisible(false)}
                >
                    <Text style={styles.buttonText}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    );
}
