import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormInput from "../components/form_input";
import ButtonC from "../components/button";
import { Alert, Modal, SafeAreaView,  Pressable, Clipboard, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth_api from "../api/auth_api";


const Register = (props) => {
  const [fullname, setFullname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] =useState();
  const [re_password,setRe_password]=useState();
  const [error,setError]=useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [certificate, setCertificate] = useState('');


  const handle_fullname_change=(text)=>{
    setFullname(text)
  }
  
  const handle_username_change=(text)=>{
    setUsername(text)
  }

  const handle_password_change=(text)=>{
    setPassword(text)
  }

  const handle_re_password_change=(text)=>{
    setRe_password(text)
  }

  const  register=async ()=>{
    const values = {
      fullname: fullname,
      username: username,
      userPassword: password,
      re_password: re_password
    }
   if(!fullname || !username || !password || !re_password){
    setError("All fields are required !")
    return 
   }
   if(password !==re_password){
     setError("Passwords must match")
     return
   }


   await auth_api
     .auth()
     .register(values)
     .then((response)=>{
       if (response.data==="Authentication error"){
        setError("Authentication error")
        return
       }
       else if  (response.data==="User already exists"){
         setError(response.data)
         return
       }else{

       setCertificate(response.data);
       setModalVisible(true);

            return
       }
      

      
     })
     .catch((err)=>console.log(err))




  }




     const copyToClipboard = () => {
         Clipboard.setString(certificate)
       }

  return (


    < ScrollView contentContainerStyle={styles.main_container}>

 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
       <SafeAreaView>
          <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

           <TouchableOpacity onPress={() => copyToClipboard()}>
                     <Text style={{ fontWeight: 'bold',
                                       textAlign: 'center',
                                       fontSize: 20,
                                       alignContent: 'center',
                                       color: '#000',}}>Click here to copy your certificate</Text>
                   </TouchableOpacity>
            <Text style={styles.modalText}>{certificate}</Text>

            <TouchableOpacity
              onPress={()=>{setModalVisible(!modalVisible);props.navigation.navigate("Login");}}
            >
            <Text style={{ fontWeight: 'bold',
                                                   textAlign: 'center',
                                                   fontSize: 20,
                                                   alignContent: 'center',
                                                   color: '#000',}}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
         </ScrollView>
        </SafeAreaView>
      </Modal>



    <View style={styles.container} >
      <View style={tailwind('items-center pt-20')}>

        <View style={tailwind('py-2')}>
          <Text style={styles.form_title}>
            Create An Account 
            
        </Text>
        <Text style={styles.error_text}>
        {error}
        </Text>
        </View>

        <FormInput
          placeholder="Fullname"
        onChangeText={handle_fullname_change}
        />
        <FormInput
          placeholder="Username"
        onChangeText={handle_username_change}
        />
        <FormInput
          placeholder="Password"
          onChangeText={handle_password_change}
          isPassword='true'
        />
        <FormInput
          placeholder="Repeat Password"
          onChangeText={handle_re_password_change}
          isPassword='true'
        />
        
        <ButtonC title="Sign up" onPress={register} />
      </View>
      <View style={tailwind('py-8')} >
      <View>
        <Text style={styles.white_text}>
          Have an account already?
          </Text>
      </View>
      <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
        <Text style={styles.blue_text}>
          Login
          </Text>
      </TouchableOpacity>
    </View>
    </View>




  </ScrollView>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#183361',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form_title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    alignContent: 'center',
    color: '#fff'
  },
  white_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    alignContent: 'center',
    color: '#fff',
  },
  blue_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    alignContent: 'center',
    color: '#5ac2d2',
  },
  error_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    alignContent: 'center',
    color: '#ff0000',
  },
  container: {
    flex: 1
  },


   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },

    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }



});
export default Register;
