import MonthCircle from "@/components/month-circle";
import React, {useEffect, useMemo} from 'react';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@/hooks/use-theme";
import {getDaysInMonth} from "date-fns";
import {TouchableOpacity} from "react-native";
import {PagesActionKind, usePagesReducer} from "@/hooks/use-pages-reducer";
import {loadPagesData, savePagesData} from "@/lib/storage/pagesStorage";
import {PagesModal, usePagesModal} from "@/components/pages-modal";

function Pages() {
    const theme = useTheme();
    const [pagesData, setPagesData] = usePagesReducer();
    const modal = usePagesModal();

    const now = new Date();
    const daysInMonth = getDaysInMonth(now);
    const currentMonth = now.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        async function hydratePages() {
            const storedPages = await loadPagesData<typeof pagesData>();
            if (!storedPages) return;

            setPagesData({type: PagesActionKind.hydrate, state: storedPages});
        }

        void hydratePages();
    }, []);

    const getPagesColor = (pages: number | undefined): string => {
        if (pages === undefined) return theme.secondary;
        if (pages <= 0) return theme.pages.none;
        if (pages < 10) return theme.pages.belowTen;
        if (pages >= 10 && pages < 20) return theme.pages.betweenTenAndTwenty;
        if (pages >= 20 && pages < 40) return theme.pages.betweenTwentyAndForty
        if (pages >= 40 && pages < 60) return theme.pages.BetweenFortyAndSixty;
        if (pages >= 60 && pages < 70) return theme.pages.BetweenSixtyAndSeventy;
        if (pages >= 70) return theme.pages.AboveSeventy;
        return theme.cats.happy;
    }

    const pagesForCircle = useMemo(() => {
        return pagesData.map(d => getPagesColor(d.measurements[0]?.pages));
    }, [pagesData, theme]);

    useEffect(() => {
        savePagesData(pagesData);
    }, [pagesData]);

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
                <PagesModal
                    state={modal.state}
                    setVisible={(visible) => modal.setState(prev => ({ ...prev, visible }))}
                    setDayOfMonthHours={(dayOfMonth, pages) => {
                        setPagesData({
                            type: PagesActionKind.add,
                            dayOfMonth,
                            pages,
                        });
                    }}
                />

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{now.toDateString()}</Text>
                </View>

                <Text style={styles.titleText}>Track my pages</Text>
                <TouchableOpacity activeOpacity={pagesData[now.getDate()-1].measurements.length !== 0 ? 1 : undefined} onPress={pagesData[now.getDate()-1].measurements.length === 0 ? () => modal.setState({ visible: true, dayOfMonth: now.getDate() }) : undefined}>
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
                    <MonthCircle daysInMonth={daysInMonth} moods={pagesForCircle} />
                </TouchableOpacity>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Pages;