import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Signup from '../screens/Signup';
import Groups from '../screens/Groups';
import Chat from '../screens/Chat';
import AddGroup from '../screens/AddGroup';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Groups"
        component={Groups}
        options={{title: 'Groups'}}
      /> */}
      <Stack.Screen name="Chat" component={Chat} options={{title: 'Chat'}} />
      <Stack.Screen
        name="AddGroup"
        component={AddGroup}
        options={{title: 'AddGroup'}}
      />
    </Stack.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
