import React from 'react'
import { 
  StyleSheet,
  View, 
  Vibration,

} from 'react-native'

const uuid = require('uuid/v1')

import Header from '../components/Header'
import ContentView from '../components/ContentView'
import Footer from '../components/Footer'

import config from '../config'
import { Database } from '../helpers'


export default class NotesScreen extends React.Component {
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
    Database.downloadNotes(notes => {
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
      Database.addContent(note)
    }
  }

  deleteNote(id) {
    Vibration.cancel()
    Vibration.vibrate()
    const newArray = this.state.noteArray.filter(note => {
      return note.id !== id
    })
    
    this.setState({noteArray: newArray})

    Database.deleteNote(id)
  }

  updateNoteText(text) {
    this.setState({noteText: text})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title='Notes'/>

        <ContentView 
          noteArray={this.state.noteArray} 
          deleteNote={this.deleteNote.bind(this)}
        />

        <Footer
          navigation={this.props.navigation}
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
