import React from 'react';
import TimeRange from './timeRange.js';

export default class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.handleBranchInputChange = this.handleBranchInputChange.bind(this);
        this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleTimeRangeChange(name, value) {
        this.props.onChange(this.props.emotion, name, value);
    }

    handleBranchInputChange(event) {
        this.props.onChange(this.props.emotion, event.target.name, event.target.value);
    }

    handleToggle() {
        this.props.onChange(this.props.emotion, "enabled", !this.props.value.enabled);
    }

    populateOutcomeList() {
        return Array(this.props.numLevels+1).fill().map((_, i) => i === 0 ? "Credits" : "Level " + i);
    }

    branch() {
        const outcomePossibilities = this.populateOutcomeList();
        const branch = this.props.value;

        if (branch.enabled) {
            return (
                <div>
                    &nbsp;Outcome:&nbsp;
                    <select name="outcome" id="outcome" value={branch.outcome} onChange={this.handleBranchInputChange}>
                        { outcomePossibilities.map((outcome,i) =>
                            i !== Number(this.props.parentIndex) ? <option value={i}>{outcome}</option> : null)}
                    </select>
                    <TimeRange name="range" range={[branch.start, branch.end]}
                               onChange={this.handleTimeRangeChange} numFrames={this.props.numFrames}/>
                </div>
            );
        }
        return null;
    }

    render() {
        return(
            <div id="branch">
                <h5> {this.props.emotion} Branch </h5>
                <input type="checkbox" name="enabled" onClick={this.handleToggle}/>
                <span> Disable </span>
                { this.branch() }
                <br/>
            </div>
        );
    }
}
