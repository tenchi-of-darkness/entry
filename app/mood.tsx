import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useMemo, useState} from "react";
import {ColorValue, StyleSheet, Text, View} from "react-native";
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
    const [shouldSave, setShouldSave] = useState(false);

    const weekYear = useMemo(() => {
        const now = new Date();
        return `${getYear(now)}-${getWeek(now, { weekStartsOn: 1 })}`;
    }, []);

    const now = new Date();
    const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const monday = previousMonday(now);

    useEffect(() => {
        async function hydrateMood() {
            const storedMood = await loadMoodData<typeof moodData>();
            if (!storedMood) return;

            setMoodData({
                type: MoodActionKind.hydrate,
                state: storedMood,
                weekYear,
            });
        }

        hydrateMood().catch(console.error);
    }, [weekYear, setMoodData]);

    useEffect(() => {
        if(shouldSave){
            saveMoodData(moodData).catch(console.error);
            setShouldSave(false);
        }
    }, [shouldSave, moodData]);

    const styles = useMemo(
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

    console.log(JSON.stringify(moodData))

    const getHeartLabel = (day: number) =>
        day === currentDayOfWeek
            ? "Today"
            : addDays(monday, day - 1).getDate().toString();

    function getDayColors(day: number): [ColorValue, ColorValue, ...ColorValue[]] {
        const emotionMeasurements =
            moodData[weekYear]?.[day]?.measurements;

        let colors = emotionMeasurements?.map(x => theme.cats[x.emotion] as ColorValue) ?? [];

        if(colors?.length === 1){
            colors.push(colors[0]);
        }

        if(colors?.length === 0){
            colors = [theme.primary, theme.secondary]
        }

        return colors as [ColorValue, ColorValue, ...ColorValue[]];
    }

    const heartRows = [2, 1, 2, 0, -2];
    let heartIndex = 0;

    const heartRowElements = heartRows.map((count, rowIndex) => {
        const reversed = count < 0;
        const hearts = Array.from({ length: Math.abs(count) }, () => {
            heartIndex++;
            const day = heartIndex;

            return (
                <HeartButton
                    key={day}
                    onPress={
                        day === currentDayOfWeek
                            ? () =>
                                modal.setState((prev) => ({
                                    ...prev,
                                    visible: true,
                                    dayOfWeek: day,
                                }))
                            : undefined
                    }
                    colors={getDayColors(day)}
                    centeredText={getHeartLabel(day)}
                    reversed={reversed}
                />
            );
        });

        return (
            <View
                key={rowIndex}
                style={[
                    styles.heartRow,
                    count === 1 && { justifyContent: "center" },
                ]}
            >
                {hearts}
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
                        modal.setState((prev) => ({ ...prev, visible }))
                    }
                    setDayOfWeekEmotion={async (dayOfWeek: number, emotion: Emotion) => {
                        setMoodData({
                            type: MoodActionKind.add,
                            dayOfWeek,
                            weekYear,
                            emotion,
                        })
                        setShouldSave(true)
                    }}
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{now.toDateString()}</Text>
                </View>

                <Text style={styles.titleText}>Rate my</Text>
                <Text style={styles.titleText}>mood</Text>

                <View style={styles.heartContainer}>{heartRowElements}</View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}