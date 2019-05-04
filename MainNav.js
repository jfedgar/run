import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MapScreen from './src/screens/MapScreen';

const MainNavigator = createBottomTabNavigator({
  auth: {
    screen: createSwitchNavigator({
      auth: { screen: AuthScreen },
      login: { screen: LoginScreen },
      signup: { screen: SignUpScreen }
    }),
    navigationOptions: { tabBarVisible: false }
  },
  map: {
    navigationOptions: { tabBarVisible: false },
    screen: MapScreen
  }
}, {
    tabBarOptions: {
      visible: false
    }
  }
);

const MyAppNav = createAppContainer(MainNavigator);

export default MyAppNav;
