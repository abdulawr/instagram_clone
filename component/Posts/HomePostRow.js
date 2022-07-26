import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import {
View,
Text,
StyleSheet,
Image
} from 'react-native';
import Colors from '../../constant/Colors';
import Circle_Image from '../Common/Circle_Image';
import { Feather } from '@expo/vector-icons'; 


const HomePostRow = (props) => {

    const {item} = props;
    const staticType = props.static;
    const height = (staticType == true) ? '95%' : item.height;

    return ( 
        <View style={styles.container}>
            <View style={styles.topSection}>
               <Circle_Image  width={40} url={(item.u_image == null) ? require('../../assets/images/no_image.jpg') : {uri:item.u_image}}  />
               <View>
                   <Text style={styles.nameStyle}>{item.u_name}</Text>
                   <Text style={styles.caption}>{item.caption}</Text>
               </View>
               <MaterialCommunityIcons style={styles.icon} name="dots-vertical" size={28} color="#707070" />
            </View>
            <View style={styles.imageContainer}>
                <View style={{paddingHorizontal:10,marginBottom:5}}>
                {
                    item.location != null &&
                    <Text style={{color:Colors.PRIMARY}}>#{item.location}</Text>
                }

                {
                    item.description != null &&
                    <Text style={{fontFamily:'SAN_REG',fontSize:13}}>{item.description}</Text>
                }
                </View>
                <Image style={{width:'100%',height: height}} source={{uri:item.image}} />
            </View>
            {console.log(props.fav)}

            {
               (staticType != true) &&
               <View>
                <View style={{flexDirection:'row',width:'100%',marginTop:8}}>
               <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:15}}>
               <MaterialCommunityIcons onPress={props.onfavouriteClick} name={(props.fav == true) ? "heart" : "cards-heart-outline"} size={28} color="#2E2E2E" />
               <Feather style={{marginLeft:14}} name="message-circle" size={28} color="#2E2E2E" />
               <Feather style={{marginLeft:14}} name="send" size={28} color="#2E2E2E" />
               </View>
               <View style={{position:'absolute',right:15}}>
                 <Octicons name="bookmark" size={28} color="#2E2E2E" />
               </View>
            </View>

            <View style={{paddingHorizontal:10,marginTop:5,fontSize:16}}>
                <Text style={{fontFamily:'SAN_BOLD'}}>0 views</Text>
                <View style={{marginVertical:2}}>
                    <Text style={{fontFamily:'SAN_BOLD'}}>Abdul Basit
                    <Text style={{fontFamily:'SAN_REG',paddingLeft:10}}> Nice picture</Text>
                    </Text>
                </View>
                <Text style={{fontFamily:'SAN_TITLE',color:'#707070'}}>View all comment 12</Text>
            </View>

               </View>
            }
         
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
      marginVertical:15
    },
    topSection:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    icon:{
        right:5,
        position:'absolute'
    },
    imageContainer:{
        marginTop:5
    },
    nameStyle:{
        marginLeft:10,
        fontFamily:'SAN_BOLD',
        alignSelf:'flex-start',
        paddingTop:2,
        fontSize:16
    },
    caption:{
        fontFamily:'SAN_TITLE',
        marginLeft:10,
        marginTop:0,
        paddingTop:0,
        color:'#707070'
    }
})
 
export default HomePostRow;