import { 
    View,
    Text,
    StyleSheet
 } from "react-native";
 import {useSelector} from 'react-redux';
 import PagerView from 'react-native-pager-view';
 import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constant/Colors";
import HomePostRow from "../../component/Posts/HomePostRow";

const Favorite = () => {

    const fav = useSelector(state => state.fav.fav);

    return ( 
        <SafeAreaView style={styles.container}>
            <PagerView style={styles.viewPager} initialPage={0}>

             {
                fav.map((item,index) => {
                    return (
                 <View style={styles.page} key={index}>
                    <View style={styles.designView}>
                    <HomePostRow static={true} key={index} item={item} />
                    </View>
                </View> 
                        
                    )
                })
             }

                {/* <View style={styles.page} key="1">
                    <View style={styles.designView}>
                      <Text>First page</Text>
                      <Text>Swipe ➡️</Text>
                    </View>
                </View> */}

            </PagerView>
        </SafeAreaView>
     );
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:'white'
        },
        viewPager: {
            flex: 1,
            padding:20,
          },
        page: {
            justifyContent:'center',
          },
          designView:{
            width:'90%',
            height:'90%',
            alignSelf:'center',
            backgroundColor:'white',
            margin:15,
            borderRadius:10,
            elevation:6
          }
    }
)
 
export default Favorite;