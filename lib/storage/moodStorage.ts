import AsyncStorage from "@react-native-async-storage/async-storage";

const MOOD_STORAGE_KEY = "@mood_data_new";

export async function saveMoodData(data: unknown) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(MOOD_STORAGE_KEY, jsonValue);
    } catch (error) {
        console.error("Failed to save mood data", error);
    }
}

export async function loadMoodData<T>() {
    try {
        const jsonValue = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
        return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
        console.error("Failed to load mood data", error);
        return null;
    }
}

export async function clearMoodData() {
    try {
        await AsyncStorage.removeItem(MOOD_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear mood data", error);
    }
}