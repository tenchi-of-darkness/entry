import MonthCircle from "@/components/month-circle";
import React, {useEffect, useMemo} from 'react';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@/hooks/use-theme";
import {loadSleepData, saveSleepData} from "@/lib/storage/sleepStorage";
import {SleepActionKind, useSleepReducer} from "@/hooks/use-sleep-reducer";
import {getDaysInMonth} from "date-fns";
import {useSleepModal, SleepModal} from "@/components/sleep-modal";
import {TouchableOpacity} from "react-native";

function Sleep() {
    const theme = useTheme();
    const [sleepData, setSleepData] = useSleepReducer();
    const modal = useSleepModal();

    const now = new Date();
    const daysInMonth = getDaysInMonth(now);
    const currentMonth = now.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        async function hydrateSleep() {
            const storedSleep = await loadSleepData<typeof sleepData>();
            if (!storedSleep) return;

            setSleepData({type: SleepActionKind.hydrate, state: storedSleep});
        }

        void hydrateSleep();
    }, []);

    useEffect(() => {
        saveSleepData(sleepData);
    }, [sleepData]);

    const getSleepColor = (hours: number | undefined): string | undefined => {
        if (hours === undefined) return undefined;
        if (hours < 6) return theme.cats.angry;
        if (hours > 9) return theme.cats.sad;
        return theme.cats.happy;
    }

    const moodsForCircle = useMemo(() => {
        return sleepData.map((day) => {
            const hours = day.measurements[0]?.hours;
            return getSleepColor(hours);
        });
    }, [sleepData, theme]);

    const styles = React.useMemo(() => StyleSheet.create({
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
            paddingVertical: 10,
        },
    }), [theme]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'right', 'bottom', 'left']}>
                <SleepModal
                    state={modal.state}
                    setVisible={(visible) => modal.setState(prev => ({ ...prev, visible }))}
                    setDayOfMonthHours={(dayOfMonth: number, hours: number, dayOfWeek: number, weekYear: number) => {
                        setSleepData({
                            type: SleepActionKind.add,
                            dayOfMonth,
                            dayOfWeek,
                            weekYear,
                            hours,
                        });
                    }}
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{now.toDateString()}</Text>
                </View>

                <Text style={styles.titleText}>My Sleep</Text>
                <TouchableOpacity
                    onPress={() =>
                        modal.setState(prev => ({
                            ...prev,
                            visible: true,
                            dayOfMonth: new Date().getDate(),
                        }))
                    }
                >
                    <View style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center"
                    }}>
                        <Text style={[styles.dateText, {
                            alignSelf: "center",
                            fontSize: 28,
                        }]}>{String(currentMonth).charAt(0).toUpperCase() + String(currentMonth).slice(1)}</Text>
                    </View>
                    <MonthCircle daysInMonth={daysInMonth} moods={moodsForCircle} />
                </TouchableOpacity>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Sleep;