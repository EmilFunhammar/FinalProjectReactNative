import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../Context/AuthContext';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { setIsLoggedIn, logIn, createUser } = useContext(AuthContext);

  const LoginUser = () => {
    logIn(email, password);
  };

  const SignUpUser = () => {
    createUser(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Log In</Text>
      <View style={{ width: '50%' }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>Email</Text>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: 'lightgrey',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
        />
        <Text style={{ fontWeight: '600', fontSize: 16 }}>Password</Text>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
        <Button title="Login" onPress={LoginUser} />
        <Button title="Sign up" onPress={SignUpUser} />
      </View>
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
  textInput: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
});
