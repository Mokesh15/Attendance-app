// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '../lib/supabase'; // 👈 ADD THIS

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Fill this field ⚠️");
      return;
    }

    // ✅ Supabase: Validate user
    const { data, error: loginError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (loginError || !data) {
      Alert.alert("Error", "Invalid username or password.");
    } else {
      Alert.alert("Success", "Login successful!");
      navigation.navigate('MainApp');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}> LOGIN </Text>

      <View style={styles.inputBox}>
        <MaterialIcons name="person" size={24} color="white" style={styles.icon} />
        <TextInput 
          placeholder="Username"
          placeholderTextColor="#bbb"
          style={styles.input}
          value={username}
          onChangeText={(text) => { setUsername(text); setError(''); }}
        />
      </View>
      {error && !username && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputBox}>
        <MaterialIcons name="lock" size={24} color="white" style={styles.icon} />
        <TextInput 
          placeholder="Password"
          placeholderTextColor="#bbb"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => { setPassword(text); setError(''); }}
        />
      </View>
      {error && !password && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.signupLink}>
        Don't have an account?  
        <Text style={styles.signupText} onPress={() => navigation.navigate("Signup")}> Sign Up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#333',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  button: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    color: 'white',
    marginTop: 15,
  },
  signupText: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  error: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
});