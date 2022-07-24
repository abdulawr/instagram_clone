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
import { useSelector } from "react-redux";
import Loading from "../../component/Loading/Loading";
import { useState } from "react";
import { randomArrayShuffle } from "../../config/Functions";
import { SafeAreaView } from "react-native-safe-area-context";
import HomePostRow from "../../component/Posts/HomePostRow";


const Home = () => {

    const state = useSelector(state => state);
    const [loading,setLoading] = useState(false);
    const [posts,setPost] = useState([]);
    const user = state.user.user;
    const follow = state.follow.follow;
    const [refreshing, setRefreshing] = useState(false);

    const makeApiCall = async () => {
        let postsData = [];
        setLoading(true);
        for(var uid of follow){
            const docRef = doc(fireStore, "users",uid);
             await getDoc(docRef).then(async (result) => {
               const userData = result.data();
                const docSnap = await getDocs(collection(doc(collection(fireStore,'posts'),uid),'userPosts'));
                docSnap.forEach((doc) => {
                    let item = doc.data();
                    item.id = doc.id;
                    item.u_id = uid;
                    item.u_name = userData.name;
                    item.u_image = userData.image;
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
    },[])

    return ( 
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Loading visible={loading} />
            
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
              renderItem = {({item}) => {
                console.log(item);
                return <HomePostRow item={item} />
              }}
              keyExtractor={item => item.id}
            />
        </SafeAreaView>
     );
}
 
export default Home;