import React, { useReducer,useState,useRef, useEffect } from "react";
import {
View,
Text,
StyleSheet,
TextInput,
Dimensions,
KeyboardAvoidingView,
Keyboard,
Button,
Pressable,
TouchableHighlight,
TouchableWithoutFeedback,
ScrollView
} from 'react-native';
import {StatusBar} from 'react-native';
import Outline_Button from "../../component/button/Outline_Button";
import Loading from "../../component/Loading/Loading";
import Success_Msg from "../../component/Alerts/Sucess_Msg";
import Error_Msg from "../../component/Alerts/Error_Msg";
import HelperCls from "../../config/HelperCls";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Colors from "../../constant/Colors";
import Input from "../../component/EditField/Input";
import Containers from "../../component/Common/Container";
import { fireStore } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore"; 


const Register_Screen = (props) => {

  const {navigation} = props;

    const initalState = {
        name:'',
        email:'',
        mobile:'',
        password:''
    };

    const reducer = (state=initalState,action)=>{
      switch(action.type){
         case 'name': return {...state,name:action.data}; break;
         case 'email': return {...state,email:action.data}; break;
         case 'mobile': return {...state,mobile:action.data}; break;
         case 'password': return {...state,password:action.data};break;
         default: return state;
      }
      return state;
    }


   const [state,dispatch] = useReducer(reducer,initalState);

   // ---------------- Loading & messages start ----------------------------
   const [loading,setLoading] = useState(false);
   const [success_msg,Set_success_msg] = useState({status:false,message:'Action perform successfully!!'});
   const [error_msg,Set_error_msg] = useState({status:false,message:'Something went wrong try again'});
  // ---------------- Loading & messages end -------------------------------

   let rf1 = useRef();
   let rf2 = useRef();
   let rf3 = useRef();
   let rf4 = useRef();

  const RegisterUser = () => {
   // rf1.current.clear()
  let {name,email,mobile,password} = state;

  if(HelperCls.validInput(name) && HelperCls.validInput(email) && HelperCls.validInput(mobile) && HelperCls.validInput(password)){
    if(HelperCls.validateEmail(email)){
     
    if(password.length >= 6){
       
      setLoading(true);
      
       // ************ Firebase auth (Email,Password)
       const auth = getAuth();
       createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             // Store use information in the firebase realtime database START****

              try {
               setDoc(doc(fireStore, "users", userCredential.user.uid),{
                  name: name,
                  email: email,
                  mobile: mobile,
                  image:'null',
                }).then((resp) => {
                  setLoading(false);
                  Set_success_msg({...state,status:true,message:'Account created successufully'});
                  setTimeout(() => {
                    navigation.replace("Login");
                  }, 2000);
                
                }).catch((exp)=>{
                  setLoading(false);
                  Set_error_msg({...error_msg,status:true,message:'Error occured while adding user data!'});
                });
               
            } catch (e) {
              setLoading(false);
              Set_error_msg({...error_msg,status:true,message:'Something went wrong try again'});
            }

              // Store use information in the firebase realtime database END****  
         })
         .catch((error) => {
           console.log(error)
           setLoading(false);
           Set_error_msg({...error_msg,status:true,message:'Account exist with this email!'});
         });
    }
    else{
      setLoading(false);
      Set_error_msg({...error_msg,status:true,message:'Password must be at least 6 character! Password must be at least 6 character!'});
    }

      }
      else{
        setLoading(false);
        Set_error_msg({...error_msg,status:true,message:'Enter valid email address'});
      }

     }
     else{
      setLoading(false);
       Set_error_msg({...error_msg,status:true,message:'Fill the form correctly'});
     }
    }

    return ( 
        <TouchableWithoutFeedback style={styles.container} onPress={()=>{Keyboard.dismiss()}}  >
        <Containers style={styles.container}>
        
        {/* // ---------------- Loading & messages start ---------------------------- */}
          <Loading visible={loading}  />
          <Success_Msg visible={success_msg.status} message={success_msg.message} onClick={Set_success_msg} />
          <Error_Msg visible={error_msg.status} message={error_msg.message} onClick={Set_error_msg} />
        {/* // ---------------- Loading & messages end ------------------------------ */}


 {/* Top Section Start */}
 <View style={styles.topDesign}>
        <Text style={styles.instagrm}>Instagram</Text>  

          <Input
           ref={rf1}
           value={state.nm}
           onChangeText={(text)=>{dispatch({type:'name',data:text})}}
           placeholder="Name" />

          <Input 
           ref={rf2}
           keyboardType='email-address'
           onChangeText={(text)=>{dispatch({type:'email',data:text})}}
           value={state.nm}
           placeholder="Email" />

          <Input 
           ref={rf3}
           maxLength={11}
           keyboardType='number-pad'
           onChangeText={(text)=>{dispatch({type:'mobile',data:text})}}
           value={state.nm}
           placeholder="Mobile" />

          <Input 
           ref={rf4}
           secureTextEntry={true}
           onChangeText={(text)=>{dispatch({type:'password',data:text})}}
           value={state.nm}
           placeholder="Password" />


           <Outline_Button onClick={RegisterUser} title="Sign up" style={{width:Dimensions.get('window').width - 50,marginTop:20}} font="bold"/>

          </View>
        {/* Top Section End */}

        {/* Bottom Section Start */}
          <View style={styles.bottomDesign}> 
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.bottomText}>Already have an account?</Text>
              <Pressable onPress={()=>{navigation.navigate("Login")}}>
                <Text style={{fontWeight:'bold',marginLeft:5,color:Colors.SECONDARY}}>Log in.</Text>
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
        instagrm:{
          fontSize:40,
          marginBottom:10,
          color:'#000000',
          alignSelf:'center',
          fontFamily:'SAN_TITLE',
          fontWeight:'400'
         },
        text:{
            marginTop:20,
        },
        top:{
          flex:1.4,
          width:'100%'
        },
        bottom:{
          flex:4,
          backgroundColor:Colors.DESIGN,
          borderTopLeftRadius:100,
          borderTopRightRadius:100,
          elevation:5,
          width:'100%',
          justifyContent:'flex-end',
          paddingTop:25,
         
        },
        inputContainer:{
         alignItems:'center'
        },
        topslide:{
          width:'60%',
          backgroundColor:Colors.LG_BLUE,
          height:'85%',
          borderBottomRightRadius:300
        },
        back_rows:{
          flexDirection:'row',
          marginTop:StatusBar.currentHeight,
          alignItems:'center'
        },
        icon:{
          marginRight:4,
          marginLeft:12
        },
        pageHeading:{
          color:'white',
          fontFamily:'SAN_BOLD',
          marginLeft:12,
          marginTop:10,
          fontSize:25,
        },
        design:{
          width:180,
          height:180,
          marginTop:10,
          borderRadius:90,
          backgroundColor:Colors.LG_BLUE,
          
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
        }
    }
)
 
export default Register_Screen;