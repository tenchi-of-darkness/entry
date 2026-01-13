import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from "@/constants/theme";
import {Href, Link, router} from "expo-router";
import {useColorScheme} from '@/hooks/use-color-scheme';
import {EmptyFeatureCard, FeatureCard} from "@/components/mood-card";
import FontAwesome from "@expo/vector-icons/FontAwesome";


const HomeScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

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
    }), [colorScheme]);

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
    ];

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
                <Text style={styles.text}>Good morning, user</Text>
                <Text style={styles.date}>{formattedDate}</Text>
                <Link href="/mood" asChild>
                    <TouchableOpacity
                        style={{padding: 10, marginTop: 20, alignSelf: "center"}}>
                    </TouchableOpacity>
                </Link>
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
                            return (
                                <EmptyFeatureCard/>
                            )
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