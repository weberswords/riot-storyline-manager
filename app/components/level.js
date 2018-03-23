import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Branch from './branch.js';
import TimeRange from './timeRange.js';
import Collapsible from 'react-collapsible';

export default class Level extends React.Component {
    constructor(props) {
        super(props);
        this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
        this.handleBranchChange = this.handleBranchChange.bind(this);
    }

    handleTimeRangeChange(name, value) {

        this.props.onChange(this.props.levelIndex, name, value);
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

        this.props.onChange(this.props.levelIndex, "branches", branches);
    }

    render() {
        const levelIndex = this.props.levelIndex;
        const branches = this.props.branches;
        const triggerName = "Level " + levelIndex;

        return (
                <div className="level" id={levelIndex}>
                    <Collapsible trigger={triggerName}>
                        <div className="content">
                            <TimeRange name="range" range={this.props.range} onChange={this.handleTimeRangeChange}
                                       numFrames={this.props.numFrames}/>
                            { Object.keys(branches).map((key,_) =>
                                <Branch emotion={key} value={branches[key]} parentIndex={levelIndex}
                                        numLevels={this.props.numLevels} onChange={this.handleBranchChange}
                                        numFrames={this.props.numFrames}/>
                            )}
                        </div>
                    </Collapsible>
                </div>
        );
    }
}