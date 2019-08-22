import React, { Component } from 'react'

import todos from '../models/todos'

export class Header extends Component {

    constructor(props){
        super(props);
        this.state = {todo: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({todo: event.target.value});
    }

    async handleSubmit(){
        await todos.addItem({
            todo: this.state.todo,
            status: -1, // -1 for new, 0 for read, 1 for done
            tags: ''
        });
        this.setState({todo: ''});
        await todos.upload();
    }

    render() {
        return (
            <div>
                <form onSubmit={e => {e.preventDefault()}}>
                    <label>
                        Name:
                        <input type="text" value={this.state.todo} onChange={this.handleChange} onKeyUp={ e => {if(e.key === 'Enter') this.handleSubmit(e);}}/>
                    </label>
                    <input type="button" value="Submit" onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}

export default Header
