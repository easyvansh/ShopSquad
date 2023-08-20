import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get("window");


const SearchBar = () => {
  return (
    <View style = {styles.container}>
      <Text>SearchBar</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        alignSelf:'center',
        width: width,
        height: height * 0.08,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:width/4,
        backgroundColor:'white',
        shadowColor: "rgb(0,  0,  0)",
        shadowOpacity: 0.9,
        shadowOffset: {
        width: 0,
        height: 1,
        },
        elevation: 2,
        shadowRadius: 2,
        }
    
})
export default SearchBar;