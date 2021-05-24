import React from 'react';
import { Button, StyleSheet, TextInput, Touchable, TouchableOpacity, View ,Text} from 'react-native';
import { Feather } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';


const Picker = (props) => {
    return (

        <>

                <TouchableOpacity style={styles.button}
                    onPress={props.pickImage}
                >
                    <Text style={styles.buttonText}>
                        {props.title} <Feather name="upload" size={24} color="white" />
                    </Text>
                </TouchableOpacity>



        </>
    );
};

export default Picker;

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        backgroundColor: '#5ac2d2',
        height: 50,
        width: 300,
        marginTop: 10,
        marginBottom: 10,
        alignItems:'center'
    },
    buttonText:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        alignContent:'center',
        alignItems:'center',
        paddingTop:10
    }
});

