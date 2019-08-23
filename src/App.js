import React from 'react';

import Header from './components/header'
import Footer from './components/footer'
import TodoComponent from './components/todocomponent'

import todos from './models/todos'

import './styles/app.css';
import { Container, List } from '@material-ui/core';
  
class App extends React.Component {

    render() {
                
        var eltodos = [];
        for(var i of todos.data){
            eltodos.push(<TodoComponent key={i._id} data={i} />);
        }

        return (
            <div>
                <Header/>

                <Container maxWidth="md">
                    <List>
                        {eltodos}
                    </List>
                </Container>

                <Footer/>
            </div>
        );
    }

    componentDidUpdate() {
        console.log("Component Did Update...");
    }
    
	async componentDidMount() {
        console.log("Component Did Mount...");
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

	componentWillUnmount() {
        console.log("Component Will Unmount...");
		this.unsubTodos();
    }

}

export default App;
