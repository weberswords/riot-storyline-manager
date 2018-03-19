import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import styles from '../style/index.css';

export default class TimeRange extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const value = event.target.name === "start" ? [event.target.value, this.props.range[1]] :
		                                              [this.props.range[0], event.target.value];
		if (this.props.name === "intros" || this.props.name === "credits") {
			this.props.onChange(this.props.name, this.props.id, value);
		} else {
			this.props.onChange(this.props.name, value);
		}
	}

	render() {

		return (
			<div id="timeRangeDiv">
				<form>
					<FormGroup controlId="formTimeRange" validationState="error">
				        <ControlLabel>Working example with validation</ControlLabel>
				        <FormControl type="text" name="start" value={this.props.range[0]} placeholder="Enter text" onChange={this.handleInputChange}/>
				        <FormControl.Feedback />
				        <HelpBlock>Validation is based on string length.</HelpBlock>
				    </FormGroup>
			    </form>
				<label> &nbsp; Start Time: &nbsp;</label>
                <input name="start" id="timeRange" type="text" placeholder="00:00.00" value={this.props.range[0]}
                       onChange={this.handleInputChange}/>

                <label> &nbsp; End Time: &nbsp;</label>
                <input name="end" id="timeRange" type="text" placeholder="00:00.00" value={this.props.range[1]}
                       onChange={this.handleInputChange}/>
			</div>
		);
	}
}