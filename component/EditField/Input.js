import React from "react";
import { TextInput,StyleSheet,Dimensions } from "react-native";
import Colors from "../../constant/Colors";


const Input = (props) => {
    return ( 
        <TextInput 
        placeholderTextColor='#d3d3d3'
        style={StyleSheet.compose(styles.input,props.styles)}
        {...props}
        />
     );
}
 
const styles = StyleSheet.create(
    {
        input:{
            width: Dimensions.get('window').width - 50,
            borderColor: Colors.BORDER_COLOR,
            height: Dimensions.get('window').width * 0.13,
            borderWidth:1,
            paddingHorizontal:15,
            marginTop:12,
            borderRadius:  5,
            fontFamily:'SAN_REG',
            color:Colors.TEXT_COLOR,
            backgroundColor:Colors.BORDER_BACK_COLOR
        },
    }
)
export default Input;