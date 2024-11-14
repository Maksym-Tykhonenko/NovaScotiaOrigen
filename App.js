import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import MainMenuScreen from './MainMenuScreen';
import Store from './Store';
import SettingsScreen from './SettingsScreen';
import QuizScreen from './QuizScreen.js';
import {AudioProvider} from './AudioContext';
import ProgressBar from './ProgressBar.js';
import MegaQuiz from './MegaQuiz.js';
import {VibrationProvider} from './VibrationContext';
import MapScreen from './Map';
import FolderScreen from './Folder';
import Loader from './Loader';

const Stack = createStackNavigator();

const App = () => {
  const [louderIsEnded, setLouderIsEnded] = useState(false);

  return (
    <VibrationProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <Loader onEnd={() => setLouderIsEnded(true)} />
        ) : (
          <AudioProvider>
            <Stack.Navigator initialRouteName="Profile">
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MainMenu"
                component={MainMenuScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Store"
                component={Store}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Quiz"
                component={QuizScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Progress"
                component={ProgressBar}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MegaQuiz"
                component={MegaQuiz}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Folder"
                component={FolderScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </AudioProvider>
        )}
      </NavigationContainer>
    </VibrationProvider>
  );
};

export default App;
