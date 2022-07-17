import { useEffect,useLayoutEffect, useState } from "react";
import { 
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Alert,
    Button
 } from "react-native";
import Input from "../component/EditField/Input";
import Colors from "../constant/Colors";
import { Ionicons } from '@expo/vector-icons'; 
import Circle_Image from '../component/Common/Circle_Image';
import Loading from '../component/Loading/Loading';
import HelperCls from '../config/HelperCls';
import Error_Msg from '../component/Alerts/Error_Msg';
import { useSelector } from "react-redux";
import {storage} from '../config/firebase';
import { getStorage, ref,uploadBytes,getDownloadURL,uploadBytesResumable  } from "firebase/storage";
import { fireStore } from "../config/firebase";
import { doc,collection,addDoc } from "firebase/firestore"; 
import { ProgressBar } from 'react-native-paper';
import Outline_Button from '../component/button/Outline_Button';
import { addPost } from "../redux/Slices/Posts";
import { useDispatch } from "react-redux";


const SavePost = (props) => {

  const [caption,setCaption] = useState(null);
  const [loading,setLoading] = useState(false);
  const [keyword,setKeyword] = useState(null);
  const [location,setLocation] = useState(null);
  const [desciption,setDescription] = useState(null);
  const [progress,setProgess] = useState(0);
  const [error_msg,Set_error_msg] = useState({status:false,message:'Something went wrong try again'});


   const {navigation,route} = props;
   let url = route.params.url;
   let user = useSelector(state => state.user.user);
   
   if(!HelperCls.validInput(url)){
    navigation.goBack();
   }

   const dispatch = useDispatch();

  
   const submitPost = async () => {

    if(HelperCls.validInput(caption))
     {
      setLoading(true);
     const storage = getStorage();
     const storageRef = ref(storage,'posts/'+user.userID+"/"+Math.random().toString(30));

      let response = await fetch(url);
      let blog = await response.blob();
     
  const result = uploadBytesResumable(storageRef, blog);
  result.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
    setProgess(progress);
  }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        setLoading(false);
        Set_error_msg({status:true,message:'Image uploading stop due to unauthorized access'});
        break;
      case 'storage/canceled':
        setLoading(false);
        Set_error_msg({status:true,message:'Image uploading canceled'});
        break;
      case 'storage/unknown':
        setLoading(false);
        Set_error_msg({status:true,message:'Something went wrong try again'});
        break;
    }
  }, 
  (sn) => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(result.snapshot.ref).then((downloadURL) => {
         let date = new Date().toISOString();

            addDoc(collection(doc(collection(fireStore,'posts'),user.userID),'userPosts'),{
              date: date,
              image: downloadURL,
              caption: caption,
              keyword:keyword,
              location:location,
              description:desciption,
            }).then((resp) => {
             setLoading(false);

             let docID = resp.id;
             let obs = {
              id:docID,
              date: date,
              image: downloadURL,
              caption: caption,
              keyword:keyword,
              location:location,
              description:desciption,
             };

             dispatch(addPost(obs));

              Alert.alert("Alert message",'Post created successfully!',[{
              text:'Ok',
              onPress: () => {navigation.replace("HomeScreen")} }])

            }).catch((e) => {
              setLoading(false);
              Set_error_msg({status:true,message:'Error: '+e});
            })
           setProgess(0);
    });
  }
);

     }
     else{
        Set_error_msg({status:true,message:'Fill all the required fields'})
     }
}



  //  useLayoutEffect(() => {

  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Ionicons onPress={() => submitPost() }
  //        name="md-checkmark-sharp" size={32}
  //         color={Colors.SECONDARY} />
  //     ),
  //   });
  // }, [navigation]);

    return ( 
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}  style={styles.container}>
            <View style={{backgroundColor:'white',flex:1}}>
            <Loading visible={loading} />
         
            <Error_Msg visible={error_msg.status} message={error_msg.message} onClick={Set_error_msg} />

           <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:Colors.BORDER_COLOR,paddingBottom:10,paddingHorizontal:10}}>
              <Circle_Image url={{uri:url}} width={80} />
              <TextInput
                onChangeText={(val) => {setCaption(val);}}
                value={caption}
                placeholder="Write a caption"
                style={styles.input}
                multiline
              />
           </View>

            <View style={{justifyContent:'center',alignItems:'center'}}>
                 <Input value={keyword} onChangeText={(val)=>{setKeyword(val)}} placeholder='Keyworld comma seperated' />
                 <Input value={location} onChangeText={(val)=>{setLocation(val)}} placeholder='Location' />
                 <Input value={desciption} onChangeText={(val)=>{setDescription(val); console.log(val)}} placeholder='Description' styles={{height:150}} />
            </View>

            <View style={{width:'80%',alignSelf:'center'}}>
                <ProgressBar progress={progress} color={Colors.SECONDARY}  style={{marginVertical:20,width:'100%'}}/>
            </View>

            <Outline_Button title="Submit" onClick={submitPost} style={{alignSelf:'center'}} />

            </View>

        </TouchableWithoutFeedback >
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    input:{
        paddingVertical:5,
        paddingHorizontal:8,
        fontFamily:'SAN_REG',
        flex:1
    }
})
 
export default SavePost;