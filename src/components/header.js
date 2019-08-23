import React, { Component } from 'react'

import todos from '../models/todos'

import '../styles/header.css';
import Container from '@material-ui/core/Container';

export class Header extends Component {

    constructor(props){
        super(props);
        this.state = {todo: ''}; // initiate todo variable

        // bind this into function
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 
     * Store input value into state.
     * 
     * @param {*} event 
     */
    handleChange(event) {
        this.setState({todo: event.target.value});
    }

    /**
     * Add item and sent into database, auto upload(later moved)
     */
    async handleSubmit(){
        if(!this.state.todo)
            return false;
            
        await todos.addItem({
            todo: this.state.todo,
            status: -1, // -1 for new, 0 for read, 1 for done
            tags: ['asdf', 'jkl', 'qwe'] // not yet implemented
        });
        this.setState({todo: ''});
        await todos.upload();
    }

    render() {
        return (
            <div className="header-box">
                <Container maxWidth="md">
                    <form onSubmit={e => {e.preventDefault()}}>
                        <input type="text" placeholder="Add To do Here... ex. 'feed the cat'" value={this.state.todo} onChange={this.handleChange} onKeyUp={ e => {if(e.key === 'Enter') this.handleSubmit(e);}}/>
                    </form>
                </Container>
            </div>
        )
    }
}

export default Header
