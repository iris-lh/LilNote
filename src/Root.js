import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation'

import MainScreen from './screens/MainScreen'
import CameraScreen from './screens/CameraScreen'
import Menu from './components/Menu'

export default Root = createDrawerNavigator({
  Main: {
    screen: MainScreen,
  },
  Camera: {
    screen: CameraScreen
  },
  }, {
    contentComponent: Menu
});
