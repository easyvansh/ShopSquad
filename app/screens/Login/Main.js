import React,{useEffect} from 'react';
import { View, Text, Button,} from 'react-native';
import {signOut,onAuthStateChanged} from 'firebase/auth';
import { auth } from './config';

function Main({ navigation }) {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.replace('Login'); // Redirect to login screen if not logged in
      }
      
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logged in</Text>

      <Button title="Continue" onPress={()=>{navigation.navigate('HomePage')}} />
      <Button title="Log out" onPress={logout} />
    </View>
  );
}
export default Main;
