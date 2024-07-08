import 'react-native-gesture-handler';  // Provides enhanced gesture handling capabilities. Note: Probably overkill for this project.
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { enableScreens } from 'react-native-screens';

enableScreens();    // Optimizes memory usage and performace by using native screen primitives. Recommended use with React Navigation. Note: Probably overkill for this project.

AppRegistry.registerComponent(appName, () => App);
