import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from "@/constants/theme";
import {Href, router, useFocusEffect} from "expo-router";
import {useColorScheme} from '@/hooks/use-color-scheme';
import {EmptyFeatureCard, FeatureCard} from "@/components/mood-card";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useTheme} from "@/hooks/use-theme";
import NotificationItem from "@/components/notification-item";
import {useRefresh} from "@/contexts/refresh-context";

const cardValues: ({
    title: string;
    iconName: React.ComponentProps<typeof FontAwesome>["name"];
    path: Href;
    empty: false;
} | {
    empty: true;
})[] = [
    {
        title: "Mood",
        iconName: "smile-o",
        path: "/mood",
        empty: false,
    },
    {
        title: "Day",
        iconName: "star-o",
        path: "/day",
        empty: false,
    },
    {
        title: "Sleep",
        iconName: "moon-o",
        path: "/sleep",
        empty: false,
    },
    {
        title: "Diary",
        iconName: "sticky-note-o",
        path: "/diary",
        empty: false,
    },
    {
        title: "Pages",
        iconName: "paperclip",
        path: "/pages",
        empty: false,
    },
    {
        title: "Books",
        iconName: "book",
        path: "/books",
        empty: false,
    },
    {
        title: "Dev Menu",
        iconName: "cogs",
        path: "/dev-menu",
        empty: false,
    },
];

const notifications = [
    { featureName: 'Mood', message: "Don't forget to record your Mood today!", path: "/mood" },
    { featureName: 'Day', message: 'How was your day? Take a moment to rate it.', path: "/day" },
    { featureName: 'Sleep', message: 'Log how you slept last night for better insights.', path: "/sleep" },
    { featureName: 'Pages', message: 'Did you read today? Log your pages.', path: "/pages" },
];

const HomeScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = useTheme();
    const { triggerRefresh } = useRefresh();
    const today = new Date();
    const monthName = today.toLocaleDateString('en-US', { month: 'long' });
    const weekdayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = today.getDate();

    useFocusEffect(
        useCallback(() => {
            triggerRefresh();
        }, [triggerRefresh])
    );

    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const formattedWeekday = weekdayName.charAt(0).toUpperCase() + weekdayName.slice(1);

    const formattedDate = `${formattedMonth} ${formattedWeekday} ${dayOfMonth}`;

    const styles = React.useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme].background
        },
        list: {
            padding: 10
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop: 20,
            paddingLeft: 20,
            alignSelf: 'flex-start',
            color: Colors[colorScheme].text,
        },
        date: {
            fontSize: 20,
            fontWeight: 'bold',
            paddingLeft: 20,
            alignSelf: 'flex-start',
            color: Colors[colorScheme].text,
        },
        notificationContainer: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            gap: 8,
        }
    }), [colorScheme]);

    const numColumns = 3;

    const formatData = (data: typeof cardValues, columns: number) => {
        const dataCopy = [...data];
        const numberOfFullRows = Math.floor(dataCopy.length / columns);

        let numberOfElementsLastRow = dataCopy.length - (numberOfFullRows * columns);
        while (numberOfElementsLastRow !== columns && numberOfElementsLastRow !== 0) {
            dataCopy.push({empty: true});
            numberOfElementsLastRow++;
        }

        return dataCopy;
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
                <Text style={styles.text}>Good morning, Melanie</Text>
                <Text style={styles.date}>{formattedDate}</Text>
                
                <View style={styles.notificationContainer}>
                    {notifications.map(n => (
                        <NotificationItem key={n.featureName} featureName={n.featureName} message={n.message} onPress={() => router.push(n.path)} />
                    ))}
                </View>

                <FlatList
                    contentContainerStyle={{
                        gap: 5,
                    }}
                    columnWrapperStyle={{
                        gap: 5,
                    }}
                    style={styles.list}
                    data={formatData(cardValues, numColumns)}
                    numColumns={numColumns}
                    renderItem={({item}) => {
                         if (item.empty) {
                            return <EmptyFeatureCard />;
                        }
                        return (
                           <FeatureCard
                                title={item.title}
                                iconName={item.iconName}
                                onPress={() => router.push(item.path)}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    decelerationRate="fast"
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;
