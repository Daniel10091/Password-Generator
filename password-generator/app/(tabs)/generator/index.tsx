import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Clipboard, Image, Keyboard, Platform, Pressable, StyleSheet, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../../../components/Themed';

export function HomeScreen({ route, navigation }: any) {
  
  const { passwordSaved } = route.params || '';

  const [ passwordLength, setPasswordLength ] = React.useState('8');
  const [ switchNumbers, setSwitchNumbers ] = React.useState(true);
  const [ switchLetters, setSwitchLetters ] = React.useState(true);
  const [ switchSymbols, setSwitchSymbols ] = React.useState(true);

  const [ password, setPassword ] = React.useState('');

  const [ passwordCopyed, setPasswordCopyed ] = React.useState(false);

  function generatePassword() {
    var length = parseInt(passwordLength);
    var numbers = "0123456789";
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    var charset = (switchLetters ? letters : '') + (switchNumbers ? numbers : '') + (switchSymbols ? symbols : '');
    var retVal = "";

    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    setTimeout(() => {
      setPassword(retVal != '' ? retVal : '🔑');
    }, 100);
  }

  function copyPassword() {
    if (password != '' && password != '🔑') {
      setTimeout(() => {
        Clipboard.setString(password);
        setPasswordCopyed(true);
      }, 200);
    }
    setTimeout(() => {
      setPasswordCopyed(false);
    }, 1200);
  }
  
  function savePassword() {
    navigation.navigate('modal', { password: password });
  }

  React.useEffect(() => {
    generatePassword();
    console.log(passwordSaved);
  }, [passwordSaved]);
  
  return (
    <Pressable 
      style={styles.container} 
      onPress={() => Keyboard.dismiss()}
    >
      
      <View style={styles.header}>
        <Text style={styles.title}>Generator</Text>
        <TouchableOpacity 
          style={styles.accountButton} 
          onPress={() => {}} 
          activeOpacity={0.6}
        >
          <Image 
            style={styles.accountButtonAvatar}
            // source={require('../../../assets/images/avatar.png')}
            source={{uri: 'https://avatars.githubusercontent.com/u/60202598?v=4'}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>

        <View style={styles.formRow}>
          <Text style={styles.resultTitle}>Your password is:</Text>
          
          <View style={styles.result}>
            <Text style={[styles.resultText, {color: passwordCopyed ? '#80ed99' : '#FCF6BD'}]}>{password}</Text>
          </View>
        </View>
        
        <View style={styles.passwordConfig}>
          <View style={styles.passwordConfigItem}>
            <Text style={styles.passwordConfigItemLabel}>Password length</Text>
            <View style={styles.passwordConfigLength}>
              <TouchableOpacity
                style={[styles.passwordConfigItemInputButton, styles.passwordConfigItemInputButtonL]}
                onPress={() => {setPasswordLength(parseInt(passwordLength) > 4 ? (parseInt(passwordLength) - 1).toString() : '4')}}
                activeOpacity={0.6}
              >
                <Text style={styles.passwordConfigItemLabel}>-</Text>
              </TouchableOpacity>
              <View style={styles.passwordConfigItemLengthValue}>
                <Text style={styles.passwordConfigItemLengthValueText}>{passwordLength}</Text>
              </View>
              <TouchableOpacity
                style={[styles.passwordConfigItemInputButton, styles.passwordConfigItemInputButtonR]}
                onPress={() => setPasswordLength(parseInt(passwordLength) < 15 ? (parseInt(passwordLength) + 1).toString() : '15')}
                activeOpacity={0.6}
              >
                <Text style={styles.passwordConfigItemLabel}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.passwordConfigItem}>
            <Text style={styles.passwordConfigItemLabel}>Include letters</Text>
            <Switch
              trackColor={{true: '#FF99C8', false: 'grey'}}
              onValueChange={(value) => setSwitchLetters(value)}
              value={switchLetters}
            />
          </View>
          <View style={styles.passwordConfigItem}>
            <Text style={styles.passwordConfigItemLabel}>Include numbers</Text>
            <Switch
              trackColor={{true: '#FF99C8', false: 'grey'}}
              onValueChange={(value) => setSwitchNumbers(value)}
              value={switchNumbers}
            />
          </View>
          <View style={styles.passwordConfigItem}>
            <Text style={styles.passwordConfigItemLabel}>Include symbols</Text>
            <Switch
              trackColor={{true: '#FF99C8', false: 'grey'}}
              onValueChange={(value) => setSwitchSymbols(value)}
              value={switchSymbols}
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.passwordOptions}>
            <TouchableOpacity 
              style={[styles.passwordOptionsButton, {backgroundColor: passwordCopyed ? '#57cc99' : '#E4C1F9'}]} 
              onPress={() => copyPassword()} 
              activeOpacity={0.6}
            >
              <Text style={styles.passwordOptionsButtonLabel}>{passwordCopyed ? 'Copyed' : 'Copy'}</Text>
            </TouchableOpacity>
              <TouchableOpacity 
                style={styles.passwordOptionsButton} 
                onPress={() => savePassword()} 
                activeOpacity={0.6}
              >
                <Text style={styles.passwordOptionsButtonLabel}>Save</Text>
              </TouchableOpacity>
            {/* <Link href="/modal" asChild>
            </Link> */}
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => generatePassword()} 
            activeOpacity={0.6}
          >
            <Text style={styles.buttonLabel}>Generate</Text>
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2b2d42',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  accountButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#8d99ae',
    borderWidth: 2,
    borderColor: '#D0F4DE',
  },
  accountButtonAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2b2d42',
  },

  // Title
  title: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#FF99C8',
    fontVariant: ['small-caps'],
  },

  // Form
  form: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  formRow: {
    backgroundColor: 'transparent',
  },

  // Result title
  resultTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#8d99ae',
  },

  // Result
  result: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#2f3e46',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#FCF6BD',
    fontVariant: ['tabular-nums'],
  },

  // Password config
  passwordConfig: {
    backgroundColor: 'transparent',
    gap: 10,
  },
  passwordConfigItem: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#2f3e46',
    borderRadius: 10,
  },
  passwordConfigLength: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  passwordConfigItemInputButton: {
    height: 40,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2d42',
  },
  passwordConfigItemInputButtonL: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  passwordConfigItemInputButtonR: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  passwordConfigItemLengthValue: {
    height: 40,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  passwordConfigItemLengthValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8d99ae',
  },
  passwordConfigItemLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: '#8d99ae',
  },

  // Password options
  passwordOptions: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  passwordOptionsButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: 'stretch',
    marginHorizontal: '1%',
    minWidth: '46%',
    textAlign: 'center',
    backgroundColor: '#E4C1F9',
    borderRadius: 10,
  },
  passwordOptionsButtonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },

  // Generate button
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
