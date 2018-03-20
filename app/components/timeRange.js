import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import { validateRangeInput } from '../utilities/validators.js';

import styles from '../style/index.css';

export default class TimeRange extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleInputChange = this.handleInputChange.bind(this);

		// VALIDATION
		this.validateInput = this.validateInput.bind(this);
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

	validateInput() {
		return validateRangeInput(this.props.range, this.props.numFrames);
	}

	render() {
		return (
			<div id="timeRangeDiv">
				<label> &nbsp; Start Time: &nbsp;</label>
                <input name="start" id="timeRange" type="text" placeholder="00:00.00" value={this.props.range[0]}
                       onChange={this.handleInputChange}/>

                <label> &nbsp; End Time: &nbsp;</label>
                <input name="end" id="timeRange" type="text" placeholder="00:00.00" value={this.props.range[1]}
                       onChange={this.handleInputChange}/>
                       
                <span id="formatvalidFormatator" style={this.validateInput()}>  
                	&nbsp; Input must be in this valid format: MM:SS.FF, and frame must between 1 and {this.props.numFrames} 
                </span>
			</div>
		);
	}
}