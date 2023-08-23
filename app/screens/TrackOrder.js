import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  import { useState } from 'react';
  import { useGetOrderQuery } from '../store/apiSlice';
import ProductDetails from './ProductDetails';
import ViewProduct from '../components/ViewProduct';
import { useSelector } from 'react-redux';
import { selectUserRef } from '../store/userSlice';
  
  const TrackOrder = () => {
    const userRef = useSelector(selectUserRef);
    console.log(userRef);
  const id = userRef;
    const { data, isLoading, error } = useGetOrderQuery(userRef);
   
    return (
      <View style={styles.root}>
        
        {isLoading &&<View style = {{justifyContent:'center',flex:1,padding:10}}>

      <ActivityIndicator  color="rgba(111, 202, 186, 1)" size = "large"  style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}/>
      </View>}
        {data?.status !== 'OK' && <Text>No Squads Participant</Text>}
        {/* {data?.status === 'OK' && <Text>Order: {JSON.stringify(data.data)}</Text>} */}
        {data?.status === 'OK'  && <ViewProduct route = {data.data}/>
        }
      </View>
    );
    
  };
  
  const styles = StyleSheet.create({
    root: {
      padding: 10,
    },
    input: {
      borderColor: 'lightgrey',
      borderWidth: 1,
      padding: 15,
      borderRadius: 5,
    },
  });
  
  export default TrackOrder;