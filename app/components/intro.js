import React from 'react';
import Container from './container.js';
import { Button } from 'react-bootstrap';

export default class Intro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numLevels: 3,
			numFrames: 24,
			hidden: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleIntroSubmit = this.handleIntroSubmit.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: Number(event.target.value)
		});
	}

	handleIntroSubmit() {
		this.setState({
			hidden: !this.state.hidden
		})
	}

	goBack() {
		this.setState({
			hidden: !this.state.hidden
		})
	}

	render() {
		if (!this.state.hidden) {
			return(
				<div id="intro">
					<form onSubmit={this.handleIntroSubmit}>
						<label>
						    How many levels? &nbsp;
						</label>
						<input type="number" min={1} max={20} name="numLevels"
						       value={this.state.numLevels} placeholder={this.state.numLevels}
						       onChange={this.handleInputChange}/><br/>
						<label>
						    How many frames per second is your video? &nbsp;
						</label>
						<input type="number" min={1} max={100} name="numFrames" value={this.state.numFrames}
						       placeholder={this.state.numFrames} onChange={this.handleInputChange}/><br/>
						<Button bsStyle="primary" type="submit">Start Configuring!</Button>
					</form>
				</div>
            );
		} else {
			return(		
				<div>		
					<Button name="goBack" bsStyle="primary" id="backButton" onClick={this.goBack}>Go Back</Button>
					<Container numLevels={this.state.numLevels} numFrames={this.state.numFrames} />
				</div>
			);
		}
	}
}