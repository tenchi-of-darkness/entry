import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MoodModal, useMoodModal } from "@/components/mood-modal";
import { MoodActionKind, useMoodReducer } from "@/hooks/use-mood-reducer";
import { useTheme } from "@/hooks/use-theme";
import { addDays, subDays } from "date-fns";

const BubbleSize = 56;

function BubbleButton({
                          color,
                          centeredText,
                          onPress,
                      }: {
    color?: string;
    centeredText?: string;
    onPress?: () => void;
}) {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.bubble, { backgroundColor: color ?? "#E0E0E0" }]}>
                {centeredText && <Text style={styles.bubbleText}>{centeredText}</Text>}
            </View>
        </Pressable>
    );
}

export default function MoodBubbleScreen() {
    const modal = useMoodModal();
    const theme = useTheme();
    const [moodData, setMoodData] = useMoodReducer();

    const now = new Date();
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const monday = subDays(now, 4);

    const getDayLabel = (dayId: number) => {
        return dayId === currentDayOfWeek
            ? "Today"
            : addDays(monday, dayId - 1).getDate().toString();
    };

    const stylesMemo = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.background,
                },
                dateContainer: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    paddingTop: 4,
                },
                dateText: {
                    fontSize: 14,
                    color: theme.text,
                },
                titleText: {
                    fontSize: 30,
                    textAlign: "center",
                    color: theme.text,
                },
                bubbleRow: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 24,
                    marginTop: 32,
                },
            }),
        [theme]
    );

    const bubbleElements = Array.from({ length: 7 }).map((_, index) => {
        const dayOfWeek = index + 1;

        return (
            <BubbleButton
                key={dayOfWeek}
                centeredText={getDayLabel(dayOfWeek)}
                color={theme.cats[moodData[dayOfWeek].measurements[0]?.emotion]}
                onPress={
                    dayOfWeek === currentDayOfWeek
                        ? () => modal.setState({ visible: true, dayOfWeek })
                        : undefined
                }
            />
        );
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={stylesMemo.container}
                edges={["top", "bottom", "left", "right"]}
            >
                <MoodModal
                    state={modal.state}
                    setVisible={(visible) => {
                        modal.setState((prev) => ({
                            visible,
                            dayOfWeek: prev.dayOfWeek,
                        }));
                    }}
                    setDayOfWeekEmotion={(dayOfWeek, emotion) => {
                        setMoodData({
                            type: MoodActionKind.add,
                            dayOfWeek,
                            emotion,
                        });
                    }}
                />

                <View style={stylesMemo.dateContainer}>
                    <Text style={stylesMemo.dateText}>December 1</Text>
                    <Text style={stylesMemo.dateText}>weekly</Text>
                </View>

                <Text style={stylesMemo.titleText}>Rate my</Text>
                <Text style={stylesMemo.titleText}>mood</Text>

                <View style={stylesMemo.bubbleRow}>{bubbleElements}</View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    bubble: {
        width: BubbleSize,
        height: BubbleSize,
        borderRadius: BubbleSize / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    bubbleText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
    },
});