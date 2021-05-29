import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import FormInput from "../components/form_input";
import ButtonC from "../components/button";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity,Button, AsyncStorage  } from 'react-native';
import launchCamera from 'react-native-image-picker';
import auth_api from "../api/auth_api";
import chat_api from "../api/chat_api";



const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] =useState();
  const [error,setError] =useState();
  const [user,setUser] = useState();

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
  const  login=async ()=>{
    const values = {
      username: username,
      password: password,
      user: user,
    }
   if(!username || !password ){
    setError("All fields are required !")
    return 
   }

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
      if (response.data ==="Username or password is not correct") {
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
          
          <ButtonC title="Login" onPress={login} />
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



});

