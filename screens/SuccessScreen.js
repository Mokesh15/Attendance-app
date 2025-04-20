// screens/SuccessScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 Devices are on the same network!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, color: 'green' },
});
