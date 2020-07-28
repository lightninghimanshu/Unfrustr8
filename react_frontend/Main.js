import React from 'react';
import {
  View,
  Button,
  Dimensions,
  Text,
  ScrollView,
  Image,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Appmain, { userid } from './App.js';
import SwitchTodo from './Todo1.js';
import SwitchGpc from './Groupchat.js';

const devicedimen = Dimensions.get('window'); 


export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: false,
      con: false,
      gpc: false,
    };
  }

  verify = () => {
    this.setState({ con: true });
  };

  todo = () => {
    this.setState({ todos: true });
  };

  gpcs = () => {
    this.setState({ gpc: true });
  };

  render() {
    if (this.state.con) return <Appmain />;
    if (this.state.todos) return <SwitchTodo />;
    if (this.state.gpc) return <SwitchGpc />;
    return (
      <View style={[styles.container, styles.fill]}>
        <Text style={styles.paragraph}>Welcome to the Team {userid} </Text>

        <View style={[styles.input]}>
          <View style={styles.fixToText}>
            <Image
              style={styles.logo}
              source={require('./assets/Discuss.png')}
            />
            <Image
              style={styles.logo}
              source={require('./assets/Assigned.png')}
            />
          </View>

          <View style={styles.fixToText}>
            
            <TouchableOpacity style={[styles.buttonContainer, styles.buttonprop, {flex:1,}]}  onPress={this.gpcs}>
          <Text style={{color: 'white'}}>Post Messages</Text>
              </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, styles.buttonprop,{flex:1,}]}  onPress={this.todo}>
          <Text style={{color: 'white'}}>Todos </Text>
              </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.buttonprop]}  onPress={this.verify}>
          <Text style={{color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    marginRight:10,
    height:devicedimen.height*0.05,
    backgroundColor:'transparent'
  },
 
  buttonprop: {
    backgroundColor: "#21abd1",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,

    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 50,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    bottom: 0,
  },
  logo: {
    flex: 1,

    height: 0.45 * devicedimen.height,

    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,

    resizeMode: 'contain',

  },

});
