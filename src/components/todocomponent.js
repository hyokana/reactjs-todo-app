import React, { Component } from 'react'

export class TodoComponent extends Component {
    
    constructor(props) {
      super(props);
      this.state = this.props.data;
    }

    render() {
        return (
            <div>
                {this.state.todo}
            </div>
        )
    }
}

export default TodoComponent
