import { SafeAreaView } from 'react-native-safe-area-context';

const Containers = (props) => {
    return ( 
       <SafeAreaView {...props}>
               {props.children}
       </SafeAreaView>
     );
}
 
export default Containers;