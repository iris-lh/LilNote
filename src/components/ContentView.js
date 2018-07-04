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
  scrollToEnd() {
    this.scrollView.scrollToEnd({animated: true})
  }

  renderNotes() {
    if (this.props.entryArray.length > 0) {
      return this.props.entryArray.map((entry, key) => {
        return (
          <Note 
            key={entry.id}
            id={entry.id}
            date={entry.date}
            type={entry.type}
            content={entry.content}
            deleteMethod={this.props.deleteNote.bind(this)}
          />
        )
      })
    } else {
      return (
          // TODO make the empty page scroll up with the keyboard
          // TODO make the empty page non-scrolling
          <EmptyPage/>
      )
    }
  }

  render() {
    return (
      <ScrollView
        ref={ref => this.scrollView = ref}
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}>
        {this.renderNotes()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70,
  },
  scrollContainer: {
    flex: 1,
    // marginBottom: config.textInputHeight
  },
})