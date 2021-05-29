import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormInput from "../components/form_input";
import ButtonC from "../components/button";
import { View, TextInput, ScrollView, Text, StyleSheet, TouchableOpacity,Button, AsyncStorage, Modal, SafeAreaView  } from 'react-native';
import launchCamera from 'react-native-image-picker';
import auth_api from "../api/auth_api";
import chat_api from "../api/chat_api";
import { AntDesign } from '@expo/vector-icons';


const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] =useState();
  const [certificate, setCertificate] =useState();
  const [error,setError] =useState();
  const [certificateError,setCertificateError] =useState();
  const [user,setUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);

    const values = {
          username: username,
          password: password,
          certificate: certificate,
          user: user,
        }

useEffect(() => {
  async function broadcast_connect(){
    if(user!=null){
           try{
           await chat_api
                           .chat()
                           .connect(user)
                           console.log("success broadcasting connected user")

                           await AsyncStorage.setItem("loggedUser", user);

           }catch{(err)=>console.log(err)}
                setUser(null)
    }
  }
  broadcast_connect();
}, [user]);


  const handle_username_change=(text)=>{
    setUsername(text)
  }

  const handle_password_change=(text)=>{
    setPassword(text)
  }

  const handle_certificate_change=(text)=>{
      setCertificate(text)
    }

const firstLogin= ()=>{

   if(!username || !password){
    setError("All fields are required !")
    return
   }else{
    setModalVisible(true);
   }


}

  const  login=async ()=>{
  if(!certificate){
      setCertificateError("Certificate is required !")
      return
}

setModalVisible(!modalVisible)
   await auth_api
     .auth()
     .login(values)
     .then((response)=>{
       if (response.data ==="authentication error") {
         setError(response.data)
         return
       }

       if (response.data ==="You are unauthorized") {
        setError(response.data)
        return
      }
      if (response.data ==="Verify your data") {
        setError(response.data)
        return
      }
        setUser(JSON.stringify(response.data))


       console.log("Authenticated") //to edit to active users list
        props.navigation.navigate("Users")
     })
     .catch((err)=>console.log(err))

  }


  return (

    < ScrollView contentContainerStyle={styles.main_container}>


 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}

      >
       <SafeAreaView>
          <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                     <TouchableOpacity style={{alignSelf:'flex-end',position:'absolute',padding:10}} onPress={()=>setModalVisible(!modalVisible)}>
                    <AntDesign name="closecircleo" size={24} color="black" />
                     </TouchableOpacity>
                     <Text style={{ fontWeight: 'bold',
                                       textAlign: 'center',
                                       fontSize: 20,
                                       alignContent: 'center',
                                       color: '#000',}}>Enter your certificate to login</Text>
                   <Text style={styles.error_text}>
                           {certificateError}
                           </Text>
             <TextInput style={styles.modalText}
                     placeholder="Certificate"
                     multiline={true}
                     numberOfLines={10}
                     onChangeText={handle_certificate_change}
                     />


            <ButtonC onPress={login} title="Login"/>

          </View>
        </View>
         </ScrollView>
        </SafeAreaView>
      </Modal>

      <View style={styles.container} >
        <View style={tailwind('items-center pt-40')}>

          <View style={tailwind('py-2')}>
            <Text style={styles.form_title}>
              Login
          </Text>
          <Text style={styles.error_text}>
        {error}
        </Text>
          </View>

          <FormInput
            placeholder="Username"
          onChangeText={handle_username_change}
          />
          <FormInput
            placeholder="Password"
            onChangeText={handle_password_change}
            isPassword='true'
          />


          
          <ButtonC title="Continue" onPress={firstLogin} />
        </View>
        <View style={tailwind('py-8')} >
        <View>
          <Text style={styles.white_text}>
            Don't have an account ?
            </Text>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Register")}>
          <Text style={styles.blue_text}>
            Sign up
            </Text>
        </TouchableOpacity>
      </View>
      </View>




    </ScrollView>
  );
};
export default Login

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

  container: {
    flex: 1
  },
  error_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    alignContent: 'center',
    color: '#ff0000',
  },
 input: {
    fontWeight:'bold',
    textAlign:'center',
    fontSize:20,
    color:'#fff',
    borderRadius: 25,
    backgroundColor: '#5ac2d2',
   // height: 50,
    width:300,
    marginTop:10,
    marginBottom:10
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

