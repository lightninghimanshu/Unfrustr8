import React from 'react';
import {
  View,
  Button,
  Text,
  Alert,
  ScrollView,
  Switch,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import MainScreen from './Main.js';
import Appmain,{userid,teamid} from './App.js';




const devicedimen = Dimensions.get('window');


let id = 1;

let a = [];


  const checkcomp = (item) => {
    if(item == true) {
      return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
    } else {
      return "https://img.icons8.com/flat_round/64/000000/delete-sign.png";
    }
  }

  const  _textstyle = (item) => {
    if(item == true) {
      return {textDecorationLine:"line-through", fontStyle:'italic', color:"#808080"};
    }
  } 



const styles = StyleSheet.create({
  
  cardContent: {
    marginLeft:20,
    marginTop:10,
  },
  image:{
    width:25,
    height:25,
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row',
    flexWrap: 'wrap',
    borderLeftWidth:6,
  },

  description:{
    fontSize:18,
    flex:1,
    color:"#008080",
    fontWeight:'bold',
  },
 
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
  fill: {
    flex: 1,
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
    paddingBottom: 70,
    paddingHorizontal: 30,
  },
});

const Todo = (props) => (
  <TouchableOpacity style={[styles.card,]} onPress={props.onToggle} onLongPress={props.onDelete}>
              <Image style={styles.image} source={{uri: checkcomp(props.todo.checked)}}/>
              <View style={styles.cardContent}>
                <Text style={[styles.description, _textstyle(props.todo.checked)]}>{props.todo.text}</Text>
              </View>
</TouchableOpacity>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      textInput: '',
      mtg: false,
      textinbox: '',
    };
  }

  componentDidMount() {
    fetch(
      `http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/Todo_list/${teamid}/`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.reverse() });
        console.log(json);

        for (let i = 0; i < this.state.data.length; i++) {
          a = {
            id: id++,
            text: this.state.data[i]['todo_text'],
            checked: this.state.data[i]['checked'],
          };
          this.setState({ todos: [...this.state.todos, a] });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  componentWillUnmount() {
    this.setState({ mtg: false });
  }

//NEW








  addTodo(props) {
    let text = props;
    console.log(userid);
    fetch(
      'http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/Todo_create/',
      {
        method: 'POST',
        body: JSON.stringify({
          todo_text: text,
          checked: false,
          team_id: teamid,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())

      .then((responseJson) => {
        console.log(responseJson);
      })

      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });

    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }],
      textinbox: '',
    });
  }

  removeTodo(id) {
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i]['id'] == id) {
        var text_in_todo = this.state.todos[i]['text'];
      }
    }

    var url =
      'http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/Todo_delete/';

    var complete_url = url + text_in_todo + '/' + teamid + '/';

    fetch(complete_url, {
      method: 'DELETE',
    })
      .then((response) => response.json())

      .then((responseJson) => {
        console.log(responseJson);
      })

      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });

    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  toggleTodo(id) {
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i]['id'] == id) {
        var text_in_todo = this.state.todos[i]['text'];
        var checked = this.state.todos[i]['checked'];
      }
    }

    this.setState({
      todos: this.state.todos.map((todo) => {
        if (id !== todo.id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        };
      }),
    });

    var url =
      'http://ec2-52-203-153-53.compute-1.amazonaws.com:8001/api/user/Todo_update/';

    var complete_url = url + text_in_todo + '/' + teamid + '/';

    fetch(complete_url, {
      method: 'PUT',
      body: JSON.stringify({
        checked: !checked,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())

      .then((responseJson) => {
        console.log(responseJson);
      })

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
    this.setState({ mtg: true });
  };

  render() {
    if (this.state.mtg) return <MainScreen />;
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text style={styles.paragraph}>Lets Complete them all</Text>
        <Text style={{paddingBottom:10,paddingLeft:10}}>Todo Count: {this.state.todos.length}</Text>
        <Text style={{paddingBottom:10,paddingLeft:10}}>
          Total UnChecked:{' '}
          {this.state.todos.filter((todo) => !todo.checked).length}
        </Text>

        <ScrollView style={styles.fill}>
          {this.state.todos.map((todo) => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>

        <View style={styles.fixToText}>
          <TextInput
            placeholder="Todo"
            onChangeText={this.typingHandler}
            value={this.state.textinbox}
            style={{ borderWidth: 1, flex: 1 }}
          />
          <TouchableOpacity
            style={[
              styles.buttonprop,
              { height: devicedimen.height * 0.05, justifyContent: 'center' },
            ]}
            onPress={() => this.addTodo(this.state.textInput)}>
            <Text style={{ color: 'white' }}>  Add Todo  </Text>
          </TouchableOpacity>
        </View>
<Text style={{paddingBottom:10,paddingLeft:10,fontWeight:"bold"}}> *LongPress to delete</Text>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.buttonprop]}
          onPress={() => this.maintogo()}>
          <Text style={{ color: 'white' }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
