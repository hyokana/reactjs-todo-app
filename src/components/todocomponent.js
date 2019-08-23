import React, { Component } from 'react'

import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import todos from '../models/todos'

export class TodoComponent extends Component {
    
    constructor(props) {
      super(props);
      this.state = this.props.data;
    }

    /**
     * 
     * Proses selected item, from new/read into done.
     * 
     * @param {*} id 
     */
    async handleToggle(id){
        await todos.editItem(id, {
            status: 1, // -1 for new, 0 for read, 1 for done
        });
        await todos.upload();
    }

    static getDerivedStateFromProps = (props, state) => {
        return props.data;
    }

    render() {
        
        var list = {
            border: '1px solid #efefef',
            marginBottom: '5px'
        }

        return (
            <ListItem style={list} dense button onClick={_ => {this.handleToggle(this.state._id);}}>
                <ListItemText primary={this.state.todo} secondary={(this.state.tags ? (this.state.tags).join(', ') : '')} />
                <ListItemSecondaryAction>
                    <font style={{color: this.state.status > 0 ? 'darkcyan' : 'rgb(240, 170, 116)'}}>
                        {this.state.status > 0 ? 'Done!' : 'Not done yet'}
                    </font>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default TodoComponent
