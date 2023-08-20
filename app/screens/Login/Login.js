import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, StyleSheet } from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from './config';
import { useDispatch, useSelector } from "react-redux";
import {
  userSlice,
  selectUserRef
} from "../../store/userSlice";

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const loginUser = async () => {
    try{
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    console.log('User successfully signed in!');
    console.log(email)
    console.log(password)
    console.log(user.uid)

    navigation.navigate('Main');
  } catch (error) {
    console.error('Sign-in error:', error.code, error.message);
    if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
      setError('Your email or password was incorrect');
    } else if (error.code === 'auth/email-already-in-use') {
      setError('An account with this email already exists');
    } else if(error.code === 'auth/user-not-found') {
      setError('User not found');
    } else{
      setError('There was a problem with your request');
    }
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log In</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput  
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCompleteType='email'
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry={true}
     />
      <TouchableOpacity style={styles.signInButton} onPress={loginUser} disabled={!email || !password} >
        <Text style={styles.signInText}>Log In</Text>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
      <Text style={styles.link}>Forgot password?</Text>
      </Pressable>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialButtonsContainer}>
        <Image source={require('./facebook_logo.png')} style={styles.socialLogo} />
        <Image source={require('./google_logo.png')} style={styles.socialLogo} />
      </View>

        <Text>Don't have an account?</Text>
        <Pressable style={styles.signInButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signInText}>Sign Up</Text>
        </Pressable>
    </View>
  );
};

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
  signInButton: {
    backgroundColor: 'black',
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
  orText: {
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialLogo: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  signUpButton: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    marginBottom: 20,
  },
});

export default Login;
