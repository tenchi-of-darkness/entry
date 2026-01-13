import AsyncStorage from "@react-native-async-storage/async-storage";

const RATE_STORAGE_KEY = "@rate_data_new";

export async function saveRateData(data: unknown) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(RATE_STORAGE_KEY, jsonValue);
    } catch (error) {
        console.error("Failed to save rate data", error);
    }
}

export async function loadRateData<T>() {
    try {
        const jsonValue = await AsyncStorage.getItem(RATE_STORAGE_KEY);
        return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
        console.error("Failed to load rate data", error);
        return null;
    }
}

export async function clearRateData() {
    try {
        await AsyncStorage.removeItem(RATE_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear rate data", error);
    }
}