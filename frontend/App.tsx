import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ItemList from './screens/ItemList';
import AddItem from './screens/AddItem';
import EditItem from './screens/EditItem';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Stack.Navigator>
          <Stack.Screen
            name="ItemList"
            component={ItemList}
            options={{title: 'Item List'}}
          />
          <Stack.Screen
            name="AddItem"
            component={AddItem}
            options={{title: 'Add New Item'}}
          />
          <Stack.Screen
            name="EditItem"
            component={EditItem}
            options={{title: 'Edit Item'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
