import React from 'react';


import tailwind from 'tailwind-rn';
import { Button, TouchableOpacity, Text, View ,StyleSheet} from 'react-native';


const ButtonC = (prpos) => {
  return (

      <TouchableOpacity style={styles.button} onPress={prpos.onPress}>
        <Text style={styles.buttonText}>
          {prpos.title}
        </Text>
      </TouchableOpacity>

  );
};

export default ButtonC;

const styles = StyleSheet.create({
    button: {

      borderRadius: 10,
      backgroundColor: '#FF2067',
      height: 50,
      width:200,
      marginTop:20,
      marginBottom:20,
      alignItems:'center'
    },
    buttonText:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        alignContent:'center',
        alignItems:'center',
        padding:10
    }
  });