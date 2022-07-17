import React from "react";
import {
View,
Text,
StyleSheet,
Dimensions,
Pressable
} from 'react-native';
import { auth } from "../config/firebase";
import Loading from "../component/Loading/Loading";
import Colors from "../constant/Colors";
import BlueOutline_Button from "../component/button/BlueOutline_Button";
import Back_Button from "../component/button/Back_Button";
import Containers from "../component/Common/Container";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser,deleteUser } from "../redux/Slices/User";
import User_thk from "../redux/Action_Thunk/User_thk";


const Landing = (props) => {

    const navigation = props.navigation;
    const dispatch = useDispatch();
    const state = useSelector(state=>state);

    useEffect(()=>{
       dispatch(User_thk());
       //dispatch(deleteUser())
    },[])

    return ( 
       <Containers style={styles.container}>
            <Text style={styles.instagrm}>Instagram</Text>
            <Back_Button onClick={()=>{navigation.navigate("Register")}} title="Create new account" style={{width:Dimensions.get('window').width - 30}} font="bold"/>
            <View style={{marginTop:25}}>
                <Pressable onPress={()=>{navigation.navigate("Login")}}>
                    <Text style={{color:Colors.PRIMARY,fontWeight:'bold'}}>Login</Text>
                </Pressable>
            </View>
       </Containers>
     );
}

const styles = StyleSheet.create(
    {
       container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
       },
       instagrm:{
        fontSize:45,
        marginBottom:35,
        color:'#000000',
        fontFamily:'SAN_TITLE'
       }
    }
)
 
export default Landing;