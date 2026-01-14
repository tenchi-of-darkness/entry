import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKS_STORAGE_KEY = "@books_data";

export async function saveBooksData(data: unknown) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(BOOKS_STORAGE_KEY, jsonValue);
    } catch (error) {
        console.error("Failed to save books data", error);
    }
}

export async function loadBooksData<T>() {
    try {
        const jsonValue = await AsyncStorage.getItem(BOOKS_STORAGE_KEY);
        return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
        console.error("Failed to load books data", error);
        return null;
    }
}

export async function clearBooksData() {
    try {
        await AsyncStorage.removeItem(BOOKS_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear books data", error);
    }
}
