import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoScrollExample from './components/VideoScrollExample';

// Example app to use the library
export default function App() {
  return (
    <View style={styles.container}>
      <VideoScrollExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});
