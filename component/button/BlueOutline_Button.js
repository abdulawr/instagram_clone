import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from "react-native";
 import Colors from "../../constant/Colors";

const BlueOutline_Button = (props) => {
    return ( 
            <TouchableOpacity style={StyleSheet.compose(styles.button,props.style)} onPress={props.onClick}>
                  <Text style={{color:'white', fontFamily:'SAN_MED'}}>{props.title}</Text>
            </TouchableOpacity>
     );
}

const styles = StyleSheet.create(
    {
        button:{
          width:180,
          paddingVertical:11,
          justifyContent:'center',
          alignItems:'center',
          borderColor:Colors.LG_BLUE,
          alignSelf:'center',
          borderWidth:1.5,
          borderRadius:90,
          marginTop:10
        }
    }
)
 
export default BlueOutline_Button;