import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {HeartButton, HeartButtonSize} from "@/components/heart-button";
import {MoodModal, useMoodModal} from "@/components/mood-modal";
import {MoodActionKind, useMoodReducer} from "@/hooks/use-mood-reducer";
import {useTheme} from "@/hooks/use-theme";
import {addDays, getWeek, getYear, previousMonday} from "date-fns";
import {loadMoodData, saveMoodData} from "@/lib/storage/moodStorage";
import {Emotion} from "@/constants/emotions";

export default function MoodScreen() {
    const modal = useMoodModal();
    const theme = useTheme();
    const [moodData, setMoodData] = useMoodReducer();

    const now = new Date();
    const currentYear = getYear(now);
    const currentWeek = getWeek(now);
    const weekYear = `${currentYear}-${currentWeek}`;
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const monday = previousMonday(now);

    useEffect(() => {
        async function hydrateMood() {
            const storedMood = await loadMoodData<typeof moodData>();
            if (!storedMood) return;

            setMoodData({type: MoodActionKind.hydrate, state: storedMood, weekYear});
        }

        void hydrateMood();
    }, []);

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
                    alignSelf: "center",
                    color: theme.text,
                },
                heartRow: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: HeartButtonSize,
                    paddingHorizontal: 24,
                },
                heartContainer: {
                    gap: 5,
                },
            }),
        [theme]
    );

    const getHeartLabel = (dayId: number) => {
        return dayId === currentDayOfWeek
            ? "Today"
            : addDays(monday, dayId - 1).getDate().toString();
    };

    const heartRows = [2, 1, 2, 0, -2];
    let heartRowAmountOfHearts = 0;

    function getDayColor(day: number) {
        const weekData = moodData[weekYear];
        const emotion = weekData?.[day]?.measurements?.[0]?.emotion;

        if (emotion) {
            return theme.cats[emotion];
        }
        return theme.accent;
    }

    const heartRowElements = heartRows.map((amountOfHeartsArg, index) => {
        let reversed = false;
        let amountOfHearts = amountOfHeartsArg;

        if (amountOfHearts < 0) {
            reversed = true;
            amountOfHearts = Math.abs(amountOfHearts);
        }

        const heartElements: React.ReactElement[] = [];

        for (let i = 0; i < amountOfHearts; i++) {
            heartRowAmountOfHearts++;
            const day = heartRowAmountOfHearts;

            heartElements.push(
                <HeartButton
                    key={day}
                    onPress={
                        day === currentDayOfWeek
                            ? () =>
                                modal.setState(prev => ({
                                    ...prev,
                                    visible: true,
                                    dayOfWeek: day,
                                }))
                            : undefined
                    }
                    color={getDayColor(day)}
                    centeredText={getHeartLabel(day)}
                    reversed={reversed}
                />
            );

        }

        return (
            <View
                key={index}
                style={[
                    styles.heartRow,
                    amountOfHeartsArg === 1 && { justifyContent: "center" },
                ]}
            >
                {heartElements}
            </View>
        );
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <MoodModal
                    state={modal.state}
                    weekYear={weekYear}
                    setVisible={(visible) =>
                        modal.setState((prev) => ({ visible, dayOfWeek: prev.dayOfWeek }))
                    }
                    setDayOfWeekEmotion={async (dayOfWeek: number, emotion: Emotion) => {
                        setMoodData({
                            type: MoodActionKind.add,
                            dayOfWeek,
                            weekYear,
                            emotion,
                        });
                        useEffect(() => {
                            saveMoodData(moodData);
                        }, [moodData]);
                    }
                }
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>December 1</Text>
                    <Text style={styles.dateText}>weekly</Text>
                </View>

                <Text style={styles.titleText}>Rate my</Text>
                <Text style={styles.titleText}>mood</Text>

                <View style={styles.heartContainer}>{heartRowElements}</View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}