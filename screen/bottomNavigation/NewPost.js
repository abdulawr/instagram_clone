import React, { useState, useEffect,useRef, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button,Platform,Image,Animated, Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import Outline_Button from '../../component/button/Outline_Button';
import { useSelector,useDispatch } from 'react-redux';
import { addPost } from '../../redux/Slices/Posts';


export default function NewPost(props) {

  const {navigation} = props;

  const [hasCamerPermission, setHasCamerPermission] = useState(null);
  const [hasGallaryPermission, setHasGallaryPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash,setFlashmode] = useState(Camera.Constants.FlashMode.auto);
  const [image, setImage] = useState(null);

  const fadeImage = useRef(new Animated.Value(0)).current;
  const rotateImg = useRef(new Animated.Value(0)).current;
  let camera = useRef();

    const spin = rotateImg.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const state = useSelector(state => state.post);
    console.log(state)

   const toggleTorch = () => 
    {
        setFlashmode(Camera.Constants.FlashMode.torch);
        if (flash == Camera.Constants.FlashMode.off || flash == Camera.Constants.FlashMode.auto ){
          setFlashmode(Camera.Constants.FlashMode.torch);
        } else {
            setFlashmode(Camera.Constants.FlashMode.off);
        }
    }

    const startAnimation = () => {
      Animated.timing(fadeImage,{toValue:1,duration:3000,useNativeDriver:true}).start();
      Animated.timing(rotateImg,{toValue:1,duration:2000,useNativeDriver:true}).start();
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    
      if (!result.cancelled) {
        setImage(result.uri);
        startAnimation();
      }
    };

    const captureImage = async () => {
       if(camera){
         camera.takePictureAsync().then((res)=>{
          startAnimation();
          setImage(res.uri);
         })
       }
    }

    const submitImage = () => {
      navigation.navigate("SavePost",{url:image});
    }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCamerPermission(status === 'granted');

      const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGallaryPermission(result.status === 'granted');
      
    })();
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
       setImage(null);
       setType(CameraType.back);
    });

    return unsubscribe;
  }, [navigation]);

  if (hasCamerPermission === null || hasGallaryPermission === false) {
    return <View />;
  }

  if (hasCamerPermission === false || hasGallaryPermission === false) {
    return <Text>No access to camera and Gallary</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera 
       style={styles.camera}
       type={type}
       autoFocus={true}
       flashMode={flash}
       ratio={[1,1]}
        ref={(r) => {
        camera = r
        }}
       >

      <View style={styles.sideContainer}>

        <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialCommunityIcons onPress={()=>{setType(type === CameraType.back ? CameraType.front : CameraType.back);}} name="rotate-3d-variant" size={29} color="white" />
            <Text style={{color:'white',fontFamily:'SAN_REG',marginLeft:3}}>Flip</Text>
        </View>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
            <MaterialCommunityIcons onPress={toggleTorch} name={(flash == Camera.Constants.FlashMode.off) ? 'flash-off' : 'flash'} size={29} color="white" />
            <Text style={{color:'white',fontFamily:'SAN_REG',marginLeft:3}}>{(flash == Camera.Constants.FlashMode.off) ? 'Off' : 'On'}</Text>
        </View>
        
      </View>

      { (image != null) &&
      <TouchableOpacity style={styles.submited} onPress={submitImage}>
        <MaterialCommunityIcons name='check' size={40} color="white" />
      </TouchableOpacity>
     }
     
      { (image != null) &&
      <TouchableOpacity style={styles.cancelled} onPress={()=>{setImage(null)}}>
         <MaterialCommunityIcons name='close' size={40} color="white" />
      </TouchableOpacity>
     }

      </Camera>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
               <Outline_Button title="Gallery" onClick={pickImage} />
               <Outline_Button title="Capture" onClick={captureImage} style={{marginLeft:10}} />
          </View>

          <View style={styles.ImgsView}>
            {
              (image != null) &&  <Animated.Image source={{uri:image}}  style={[styles.imageStyle,{opacity:fadeImage,transform:[{rotate:spin}]}]} />
            }
          </View>
          
        </View>

    </View>
  );
}

const styles = StyleSheet.create({ 
   container:{
    flex:1
   },
   camera:{
    flex:1,
    justifyContent:'center'
   },
   buttonContainer:{
    flex:1,
   },
   sideContainer:{
      flexDirection:'column',
      paddingLeft:9,
   },
   buttonRow:{
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#FBFBFB',
    paddingVertical:8,
    position:'absolute',
    bottom:16,
    width:'100%'
   },
   imageStyle:{
    width:'90%',
    height:'80%',
    alignSelf:'center',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#2196f3'
   },
   ImgsView:{
    justifyContent:'center',
   },
   submited:{
    alignSelf:'flex-end',
    position:'absolute',
    top:45,
    right:5,
    padding:5,
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
   },
   cancelled:{
    alignSelf:'flex-end',
    position:'absolute',
    top:45,
    left:5,
    padding:5,
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
   }
}); 