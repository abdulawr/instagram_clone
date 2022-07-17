import 
{
 Modal,
 StyleSheet,
 Image,
 View,
 Text
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const Loading = (props) => {

    return ( 
        <Modal
         visible={props.visible}
         transparent
         >
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Ionicons onPress={() => { props.onClick({status:false,message:'Action completed!'}) }} style={styles.icon} name="close" size={32} color="white" />
                <Image source={require("../../assets/images/success_msg.gif")} style={styles.image} />
                <Text style={styles.msgText}>{props.message}</Text>
              </View>
              </View>
        </Modal>
     );
}
 
const styles = StyleSheet.create(
    {
    
        container:{
            height:"auto",
           flex:1,
           justifyContent:'center',
           alignItems:'center',
           backgroundColor:'#00000099',
        },
        image:{
           width:90,
           height:90,
           alignSelf:'center',
           marginTop:8
        },
        imageContainer:{
            backgroundColor:'white',
            borderRadius:10,
            elevation:5,
            width:'70%',
        },
        msgText:{
            marginTop:15,
            fontFamily:'SAN_MED',
            textAlign:'center',
            marginBottom:20,
            paddingHorizontal:8
        },
        icon:{
            alignSelf:'flex-end',
            backgroundColor:'red',
            borderRadius:10
        }
    }
)
export default Loading;