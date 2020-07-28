import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import App1 from './Main';
import Register from './Register'
import Logomain from './components/logo.js';
const devicedimen = Dimensions.get('window');


import { Card } from 'react-native-paper';

export let userid = '';
export let teamid = '';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      con: false,
      name: '',
      pw: '',  
      pwcheck:true,   
      register:false,
      teamid:'',

    };
  }

  componentDidMount() {
    fetch(
      'http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/all_users/'
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        //console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  componentWillUnmount(){
    this.setState({con:false})
  }

  nameinput = (props) => {
    this.setState({ name: props.trim()});
    
  };
  teamidinput = (props) => {
    this.setState({ teamid: props.trim() });
  };

  register = () =>{
    this.setState({register:true})
  }

  pwinput = (props) => {
    this.setState({ pw: props });
  };

  verify = () => {

    for (let i = 0; i < this.state.data.length; i++) {
      if (
        this.state.data[i]['team_id']===this.state.teamid &&
        this.state.data[i]['username'] === this.state.name+'$'+this.state.teamid &&
        this.state.data[i]['password'] === this.state.pw
      ) {
        this.setState({ con: true , pwcheck:true});
        console.log(true);
        userid = this.state.name;
        teamid = this.state.teamid;
      }
      
    }
    if(!this.state.pwcheck){
      alert("Please recheck UserId/Password and Confirm the TeamId")
    }
  };

  render() {
    if (this.state.register) return <Register />;
    if (this.state.con) return <App1 />;
 

    return (

      <ScrollView style={styles.boxOne}>
      <View style={styles.container}>

     
        <Card style={{padding:10}}>
        <Logomain />
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="TeamId"
              autoCapitalize = 'none'
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.teamid}
              onChangeText={this.teamidinput}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/carbon-copy/80/000000/contact-card.png'}}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Userid"
              autoCapitalize = 'none'
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.name}
              onChangeText={this.nameinput}/>
          
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/dotty/40/000000/email.png'}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize = 'none'
              underlineColorAndroid='transparent'
              value={this.state.phone}
              onChangeText={this.pwinput}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>


        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}  onPress={this.verify}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonContainer} onPress={this.register}>
            <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        </Card>
        </View>
      </ScrollView>
 
    );
  }
}



const styles = StyleSheet.create({
  boxOne: {
    marginTop:devicedimen.height/5,
    flex: 1, 
    backgroundColor: 'white',
    padding: 20

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
 
  loginButton: {
    backgroundColor: "#08bd50",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
  },
  loginText: {
    color: 'white',
  },

  btnText:{
    color:"black",
    fontWeight:'bold'
  }
}); 
