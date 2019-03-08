import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../redux/actions/eventActions';
import { logout } from '../redux/actions/auth';
import EventItem from './EventItem';

class Events extends Component {
  componentWillMount() {
    this.props.getEvents();
  }

  render() {
    const events = this.props.events.map(event =>
      <EventItem key={event._id} event={event} />);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <input type="button" className="btn btn-info " style={{ margin: "1em" }}
            onClick={this.props.logout} value="Log Out" />
        </div>
        {events}
      </div >)
  }
}
const mapStateToProps = state => ({
  events: state.events.items
})
export default connect(mapStateToProps, { getEvents, logout })(Events);