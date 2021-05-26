import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import { View, ScrollView, SafeAreaView, Text, TextInput, Image, StyleSheet, FlatList, TouchableOpacity,Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Users = (props) => {
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
        title: 'testUser',
      },
];




  return (

    <ScrollView contentContainerStyle={styles.main_container}>

      <View style={styles.container} >
        <View style={tailwind('items-center pt-20')}>
            <Text style={styles.buttons}><AntDesign name="search1" size={24} color="#fff" />Search users</Text>
        </View>



        <SafeAreaView style={styles.list_users}>


<FlatList
  data={DATA}
  renderItem={({ item }) => (
  <View
                        style={{
                          flex:1,
                          flexDirection: 'column',
                          margin: 1,
                          marginBottom: 25,
                          alignItems:'center',

                        }}>
                        {item.id != ''? <><Image style={styles.user_image} source={require('../assets/user1.png')} /><Text style={styles.username}>{item.title}</Text></>: <View></View> }

                      </View>
  )}
  //Setting the number of column
  numColumns={3}
  keyExtractor={(item, index) => index.toString()}
/>

        </SafeAreaView>
      </View >



     <View style={styles.menu} >
         <View style={tailwind('flex-row pb-0 w-full')}>
         <TouchableOpacity style={tailwind('flex-1 items-center')} >
               <Entypo name="log-out" size={24} color="#fff" />
         </TouchableOpacity>
         <TouchableOpacity style={tailwind('flex-1 items-center')} >
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

