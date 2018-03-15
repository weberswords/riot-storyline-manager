import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default class TimeRange extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const value = event.target.name === "start" ? [event.target.value, this.props.range[1]] : [this.props.range[0], event.target.value];

		console.log(this.props.name, value);
		this.props.onChange(this.props.name, value);
	}

	render() {
		return (
			<div>
				<label> Start Time: </label> 
                <input name="start" type="text" placeholder={this.props.range[0]} value={this.props.range[0]} onChange={this.handleInputChange}/>

                <label> End Time: </label> 
                <input name="end" type="text" placeholder={this.props.range[1]} value={this.props.range[1]} onChange={this.handleInputChange}/>
			</div>
		);
	}
}