import {
    View,
    Image,
    StyleSheet,
   Text
} from 'react-native';
import Colors from '../../constant/Colors';
import Back_Button from '../../component/button/Back_Button';
import BlueOutline_Button from '../../component/button/BlueOutline_Button';

const UserRow = (props) => {
    const {item} = props;
   
    return ( 
        <View style={styles.container}>
             <Image style={styles.imageContainer} source={(item.image == 'null') ? require('../../assets/images/no_image.jpg') : {uri:item.image}} />
             <Text style={{fontFamily:'SAN_MED'}}>{item.name}</Text>
             <Text style={{fontFamily:'SAN_REG',fontSize:11,color:'#707070'}}>{item.email}</Text>
            
            {
                (props.followStatus == true) ?  <BlueOutline_Button onClick={props.onClick} title='Following'
                style={{width:100,marginTop:10,height:35,paddingVertical:7}} /> :  <Back_Button onClick={props.onClick} title='Follow'
                style={{width:100,marginTop:10,height:35,paddingVertical:7}} />
            }
            
        </View>
     );
}

const styles = StyleSheet.create(
    {
        container:{
            margin:8,
            justifyContent:'center',
            marginTop:35,
            elevation:5,
            backgroundColor:'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1, 
            width:'45%',
            paddingVertical:8,
            paddingHorizontal:15,
            borderRadius:5,
            alignItems:'center',
            borderColor:Colors.BORDER_COLOR
        },
        imageContainer:{
            marginTop:-40,
            width:70,
            height:70,
            borderRadius:35
        }
    }
)
 
export default UserRow;