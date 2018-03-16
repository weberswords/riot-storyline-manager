import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Branch from './branch.js';
import TimeRange from './timeRange.js';

export default class Level extends React.Component {
    constructor(props) {
        super(props);
        this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
        this.handleBranchChange = this.handleBranchChange.bind(this);
    }

    handleTimeRangeChange(name, value) {
        const levelId = "level" + this.props.levelIndex;

        this.props.onChange(levelId, name, value);
    }

    handleBranchChange(emotion, name, value) {
        let branches = Object.assign({}, this.props.branches);

        if (name === "range") {
            branches[emotion].start = value[0];
            branches[emotion].end = value[1];
        }
        else {
            branches[emotion][name] = value;
        }

        const levelId = "level" + this.props.levelIndex;
        this.props.onChange(levelId, "branches", branches);
    }

    render() {
        const levelIndex = this.props.levelIndex;
        const levelId = "level" + levelIndex;
        const branches = this.props.branches;

        return (
            // <Panel header="Level {this.props.levelIndex}" eventKey={this.props.levelIndex}>
                <div className="level" id={levelId}>
                    <h3> Level {levelIndex} </h3>
                    <div className="content">
                        <TimeRange name="range" range={this.props.range} onChange={this.handleTimeRangeChange} />
                        
                        { Object.keys(branches).map((key,_) =>
                            <Branch emotion={key} value={branches[key]} parentIndex={levelIndex}
                                    numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>
                        )}
                    </div>
                </div>
            // </Panel>
        );
    }
}