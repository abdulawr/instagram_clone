import React, { useReducer,useState,useRef, useEffect } from "react";
import {
View,
Text,
StyleSheet,
Dimensions,
Keyboard,
TouchableWithoutFeedback,
Pressable,
TextInput,
Modal
} from 'react-native';
import Back_Button from "../../component/button/Back_Button";
import Loading from "../../component/Loading/Loading";
import Success_Msg from "../../component/Alerts/Sucess_Msg";
import Error_Msg from "../../component/Alerts/Error_Msg";
import HelperCls from "../../config/HelperCls";
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import Colors from "../../constant/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Containers from "../../component/Common/Container";
import Input from "../../component/EditField/Input";
import { autoLogout } from "../../config/Functions";
import { fireStore } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import User_thk from "../../redux/Action_Thunk/User_thk";
import { useDispatch } from "react-redux";


const Login_Screen = (props) => {

  const {navigation} = props;

  //console.log(auth.currentUser) // user already login
 // auth.signOut() // signout
 // AsyncStorage.clear()

 const dispatchRed = useDispatch();

    const initalState = {
        email:'',
        password:''
    };

    const reducer = (state=initalState,action)=>{
      switch(action.type){
         case 'email': return {...state,email:action.data}; break;
         case 'password': return {...state,password:action.data};break;
         default: return state;
      }
      return state;
    }


   const [state,dispatch] = useReducer(reducer,initalState);
   const [visiblePassword,setVisablePassword] = useState(false);
   const [modelVisiable,setModelVisable] = useState(false);
   const [forgotPassword,setforgotPassword] = useState('');

   // ---------------- Loading & messages start ----------------------------
   const [loading,setLoading] = useState(false);
   const [success_msg,Set_success_msg] = useState({status:false,message:'Action perform successfully!!'});
   const [error_msg,Set_error_msg] = useState({status:false,message:'Something went wrong try again'});
  // ---------------- Loading & messages end -------------------------------

  const onVisiable = ()=>{
    setVisablePassword((visiblePassword == true)?false:true);
  }

  const forgotPasswrordMail = () => {
    if(HelperCls.validInput(forgotPassword) && HelperCls.validateEmail(forgotPassword)){
      setLoading(true);
      const auth = getAuth();
      sendPasswordResetEmail(auth, forgotPassword)
        .then(() => {
          setLoading(false);
          setforgotPassword('');
          Set_success_msg({status:true,message:'Email has been sent to you.'})
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          console.log("Error: "+errorMessage);
        });
    }
    else{
      Set_error_msg({status:true,message:"Invalid email address"}); 
    }
  }

   const rf1 = useRef();
   const rf2 = useRef();

   const LoginUser = async () =>{
     const{email,password} = state;

     if(HelperCls.validInput(email) && HelperCls.validInput(password)){
       setLoading(true);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;
            var exp_date = new Date(new Date().getTime() + parseInt(user.stsTokenManager.expirationTime) * 1000)

            const docRef = doc(fireStore, "users", user.uid);
            getDoc(docRef).then((resp)=>{

              let json = resp.data();
              autoLogout(parseInt(user.stsTokenManager.expirationTime) * 1000);
              json = {...json,expDate:exp_date.toISOString(), token:user.stsTokenManager.accessToken,userID:user.uid};
              json = JSON.stringify(json);
              AsyncStorage.setItem('userData',json);

               dispatchRed(User_thk({'data':json})).then((res)=>{
                navigation.replace("HomeScreen");
               });
               // dispatch(addUser(json));

             }).catch((er)=>{
                auth.signOut()
                setLoading(false);
                Set_error_msg({status:true,message:"Data not loaded try again later"}); 
             });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            Set_error_msg({status:true,message:"Invalid email or password!"}); 
        });
     }
     else{
       setLoading(false);
       Set_error_msg({status:true,message:'Fill the form correctly!'}); 
     }

   }
 

    return ( 
        <TouchableWithoutFeedback style={styles.container} onPress={()=>{Keyboard.dismiss()}}  >
        <Containers style={styles.container}>

        <Modal
         visible={modelVisiable}
         transparent
        >
          <View style={styles.modelContainer}>
               <View style={styles.modeSubContainer}>
                   <Ionicons onPress={() => {setModelVisable(false)} } style={{alignSelf:'flex-end',paddingTop:5,paddingRight:5}} name="close" size={30} color="red" />
                    <Text style={{paddingLeft:15,fontFamily:'SAN_REG',fontWeight:'bold'}}>Enter email address</Text>
                    <Input 
                      keyboardType='email-address'
                      onChangeText={(text)=>{setforgotPassword(text)}}
                      value={forgotPassword}
                      styles={{width:'90%',alignSelf:'center'}}
                      placeholder="Email..." />

                      <Back_Button onClick={forgotPasswrordMail} title="Submit" style={{alignSelf:'center',marginTop:20}} />
               </View>
          </View>
        </Modal>
        
        {/* // ---------------- Loading & messages start ---------------------------- */}
          <Loading visible={loading}  />
          <Success_Msg visible={success_msg.status} message={success_msg.message} onClick={Set_success_msg} />
          <Error_Msg visible={error_msg.status} message={error_msg.message} onClick={Set_error_msg} />
        {/* // ---------------- Loading & messages end ------------------------------ */}

       {/* Top Section Start */}
          <View style={styles.topDesign}>
             <Text style={styles.instagrm}>Instagram</Text>  

          <Input 
        
           keyboardType='email-address'
           onChangeText={(text)=>{dispatch({type:'email',data:text})}}
           value={state.nm}
           placeholder="Email or username" />

          <View style={styles.iconsInput}>

              <TextInput 
              placeholderTextColor='#d3d3d3'
              ref={rf2}
              style={{width:'93%'}}
              secureTextEntry={(visiblePassword == false)?true:false}
              onChangeText={(text)=>{dispatch({type:'password',data:text})}}
              value={state.nm}
              placeholder="Password" />

              <Pressable onPress={onVisiable}>
              <Ionicons name={(visiblePassword == false) ? "eye-off" : "eye"}  size={24} color={(visiblePassword == false) ? Colors.BORDER_COLOR : Colors.SECONDARY} />
              </Pressable>

          </View>

           <Back_Button onClick={LoginUser} title="Login" style={{width:Dimensions.get('window').width - 50,marginTop:20}} font="bold"/>

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>
              <Text style={styles.bottomText}>Forgot your login details? </Text>
              <Pressable onPress={()=>{setModelVisable(true)}}>
                <Text style={{fontWeight:'bold',marginLeft:5,color:Colors.SECONDARY}}>Get help logging in.</Text>
              </Pressable>
          </View>

          <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
               <View style={{width:'40%',height:1.5,backgroundColor:Colors.BORDER_COLOR}}></View>
               <Text style={{paddingHorizontal:8}}>OR</Text>
               <View style={{width:'40%',height:1.5,backgroundColor:Colors.BORDER_COLOR}}></View>
          </View>

          <View style={{marginTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Ionicons name="logo-facebook" size={24} color={Colors.SECONDARY} />
              <Pressable onPress={()=>{navigation.navigate("Register")}}>
                <Text style={{fontWeight:'bold',marginLeft:5,color:Colors.SECONDARY,textAlignVertical:'center'}}>Get help logging in.</Text>
              </Pressable>
          </View>

          </View>
        {/* Top Section End */}

        {/* Bottom Section Start */}
          <View style={styles.bottomDesign}> 
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.bottomText}>Don`t have an account?</Text>
              <Pressable onPress={()=>{navigation.navigate("Register")}}>
                <Text style={{fontWeight:'bold',marginLeft:5,color:Colors.SECONDARY}}>Sign up.</Text>
              </Pressable>
          </View>
          </View>
          {/* Bottom Section End */}

        </Containers>
        </TouchableWithoutFeedback>
     );
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white'
        },
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
        iconsInput:{
           flexDirection:'row',
           width: Dimensions.get('window').width - 50,
           borderColor: Colors.BORDER_COLOR,
           height: Dimensions.get('window').width * 0.13,
           alignItems:'center',
           borderWidth:1,
           paddingHorizontal:15,
           marginTop:12,
           borderRadius:  5,
        },
        instagrm:{
          fontSize:40,
          marginBottom:20,
          color:'#000000',
          fontFamily:'SAN_TITLE',
          fontWeight:'400'
         },
         topDesign:{
           flex:13.5,
           backgroundColor:'white',
           justifyContent:'center',
           alignItems:'center'
         },
         bottomDesign:{
           flex:1,
           backgroundColor:'white',
           width:'100%',
           height:100,
           borderTopWidth:1,
           borderTopColor:Colors.BORDER_COLOR,
           justifyContent:'center'
         },
         bottomText:{
           alignSelf:'center',
           fontSize:12,
           fontFamily:'SAN_REG',
           color:Colors.TEXT_COLOR
         },
         modelContainer:{
          flex:1,
          backgroundColor:'#00000099',
          justifyContent:'center',
          alignItems:'center'
        },
        modeSubContainer:{
          width:'80%',
          height:230,
          backgroundColor:'white',
          borderRadius:10,
          elevation:5
        }
       
    }
)
 
export default Login_Screen;