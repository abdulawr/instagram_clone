import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { useEffect, useState } from 'react';
import { collection, getDocs,where,query } from "firebase/firestore";
import { fireStore } from "../config/firebase";
import PeopleRow from '../component/Posts/PeopleRow';
import { useSelector,useDispatch} from 'react-redux';
import UserRow from '../component/Posts/UserRow';
import { doc,addDoc,setDoc,deleteDoc } from "firebase/firestore"; 
import Loading from '../component/Loading/Loading';
import { addFollowing,deleteDOC } from '../redux/Slices/Following';


const UserList = () => {

    const [people,setPeople] = useState([]);
    const [loading,setLoading] = useState(false);
    const state = useSelector(state => state);
    const user = state.user.user;
    const follow = state.follow.follow;

    const dispatch = useDispatch();

    const following = (followbyID) => {
        setLoading(true)
        setDoc(doc(collection(doc(collection(fireStore,'following'),user.userID),'userFollower'),followbyID),{}).then((resp)=>{
           setLoading(false);
           alert("Action performed successfully");
           if(follow.includes(followbyID) == false){
               dispatch(addFollowing(followbyID))
            }
        }).catch((err) => {
            setLoading(false);
            alert('Something went wrong try again')
        })
    }

    const unfollowing = (followbyID) => {
        setLoading(true)
        deleteDoc(doc(collection(doc(collection(fireStore,'following'),user.userID),'userFollower'),followbyID),{}).then((resp)=>{
           setLoading(false);
           alert("Action performed successfully");
           dispatch(deleteDOC(followbyID));

        }).catch((err) => {
            setLoading(false);
            console.log('Error => ',err)
            alert('Something went wrong try again')
        })
    }


    useEffect(() => {
        (
        async () => {
            const querySnapshot = await getDocs(collection(fireStore, "users"));
            let resp = [];
            querySnapshot.forEach((doc) => {
              if(doc.id != user.userID){
                let item = doc.data();
                resp.push(
                    {
                        id:doc.id,
                        name:item.name,
                        image:item.image,
                        email:item.email,
                        mobile:item.mobile
                    }
                );
              }
            
            });   
            
            if(resp.length > 0){
              setPeople(resp);
            }

        }
    )();

    }, []);
    

    return ( 
        <View style={styles.container}>
            <Loading visible={loading} />
            <FlatList 
            data={people}
            numColumns={2}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            style={{width:'100%'}}
            renderItem={
                ({item}) => { 
                    let followStatus = follow.includes(item.id);
                    return (followStatus == false) ? <UserRow followStatus={followStatus} onClick={()=> following(item.id)} item={item} />
                    : <UserRow followStatus={followStatus} onClick={()=> unfollowing(item.id)} item={item} />
                }}
            />
        </View>
     );
}
 
const styles = StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:'white'
 }
});

export default UserList;