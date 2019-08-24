import React, { Component } from 'react'

import todos from '../models/todos'

import '../styles/header.css';
import Container from '@material-ui/core/Container';

export class Header extends Component {

    /**
     * 
     * Get data from parent, set resetTodo function
     * 
     * @param {*} props 
     */
    constructor(props){
        super(props);

        console.log(props);

        // set initial variable
        this.state = props.todo;
        // bind this into function
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    /**
     * Update props when page updated
     */
    static getDerivedStateFromProps = (props, state) => {
        return props.todo;
    }

    /**
     * 
     * Store select value into state. Tags purpose
     * 
     * @param {*} event 
     */
    handleChangeSelect(event) {
        this.setState({tags: event.target.value});
    }

    /**
     * Add item and sent into database, auto upload(later moved)
     */
    async handleSubmit(){
        if(!this.state.todo)
            return false;
        
        if(!this.state.id)
            await todos.addItem({
                todo: this.state.todo,
                status: -1, // -1 for new, 0 for read, 1 for done
                tags: ['asdf', 'jkl', 'qwe'] // not yet implemented
            });
        else
            await todos.editItem(this.state.id, {
                todo: this.state.todo,
                status: -1, // -1 for new, 0 for read, 1 for done
                tags: this.state.tags // not yet implemented
            });
        this.props.resetTodo(); 
        await todos.upload();
    }

    render() {
        return (
            <div className="header-box">
                <Container maxWidth="md">
                    <form onSubmit={e => {e.preventDefault()}}>
                        <input type="text" placeholder="Add To do Here... ex. 'feed the cat'" value={this.state.todo} onChange={_ => {this.props.updateTodo({todo: _.target.value})}} onKeyUp={ e => {if(e.key === 'Enter') this.handleSubmit(e);}}/>
                    </form>
                </Container>
            </div>
        )
    }
}

export default Header
