import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, Modal} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from "@/hooks/use-theme";
import {BookMeasurement} from "@/lib/books/book-measurement";
import {BooksActionKind, useBooksReducer} from "@/hooks/use-books-reducer";
import {loadBooksData, saveBooksData} from "@/lib/storage/booksStorage";
import {BookCard} from "@/components/book-card";
import {BookModal} from "@/components/book-modal";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Books = () => {
    const theme = useTheme();
    const [books, setBooks] = useBooksReducer();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookMeasurement | null>(null);
    const [ratingSelectionModalVisible, setRatingSelectionModalVisible] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const storedBooks = await loadBooksData<BookMeasurement[]>();
            if (storedBooks) {
                setBooks({type: BooksActionKind.hydrate, state: storedBooks});
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        saveBooksData(books);
    }, [books]);

    const handleAddInitialRating = (rating: number) => {
        setRatingSelectionModalVisible(false);
        setSelectedBook({
            id: 'new-book-placeholder',
            title: "",
            author: "",
            note: "",
            rating: rating,
            date: new Date(),
        });
        setModalVisible(true);
    };

    const handleModalSave = (book: BookMeasurement) => {
        if (book.id === 'new-book-placeholder') {
            setBooks({
                type: BooksActionKind.add,
                title: book.title,
                author: book.author,
                note: book.note,
                rating: book.rating,
            });
        } else {
            setBooks({type: BooksActionKind.update, book: book});
        }
        setModalVisible(false);
        setSelectedBook(null);
    };

    const handleCardPress = (book: BookMeasurement) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const styles = React.useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            padding: 20,
            alignSelf: 'flex-start',
        },
        list: {
            flexGrow: 1,
            paddingHorizontal: 10,
        },
        fab: {
            position: 'absolute',
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
            backgroundColor: theme.accent,
            borderRadius: 30,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        fabIcon: {
            fontSize: 24,
            color: 'white',
        },
        noBooksText: {
            color: theme.text,
            textAlign: 'center',
            marginTop: 50,
            fontSize: 18,
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        ratingSelectionModalView: {
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
            alignSelf: 'center',
        },
        ratingSelectionModalTitle: {
            marginBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        ratingSelectionContainer: {
            flexDirection: 'row',
            marginBottom: 15,
        },
        starButton: {
            padding: 5,
        },
         cancelButton: {
            backgroundColor: theme.background,
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
        },
        cancelButtonText: {
            color: theme.accent,
            fontWeight: 'bold',
        }
    }), [theme]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
                <Text style={styles.header}>My Books</Text>
                {books.length === 0 ? (
                    <Text style={styles.noBooksText}>No books added yet. Tap '+' to add one!</Text>
                ) : (
                    <FlatList
                        data={books}
                        renderItem={({item}) => (
                            <BookCard book={item} onPress={() => handleCardPress(item)} onPressRemove={() => setBooks({type: BooksActionKind.remove, id: item.id})} />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                )}

                <TouchableOpacity style={styles.fab} onPress={() => setRatingSelectionModalVisible(true)}>
                    <FontAwesome name="plus" style={styles.fabIcon}/>
                </TouchableOpacity>

                <BookModal
                    visible={modalVisible}
                    onClose={() => {
                        setModalVisible(false);
                        setSelectedBook(null); // Clear selected book when modal closes
                    }}
                    onSave={handleModalSave}
                    book={selectedBook}
                />

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={ratingSelectionModalVisible}
                    onRequestClose={() => setRatingSelectionModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.ratingSelectionModalView}>
                            <Text style={styles.ratingSelectionModalTitle}>Rate your new book!</Text>
                            <View style={styles.ratingSelectionContainer}>
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <TouchableOpacity key={starIndex} onPress={() => handleAddInitialRating(starIndex)} style={styles.starButton}>
                                        <FontAwesome
                                            name='star'
                                            size={40}
                                            color={theme.accent}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setRatingSelectionModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Books;