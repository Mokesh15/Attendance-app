// screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '../lib/supabase'; // 👈 ADD THIS

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      setError("Fill this field ⚠️");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // ✅ Supabase: Insert new user
    const { data, error: signupError } = await supabase
      .from('users')
      .insert([{ username, password }]);

    if (signupError) {
      Alert.alert("Error", signupError.message);
      return;
    }

    Alert.alert("Success", "Sign-up successful!");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}> SIGN UP </Text>

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

      <View style={styles.inputBox}>
        <MaterialIcons name="lock-outline" size={24} color="white" style={styles.icon} />
        <TextInput 
          placeholder="Confirm Password"
          placeholderTextColor="#bbb"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => { setConfirmPassword(text); setError(''); }}
        />
      </View>
      {error && !confirmPassword && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <Text style={styles.loginLink}>
        Already have an account?  
        <Text style={styles.loginText} onPress={() => navigation.navigate("Login")}> Login</Text>
      </Text>
    </View>
  );
}

// Styles stay the same...


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
  loginLink: {
    color: 'white',
    marginTop: 15,
  },
  loginText: {
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