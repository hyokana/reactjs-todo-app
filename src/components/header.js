import React, { Component } from 'react';
import Select from 'react-select';

import todos from '../models/todos'

import '../styles/header.css';
import { Container } from '@material-ui/core';


const options = [
    { value: 'housecare', label: 'Housecare' },
    { value: 'workstuff', label: 'Work Stuff' },
    { value: 'others', label: 'Others' },
];

export class Header extends Component {

    /**
     * 
     * Get data from parent, set resetTodo function
     * 
     * @param {*} props 
     */
    constructor(props){
        super(props);

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
     * Add item and sent into database, auto upload(later moved)
     */
    async handleSubmit(){
        if(!this.state.todo)
            return false;
        
        if(!this.state.id)
            await todos.addItem({
                todo: this.state.todo,
                status: -1,
                tags: this.state.tags
            });
        else
            await todos.editItem(this.state.id, {
                todo: this.state.todo,
                tags: this.state.tags
            });
        this.props.resetTodo(); 
        await todos.upload();
    }

    render() {
        const { tags } = this.state;
        return (
            <div className="header-box">
                <Container maxWidth="md" style={{marginBottom: '5px'}}>
                <Select
                    value={tags}
                    onChange={tags => {this.props.updateTodo({tags})}}
                    options={options}
                    isMulti
                    placeholder={'Select tags... ex. Housecare'}
                />
                </Container>
                <Container maxWidth="md">
                    <form onSubmit={e => {e.preventDefault()}}>
                        <div style={{width: '100%'}}>
                            <input type="text" placeholder="Add To do Here... ex. 'feed the cat'" value={this.state.todo} onChange={_ => {this.props.updateTodo({todo: _.target.value})}} onKeyUp={ e => {if(e.key === 'Enter') this.handleSubmit(e);}}/>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default Header
