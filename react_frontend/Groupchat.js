import React from 'react';
import {
  View,
  Button,
  Text,
  ScrollView,
  Switch,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import MainScreen from './Main.js';

import Appmain,{userid,teamid} from './App.js';

let id = 1;



const { width, height } = Dimensions.get('window');
const device = Dimensions.get('window');
const devicedimen = Dimensions.get('window');


//const image = 'https://www.bootdey.com/img/Content/avatar/avatar6.png'
const image = 'https://img.icons8.com/dusk/64/000000/a.png'


const styles = StyleSheet.create({
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 10,
    height: devicedimen.height * 0.05,
    
    backgroundColor: 'transparent',
  },

  buttonprop: {
    backgroundColor: '#21abd1',
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  appContainer: {
    paddingTop: 50,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fill: {
    flex: 1,
    paddingLeft: 10, //This statement allows to take as much amount of space available
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 70,
    paddingHorizontal: 30,
  },
  
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },

  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: device.width-100,
    paddingLeft:10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  
 
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
});


const Todo = (props) => (
 <View style={styles.eachMsg}>
 <Image source={{ uri: `https://img.icons8.com/dusk/64/000000/${props.todo.text[0].toLowerCase()}.png`}} style={styles.userPic} />
    <View style={styles.msgBlock}>
       <Text style={styles.msgTxt}>{props.todo.text}</Text>
  </View>
</View>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      textInput: '',
      mtg: false,
      data: [],
      textinbox: '',
      refresh:true,
    };
  }

  componentDidMount() {
    fetch(`http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/chat_list/${teamid}/`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.reverse() ,});
        //console.log(json);

        for (let i = 0; i < this.state.data.length; i++) {
          let a = { id: id++, text: this.state.data[i]['chat_text'] };
          this.setState({ todos: [...this.state.todos, a] });
          //console.log(a);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
      this.interval = setInterval(this.refresh, 1000 )
  } 

  componentWillUnmount() {
    this.setState({ mtg: false});
    clearInterval(this.interval)


  }

  addTodo(props) {
    const text = props;
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text }],
      textinbox: '',
    });

    fetch(
      'http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/post_chat/',
      {
        method: 'POST', //Request Type
        body: JSON.stringify({ chat_text: text , "team_id":teamid}), //chat data that you want to send
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
         
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }

  typingHandler = (value) => {
    const text = userid + ': ' + value;
    this.setState({ textInput: text, textinbox: this.value });
  };

  maintogo = () => {
    this.setState({ mtg: true , refresh:false});
    clearInterval(this.interval)
  };

  refresh= () => {
    let b =[];
    for (let i = 0; i<this.state.todos.length; i++){
      b.push(this.state.todos[i]["text"])
   
    }
    fetch(`http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/chat_list/${teamid}/`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.reverse()});
        console.log(json);

      for( let i = 0; i<this.state.data.length ; i++){
      let a=({id:id++, text: this.state.data[i]["chat_text"]});
      if (!b.includes(a["text"])){this.setState({todos: [...this.state.todos, a],});}
      
    }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }


  render() {
    
    if (this.state.mtg) return <MainScreen />;
   
    if (!this.state.mtg){

    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text style={styles.paragraph}>Team Chat</Text>
      
        <ScrollView style={styles.fill} 
        ref={ref => {this.scrollView = ref}}
        onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
          
          {this.state.todos.map((todo) => (
            <Todo todo={todo} />
          ))}

        </ScrollView>

        <View style={styles.fixToText}>
          <TextInput
            placeholder="Enter Message"
            onChangeText={this.typingHandler}
            value={this.state.textinbox}
            style={{ borderWidth: 1, flex: 1 }}
            onSubmitEditing={() => this.addTodo(this.state.textInput)}
          />

            <TouchableOpacity
            style={[
              styles.buttonprop,
              { height: devicedimen.height * 0.05, justifyContent: 'center' },
            ]}
            onPress={() => this.addTodo(this.state.textInput)}>
            <Text style={{ color: 'white' }}>  Send  </Text>
          </TouchableOpacity>
          
        </View>

        <Text> </Text>
        
        <TouchableOpacity
          style={[styles.buttonContainer, styles.buttonprop]}
          onPress={() => this.maintogo()}>
          <Text style={{ color: 'white' }}>Back</Text>
        </TouchableOpacity>
      
      </View>
    );
    }
  }
}
