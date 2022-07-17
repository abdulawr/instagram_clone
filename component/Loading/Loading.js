import 
{
 Modal,
 StyleSheet,
 Image,
 View
} from 'react-native';

const Loading = (props) => {
    return ( 
        <Modal
         visible={props.visible}
         transparent
         >
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/loading.gif")} style={styles.image} />
              </View>
              </View>
        </Modal>
     );
}
 
const styles = StyleSheet.create(
    {
    
        container:{
           flex:1,
           justifyContent:'center',
           alignItems:'center',
           backgroundColor:'#00000099'
        },
        image:{
           width:100,
           height:100,
           margin:10
        },
        imageContainer:{
            backgroundColor:'white',
            borderRadius:10,
            elevation:5,
        }
    }
)
export default Loading;