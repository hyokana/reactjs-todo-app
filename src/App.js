import React from 'react';

import Header from './components/header'
import Footer from './components/footer'
import TodoComponent from './components/todocomponent'

import todos from './models/todos'

import './styles/app.css';
import { Container, List } from '@material-ui/core';
  
class App extends React.Component {

    state = {todo: '', id: '', tags: [], status: -1};

    constructor(props) {
        super(props);
        this.updateTodo = this.updateTodo.bind(this);
        this.editTodo   = this.editTodo.bind(this);
        this.resetTodo   = this.resetTodo.bind(this);
      }

    render() {
                
        var eltodos = [];
        for(var i of todos.data){
            eltodos.push(<TodoComponent key={i._id} data={i} editTodo={this.editTodo} />);
        }

        return (
            <div>
                <Header todo={this.state} resetTodo={this.resetTodo} updateTodo={this.updateTodo}/>

                <Container maxWidth="md">
                    <List>
                        {eltodos}
                    </List>
                </Container>

                <Footer uploaddata={{notuploaded: todos.countUnuploadeds()}}/>
            </div>
        );
    }
    
    updateTodo(data){
        this.setState(data);
    }

    editTodo(data){
        this.setState({
            id: data._id,
            todo: data.todo,
            tags: data.tags
        });
    }

    resetTodo(){
        this.setState({todo: '', id: '', tags: [], status: -1});
    }

	async componentDidMount() {
        this.unsubTodos = todos.subscribe(() => {
            this.setState({
                timestamp: new Date(),
            });
        });
		if (!todos.isInitialized) {
            todos.setName("hg_todos");
            await todos.initialize();
		}
	}

	async componentWillUnmount() {
        this.unsubTodos();
        await todos.deinitialize();
    }

}

export default App;
