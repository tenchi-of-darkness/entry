import AsyncStorage from "@react-native-async-storage/async-storage";

const PagesStorageKey = "pages-v1";

export async function savePagesData(data: unknown) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(PagesStorageKey, jsonValue);
    } catch (e) {
        console.error("Failed to save pages data", e);
    }
}

export async function loadPagesData<T>(): Promise<T | undefined> {
    try {
        const jsonValue = await AsyncStorage.getItem(PagesStorageKey);
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        console.error("Failed to load pages data", e);
        return undefined;
    }
}

export async function clearPagesData() {
    try {
        await AsyncStorage.removeItem(PagesStorageKey);
    } catch (error) {
        console.error("Failed to clear pages data", error);
    }
}
