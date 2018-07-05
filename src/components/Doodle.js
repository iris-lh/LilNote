import React from 'react';
import { 
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet, 
} from 'react-native';

import ExpoPixi from 'expo-pixi'

import config from '../config'


export default class Doodle extends React.Component {
  state = {
    uri: ''
  }

  onChangeAsync = async () => {
    const options = {
      format: 'png', /// PNG because the view has a clear background
      quality: 0.1, /// Low quality works because it's just a line
      result: 'file',
      height: 300,
      width: 300
    };

    const { uri } = await this.sketch.takeSnapshotAsync(options);

    this.setState({uri: uri})
  };

  onSubmitDoodle = () => {
    this.props.onSubmitDoodle(this.state.uri)
  }

  render() {
    return (
      <View styles={styles.container}>
        <ExpoPixi.Sketch
          style={styles.sketch}
          ref={ref => this.sketch = ref}
          onChange={this.onChangeAsync}
          strokeColor={'black'}
          strokeWidth={10}
          strokeAlpha={1}/>
        
        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            onPress={()=>{this.props.updateInputMode('')}}
            style={styles.bottomButton}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={this.onSubmitDoodle}
            style={styles.bottomButton}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
} 


const styles = StyleSheet.create({
  container: {
  },
  sketch: {
    // flex: 1,
    backgroundColor: 'white',
    width: 300,
    height: 300
  },
  bottomButtons: {
    flexDirection: 'row',
  },
  bottomButton: {
    backgroundColor: config.colors.secondary,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
    color: 'white'
  }
})