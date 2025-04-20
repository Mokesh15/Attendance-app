// screens/BiometricAuthScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricAuthScreen({ navigation }) {
  const handleBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometric not available', 'Redirecting to login...');
      navigation.replace('Auth');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Fingerprint or Face ID',
    });

    if (result.success) {
      navigation.replace('Auth'); // goes to Login screen
    } else {
      Alert.alert('Authentication Failed', 'Try again or use manual login.');
    }
  };

  useEffect(() => {
    handleBiometric();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/authentication.png')} style={styles.logo} />
      <Text style={styles.title}>🔐 Fingerprint / Face ID</Text>
      <Text style={styles.subtitle}>Authenticate to continue</Text>

      <TouchableOpacity style={styles.button} onPress={handleBiometric}>
        <Text style={styles.buttonText}>Retry Authentication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff0000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
