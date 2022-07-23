import {
     View,
     Text,
     Button,
     StyleSheet,
     Image
     } from "react-native";
import {logOut,autoLogout} from '../../config/Functions';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../bottomNavigation/Home';
import Search from '../bottomNavigation/Search';
import Profile from '../bottomNavigation/Profile';
import Favorite from '../bottomNavigation/Favorite';
import NewPost from '../bottomNavigation/NewPost';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons'; 
import Circle_imag from '../../component/Common/Circle_Image';
import { useSelector } from "react-redux";

const Home_Screen = (props) => { 

     const {navigation} = props;
     let state = useSelector(state => state.user.user);
     if(!state instanceof Object){
        state = JSON.parse(state);
     }
   
   // let email = user.email,mobile=user.mobile,name=user.name,userID=user.userID;
    // console.log("Email: "+email+"\n"+"Name: "+name+"\n"+"Mobile: "+mobile+"\n"+"Email: "+userID+"\n"+userID)

   const Logout = () => {
    logOut();
    dispatch(deleteUser()); 
    navigation.replace("Login");
   }

   const Tab = createMaterialBottomTabNavigator();

    return ( 
            <Tab.Navigator 
              initialRouteName="Tab_Home"
              barStyle={{ backgroundColor: 'white'}} 
              activeColor="#000000"
              labeled={false}
              inactiveColor="#707070">

                <Tab.Screen name="Tab_Home" options={{
                      tabBarIcon: (ob) => (
                      <MaterialCommunityIcons name={(ob.focused == true) ? 'home-variant' : 'home-variant-outline'} color={ob.color} size={26} />
                      ),}}  component={Home} />

                <Tab.Screen name="Tab_Search" options={{
                      tabBarIcon: (ob) => (
                      <Ionicons name={(ob.focused == true) ? 'md-search-sharp' : 'md-search-outline'}  color={ob.color} size={26} />
                      ),}} component={Search} />

                <Tab.Screen name="Tab_NewPost" options={{
                      tabBarIcon: (ob) => (
                      <MaterialCommunityIcons name={(ob.focused == true) ? 'plus-box' : 'plus-box-outline'} color={ob.color} size={26} />
                      ),}}

                      listeners={{
                        tabPress: e => {
                          e.preventDefault();
                          navigation.navigate('NewPost')
                        },
                      }}
                      
                      component={NewPost} />

                <Tab.Screen name="Tab_Favorite" options={{
                      tabBarIcon: (ob) => (
                      <MaterialCommunityIcons name={(ob.focused == true) ? 'cards-heart' : 'cards-heart-outline'} color={ob.color} size={26} />
                      ),}} component={Favorite} />
               
                <Tab.Screen name="Tab_Profile" options={{
                      headerShown:true,
                      headerShadowVisible: false,
                      tabBarIcon: ({ color }) => (
                        <Circle_imag width={28} url={(state.image != null && state.image != 'null') ? {uri:state.image} : {uri:'https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc'}} />
                      ),}} component={Profile} />

            </Tab.Navigator>
     );
     
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    }
})
 
export default Home_Screen;