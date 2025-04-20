// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native'; 

export default function WelcomeScreen() {
  const route = useRoute(); 
  const { ip, subject } = route.params || {}; 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome! 🎉</Text>
      {ip && <Text style={styles.detail}>Your IP: {ip}</Text>}
      {subject && <Text style={styles.detail}>Subject: {subject}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});