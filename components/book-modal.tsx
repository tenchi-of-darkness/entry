import React, {useState, useEffect} from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useTheme} from "@/hooks/use-theme";
import {BookMeasurement} from "@/lib/books/book-measurement";

export interface BookModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (book: BookMeasurement) => void;
    book: BookMeasurement | null;
}

export function BookModal({ visible, onClose, onSave, book }: BookModalProps) {
    const theme = useTheme();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [note, setNote] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setNote(book.note);
            setRating(book.rating);
        } else {
            setTitle('');
            setAuthor('');
            setNote('');
            setRating(0);
        }
    }, [book, visible]);

    const handleSave = () => {
        if (book) {
            onSave({ ...book, title, author, note, rating });
            onClose();
        } else {
            Alert.alert("Error", "No book data to save.");
        }
    };

    const styles = React.useMemo(() => StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {
            margin: 20,
            backgroundColor: theme.background,
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '90%',
        },
        modalTitle: {
            marginBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        input: {
            height: 40,
            borderColor: theme.text,
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            paddingHorizontal: 10,
            width: '100%',
            color: theme.text,
        },
        textArea: {
            height: 80,
            textAlignVertical: 'top',
        },
        ratingContainer: {
            flexDirection: 'row',
            marginBottom: 15,
        },
        star: {
            padding: 5,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        button: {
            borderRadius: 10,
            padding: 10,
            elevation: 2,
            flex: 1,
            marginHorizontal: 5,
            alignItems: 'center',
        },
        buttonSave: {
            color: theme.text,
            backgroundColor: theme.accent,
        },
        buttonClose: {
            color: theme.text,
            backgroundColor: theme.primary,
        },
        textStyle: {
            color: theme.text,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    }), [theme]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Book Details</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        placeholderTextColor={theme.text + '80'}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Author"
                        placeholderTextColor={theme.text + '80'}
                        value={author}
                        onChangeText={setAuthor}
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Note"
                        placeholderTextColor={theme.text + '80'}
                        multiline
                        numberOfLines={4}
                        value={note}
                        onChangeText={setNote}
                    />
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                            <TouchableOpacity key={starIndex} onPress={() => setRating(starIndex)}>
                                <FontAwesome
                                    name={starIndex <= rating ? 'star' : 'star-o'}
                                    size={30}
                                    color={theme.text}
                                    style={styles.star}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={handleSave}
                        >
                            <Text style={styles.textStyle}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
