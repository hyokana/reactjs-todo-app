import React, { Component } from 'react'

import { ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, Paper, IconButton } from '@material-ui/core';
import { Edit, Delete, Done, ErrorOutline } from '@material-ui/icons';

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
    async handleToggle(id, status){
        await todos.editItem(id, {
            status: (status === 1 ? -1 : 1), // -1 for new, 0 for read, 1 for done
        });
        await todos.upload();
    }

    /**
     * Update props when page updated
     */
    static getDerivedStateFromProps = (props, state) => {
        return props.data;
    }

    async alertDelete(data){
        if(window.confirm('Are you sure you wish to delete this item?')){
            await todos.deleteItem(data._id);
            await todos.upload();
        }
    }

    editTodo(data){
        this.props.editTodo(data);
    }

    actionButton(){
        if(this.state.status === -1)
            return (
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={ _ => {this.editTodo(this.state)}}>
                        <Edit style={{color: '#16d9fc'}} />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={_ => {this.alertDelete(this.state)}}>
                        <Delete style={{color: '#fc165f'}} />
                    </IconButton>
                </ListItemSecondaryAction>
            )
    }

    render() {
        
        var list = {
            marginBottom: '5px'
        }

        return (
            <Paper>
                <ListItem style={list} dense button>
                    <ListItemIcon onClick={_ => {this.alertDelete(this.state)}}>
                        {(this.state.status > 0) ? <Done  style={{color: 'darkcyan'}}/> : <ErrorOutline style={{color: 'rgb(240, 170, 116)'}}/>}
                    </ListItemIcon>
                    <ListItemText onClick={_ => {this.handleToggle(this.state._id, this.state.status);}} primary={this.state.todo} secondary={(this.state.tags ? (this.state.tags).join(', ') : '')} />
                    {this.actionButton()}
                </ListItem>
            </Paper>
        )
    }
}

export default TodoComponent
