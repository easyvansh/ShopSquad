import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from'./config'
import BgEllipse from './bgEllipse';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");
function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <BgEllipse/>
      <View style={styles.inner}>
        <Text style={styles.header}>Reset Password</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Back to login</Text>
        </Pressable>

        {submitted ? (
          <Text>Please check your email for a reset password link.</Text>
        ) : (
          <>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="white"
              style={styles.input}
            
              />
            <Pressable
      style={[styles.rectangleButton,{width: width * 0.6,
        height: height * 0.09,}]}
      onPress={resetUserPassword}
      disabled={!email}
    >
      <Text style={styles.signUp}>Reset Password</Text>
    </Pressable>
           
          </>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    outer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inner: {
      width: 240,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: "white",
      marginVertical: 0,
      lineHeight: 28,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    error: {
      marginBottom: 20,
      color: 'red',
    },
    link: {
      color: "white",
      marginVertical: 0,
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 28,
    },
    rectangleButton: {
      padding: 0.5,
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 1)",
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: width / 2,
      borderTopRightRadius: width / 2,
      borderBottomLeftRadius: width / 2,
      borderBottomRightRadius: width / 2,
      shadowColor: "black",
      shadowOpacity: 0.9,
      shadowRadius: 0,
      elevation: 2,
    },
    signUp: {
      opacity: 1,
      color: "rgba(56, 199, 130, 1)",
      position: "relative",
      fontSize: 20,
      fontWeight: "900",
      fontStyle: "normal",
    },
  });

export default ForgotPassword;
