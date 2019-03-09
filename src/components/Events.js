import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents, openEvent } from '../redux/actions/eventActions';
import { logout } from '../redux/actions/auth';
import AddEvent from './AddEvent';

class Events extends Component {
  componentWillMount() {
    this.props.getEvents();
  }

  render() {
    const events = this.props.events.map(event =>
      <div key={event._id} onClick={() => {
        this.props.openEvent(event);
        this.props.history.push('/event/' + event._id);
      }}>
        <h4>{event.title}</h4>
        <small>{event.description}</small>
        <h5>From: {event.startDate}   To: {event.endDate}</h5>
        <h5>Location: {event.location}</h5>
        <h6>BY: {event.username}</h6>
        <hr></hr>
      </div>);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <input type="button" className="btn btn-info" onClick={this.props.logout} value="Log Out" />
        </div>
        <AddEvent />
        <br></br>
        <div style={{ textAlign: "center", justifyContent: "center", margin: "auto" }}>
          {events}
        </div>
      </div >)
  }
}

const mapStateToProps = state => ({
  events: state.events.items
})
export default connect(mapStateToProps, { getEvents, logout, openEvent })(Events);