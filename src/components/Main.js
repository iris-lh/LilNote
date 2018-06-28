import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  StatusBar,
  Vibration
} from 'react-native';

const uuid = require('uuid/v1')

import Header from './Header'
import ContentView from './ContentView'
import Footer from './Footer'

import config from '../config'
import { firebase } from '../helpers'


export default class Main extends React.Component {
 constructor() {
   super()
    this.state = {
      noteArray: [
      ],
      noteText: ''
    }
  }

  componentWillMount() {
    this.downloadNotes()
  }

  downloadNotes() {
    firebase.downloadNotes(notes => {
      this.setState({noteArray: notes})
    })
  }

  addNote() {
    if (this.state.noteText) {
      const old = this.state.noteArray
      const id = uuid()
      const date = new Date()
      const text = this.state.noteText
      const note = {id, date, text}
      this.setState({ noteArray: [...old, note] })
      this.setState({ noteText: '' })
      firebase.uploadNote(note)
    }
  }

  deleteNote(id) {
    Vibration.cancel()
    Vibration.vibrate()
    const newArray = this.state.noteArray.filter(note => {
      return note.id !== id
    })
    
    this.setState({noteArray: newArray})

    firebase.deleteNote(id)
  }

  updateNoteText(text) {
    this.setState({noteText: text})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>

        <ContentView 
          noteArray={this.state.noteArray} 
          deleteNote={this.deleteNote.bind(this)}
        />
        
        <Footer
          onChangeText={this.updateNoteText.bind(this)}
          onSubmitEditing={this.addNote.bind(this)}
          value={this.state.noteText}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background
  },
});
