import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {Pressable, PressableProps, StyleSheet, Text, View} from "react-native";
import {MoodModal, useMoodModal} from "@/components/mood-modal";
import {MoodActionKind, useMoodReducer} from "@/hooks/use-mood-reducer";
import {useTheme} from "@/hooks/use-theme";
import {addDays, getWeek, getYear, previousMonday, subDays} from "date-fns";

const BubbleSize = 90;

interface BubbleButtonProps extends PressableProps {
    color?: string;
    centeredText?: string;
}

function BubbleButton({
                          color,
                          centeredText,
                          ...props
                      }: BubbleButtonProps) {
    return (
        <Pressable {...props}>
            <View style={[styles.bubble, {backgroundColor: color ?? "#E0E0E0"}]}>
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
    const currentYear = getYear(now);
    const currentWeek = getWeek(now);
    const weekYear = `${currentYear}-${currentWeek}`;
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const monday = previousMonday(now);

    const getDayLabel = (dayId: number) => {
        return dayId === currentDayOfWeek
            ? "Today"
            : addDays(monday, dayId - 1).getDate().toString();
    };

    const styles = React.useMemo(
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
                bubbleContainer: {
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 64,
                    paddingTop: 0,
                },
                fourBubbleContainerContainer: {
                    paddingVertical: 32,
                },
                fourBubbleContainer: {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    paddingHorizontal: 24
                },
                threeBubbleContainer: {
                    paddingTop: 36,
                    width: "100%",
                    flexDirection: "column",
                    gap: 8,
                },
            }),
        [theme]
    );

    const bubbleElements = Array.from({length: 7}).map((_, index) => {
        const dayOfWeek = index + 1;

        return (
            <BubbleButton
                key={dayOfWeek}
                centeredText={getDayLabel(dayOfWeek)}
                color={theme.cats[moodData[weekYear][dayOfWeek]?.measurements[0]?.emotion]}
                style={index === 5 ? {alignSelf: "center"} : index === 6 ? {alignSelf: "flex-end"} : undefined}
                onPress={
                    dayOfWeek === currentDayOfWeek
                        ? () => modal.setState({visible: true, dayOfWeek})
                        : undefined
                }
            />
        );
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={styles.container}
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
                            weekYear,
                            emotion,
                        });
                    }}
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>December 1</Text>
                    <Text style={styles.dateText}>weekly</Text>
                </View>

                <Text style={styles.titleText}>Rate my</Text>
                <Text style={styles.titleText}>mood</Text>

                <View style={styles.bubbleContainer}>
                    <View style={styles.fourBubbleContainerContainer}>
                        <View style={[styles.fourBubbleContainer, {paddingBottom: 56}]}>
                            {bubbleElements.slice(0, 2)}
                        </View>
                        <View style={styles.fourBubbleContainer}>
                            {bubbleElements.slice(2, 4)}
                        </View>
                    </View>
                    <View style={styles.threeBubbleContainer}>
                        {bubbleElements.slice(4, 7)}
                    </View>
                </View>
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