import {
    View,
    Text,
    StyleSheet,
    ScrollView,Dimensions,
    Animated,
    FlatList,
    Modal,
    KeyboardAvoidingView,
    Pressable
 } from "react-native";
 import { useRef, useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Circle_Image from "../../component/Common/Circle_Image";
import Outline_Button from '../../component/button/Outline_Button';
import PostRow from "../../component/Posts/PostRow";
import Colors from "../../constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import {logOut} from '../../config/Functions';
import { collection, getDocs,where,query,deleteDoc,doc,setDoc } from "firebase/firestore";
import { fireStore } from "../../config/firebase";
import PeopleRow from "../../component/Posts/PeopleRow";
import { TextInput } from "react-native";
import { deleteUser } from "../../redux/Slices/User";
import { deletePost } from "../../redux/Slices/Posts";
import {deleteFollowing} from '../../redux/Slices/Following';
import { addFollowing,deleteDOC } from '../../redux/Slices/Following';
import BlueOutline_Button from "../../component/button/BlueOutline_Button";
import Loading from "../../component/Loading/Loading";


const Profile = (props) => {

  const state = useSelector(state => state);
  const user = state.user.user;
  const follow = state.follow.follow;

    if(!user instanceof Object){
        user = JSON.parse(user);
     }

     const dispatch = useDispatch();

    const POSTS = useSelector(state => state.post.post)
    const [peoples,setPeople] = useState([]);
    const [model,setModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const {navigation} = props;

    const[name,setName] = useState(user.name);
    const[mobile,setMobile] = useState(user.mobile);
    const[email,setEmail] = useState(user.email);

    const SaveChanges = () => {
     console.log('name',name)
    }

    const onlogOut = () => {
       logOut();
       dispatch(deleteUser());
       dispatch(deletePost());
       dispatch(deleteFollowing());
       navigation.replace("Landing");
    }

    const following = (followbyID) => {
      console.log('here')
      setLoading(true)
      setDoc(doc(collection(doc(collection(fireStore,'following'),user.userID),'userFollower'),followbyID),{}).then((resp)=>{
         setLoading(false);
         alert("Action performed successfully");
         if(follow.includes(followbyID) == false){
             dispatch(addFollowing(followbyID))
          }
      }).catch((err) => {
          setLoading(false);
          alert('Something went wrong try again')
      })
  }

  const unfollowing = (followbyID) => {
      setLoading(true)
      deleteDoc(doc(collection(doc(collection(fireStore,'following'),user.userID),'userFollower'),followbyID),{}).then((resp)=>{
         setLoading(false);
         alert("Action performed successfully");
         dispatch(deleteDOC(followbyID));

      }).catch((err) => {
          setLoading(false);
          console.log('Error => ',err)
          alert('Something went wrong try again')
      })
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
                
                });   
                
                if(resp.length > 0){
                  setPeople(resp);
                }
            }
        )();


       
    },[])

    let headerSection = (<View style={styles.container}>               
    <View style={{flexDirection:'row',marginTop:60,justifyContent:'space-evenly',alignItems:'center'}}>
          <Loading visible={loading} />
          <Modal
           visible={model}
           transparent={true}
          >
                 <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#00000099'}}>
                     <View style={styles.popupview}>
                      
                           
                           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Ionicons onPress={()=>setModal(false)} name="close" color={Colors.DESIGN} style={{alignSelf:'flex-start'}} size={35} />
                              <Ionicons onPress={SaveChanges} name="checkmark-sharp" color={Colors.DESIGN} style={{alignSelf:'flex-end'}} size={35} />
                           </View>

                           <View style={styles.topImage}>
                              <Circle_Image  width={120} url={(user.image == null) ? require('../../assets/images/no_image.jpg') : {uri:user.image}}  />
                              <Text></Text>
                           </View>

                          <View style={{paddingHorizontal:10,paddingVertical:10}}>
                             
                             <View>
                                <Text style={{fontFamily:'SAN_REG',fontSize:12}}>Name</Text>
                                <TextInput onChangeText={setName} value={name} style={styles.input} />
                             </View>

                             <View>
                                <Text style={{fontFamily:'SAN_REG',fontSize:12,marginTop:12}}>Mobile</Text>
                                <TextInput onChangeText={setMobile} value={mobile} style={styles.input} />
                             </View>

                             <View>
                                <Text style={{fontFamily:'SAN_REG',fontSize:12,marginTop:12}}>Email</Text>
                                <TextInput onChangeText={setEmail} value={email} style={styles.input} />
                             </View>

                            
                          </View>
                         
                     </View>
                 </View>
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
        <Pressable onPress={()=>{navigation.navigate("UserList")}}>
        <Text style={{fontFamily:'SAN_BOLD',color:Colors.SECONDARY}}>See all</Text>
        </Pressable>
     </View>


     <FlatList 
      data={peoples}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{width:'100%'}}
      renderItem={
        ({item}) => {
          let followStatus = follow.includes(item.id);
          return (followStatus == false) ? <PeopleRow followStatus={followStatus} onClick={()=> following(item.id)} item={item} />
          : <PeopleRow followStatus={followStatus} onClick={()=> unfollowing(item.id)} item={item} />
        }}
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