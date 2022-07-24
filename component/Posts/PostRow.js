import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const PostRow = (props) => {
    const {item} = props;

    return ( 
        <TouchableOpacity onPress={props.onClick}>
            <Image style={styles.imageContainer} source={{uri:item.image}} />
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create(
    {
        container:{

        },
        imageContainer:{
         width: (Dimensions.get('window').width / 3) - 8,
         height:(Dimensions.get('window').width / 3) - 8,
         margin:4,
         borderBottomRightRadius:5,
         borderTopLeftRadius:5
        }
    }
)
 
export default PostRow;