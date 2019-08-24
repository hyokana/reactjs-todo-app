import React, { Component } from 'react'

import Container from '@material-ui/core/Container'

export class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.uploaddata;
    }
      
    static getDerivedStateFromProps = (props, state) => {
        return props.uploaddata;
    }

    render() {
        return (
            <Container maxWidth="md">
                {(!this.state.notuploaded) ? 'Yay! all my task syncronize with server!' : this.state.notuploaded + ' task(s) not uploaded.'}
            </Container>
        )
    }
}

export default Footer
