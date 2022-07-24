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
 import {useState,useEffect, useMemo } from "react";
import Circle_Image from "../component/Common/Circle_Image";
import Back_Button from '../component/button/Back_Button';
import BlueOutline_Button from '../component/button/BlueOutline_Button';
import PostRow from "../component/Posts/PostRow";
import Colors from "../constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import {logOut} from '../config/Functions';
import { collection, getDocs,getDoc,doc,where,query } from "firebase/firestore";
import { fireStore } from "../config/firebase";
import Loading from "../component/Loading/Loading";


const UserProfile = (props) => {

    const {navigation,route} = props;
    const profileID = route.params.profileID;
    const [user,setUser] = useState({name:'',image:'',email:'',mobile:''});
    const [loading,setLoading] = useState(false);
    const [post,setPost] = useState([]);



    useEffect(()=>{
       
        const docRef = doc(fireStore, "users", profileID);
        getDoc(docRef).then((resp)=>{
         setLoading(true);
          let item = resp.data();
          item.id = resp.id;
          setUser(item);
          // Getting post start
           getDocs(collection(doc(collection(fireStore,'posts'),profileID),'userPosts')).then((result)=>{
            let postsData = [];
            result.forEach((doc) => {
               let item = doc.data();
               item.id = doc.id;
               postsData.push(item)
            });

            if(postsData.length > 0){
              setPost(postsData);
            }
           setLoading(false);
           })
           // Getting post end
        }).catch((er)=>{
           console.log(err);
        });

    },[])


    let headerSection = (<View style={styles.container}>               
    <View style={{flexDirection:'row',marginTop:60,justifyContent:'space-evenly',alignItems:'center'}}>
        <Loading visible={loading} />

          {
            user.image != '' &&
            <View>
            <Circle_Image width={68} url={(user.image == null) ? require('../assets/images/no_image.jpg') : {uri:user.image}}  />
            <Text style={{fontFamily:'SAN_BOLD',marginTop:3}}>{user.name}</Text>
            </View>
          }

          <View style={styles.textCaontainer}>
            <Text style={styles.titleSt}>{post.length}</Text>
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

   <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',paddingHorizontal:10,marginVertical:10}}>
       <Back_Button onClick={()=> {setModal(true)}} title="Follow" style={{paddingVertical:8,width:'45%',alignSelf:'center',borderRadius:50}} />
       <BlueOutline_Button onClick={()=> {setModal(true)}} title="Message" style={{paddingVertical:8,marginTop:0,width:'45%',alignSelf:'center',borderRadius:50}} />
   </View>

</View> );

return(
<FlatList 
    ListHeaderComponent={() => headerSection }
    style={{flex:1,width:'100%',backgroundColor:'white'}}
    numColumns={3}
    showsVerticalScrollIndicator={false}
    horizontal={false}
    data={post}
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
 
export default UserProfile;