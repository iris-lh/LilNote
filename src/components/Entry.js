import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

const moment = require('moment')

import config from '../config'


const shibe = 'https://vignette.wikia.nocookie.net/aceattorney/images/f/f7/Missile_AAI.png'
const shibeFirebase = 'https://firebasestorage.googleapis.com/v0/b/lilentry-965c1.appspot.com/o/images%2FMissile_AAI.png?alt=media&token=e8a8c281-7aed-4fcb-8bab-b93ca2dd9098'
const test = 'https://firebasestorage.googleapis.com/v0/b/lilentry-965c1.appspot.com/o/images%2Fe289e3a0-7f32-11e8-b32d-f1ee6a0cd883.jpg?alt=media&token=95eb2ac2-6b69-4e6c-94b7-49a85f491874'


export default class Entry extends React.Component {
  formatDate(date) {
    return moment(date).format('MM/DD/YYYY, h:mm a')
  }

  renderText() {
    return (
      <View style={styles.entry} id={this.props.id}>
        <Text style={styles.entryDate}> {this.formatDate(this.props.date)} </Text>
        <Text style={styles.entryContent}> {this.props.content} </Text>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onLongPress={() => {
            this.props.deleteMethod(this.props.id)
          }}>
          <Image style={styles.deleteIcon} source={config.icons.x}/>
        </TouchableOpacity>
      </View>
    )
  }

  createImageComponent() {
    return (
      <Image
        style={styles.imageContent} 
        source={{uri: this.props.content}} 
        defaultSource={{uri: shibe}}
        key={this.props.content}
        />
    )
  }

  renderImage() {
    return (
      <View style={styles.entry} id={this.props.id}>
        {this.createImageComponent()}
        <Text style={styles.entryDate}> {this.formatDate(this.props.date)} </Text>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onLongPress={() => {
            this.props.deleteMethod(this.props.id)
          }}>
          <Image style={styles.deleteIcon} source={config.icons.x}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderGif() {
    return (
      <View style={styles.entry} id={this.props.id}>
        <Image style={styles.imageContent} source={{uri: this.props.content}}/>
        <Text style={styles.entryDate}> {this.formatDate(this.props.date)} </Text>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onLongPress={() => {
            this.props.deleteMethod(this.props.id)
          }}>
          <Image style={styles.deleteIcon} source={config.icons.x}/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    switch(this.props.type) {
      case 'text':
        return this.renderText()
      case 'image':
        return this.renderImage()
      case 'gif':
        return this.renderGif()
    }
  }
}

const styles = StyleSheet.create({
  entry: {
    position: 'relative',
    padding: 20,
    marginBottom: 20,
    paddingRight: 100,
    borderLeftWidth: 10,
    borderLeftColor: config.colors.primary,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 0,

    elevation: 5,
  },
  entryDate: {
    color: config.colors.grayedOut,
    // paddingLeft: 20,
  },
  entryContent: {
    // paddingLeft: 20,
    borderLeftColor: config.colors.primary
  },
  imageContent: {
    width: 300, 
    height:300,
    marginTop: 10,
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
  },
  deleteIcon: {
    width: 20,
    height: 20
  }
});
