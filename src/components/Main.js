import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  StatusBar,
  Vibration
} from 'react-native';

const uuid = require('uuid/v1')

import Note from './Note'
import EmptyPage from './EmptyPage'
import Footer from './Footer'

import config from '../config'
import { firebase } from '../helpers'




export default class Main extends React.Component {
 constructor(props) {
    super(props)
    this.state = {
      noteArray: [
      ],
      noteText: ''
    }
  }

  componentDidMount() {
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

  renderNotes() {
    if (this.state.noteArray.length > 0) {
      return this.state.noteArray.map((note, key) => {
        return (
          <Note 
            key={note.id} 
            id={note.id} 
            date={note.date}
            text={note.text}
            deleteMethod={this.deleteNote.bind(this)}
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
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        
        {/* TODO Extract header */}
        <View style ={styles.header}>
          <Text style={styles.headerText}> Notes </Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {this.renderNotes()}
        </ScrollView>
        
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
  header: {
    zIndex: 100,
    backgroundColor: config.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 0
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
  },
  scrollContainer: {
    flex: 1,
    marginBottom: config.textInputHeight
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 30,
    bottom: 90,
    backgroundColor: config.colors.primary,
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 0
  },
  addButtonText: {
    color: 'white',
    fontSize: 32
  }
});
