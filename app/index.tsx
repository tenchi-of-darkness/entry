import React from 'react';
import {StyleSheet, Text, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from "@/constants/theme";
import {Link} from "expo-router";

const App = () => (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>
                <Text style={styles.text}>Welcome Home!</Text>

                {/* This link takes you to profile.js */}
                <Link href="/mood" asChild>
                    <TouchableOpacity style={{backgroundColor: Colors.light.tint, padding: 10, marginTop: 20, alignSelf: "center"}}>
                        <Text style={{color: '#fff'}}>Go to Mood</Text>
                    </TouchableOpacity>
                </Link>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: Colors.light.background,
    },
    text: {
        fontSize: 24,
        paddingLeft: 20,
    },
});

export default App;