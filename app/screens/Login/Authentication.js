import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth(); // Initialize Firebase auth

  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      console.log('User successfully signed in!');
      // Handle successful sign-in, e.g., navigate to the main app screen
    } catch (error) {
      setError('Invalid email or password');
      console.error('Sign-in error:', error.code, error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          placeholder='Username'
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={(txt) => setPassword(txt)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignIn}
          disabled={!email || !password}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Authentication;
