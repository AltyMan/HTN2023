import React from 'react';
import { SafeAreaView, StyleSheet, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraPage from './SearchByPhoto/CameraPage';
import SearchPage from './SearchByText/SearchPage';
import AppraisalPage from './Appraisal/AppraisalPage';
//import AppraisalPage from './Appraisal/AppraisalPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="Camera" component={CameraPage} />
        <Stack.Screen name="Appraisal" component={AppraisalPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Button
      title="Go to Search Page"
      onPress={() => navigation.navigate('Search')}
      color="#007AFF"
      style={styles.button}
    />
    <View style={styles.space} />
    <Button
      title="Go to Camera Page"
      onPress={() => navigation.navigate('Camera')}
      color="#007AFF"
      style={styles.button}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
  space: {
    height: 20,
  },
});

//const appEntryPoint = () => <App />;
//AppRegistry.registerComponent('HTN2023', () => appEntryPoint);

export default App;