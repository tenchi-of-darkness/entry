import React from "react";
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useTheme} from "@/hooks/use-theme";
import {BookMeasurement} from "@/lib/books/book-measurement";

interface BookCardProps extends TouchableOpacityProps {
    book: BookMeasurement;
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
                    margin: 5, // Add some margin to separate cards
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "flex-start", // Align text to the start
                    width: '95%', // Take up most of the width
                    alignSelf: 'center',
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
                }
            })),
        [theme]
    );

    return (
        <TouchableOpacity style={[styles.card]} onPress={onPress} {...props}>
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
        </TouchableOpacity>
    );
};
