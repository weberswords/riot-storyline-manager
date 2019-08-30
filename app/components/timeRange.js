import React from 'react';

import { isValidInput, endIsLaterThanStart } from '../utilities/validators.js';

export default class TimeRange extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleInputChange = this.handleInputChange.bind(this);

		// VALIDATION
		this.validateInput = this.validateInput.bind(this);
		this.validateEndAndStart = this.validateEndAndStart.bind(this);
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
		return (isValidInput(this.props.range, this.props.numFrames))	? ({display: "none"})
																		: ({display: "inline", color:"red"});
	}

	validateEndAndStart() {
		return (!isValidInput(this.props.range, this.props.numFrames)
			|| endIsLaterThanStart(this.props.range))   ? ({display: "none"})
														: ({display: "inline", color:"red"});
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
                	&nbsp; valid format is MM:SS.FF (with seconds between 0 and 59 and frames between 0 and {this.props.numFrames})
                </span>
                <span id="endAndStartValidator" style={this.validateEndAndStart()}>
                    &nbsp; end timestamp must be after (or equal to) start timestamp
                </span>

			</div>
		);
	}
}
