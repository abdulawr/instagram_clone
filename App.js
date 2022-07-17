import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Index from './naviagation';
import Store from './redux/Store';

export default function App() {

      return (
         <Provider store={Store} >
            <Index />
         </Provider>
      )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
