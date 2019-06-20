import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MapScreen from './src/screens/MapScreen';
import TripsScreen from './src/screens/TripsScreen';

const MainNavigator = createBottomTabNavigator({
  auth: {
    screen: createSwitchNavigator({
      auth: { screen: AuthScreen },
      login: { screen: LoginScreen },
      signup: { screen: SignUpScreen }
    }),
    navigationOptions: { tabBarVisible: false }
  },
  trip: {
    screen: createSwitchNavigator({
      trips: { screen: TripsScreen },
      map: { screen: MapScreen }
    }),
    navigationOptions: { tabBarVisible: false }
  }
}, {
    tabBarOptions: {
      visible: false
    }
  }
);

const MyAppNav = createAppContainer(MainNavigator);

export default MyAppNav;
