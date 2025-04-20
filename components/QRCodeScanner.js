// components/QRCodeScanner.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native'; // ✅ Added this

export default function QRCodeScanner() {
  const navigation = useNavigation(); // ✅ Access navigation
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState(null);

  const getCurrentIP = async () => {
    try {
      const res = await fetch('https://api64.ipify.org?format=json');
      const data = await res.json();
      return data.ip;
    } catch (err) {
      console.error('Error fetching IP:', err);
      return 'Unavailable';
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
      const url = new URL(data);
      const owner_ip = url.searchParams.get('owner_ip');
      const subject = url.searchParams.get('subject');
      const current_ip = await getCurrentIP();

      if (!owner_ip || !subject) {
        setResult('⚠️ Invalid QR code format.');
        return;
      }

      if (owner_ip === current_ip) {
        setResult(`✅ Connected!\nYour IP: ${current_ip}\nSubject: ${subject}`);
        Alert.alert('Connected', 'IP matched successfully!');
        navigation.navigate('WelcomeScreen', { ip: current_ip, subject }); // ✅ Correct screen name
      } else {
        setResult(`❌ Not connected.\nYour IP: ${current_ip}\nExpected: ${owner_ip}`);
      }
    } catch (error) {
      console.error('Error parsing QR code:', error);
      setResult('⚠️ Invalid or malformed QR code.');
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417'],
        }}
        style={StyleSheet.absoluteFillObject}
        facing={facing}
      />

      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setScanned(false);
            setResult(null);
          }}
        >
          <Text style={styles.text}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}

      {result && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  dataContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
  },
  dataText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
