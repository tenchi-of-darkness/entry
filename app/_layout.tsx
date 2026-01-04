import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';

import {useColorScheme} from '@/hooks/use-color-scheme';
import {Stack} from "expo-router";
import {Colors} from "@/constants/theme";

export default function RootLayout() {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{headerStyle: {backgroundColor: Colors[colorScheme].primary}}}/>
            <StatusBar style={"auto"}/>
        </ThemeProvider>
    );
}
