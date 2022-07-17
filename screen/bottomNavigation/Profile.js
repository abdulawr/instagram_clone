import {
    View,
    Text,
    StyleSheet,
    ScrollView
 } from "react-native";

const Profile = () => {
    return ( 
        <ScrollView style={styles.container}>
            <View style={styles.container}>
               <Text>Profile</Text>
            </View>
        </ScrollView>
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
 
export default Profile;