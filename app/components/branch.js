import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.handleBranchInputChange = this.handleBranchInputChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleBranchInputChange(event) {
        this.props.onChange(this.props.emotion, event.target.name, event.target.value);
    }

    handleToggle() {
        this.props.onChange(this.props.emotion, "enabled", !this.props.value.enabled);
    }

    getOtherLevelIndices() {
        return Array(this.props.numLevels).fill()
                                          .map((_, i) => i+1)
                                          .filter(index => index !== this.props.parentIndex);
    }

    branch() {
        const otherLevelIndices = this.getOtherLevelIndices();
        const branch = this.props.value;

        if (branch.enabled) {
            return (
                <div>
                    <label> Start Time: </label> 
                    <input name="start" type="text" placeholder={branch.start} value={branch.start} onChange={this.handleBranchInputChange}/>

                    <label> End Time: </label> 
                    <input name="end" type="text" placeholder={branch.end} value={branch.end} onChange={this.handleBranchInputChange}/>

                    <select name="outcome" value={branch.outcome} onChange={this.handleBranchInputChange}>
                        { otherLevelIndices.map((i) => <option value={i}>Level {i}</option>) }
                    </select>
                </div>
            );
        }
        return null;
    }

    render() {
        return(
            <div>
                <h6> {this.props.emotion} Branch </h6>
                <input type="checkbox" name="enabled" bsStyle="primary" bsSize="large" onClick={this.handleToggle}/><span> Disable </span>
                { this.branch() }
            </div>
        );
    }
}