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

export default class Note extends React.Component {
  formatDate(date) {
    return moment(date).format('MM/DD/YYYY, h:MM a')
  }

  render() {
    return (
      <View style={styles.note} id={this.props.id}>
        <Text style={styles.noteDate}> {this.formatDate(this.props.date)} </Text>
        <Text style={styles.noteText}> {this.props.text} </Text>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onLongPress={() => {
            this.props.deleteMethod(this.props.id)
          }}>
          <Image style={styles.deleteIcon} source={config.icons.x}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderLeftWidth: 10,
    borderLeftColor: config.colors.primary,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 0
  },
  noteDate: {
    color: config.colors.grayedOut,
    // paddingLeft: 20,
    
  },
  noteText: {
    // paddingLeft: 20,
    borderLeftColor: config.colors.primary
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
