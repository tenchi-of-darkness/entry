import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";

const { width } = Dimensions.get("window");
const ITEM_LENGTH = width;
const hoursOptions = Array.from({ length: 25 }, (_, i) => i * 0.5);

export interface SleepModalState {
    visible: boolean;
    dayOfMonth: number;
    dayOfWeek: number;
    weekYear: number;
}

export function useSleepModal() {
    const [state, setState] = useState<SleepModalState>({
        visible: false,
        dayOfMonth: 1,
        dayOfWeek: 0,
        weekYear: 0,
    });

    return { state, setState };
}


export interface SleepModalProps {
    state: SleepModalState;
    setVisible: (visible: boolean) => void;
    setDayOfMonthHours: (
        dayOfMonth: number,
        hours: number,
        dayOfWeek: number,
        weekYear: number,
    ) => void;
}

export function SleepModal(props: SleepModalProps) {
    const theme = useTheme();
    const { width, height } = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(16); // 8 hours

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 90,
    }).current;

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: any[] }) => {
            if (viewableItems.length > 0 && viewableItems[0].index != null) {
                setActiveIndex(viewableItems[0].index);
            }
        }
    ).current;

    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                modalContainer: { flex: 1, justifyContent: "center" },
                backgroundCanvas: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                itemContainer: {
                    width: ITEM_LENGTH,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                },
                hoursText: {
                    fontSize: 80,
                    color: theme.text,
                    fontWeight: "bold",
                },
                labelText: { fontSize: 20, color: theme.text },
                button: {
                    alignSelf: "center",
                    padding: 12,
                    elevation: 2,
                    borderRadius: 15,
                    marginVertical: 10,
                    width: "80%",
                },
                buttonApply: { backgroundColor: theme.accent },
                buttonClose: { backgroundColor: theme.secondary },
                buttonText: {
                    color: theme.background,
                    fontWeight: "bold",
                    textAlign: "center",
                },
                modalTitle: {
                    fontSize: 30,
                    color: theme.text,
                    fontWeight: "600",
                    alignSelf: "center",
                    paddingTop: 60,
                    paddingBottom: 20,
                },
            }),
        [theme]
    );

    return (
        <Modal
            animationType="slide"
            visible={props.state.visible}
            onRequestClose={() => props.setVisible(false)}
        >
            <Canvas style={styles.backgroundCanvas}>
                <Rect x={0} y={0} width={width} height={height}>
                    <LinearGradient
                        start={vec(0, 0)}
                        end={vec(width, height)}
                        colors={[theme.primary, theme.accent]}
                    />
                </Rect>
            </Canvas>

            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>How long did you sleep?</Text>

                <FlatList
                    style={{ flexGrow: 0 }}
                    data={hoursOptions}
                    horizontal
                    pagingEnabled
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item)}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    initialScrollIndex={activeIndex}
                    getItemLayout={(_, index) => ({
                        length: ITEM_LENGTH,
                        offset: ITEM_LENGTH * index,
                        index,
                    })}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.hoursText}>{item.toFixed(1)}</Text>
                            <Text style={styles.labelText}>hours</Text>
                        </View>
                    )}
                />

                <Pressable
                    style={[styles.button, styles.buttonApply]}
                    onPress={() => {
                        props.setDayOfMonthHours(
                            props.state.dayOfMonth,
                            hoursOptions[activeIndex],
                            props.state.dayOfWeek,
                            props.state.weekYear,
                        );
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