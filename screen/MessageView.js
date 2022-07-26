import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { useState,useLayoutEffect } from 'react';
import Loading from '../component/Loading/Loading';
import { useEffect } from 'react';
import { fireStore } from '../config/firebase';
import { collection, getDocs,getDoc,doc,where,query } from "firebase/firestore";
import Colors from '../constant/Colors';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Circle_Image from '../component/Common/Circle_Image';


const MessageView = (props) => {
    const {navigation,route} = props;

    const profileID = route.params.profileID;
    const [user,setUser] = useState({name:'',image:'',email:'',mobile:''});
    const [loading,setLoading] = useState(false);

    useEffect(()=>{

        const docRef = doc(fireStore, "users", profileID);
        getDoc(docRef).then((resp)=>{
         setLoading(true);
          let item = resp.data();
          item.id = resp.id;
          setUser(item);
          setLoading(false);
        }).catch((er)=>{
           console.log(err);
        });

        navigation.setOptions({
            headerRight: () => (
            <View style={{flexDirection:'row'}}>
                  <Ionicons style={{marginRight:13}} name="md-call-outline" size={26} color="#2E2E2E" />
                  <Ionicons  name="ios-videocam-outline" size={29} color="#2E2E2E" />
            </View>
            ),
            headerTitle: () => (
              <View style={{flexDirection:'row',alignItems:'center',marginLeft:-14}}>
                  <Circle_Image width={30} url={(user.image == null) ? require('../assets/images/no_image.jpg') : {uri:user.image}}  />
                  <View>
                  <Text style={{marginLeft:5,fontFamily:'SAN_BOLD',fontSize:14}}>{user.name}</Text>
                  <Text style={{marginLeft:5,fontFamily:'SAN_TITLE',fontSize:11,color:'#707070'}}>Active 2 min ago</Text>
                  </View>
              </View>
              ),
          });

    },[user]);


    return ( 
        <View style={styles.contain}>
            <Loading visible={loading} />
        
            <View style={{alignItems:'center',marginTop:10}}>
                <Circle_Image width={95} url={(user.image == null) ? require('../assets/images/no_image.jpg') : {uri:user.image}}  />
                <Text style={{marginTop:10,fontFamily:'SAN_BOLD',fontSize:17}}>{user.name}</Text>
                <Text style={{fontSize:12,fontFamily:'SAN_TITLE',color:'#707070',marginBottom:10}}>{user.email}</Text>
              
              <TouchableOpacity onPress={()=>{navigation.navigate("UserProfile",{profileID:profileID})}} style={{backgroundColor:Colors.BORDER_COLOR,paddingVertical:8,paddingHorizontal:15,borderRadius:10}}>
                <Text>View Profile</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.footer}>
                <View style={{width:41,height:41,backgroundColor:Colors.SECONDARY,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                   <FontAwesome name="camera" size={25} color="white" />
                </View>
                 <TextInput placeholder='Message...' style={styles.input} />
                  <View style={{flexDirection:'row',position:'absolute',right:10}}>
                      <MaterialIcons style={{marginRight:10}} name="keyboard-voice" size={25} color="#2E2E2E" />
                      <Ionicons style={{marginRight:10}} name="md-image-outline" size={25} color="#2E2E2E" />
                      <MaterialCommunityIcons name="sticker-emoji" size={25} color="#2E2E2E" />
                   </View>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'white',
        height:'100%',
    },
    footer:{
        width:'96%',
        height:50,
        borderRadius:25,
        backgroundColor:Colors.BORDER_COLOR,
        alignSelf:'center',
        position:'absolute',
        bottom:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:6
    },
    input:{
        width:'60%',
        height:'100%',
        paddingHorizontal:8,
        fontFamily:'SAN_REG'
    }
})

export default MessageView;