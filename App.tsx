import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import http from './src/utility/http-client';

export default function App() {

  const [fetching, setFetching] = useState<Boolean>(false);
  const [message, setMessage] = useState<String>('');
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    checkNetweork();
  }, []);

  const checkNetweork = async () => {

    setFetching(false)

    if (canResetForm()) {
      setErrorMessage('');
      return setMessage('');
    }
    setFetching(true)

    const resp = await http.get('name/random_name');

    if (resp?.status != 200) return setErrorMessage('Check your network');

    setMessage('Networl is Good');
    setFetching(false)

    console.log(resp.data);
  }

  const canResetForm = () => {
    return message || errorMessage;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nyota</Text>
      <Text style={styles.msg}>{message}</Text>
      <Text style={styles.errMsg}>{errorMessage}</Text>
      {fetching && <ActivityIndicator />}

      <Pressable style={styles.btn} onPress={checkNetweork}>
        <Text style={styles.btnLable}>{canResetForm() ? "Reset" : "Check Network"}</Text>
      </Pressable>
      <StatusBar style="auto" />
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
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  msg: {
    color: 'green',
    fontSize: 20
  },
  errMsg: {
    color: 'red',
    fontSize: 20
  },
  btn: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 15,
    margin: 10,

  },
  btnLable: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  }
});
