import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from './firebase';

let timer;

export function autoLogout(expTime,navigation){
    timer = setTimeout(()=>{
        logOut();
        alert("Session expired!");
        navigation.replace("Landing");
        console.log("=================> Auto Logout")
    },expTime);
 }

 export function logOut(){
  clearTimer();
  AsyncStorage.clear();
  auth.signOut();
 }

 export function clearTimer(){
    if(timer){
      clearTimeout(timer)
    }

 }

 export function randomArrayShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}