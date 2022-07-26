import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from "../screen/Landing";
import Register_Screen from "../screen/User_Account/Register_Screen";
import Login_Screen from "../screen/User_Account/Login_Screen";
import Home_Screen from '../screen/HomeScreen/Home_Screen';
import index from './index';
import Startup from "../screen/Startup/Startup";
import { useSelector } from "react-redux";
import NewPost from "../screen/bottomNavigation/NewPost";
import SavePost from "../screen/SavePost";
import UserProfile from "../screen/UserProfile";
import UserList from "../screen/UserList";
import MessageView from "../screen/MessageView";


const Navigation = (props) => {

    const Stack = createNativeStackNavigator();
    const user = useSelector(state => state.user.user);
   
    if(user === undefined){
      return(
         <NavigationContainer>
             <Stack.Navigator initialRouteName="Startup">

                <Stack.Screen options={{headerShown:false}} name="Startup" component={Startup} />
                <Stack.Screen options={{headerShown:false}} name="Landing" component={Landing} />
                <Stack.Screen options={{headerShown:false}} name="DefaultPage" component={index} />
                <Stack.Screen options={{headerShown:false}} name="Register" component={Register_Screen} />
                <Stack.Screen options={{headerShown:false}} name="Login" component={Login_Screen} />
                <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={Home_Screen} />

             </Stack.Navigator>
        </NavigationContainer>
      )
    }
    else{
      return(
         <NavigationContainer>
         <Stack.Navigator initialRouteName="Startup">

            <Stack.Screen options={{headerShown:true,title:"Discover people",headerTitleStyle: { fontFamily:'SAN_BOLD' },
             headerShadowVisible: false,}} name="UserList" component={UserList} />
            <Stack.Screen options={{headerShown:false}} name="Startup" component={Startup} />
            <Stack.Screen options={{headerShadowVisible:false}} name="MessageView" component={MessageView} />
            <Stack.Screen options={{headerShown:false}} name="UserProfile" component={UserProfile} />
            <Stack.Screen options={{headerShown:false}} name="Landing" component={Landing} />
            <Stack.Screen options={{headerShown:false}} name="DefaultPage" component={index} />
            <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={Home_Screen} />
            <Stack.Screen options={{headerShown:false}} name="NewPost" component={NewPost} />
            <Stack.Screen options={{title:'New Post',  headerTitleStyle: { fontFamily:'SAN_BOLD' },
             headerShadowVisible: false,
             }} name="SavePost" component={SavePost} />


         </Stack.Navigator>
    </NavigationContainer>
      )
    }
}
 
export default Navigation;