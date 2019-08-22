import React from 'react';

import Header from './components/header'
import Footer from './components/footer'
import TodoComponent from './components/todocomponent'

import todos from './models/todos'

class App extends React.Component {

    render() {
        var eltodos = [];
        for(var i of todos.data){
            eltodos.push(<TodoComponent key={i._id} data={i} />);
        }

        return (
            <div>
                <Header/>

                {eltodos}

                <Footer/>
            </div>
        );
    }

    async deinitialize(){
		await todos.deinitialize(); // to destroy database locally if it's needed
    }

    async componentDidUpdate() {
        console.log("Component Did Update...");
    }
    
	async componentDidMount() {
        console.log("Component Did Mount...");
        this.unsubTodos = todos.subscribe(this.rerender);
		if (!todos.isInitialized) {
            todos.setName("hg_todos");
            await todos.initialize();
		}
	}

	componentWillUnmount() {
        console.log("Component Will Unmount...");
		this.unsubTodos();
	}

    rerender = () => {
        this.setState({
          _rerender: new Date(),
        });
    }

}

export default App;
