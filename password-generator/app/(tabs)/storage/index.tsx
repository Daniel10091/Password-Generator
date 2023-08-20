import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';

export default function StorageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 32
  }
});
