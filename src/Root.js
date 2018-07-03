import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation'

import NotesScreen from './screens/NotesScreen'
import CameraScreen from './screens/CameraScreen'
import Menu from './components/Menu'

export default Root = createDrawerNavigator({
  Notes: {
    screen: NotesScreen,
  },
  Camera: {
    screen: CameraScreen
  },
  }, {
    contentComponent: Menu
});
