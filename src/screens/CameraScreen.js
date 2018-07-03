import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  Dimensions, 
  PixelRatio 
} from 'react-native';
import { Camera, Permissions } from 'expo';

import { Database } from '../helpers'


export default class CameraScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      apsectRatio: this.reportAspectRatio(),
      apsectRatio: '1:1',
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  flipCamera = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    })
  }

  reportAspectRatio = () => {
    function getGcd() {
      if (arguments.length == 2) {
          if (arguments[1] == 0)
              return arguments[0];
          else
              return getGcd(arguments[1], arguments[0] % arguments[1])
      } else if (arguments.length > 2) {
          var result = getGcd(arguments[0], arguments[1]);
          for (var i = 2; i < arguments.length; i++)
              result = getGcd(result, arguments[i])
          return result;
      }
    }
    const dims = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }
    const gcd = getGcd(dims.height, dims.width)
    const aspectRatioStr = `${dims.height / gcd}:${dims.width / gcd}`
    return aspectRatioStr
  }

  takePicture = () => {
    this.camera.takePictureAsync({base64: true})
    .then(res => {
      
    })
    .catch(err => console.log(err))
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera 
          style={styles.camera} 
          type={this.state.type} 
          ratio={this.state.apsectRatio} 
          ref={ref => {
            this.camera = ref;
          }}>
            <View style={styles.cameraInteranal}>
              <TouchableOpacity style={styles.backButton} onPress={() => {this.props.navigation.goBack()}}>
                <Text style={styles.buttonText}>
                  Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.flipButton} onPress={this.flipCamera}>
                <Text style={styles.buttonText}>
                  Flip
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
                <Text style={styles.buttonText}>
                  Capture
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}


const _styles = {
  button: {
    position: 'absolute',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const styles = StyleSheet.create({
  container: { 
  },
  camera: { 
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  cameraInteranal: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  backButton: {
    ..._styles.button,
    top: StatusBar.currentHeight,
    alignSelf: 'flex-start',
  },
  captureButton: {
    ..._styles.button,
    alignSelf: 'flex-end',
  },
  flipButton: {
    ..._styles.button,
    alignSelf: 'center',
  },
  buttonText: { 
    fontSize: 18, 
    color: 'white' 
  }
})