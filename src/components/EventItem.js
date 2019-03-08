import React, { Component } from 'react';

class EventItem extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.event.title}</h1>
            </div>
        )
    }
}

export default EventItem;