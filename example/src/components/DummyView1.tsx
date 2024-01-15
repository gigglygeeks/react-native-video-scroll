import { StyleSheet, Text, View } from 'react-native';
import React, { type FC } from 'react';

interface Props {
  text: string;
  backgroundColor: string;
}

const DummyView: FC<Props> = ({ text, backgroundColor }) => {
  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <Text>{text}</Text>
    </View>
  );
};

export default DummyView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
