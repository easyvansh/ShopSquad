import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';
import { useCreateUserMutation } from "../../store/apiSlice";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  userSlice,
  selectUserRef
} from "../../store/userSlice";


function Signup({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [createUser] = useCreateUserMutation();
  useEffect(() => {
    // Enable the button only when both email and passwords are filled
    setIsButtonEnabled(email && password && confirmPassword);
  }, [email, password, confirmPassword]);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User successfully signed up!');
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Password:', password);
        // If account ok -> create the user on the database
        onCreateUser();
        navigation.navigate('Main');
      } else {
        setError("Passwords don't match");
      }
    } catch (error) {
      console.error('Sign-up error:', error.code, error.message);
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        setError('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError('There was a problem creating your account');
      }
    }
  };



  

  const dispatch = useDispatch();
  
  const onCreateUser = async () => {
    const user = auth.currentUser;
    const result = await createUser({
      user: email,
      customer: {
        name: fullName,
        address: null,
        email: email,
      },
      uid: user.uid,
    });
    
    
    if (result.data?.status === "OK") {
      Alert.alert(
        "User has been Created",
        `Your User reference is: ${result.data.data.ref}`
        ); 
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Login to existing account</Text>
      </Pressable>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter full name"
        autoCapitalize="words"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter email address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirm password"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        style={styles.input}
      />

      <Pressable
        style={[styles.signInButton, { backgroundColor: isButtonEnabled ? 'black' : 'transparent' }]}
        onPress={createAccount}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.signInText}>Create Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    marginBottom: 20,
    color: 'red',
  },
  signInButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    marginBottom: 20,
  },
});

export default Signup;
