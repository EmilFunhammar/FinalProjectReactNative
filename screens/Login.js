import React from 'react';
import { View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the LoginScreen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
