import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';


import tailwind from 'tailwind-rn';


const FormInput = (props) => {
  return (

    <>
      
        <TextInput style={styles.input}
          selectTextOnFocus
          placeholder={props.placeholder}
          secureTextEntry={Boolean(props.isPassword)}
          keyboardType={props.type}
          editable={props.editable!==null}
          maxLength={props.maxLength}
          placeholderTextColor="#fff" 
          onChangeText={(text) => props.onChangeText(text)} 
          />
      


    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    fontWeight:'bold',
    textAlign:'center',
    fontSize:20,
    color:'#fff',
    borderRadius: 25,
    backgroundColor: '#5ac2d2',
    height: 50,
    width:300,
    marginTop:10,
    marginBottom:10
  },
});