// screens/QRScannerScreen.js
import React from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // or any other icon library you're using

const QRScannerScreen = () => {
  const navigation = useNavigation();

  const handleQRCodeScanned = e => {
    const scannedData = e.data;
    console.log('Scanned QR:', scannedData);

    Alert.alert('Attendance Marked!', `QR Code: ${scannedData}`, [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Back button header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
      </View>

      {/* QR Scanner */}
      <QRCodeScanner
        onRead={handleQRCodeScanned}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={3000}
        fadeIn={true}
        topContent={<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Scan your class QR</Text>}
        bottomContent={<Text style={{ color: '#777' }}>Align QR inside the frame</Text>}
        cameraStyle={{ height: 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50, // adjust for status bar if needed
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QRScannerScreen;