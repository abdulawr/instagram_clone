import { LinearGradient } from "expo-linear-gradient";
import { Image,StyleSheet } from "react-native";

// Example
// <Circle_Image width={70} url={require("../../assets/images/network.png")} />

const Circle_Image = (props) => {

    const{width} = props;
    let height = width;

    return ( 
        <LinearGradient
        colors={['#405de6', '#5851db', '#833ab4', '#c13584', '#e1306c', '#fd1d1d']}
        style={{...styles.gradientContainter,width:(width+3),height:(height+3),borderRadius:(width+3)/2}}
       >
        <Image style={{...styles.gradientImg,width:width,height:height,borderRadius:(width/2)}} source={props.url} />
       </LinearGradient>
     );
}

const styles = StyleSheet.create(
    {
        gradientContainter:{
            padding:1.5,
            justifyContent:'center',
            alignItems:'center'
        },
        gradientImg:{
          backgroundColor:'white',
          alignSelf:'center'
        }
    }
)
 
export default Circle_Image;