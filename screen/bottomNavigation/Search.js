import { Ionicons } from "@expo/vector-icons";
import { useRef, useState,useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList
 } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from '../../constant/Colors';
import {fireStore} from '../../config/firebase';
import { useSelector } from "react-redux";
import { collection, getDocs,where,query } from "firebase/firestore";
import PostRow from "../../component/Posts/PostRow";
import Loading from "../../component/Loading/Loading";


const Search = (props) => {

    const {navigation} = props;
  
    const user = useSelector(state => state.user.user);
    let rf = useRef();
    const [people,setPeople] = useState([]);
    const [found,setFound] = useState(false);
    const [loading,setLoading] = useState(false);
    const [searchfilter,setSearchfilter] = useState([]);
   
    const onSearch = (query) => {
     if(query.length <= 0 ){
        setFound(false);
     }
     let result = people.filter(state => state.name.indexOf(query) >= 0);
     setFound((result.length > 0) ? false : true);
     setSearchfilter(result);
    }

   useEffect(()=>{
    (
        async () => {
            setLoading(true);
            const querySnapshot = await getDocs(collection(fireStore, "users"));
            let resp = [];
            querySnapshot.forEach((doc) => {
              if(doc.id != user.userID){
                let item = doc.data();
                item.id=doc.id;
                resp.push(item);
              }
            }); 
            
            if(resp.length > 0){
                setPeople(resp);
                setLoading(false);
            }
        }
    )();
   
},[])

const viewProfile = (userID) => {
    navigation.navigate("UserProfile",{profileID:userID});
}


    return ( 
        <TouchableWithoutFeedback style={styles.container}  onPress={()=>{Keyboard.dismiss()}}>
        <SafeAreaView style={styles.container}>
            <Loading visible={loading} />
            <View style={styles.input}>
              <Ionicons name="search" size={26} color="#707070" />
              <TextInput ref={rf} onChangeText={(text)=>onSearch(text)} placeholder="Search" style={styles.serachINput} />
            </View>

            {
                found == true &&
            <Text style={{alignSelf:'center',fontFamily:'SAN_BOLD',marginTop:50}}>No result found</Text>        
            }

            <FlatList 
                 style={{flex:1,width:'100%',backgroundColor:'white'}}
                 numColumns={3}
                 showsVerticalScrollIndicator={false}
                 horizontal={false}
                 data={ ((searchfilter.length > 0 && found == false) || (found == true)) ? searchfilter : people}
                 renderItem={
                    ({item}) => <PostRow onClick={() => viewProfile(item.id)} item={item} /> }
                 keyExtractor={item => item.id}
                />

        </SafeAreaView>
        </TouchableWithoutFeedback>
     );
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:Colors.BORDER_BACK_COLOR,
        },
        input:{
           width:'95%',
           height:40,
           backgroundColor:Colors.BORDER_COLOR,
           borderRadius:20,
           marginVertical:10,
           alignSelf:'center',
           justifyContent:'center',
           paddingHorizontal:10,
           alignItems:'center',
           flexDirection:'row'
        },
        serachINput:{
            width:'90%',
            height:40,
            paddingVertical:4,
            paddingLeft:5,
            color:'#707070',
            fontFamily:'SAN_REG'
        }
    }
)
 
export default Search;