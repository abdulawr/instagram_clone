import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
View,
Text,
StyleSheet
} from 'react-native';
import Circle_Image from '../Common/Circle_Image';

const HomePostRow = (props) => {

    const {item} = props;

    return ( 
        <View>
            <View style={styles.topSection}>
               <Circle_Image  width={45} url={(item.u_image == null) ? require('../../assets/images/no_image.jpg') : {uri:item.u_image}}  />
               <Text>{item.u_name}</Text>
               <MaterialCommunityIcons name="dots-vertical" size={28} color="#707070" />
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    topSection:{
        flexDirection:'row',
        alignItems:'center'
    }
})
 
export default HomePostRow;