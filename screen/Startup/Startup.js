import { useEffect } from "react";
import
 { 
    View,
    ActivityIndicator
 }
 from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../../constant/Colors";
import React from 'react';
import {useDispatch } from "react-redux";
import {addUser} from '../../redux/Slices/User';
import postThunks from "../../redux/Action_Thunk/postThunks";
import FollowingThunks from "../../redux/Action_Thunk/FollowingThunks";

const Startup = (props) => {

  //console.log(auth.currentUser) // user already login
 // auth.signOut() // signout
 //AsyncStorage.clear()

    const {navigation} = props;
    const dispatch = useDispatch(state=>state);
   
    const checkLogin = async () => {
        const result = await AsyncStorage.getItem("userData");
        if(!result){ navigation.replace("Landing");  return; }
        let expDate = new Date(result.expDate)
        if(expDate <= new Date()){ navigation.replace("Landing"); return; }

        const data = JSON.parse(result);
        dispatch(postThunks(data.userID));
        dispatch(FollowingThunks(data.userID));
        dispatch(addUser(data));
       navigation.replace("HomeScreen"); return;
    }

    useEffect(()=>{
        checkLogin();
    },[]);

    return ( 
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <ActivityIndicator color={Colors.SECONDARY} size='large' />
        </View>
     );
}
 
export default Startup;