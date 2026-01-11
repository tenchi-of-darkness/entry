import AsyncStorage from "@react-native-async-storage/async-storage";

const SleepStorageKey = "sleep-v1";

export async function saveSleepData(data: unknown) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(SleepStorageKey, jsonValue);
    } catch (e) {
        console.error("Failed to save sleep data", e);
    }
}

export async function loadSleepData<T>(): Promise<T | undefined> {
    try {
        const jsonValue = await AsyncStorage.getItem(SleepStorageKey);
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        console.error("Failed to load sleep data", e);
        return undefined;
    }
}
