import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl
 } from "react-native";
import { collection, query, where, getDocs,doc,getDoc } from "firebase/firestore";
import { fireStore } from "../../config/firebase";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Loading from "../../component/Loading/Loading";
import { useState } from "react";
import { randomArrayShuffle } from "../../config/Functions";
import { SafeAreaView } from "react-native-safe-area-context";
import HomePostRow from "../../component/Posts/HomePostRow";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Colors from "../../constant/Colors";
import { addFav } from "../../redux/Slices/Favourite";


const Home = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [loading,setLoading] = useState(false);
    const [posts,setPost] = useState([]);
    const user = state.user.user;
    const follow = state.follow.follow;
    const [refreshing, setRefreshing] = useState(false);
    const fav = state.fav.fav;
    const [favs,setFavs] = useState([]);

    const sizes = [300,350,400,450,500,550];

    const makeApiCall = async () => {
        let postsData = [];
        setLoading(true);
        for(var uid of follow){
            const docRef = doc(fireStore, "users",uid);
             await getDoc(docRef).then(async (result) => {
               const userData = result.data();
                const docSnap = await getDocs(collection(doc(collection(fireStore,'posts'),uid),'userPosts'));
                docSnap.forEach((doc) => {
                    let x = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
                    let height = sizes[x];

                    let item = doc.data();
                    item.id = doc.id;
                    item.u_id = uid;
                    item.u_name = userData.name;
                    item.u_image = userData.image;
                    item.height = height;
                    postsData.push(item);
                });

            })
        }
            setLoading(false);
            setRefreshing(false);
            if(postsData.length > 0) {
                setPost(randomArrayShuffle(postsData));
            }
    }

    useEffect(()=>{
       makeApiCall();

       const f_array = [];
       fav.forEach(item => {
            f_array.push(item.id);
       });

       setFavs(f_array);

    },[])
    console.log(favs)
    const addToFavourite = (item) => {
      if(favs.includes(item.id)){
        let newAR = fav.map((s_item) => {
            if(s_item.id != item.id){
                return item;
            }
            else{
                setFavs(favs.filter(its => its != item.id));
            }
        });
       dispatch(addFav(newAR));
      }
      else{
        setFavs([...favs,item.id]);
        dispatch(addFav(item));
      }
    }


    return ( 
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Loading visible={loading} />
          
            <View style={{width:'100%',padding:5,paddingHorizontal:8,flexDirection:'row',justifyContent:'space-between',borderBottomWidth:2,borderBottomColor:Colors.BORDER_BACK_COLOR}}>
                <Text style={{fontSize:25,fontFamily:'SAN_TITLE',color:'#2E2E2E'}}>Instagram</Text>
                <MaterialCommunityIcons name="facebook-messenger" color='#2E2E2E' style={{alignSelf:'center'}} size={25} />
            </View>

            <FlatList 
               refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {makeApiCall();}}
                />
              }
              horizontal={false}
              showsVerticalScrollIndicator={false}
              style={{width:'100%'}}
              data={posts}
              extraData={favs}
              renderItem = {({item}) => {
                return <HomePostRow static={false} fav={favs.includes(item.id)} onfavouriteClick={()=>addToFavourite(item)} item={item} />
              }}
              keyExtractor={item => item.id}
            />
        </SafeAreaView>
     );
}
 
export default Home;