import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import { View, ScrollView, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, AsyncStorage, SliderComponent } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import chat_api from "../api/chat_api";
import io from "socket.io-client";
import uuid from 'react-native-uuid';
import * as Notifications  from 'expo-notifications'
import Constants from "expo-constants";
import auth_api from '../api/auth_api';
import JSEncrypt from "jsencrypt";



const socket = io("http://d2536cb415a4.ngrok.io/", { transports: ['websocket'] });





const Chat = (props) => {

  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([]);
  const [received, setReceived] = useState();
  const [user, setUser] = useState();
  const [freind_key, setFreind_key] = useState()
  const [user_key, setUserKey] = useState()
  const { friend } = props.route.params;


  useEffect(() => {

    async function test() {
      try {
        const loggedUser = JSON.parse(await AsyncStorage.getItem("loggedUser"));

        setUser(loggedUser.attributes.sn[0]);
        setUserKey(loggedUser.attributes.userPKCS12[0])


      } catch { }
    } test(); getFreind() 
  }, []);



  const handle_message_change = (text) => {
    setMessage({ receiver: friend.user, source: user, message: text })
  }


  const getFreind = () => {

    auth_api.auth().getUser(friend.user).then((response) => setFreind_key(response.data["pub_key"]))

  }

  const encrypt = (message) => {
    var enc = new JSEncrypt();
    //console.log("freind key",freind_key) :te5dem
    enc.setPublicKey(freind_key);
    const encrypted = enc.encrypt(message)
    //decrypt(encrypted)
    console.log(encrypted)
    return encrypted
  }
   function decrypt (message,y)  {
    var dec = new JSEncrypt()
    console.log("user key" +y)
    dec.setPrivateKey(y);
    let decrypted = dec.decrypt(message)
    while(decrypted ==false )
    {
      dec.setPrivateKey(y);
      decrypted = dec.decrypt(message)
    }

    return decrypted


  }

  const sendMessage = (text) => {
    if (message.message != "") {
      setMessages(messages => [...messages, message]);
      console.log(message)
      chat_api
        .chat()
        .sendMessage(encrypt(message.message), message.receiver, message.source)
      setMessage({ message: "" })
    }
  }

  useEffect(() => {

    async function getMessage() {
    
        const loggedUser = JSON.parse(await AsyncStorage.getItem("loggedUser"));
        let y=loggedUser.attributes.sn[0];
        let z=loggedUser.attributes.userPKCS12[0];      
      socket.on("custom_receive", (message) => {
        console.log(message.source)
        if (y && message.source === y) {

        }
        else {
          decrypted= decrypt(message.message,z)
          console.log("final decr",decrypted)
          setMessage({
            message: decrypted
            
          })

          setReceived(message);
          console.log('receiving')
          setMessages(messages => [...messages,{message:decrypted,source:message.source,receiver:message.receiver}]);
          setMessage({})
          Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
          });
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'New Message',
              body:''
            },
            trigger: null,
          });
        }

      });
    }

    getMessage();
  }, []);






  const renderMessages = () => {

    return messages.map((message, i) => {
      //console.log(message)
      // return (<Text key={i} style={styles.sent}>{message.message}</Text>)
      if (message.source == user) {
        return (<Text key={i} style={styles.sent}>{message.message}</Text>)

      } else if (message.receiver == user) {
        return (<Text key={i} style={styles.received}>{message.message}</Text>)
      }


    })


  }

  return (

    < ScrollView contentContainerStyle={styles.main_container}>

      <View style={styles.container} >

        <Text style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Users")}>
            <AntDesign name="arrowleft" size={26} color="#fff" />
          </TouchableOpacity>
          <Image style={styles.user_image} source={require('../assets/user1.png')} />
          {friend.user}




        </Text>



        <SafeAreaView style={styles.conversation}>
          <ScrollView>

            <Text style={styles.pink_box}>Today</Text>

            {renderMessages()}



          </ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <TextInput style={styles.input}
              selectTextOnFocus
              placeholder="Type a message"
              placeholderTextColor="#fff"
              onChangeText={text => handle_message_change(text)}
              value={message.message}
            />
            <TouchableOpacity style={styles.button} onPress={sendMessage}>
              <AntDesign style={{ flex: 1, marginTop: 30, marginLeft: 10 }} name="rightcircle" size={30} color="#FF2067" />
            </TouchableOpacity>
          </View>




        </SafeAreaView>


      </View>

    </ScrollView>


  );
};
export default Chat

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#183361',
    alignItems: 'center',
    justifyContent: 'center',

  },

  container: {
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    height: 150,
    width: 370,
    paddingLeft: 15,
    paddingTop: 40,
    alignSelf: 'flex-start'

  },
  user_image: {
    width: 75,
    height: 75,

  },
  conversation: {
    backgroundColor: '#fff',
    height: '6%',
    borderRadius: 35,
    margin: '3%',
    flexDirection: 'column',
    padding: '3%',
    flex: 1,
    width: 370,

  },
  pink_box: {
    backgroundColor: '#FF2067',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    borderRadius: 35,
    minWidth: 100,
    textAlign: 'center',
    height: 30,
    flexDirection: 'row',
    alignSelf: 'center',

  },

  received: {
    backgroundColor: '#3EC1D2',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    borderRadius: 35,
    minWidth: 100,
    maxWidth: 250,
    textAlign: 'center',
    minHeight: 30,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 10,
    margin: 3,

  },
  sent: {
    backgroundColor: 'rgba(62, 193, 210, 0.24)',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3EC1D2',
    borderRadius: 35,
    minWidth: 100,
    maxWidth: 250,
    textAlign: 'center',
    minHeight: 30,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    margin: 3,

  },
  input: {
    backgroundColor: '#FF2067',
    fontSize: 20,
    color: '#fff',
    borderRadius: 35,
    width: 300,
    textAlign: 'center',
    height: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,

  },

});


