import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect} from "react";
import {Pressable, PressableProps, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@/hooks/use-theme";
import {addDays, getWeek, getYear, previousMonday, subDays} from "date-fns";
import {RateActionKind, useRateReducer} from "@/hooks/use-rate-reducer";
import {loadRateData, saveRateData} from "@/lib/storage/rateStorage";
import {getRatingColor, RateModal, useRateModal} from "@/components/rate-modal";
import {mix} from "chroma.ts";

const BubbleSize = 90;

interface BubbleButtonProps extends PressableProps {
    color?: string;
    centeredText?: string;
}

export default function MoodBubbleScreen() {
    const modal = useRateModal();
    const theme = useTheme();
    const [rateData, setRateData] = useRateReducer();

    const now = new Date();
    const currentYear = getYear(now);
    const currentWeek = getWeek(now);
    const weekYear = `${currentYear}-${currentWeek}`;
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const monday = previousMonday(now);

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

    useEffect(() => {
        async function hydrateRate() {
            const storedDayRate = await loadRateData<typeof rateData>();
            if (!storedDayRate) return;

            setRateData({type: RateActionKind.hydrate, state: storedDayRate, weekYear});
        }

        void hydrateRate();
    }, []);

    useEffect(() => {
        saveRateData(rateData);
    }, [rateData]);

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

    function getDayColor(day: number) {
        const weekData = rateData[weekYear];

        const dayData = weekData?.[day];

        const rating = dayData?.measurements?.[0]?.rating;

        return getRatingColor(theme, rating);
    }

    const bubbleElements = Array.from({length: 7}).map((_, index) => {
        const dayOfWeek = index + 1;

        const color =
            dayOfWeek === currentDayOfWeek
                ? getDayColor(currentDayOfWeek)
                : theme.accent;

        return (
            <BubbleButton
                key={dayOfWeek}
                centeredText={getDayLabel(dayOfWeek)}
                color={color}
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
                <RateModal
                    state={modal.state}
                    setVisible={(visible) => {
                        modal.setState((prev) => ({
                            visible,
                            dayOfWeek: prev.dayOfWeek,
                        }));
                    }}
                    setDayOfWeekRating={(dayOfWeek: number, rating: number) => {
                        setRateData({
                            type: RateActionKind.add,
                            dayOfWeek,
                            weekYear,
                            rating,
                        });
                    }}
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{now.toDateString()}</Text>
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
};