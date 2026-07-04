/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

// Initialize Firebase
import './src/config/firebase';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
