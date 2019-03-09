import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../redux/actions/eventActions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      location: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handletstarttimeChange = this.handletstarttimeChange.bind(this);
    this.handletendtimeChange = this.handletendtimeChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handletstarttimeChange(date) {
    this.setState({
      startDate: date
    });
  }

  handletendtimeChange(date) {
    this.setState({
      endtDate: date
    });
  }

  add() {
    this.props.addEvent(this.state);
    this.setState({
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      location: " "
    });
  }

  render() {
    return (
      <form style={{ width: "65%", margin: "auto" }}>
        <div className="form-inline" style={{ marginBottom: ".4em" }}>
          <label htmlFor="title" className="mr-sm-2">Event Title:</label>
          <input name="title" type="text" className="form-control" id="title" onChange={this.handleChange} value={this.state.title} />
        </div>
        <div className="form-inline" style={{ marginBottom: ".4em" }}>
          <label htmlFor="description" className="mr-sm-2">Event Description:</label>
          <textarea name="description" type="text" className="form-control" id="description" onChange={this.handleChange} value={this.state.description} />
        </div>
        <div className="form-inline">
          <label htmlFor="startDate" className="mr-sm-2">Start Date:</label>
          <DatePicker name="startDate" id="startDate" className="form-control mb-2 mr-sm-2" selected={this.state.startDate} timeCaption="time"
            onChange={this.handletstarttimeChange} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="MMMM d, yyyy h:mm aa" />
          <label htmlFor="endDate" className="mr-sm-2">End Date:</label>
          <DatePicker name="endDate" id="endDate" className="form-control mb-2 mr-sm-2" selected={this.state.endDate} timeCaption="time"
            onChange={this.handletendtimeChange} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="MMMM d, yyyy h:mm aa" />
        </div>
        <div className="form-inline" style={{ marginBottom: ".4em" }}>
          <label htmlFor="location" className="mr-sm-2">Event Location:</label>
          <input name="location" type="text" className="form-control" id="location" onChange={this.handleChange} value={this.state.location} />
        </div>
        <div style={{ textAlign: "center", justifyContent: "center", margin: "auto" }}>
          <input type="button" className="btn btn-primary" value="Add Event" onClick={() => { this.add() }} />
        </div>
      </form>
    )
  }
}

export default connect(null, { addEvent })(AddEvent);