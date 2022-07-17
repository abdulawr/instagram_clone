import React from "react";
import {
 View,
 TouchableHighlight,
 StyleSheet,
 Dimensions,
 Text,
 Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../constant/Colors";
   

const Back_Button = (props) => {
    
    return ( 
        <TouchableHighlight style={[styles.btn,props.style]}  onPress={props.onClick}>
            <Text style={{...styles.text,fontWeight:props.font}}>{props.title} </Text>
        </TouchableHighlight>
     );
}

const styles=StyleSheet.create({
    text:{
        alignSelf:'center',
        color:'white',
        fontFamily:'SAN_BOLD',
        textAlignVertical:'center',
        textAlign:'center'
    },
    btn:{
        width:180,
        borderRadius:10,
        paddingVertical:13,
        backgroundColor:Colors.PRIMARY,

    }
})
 
export default Back_Button;