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
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import App1 from './Main';
import Logomain from './components/logo.js';
import Login from './App.js'
const devicedimen = Dimensions.get('window');



import { Card } from 'react-native-paper';

export let userid = '';

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
      teamid:'',
      finaluserid:""
    };
  }

  componentWillUnmount(){
    this.setState({con:false})
  }

  nameinput = (props) => {
    this.setState({ name: props.trim() });
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

  back = () =>{
    this.setState({con:true})
  }

  regteam = () => {
      this.setState({finaluserid:this.state.name+'$'+this.state.teamid })
      
      fetch('http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/sign_up/', {
      method: "POST",//Request Type 
      body: JSON.stringify({"username":this.state.name+'$'+this.state.teamid,"password":this.state.pw,"team_id":this.state.teamid}),
      headers: {//Header Defination 
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        if((responseJson["username"])=="user_own with this username already exists."){
            alert("Username already exists");
        }
        if((responseJson["username"])=="This field may not be blank."){
            alert("Please Enter a UserId");
        }
        if((responseJson["password"])=="This field may not be blank."){
            alert("Please Enter a Password");
        }
        if((responseJson["team_id"])=="This field may not be blank."){
            alert("Please Enter a TeamId");
        }

    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
    this.setState({con:true})
  };

  render() {
    if (this.state.con) return <Login />

    return (
      <ScrollView style={styles.boxOne}>
      <View style={styles.container}>
       <Card style={{padding:10}}>

        <Logomain />
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Create/Join TeamId"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.teamid}
              autoCapitalize = 'none'
              onChangeText={this.teamidinput}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/carbon-copy/80/000000/contact-card.png'}}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Enter Userid"
              keyboardType="email-address"
              autoCapitalize = 'none'
              underlineColorAndroid='transparent'
              value={this.state.name}
          onChangeText={this.nameinput}/>
          
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/dotty/40/000000/email.png'}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Enter Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={this.state.phone}
              autoCapitalize = 'none'
              onChangeText={this.pwinput}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>


        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}  onPress={this.regteam}>
          <Text style={styles.loginText}>Create</Text>
        </TouchableOpacity>

    
        <TouchableOpacity style={styles.buttonContainer} onPress={this.back}>
            <Text style={styles.btnText}>Login</Text>
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
    //padding: 20

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
