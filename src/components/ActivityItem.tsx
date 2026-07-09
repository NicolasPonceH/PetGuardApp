import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ActivityItemProps {
  icon: string;
  iconBg: string;
  title: string;
  timeAgo: string;
  detail: string;
}

export default function ActivityItem({ icon, iconBg, title, timeAgo, detail }: ActivityItemProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconCircle, { backgroundColor: iconBg + '20' }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>{timeAgo}</Text>
      </View>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: { fontSize: 18 },
  info: { flex: 1 },
  title: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#1a2e1a',
  },
  meta: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#8a9b80',
    marginTop: 2,
  },
  detail: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#436900',
  },
});
