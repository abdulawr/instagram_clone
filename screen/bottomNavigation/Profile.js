import {
    View,
    Text,
    StyleSheet,
    ScrollView,Dimensions,
    Animated,
    FlatList,
    Modal,
    KeyboardAvoidingView
 } from "react-native";
 import { useRef, useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Circle_Image from "../../component/Common/Circle_Image";
import Outline_Button from '../../component/button/Outline_Button';
import PostRow from "../../component/Posts/PostRow";
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from "../../constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import {logOut} from '../../config/Functions';
import { collection, getDocs,where,query } from "firebase/firestore";
import { fireStore } from "../../config/firebase";
import PeopleRow from "../../component/Posts/PeopleRow";
import Input from '../../component/EditField/Input';
import { TextInput } from "react-native";


const Profile = (props) => {

    const user = useSelector(state => state.user.user);

    if(!user instanceof Object){
        user = JSON.parse(user);
     }

    const POSTS = useSelector(state => state.post.post)
    const [peoples,setPeople] = useState([]);
    const [model,setModal] = useState(false);
    const {navigation} = props;

    console.log(user)


    const onlogOut = () => {
       logOut();
       navigation.replace("Landing");
    }

    useEffect(()=>{
        (
            async () => {
                const querySnapshot = await getDocs(collection(fireStore, "users"));
                let resp = [];
                querySnapshot.forEach((doc) => {
                  if(doc.id != user.userID){
                    let item = doc.data();
                    resp.push(
                        {
                            id:doc.id,
                            name:item.name,
                            image:item.image,
                            email:item.email,
                            mobile:item.mobile
                        }
                    );
                  }
         
                  if(resp.length > 0){
                    setPeople(resp);
                  }
                
                });               
            }
        )();
       
    },[])

    let headerSection = (<View style={styles.container}>               
    <View style={{flexDirection:'row',marginTop:60,justifyContent:'space-evenly',alignItems:'center'}}>

          <Modal
           visible={model}
           transparent={true}
          >
                 <KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#00000099'}}>
                     <View style={styles.popupview}>
                      
                           
                           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Ionicons onPress={()=>setModal(false)} name="close" color={Colors.DESIGN} style={{alignSelf:'flex-start'}} size={35} />
                              <Ionicons name="checkmark-sharp" color={Colors.DESIGN} style={{alignSelf:'flex-end'}} size={35} />
                           </View>

                           <View style={styles.topImage}>
                              <Circle_Image  width={120} url={(user.image == null) ? require('../../assets/images/no_image.jpg') : {uri:user.image}}  />
                              <Text></Text>
                           </View>

                          <View style={{paddingHorizontal:10,paddingVertical:10}}>
                             
                             <View>
                                <Text style={{fontFamily:'SAN_REG',fontSize:12}}>Name</Text>
                                <TextInput value={user.mobile} style={styles.input} />
                             </View>

                             <View>
                                <Text style={{fontFamily:'SAN_REG',fontSize:12,marginTop:12}}>Mobile</Text>
                                <TextInput value={user.mobile} style={styles.input} />
                             </View>

                             <View>
                                <Text style={{fontFamily:'SAN_REG',fontSize:12,marginTop:12}}>Email</Text>
                                <TextInput value={user.email} style={styles.input} />
                             </View>

                            
                          </View>
                         
                     </View>
                 </KeyboardAvoidingView>
          </Modal>

          <View>
             <Circle_Image width={68} url={(user.image == null) ? require('../../assets/images/no_image.jpg') : {uri:user.image}}  />
             <Text style={{fontFamily:'SAN_BOLD',marginTop:3}}>{user.name}</Text>
          </View>

          <View style={styles.textCaontainer}>
            <Text style={styles.titleSt}>{POSTS.length}</Text>
            <Text style={{fontFamily:'SAN_REG'}}>Posts</Text>
          </View>

          <View style={styles.textCaontainer}>
            <Text style={styles.titleSt}>41</Text>
            <Text style={{fontFamily:'SAN_REG'}}>Follower</Text>
          </View>

          <View style={styles.textCaontainer}>
            <Text style={styles.titleSt}>100</Text>
            <Text style={{fontFamily:'SAN_REG'}}>Followeing</Text>
          </View>

    </View>

   <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
       <Outline_Button onClick={()=> {setModal(true)}} title="Edit profile" style={{margin:15,width:'82%',alignSelf:'center',borderRadius:50}} />
       <Ionicons onPress={onlogOut} name="log-out-outline" color={Colors.DESIGN} size={35} />
   </View>
   

     <View style={styles.disContainer}>
        <Text style={{fontFamily:'SAN_BOLD'}}>Discover people</Text>
        <Text style={{fontFamily:'SAN_BOLD',color:Colors.SECONDARY}}>See all</Text>
     </View>


     <FlatList 
      data={peoples}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{width:'100%'}}
      renderItem={
        ({item}) => { return <PeopleRow item={item} />;}}
     />

    </View> );

    return ( 
         
                <FlatList 
                 ListHeaderComponent={() => headerSection }
                 style={{flex:1,width:'100%',backgroundColor:'white'}}
                 numColumns={3}
                 showsVerticalScrollIndicator={false}
                 horizontal={false}
                 data={POSTS}
                 renderItem={
                    ({item}) => <PostRow item={item} /> }
                 keyExtractor={item => item.id}
                />
            
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    titleSt:{
        fontFamily:'SAN_BOLD',
        textAlign:'center',
        fontSize:20,
        
    },
    leftStyle:{
        width:200,
        height:200,
        backgroundColor:'#e1306c',
        position:'absolute',
        borderRadius:100,
        left:-100,
        bottom:(Dimensions.get('window').width / 2)-100,
        zIndex:-1111,
        opacity:0.2

    },
    leftStyle2:{
        width:200,
        height:200,
        backgroundColor:'#e1306c',
        position:'absolute',
        borderRadius:100,
        right: -100,
        bottom:(Dimensions.get('window').width / 2)+100,
        zIndex:-1111,
        opacity:0.2,
    },
    disContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:10
    },
    popupview:{
      backgroundColor:'white',
      width:'90%',
      borderRadius:5,
      elevation:8,
      height:310,
      padding:5
    },
    input:{
      width:'100%',
      height:36,
      paddingHorizontal:5,
      borderBottomColor:Colors.BORDER_COLOR,
      borderBottomWidth:1,
      fontFamily:'SAN_BOLD'
    },
    topImage:{
      alignItems:'center',
      marginTop:-100,
      backgroundColor:'#00000099',
      width:130,
      height:130,
      borderRadius:70,
      alignSelf:'center',
    }
})
 
export default Profile;