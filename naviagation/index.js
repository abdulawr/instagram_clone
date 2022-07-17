import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';



export default function Index(props) {

  const[loading,setLoading] = useState(true);

  const loadFonts = async () => {
    await Font.loadAsync({
      SAN_REG: require('../assets/fonts/San_Reg.ttf'),
      SAN_ITALIC: require('../assets/fonts/San_Italic.ttf'),
      SAN_BOLD: require('../assets/fonts/San_Bold.ttf'),
      SAN_MED: require('../assets/fonts/San_Medium.ttf'),
      SAN_TITLE: require('../assets/fonts/Lobster.ttf'),
    });
  }

  useEffect(()=>{

    if(loading == true){
      SplashScreen.preventAutoHideAsync();

      loadFonts().then((res)=>{
        setLoading(false)
       }).catch(()=>{
        setLoading(true);
       });
    }
    else{
      SplashScreen.hideAsync();
    }

  },[])


  if(loading == true){
    return null;
  }
  else{
    SplashScreen.hideAsync();
     return <Navigation />
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
