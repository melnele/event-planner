import React, { Component } from 'react';

class EventItem extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                <h3>{this.props.event.title}</h3>
                <p>{this.props.event.description}</p>
                <h5>From: {this.props.event.startDate}   To: {this.props.event.endDate}</h5>
                <h5>Location: {this.props.event.location}</h5>
                <h6>BY: {this.props.event.username}</h6>
            </div>
        )
    }
}

export default EventItem;