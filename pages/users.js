import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import { View, ScrollView, SafeAreaView, Text, TextInput, Image, StyleSheet, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import chat_api from "../api/chat_api";
import io from "socket.io-client";

const socket = io("http://0190a230c6d9.ngrok.io/", { transports: ['websocket'] });

const Users = (props) => {

const [users, setUsers] = useState([]);
const [user,setUser] = useState();
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'ines.ouled',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'altafallah',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'userX',
  },
  {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'userY',
    },

    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'user22',
      },
       {
              id: '',
              title: 'user22',
            },

];

useEffect(()=>{

      function getUsers(){
        socket.on("broadcast_connect", (users) => {
        setUsers(users["connected_users"]);
        console.log('broadcasting connect')

        });
         socket.on("broadcast_disconnect", (users) => {
                setUsers(users["connected_users"]);

                });

      }getUsers();},[]);


useEffect(() => {
  async function custom_disconnect(){
    if(user!=null){
           try{
           await chat_api
                           .chat()
                           .disconnect(user)
           }catch{(err)=>console.log(err)}
                setUser(null)
    }
  }
  custom_disconnect();
}, [user]);


const logout=async()=>{

     try {
     const u = await AsyncStorage.getItem("loggedUser")
            setUser(u);
              await AsyncStorage.removeItem("loggedUser");
                console.log('disconnected')
              props.navigation.navigate("Login")
           } catch (error) {
             console.log("Something went wrong", error);
           }
}

const show_users=()=>{


if(users.length!=0){
users.map((user,i) => {
        console.log(user);


            })
}

}


const renderUsers=()=>{


if(users.length!=0){

return users.map((user,i) => {
        return(
        <View
                                        style={{
                                          width:'33%',

                                          marginBottom: 25,
                                          alignItems:'center',


                                        }}>

                                      <Image style={styles.user_image} source={require('../assets/user1.png')} />
                                      <TouchableOpacity onPress={()=>{props.navigation.navigate('Chat', {friend: {user},});}}>
                                      <Text style={styles.username}>{user}</Text>
</TouchableOpacity>
                                      </View>
        )


            })
}

}


  return (

    <ScrollView contentContainerStyle={styles.main_container}>

      <View style={styles.container} >
        <View style={tailwind('items-center pt-20')}>
            <Text style={styles.buttons}><AntDesign name="search1" size={24} color="#fff" />Search users</Text>
        </View>



        <SafeAreaView style={styles.list_users}>

{renderUsers()}

        </SafeAreaView>
      </View >



     <View style={styles.menu} >
         <View style={tailwind('flex-row pb-0 w-full')}>
         <TouchableOpacity style={tailwind('flex-1 items-center')} onPress={logout}>
               <Entypo name="log-out" size={24} color="#fff" />
         </TouchableOpacity>
         <TouchableOpacity onPress={show_users} >
         <Entypo name="chat" size={24} color="#fff" />

         </TouchableOpacity>
        <TouchableOpacity style={tailwind('flex-1 items-center')} >
                                              <AntDesign name="setting" size={24} color="#fff" />
        </TouchableOpacity>

         </View>
      </View>
    </ScrollView>
  );
};
export default Users

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
  list_users: {
      backgroundColor: '#fff',
      minHeight: '60%',
      width:370,
      borderRadius: 35,
      margin:'3%',
      flexDirection: 'row',
      padding: '3%',
      flex:1,
      flexWrap:'wrap',
  },
  username: {
        fontSize:15,
        color:'#FF2067',
        fontWeight: 'bold',
  },
user_image: {
          width:'85%',
          height: 85,
      },
  buttons: {
      fontWeight:'bold',
      textAlign:'left',
      fontSize:20,
      color:'#fff',
      borderRadius: 5,
      backgroundColor: '#3EC1D2',
      height: 50,
      width:370,
      padding:'3%',

    },
    menu: {
          fontWeight:'bold',
          textAlign:'left',
          fontSize:20,
          color:'#fff',
          backgroundColor: '#3EC1D2',
          height: 50,
          padding:'3%',

        },


});

