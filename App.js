import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Rotas from './src/Rotas';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Rotas />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"fff",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
