import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLastEntryDate } from '@/hooks/use-last-entry-date';
import { useTheme } from '@/hooks/use-theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface NotificationItemProps {
  featureName: string;
  message: string;
  onPress: () => void; // New prop for handling press events
}

const NotificationItem: React.FC<NotificationItemProps> = ({ featureName, message, onPress }) => {
  const lastEntryDate = useLastEntryDate(featureName);
  const theme = useTheme();

  if (lastEntryDate === undefined) {
    // Still loading, don't show anything
    return null;
  }

  const today = new Date();
  const hasEntryToday = lastEntryDate &&
    lastEntryDate.getFullYear() === today.getFullYear() &&
    lastEntryDate.getMonth() === today.getMonth() &&
    lastEntryDate.getDate() === today.getDate();

  if (hasEntryToday) {
    // Entry already made for today
    return null;
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.accent + '30', // Light accent color
      padding: 10,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      color: theme.text,
      fontSize: 14,
      flex: 1,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesome name="info-circle" size={20} color={theme.accent} />
      <Text style={styles.text}>{message}</Text>
    </TouchableOpacity>
  );
};

export default NotificationItem;
