import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  StatusBar,
  Vibration
} from 'react-native';

import Note from './Note'
import EmptyPage from './EmptyPage'

import config from '../config'


export default class ContentView extends React.Component {
  renderNotes() {
    if (this.props.noteArray.length > 0) {
      return this.props.noteArray.map((note, key) => {
        return (
          <Note 
            key={note.id} 
            id={note.id} 
            date={note.date}
            text={note.text}
            deleteMethod={this.props.deleteNote.bind(this)}
          />
        )
      })
    } else {
      return (
          // TODO make the empty page scroll up with the keyboard
          <EmptyPage/>
      )
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        {this.renderNotes()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginBottom: config.textInputHeight
  },
})