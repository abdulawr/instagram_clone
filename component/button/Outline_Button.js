import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from "react-native";
 import Colors from "../../constant/Colors";

const Outline_Button = (props) => {
    return ( 
            <TouchableOpacity style={StyleSheet.compose(styles.button,props.style)} onPress={props.onClick}>
                  <Text style={{color:Colors.PRIMARY, fontFamily:'SAN_MED'}}>{props.title}</Text>
            </TouchableOpacity>
     );
}

const styles = StyleSheet.create(
    {
        button:{
          width:150,
          paddingVertical:11,
          justifyContent:'center',
          alignItems:'center',
          borderLeftColor:Colors.SECONDARY,
          borderTopColor:Colors.PRIMARY,
          borderBottomColor:Colors.SECONDARY,
          borderRightColor:Colors.SECONDARY,
          borderWidth:1.5,
          borderRadius:5,
        }
    }
)
 
export default Outline_Button;