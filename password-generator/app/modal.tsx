import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, Switch, TextInput } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

import { PasswordService } from './service/password.service';

export default function ModalScreen({ route, navigation }: any) {

  const { password } = route.params;

  const [ update, setUpdate ] = React.useState(true);

  const [ passwordTitle, setPasswordTitle ] = React.useState('mypassword');

  const [ remindMeToChange, setRemindMeToChange ] = React.useState(false);

  const [ validated, setValidated ] = React.useState(true);
  const [ saved, setSaved ] = React.useState(false);

  function savePassword() {
    if (passwordTitle != '') {
      // if (typeof passwordTitle === 'string' && /^[\w.-]+$/.test(passwordTitle)) {
      //   console.log('Valid password title');
      // } else {
      //   console.log('Invalid password title');
      // }

      setTimeout(() => {
        // PasswordService.save(passwordTitle, password).then(() => {
        //   setSaved(true);
        // });
      }, 200);
      
      setTimeout(() => {
        setSaved(false);
        PasswordService.findById('1').then((value) => {
          console.log(value);
          // navigation.navigate('generator', { passwordSaved: {key: passwordTitle, value: value} });
        });
      }, 1200);
    } else {
      setValidated(false);
      alert('Please enter a password title');
    }
  }

  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Object[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://172.16.5.134:3000/passwords');
      const json = await response.json();
      // setData(json.movies);
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {

    getMovies();
    
    // if (update) {
    //   setUpdate(false);
    // }
  }, []);

  return (
    <Pressable 
      style={styles.container} 
      onPress={() => Keyboard.dismiss()}
    >

      <View style={styles.header}>
        <Text style={styles.title}>Save password</Text>
      </View>
      
      <View style={styles.form}>

        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={[styles.input, {borderColor: validated ? 'rgba(255, 255, 255, 0.2)' : '#ef476f'}]}
              placeholder="My password"
              placeholderTextColor="#aaa"
              onChangeText={(text) => {
                text != '' ? setValidated(true) : setValidated(false);
                setPasswordTitle(text.replace(/\s/g, ''));
              }}
              value={passwordTitle}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <View style={styles.passwordValue}>
              <Text style={styles.passwordValueText}>{password}</Text>
            </View>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.passwordRemember}>
            <View style={styles.passwordRememberItem}>
              <Text style={styles.passwordRememberItemLabel}>Remind me to change</Text>
              <Switch
                trackColor={{true: '#FF99C8', false: 'grey'}}
                onValueChange={(value) => setRemindMeToChange(value)}
                value={remindMeToChange}
              />
            </View>
            <Text style={[styles.passwordRememberItemLabel, {fontSize: 14}]}>Note: By selecting the option above, every 30 days you will be reminded to change this password.</Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: saved ? '#57cc99' : '#A9DEF9'}]} 
            onPress={() => savePassword()} 
            activeOpacity={0.6}
          >
            <Text style={styles.buttonLabel}>{saved ? 'Saved' : 'Save'}</Text>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2d42',
  },

  // Header
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF99C8',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#ffffff',
    fontVariant: ['small-caps'],
  },
  
  // Form
  form: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 20,
    backgroundColor: 'transparent',
  },
  formRow: {
    gap: 30,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    gap: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    // fontVariant: ['small-caps'],
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#edf2f4',
    backgroundColor: '#2f3e46',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  passwordValue: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: '#2f3e46',
    borderColor: '#E4C1F9',
    borderRadius: 10,
  },
  passwordValueText: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#FCF6BD',
    fontVariant: ['tabular-nums'],
  },

  // Password rememeber
  passwordRemember: {
    backgroundColor: 'transparent',
    gap: 10,
    marginTop: 14,
  },
  passwordRememberItem: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#2f3e46',
    borderRadius: 10,
  },
  passwordRememberItemLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: '#8d99ae',
  },

  // Save button
  button: {
    alignItems: 'center',
    backgroundColor: '#A9DEF9',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
