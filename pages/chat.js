import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import { View, ScrollView, Text, Image, StyleSheet, SafeAreaView, TextInput,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



const Chat = (props) => {

const [message, setMessage] = useState({});
const [messages, setMessages] = useState([]);


  const handle_message_change=(text)=>{
    setMessage({sent: true,message: text})
    console.log(message)
  }

  const sendMessage=(text)=>{
      if (message !=""){
        setMessages(messages => [...messages, message]);
        setMessage("")
        messages.map((message) => console.log(message));
      }

    }

    renderMessages=()=>{
        return messages.map((message) => {
            return (<>
             {message.sent
                    ? <Text key="1" style={styles.sent}>{message.message}</Text>
                    : <Text key="2" style={styles.received}>{message.message}</Text>
                  }</>
                          )
            })

    }

  return (

    < ScrollView contentContainerStyle={styles.main_container}>

      <View style={styles.container} >

                  <Text style={styles.header}>
                  <TouchableOpacity onPress={()=>props.navigation.navigate("Users")}>
                        <AntDesign name="arrowleft" size={26} color="#fff" />
                        </TouchableOpacity>
                        <Image style={styles.user_image} source={require('../assets/user1.png')} />
                            username




                  </Text>



    <SafeAreaView style={styles.conversation}>
    <ScrollView>
    <Text style={styles.pink_box}>Today</Text>
{renderMessages()}



    </ScrollView>
<View style={{flexDirection:'row'}}>
<TextInput style={styles.input}
          selectTextOnFocus
          placeholder="Type a message"
          placeholderTextColor="#fff"
          onChangeText={text => handle_message_change(text)}
          value={message}
          />
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
                  <AntDesign style={{flex:1,marginTop:30,marginLeft:10}} name="rightcircle" size={30} color="#FF2067" />
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
        fontWeight:'bold',
        fontSize:20,
        color:'#fff',
        height: 150,
        width:370,
        paddingLeft:15,
        paddingTop:40,
        alignSelf:'flex-start'

  },
user_image: {
          width:75,
          height: 75,

      },
      conversation: {
            backgroundColor: '#fff',
            height: '6%',
            borderRadius: 35,
            margin:'3%',
            flexDirection: 'column',
            padding: '3%',
            flex:1,
            width:370,

        },
     pink_box: {
        backgroundColor:'#FF2067',
        fontWeight:'bold',
        fontSize:20,
        color:'#fff',
        borderRadius: 35,
        minWidth:100,
        textAlign:'center',
        height:30,
        flexDirection: 'row',
        alignSelf:'center',

     },

      received: {
             backgroundColor:'#3EC1D2',
             fontWeight:'bold',
             fontSize:20,
             color:'#fff',
             borderRadius: 35,
             minWidth:100,
             maxWidth:250,
             textAlign:'center',
             minHeight:30,
             flexDirection: 'row',
             alignSelf:'flex-start',
             padding:5,
             margin:3,

      },
 sent: {
        backgroundColor:'rgba(62, 193, 210, 0.24)',
        fontWeight:'bold',
        fontSize:20,
        color:'#3EC1D2',
        borderRadius: 35,
        minWidth:100,
        maxWidth:250,
        textAlign:'center',
        minHeight:30,
        flexDirection: 'row',
        alignSelf:'flex-end',
        padding:5,
        margin:3,

     },
     input: {
             backgroundColor:'#FF2067',
             fontSize:20,
             color:'#fff',
             borderRadius: 35,
             width:300,
             textAlign:'center',
             height:50,
             flexDirection: 'row',
             alignSelf:'center',
             marginTop:20,

          },

});

