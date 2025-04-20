// App.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import 'react-native-gesture-handler';

// Screens
import BiometricAuthScreen from './screens/BiometricAuthScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import TimetableScreen from './screens/TimetableScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CustomDrawerContent from './screens/CustomDrawerContent';

// Components
import QRCodeScanner from './components/QRCodeScanner';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator (Main App - After Login)
function MainApp() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="QRScanner" component={QRScannerScreen} />
      <Drawer.Screen name="Timetable" component={TimetableScreen} />
      <Drawer.Screen name="QRCodeScanner" component={QRCodeScanner} />
    </Drawer.Navigator>
  );
}

// Auth Stack: Start with Login, then Signup
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkIP = async () => {
      try {
        const res = await axios.get('https://api.ipify.org?format=json');
        const ip = res.data.ip;
        const allowedIP = '123.123.123.123'; // 🔁 Change this to your allowed IP

        if (ip === allowedIP) {
          setInitialRoute('Welcome');
        } else {
          setInitialRoute('BiometricAuth');
        }
      } catch (error) {
        console.error('Error fetching IP:', error);
        setInitialRoute('BiometricAuth'); // fallback
      }
    };

    checkIP();
  }, []);

  if (!initialRoute) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Platform.OS === 'android' ? '#000' : undefined}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
          <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="StandaloneQRScanner" component={QRCodeScanner} />
          <Stack.Screen name="QRScanner" component={QRScannerScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
