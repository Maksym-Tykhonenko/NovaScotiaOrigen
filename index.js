/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App'; // или путь к вашему основному компоненту приложения
import { name as appName } from './app.json'; // Убедитесь, что app.json существует и правильно настроен

AppRegistry.registerComponent(appName, () => App);
