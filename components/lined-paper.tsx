import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface LinedPaperProps {
    contentPaddingTop?: number;
    contentPaddingBottom?: number;
}

const LinedPaper: React.FC<LinedPaperProps> = ({ contentPaddingTop = 0, contentPaddingBottom = 0 }) => {
    const theme = useTheme();
    const { height } = Dimensions.get('window');
    const lineHeight = 28;
    
    const availableHeight = height - contentPaddingTop - contentPaddingBottom;
    const numberOfLines = Math.floor(availableHeight / lineHeight);

    const styles = StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject,
            paddingTop: contentPaddingTop,
            paddingBottom: contentPaddingBottom,
            overflow: 'hidden',
        },
        line: {
            borderBottomColor: theme.secondary,
            borderBottomWidth: 1,
            height: lineHeight,
        },
    });

    return (
        <View style={styles.container}>
            {Array.from({ length: numberOfLines }).map((_, i) => (
                <View key={i} style={styles.line} />
            ))}
        </View>
    );
};

export default LinedPaper;