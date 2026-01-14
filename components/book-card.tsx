import React from "react";
import {Button, Pressable, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useTheme} from "@/hooks/use-theme";
import {BookMeasurement} from "@/lib/books/book-measurement";

interface BookCardProps extends TouchableOpacityProps {
    book: BookMeasurement;
    onPressRemove: () => void;
}

const cardPadding = 10;

export const BookCard: React.FC<BookCardProps> = ({
                                                     book, onPress, ...props
                                                 }) => {
    const theme = useTheme();

    const styles = React.useMemo(
        () =>
            (StyleSheet.create({
                card: {
                    backgroundColor: theme.secondary,
                    borderRadius: 15,
                    padding: cardPadding,
                    marginHorizontal: 50,
                    marginVertical: 5,
                    width: '100%',
                    justifyContent: "space-between",
                    flexDirection: 'row',
                    alignSelf: 'center',
                },
                cardDetails: {
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "flex-start",
                },
                title: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: theme.text,
                    marginBottom: 5,
                },
                author: {
                    fontSize: 14,
                    color: theme.text,
                    marginBottom: 5,
                },
                ratingContainer: {
                    flexDirection: 'row',
                },
                star: {
                    marginRight: 2,
                },
                button: {
                    alignSelf: "center",
                    backgroundColor: theme.cats.angry,
                    borderRadius: 15,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                },
                buttonText: {
                    fontSize: 16,
                    color: theme.text,
                }
            })),
        [theme]
    );

    return (
        <TouchableOpacity style={[styles.card]} onPress={onPress} {...props}>
            <View style={[styles.cardDetails]}>
                <Text style={styles.title}>{book.title || "No Title"}</Text>
                <Text style={styles.author}>{book.author || "No Author"}</Text>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <FontAwesome
                            key={starIndex}
                            name={starIndex <= book.rating ? 'star' : 'star-o'}
                            size={18}
                            color={theme.accent}
                            style={styles.star}
                        />
                    ))}
                </View>
            </View>
            <Pressable style={styles.button} onPress={props.onPressRemove}>
               <Text style={styles.buttonText}>
                   Delete
               </Text>
            </Pressable>
        </TouchableOpacity>
    );
};
