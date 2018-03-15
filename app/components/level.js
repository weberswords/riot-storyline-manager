import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Branch from './branch.js';

export default class Level extends React.Component {
    constructor(props) {
        super(props);
        this.handleLevelInputChange = this.handleLevelInputChange.bind(this);
        this.handleBranchChange = this.handleBranchChange.bind(this);
    }

    handleLevelInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const levelId = "level" + this.props.levelIndex;

        this.props.onChange(levelId, name, value);
    }

    handleBranchChange(emotion, name, value) {
        let branches = Object.assign({}, this.props.branches);
        branches[emotion][name] = value;

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
                        <label> Start Time: </label>
                        <input name="start" type="text" placeholder={this.props.start} value={this.props.start} onChange={this.handleLevelInputChange}/>

                        <label> End Time: </label>
                        <input name="end" type="text" placeholder={this.props.end} value={this.props.end} onChange={this.handleLevelInputChange}/>
                        
                        { Object.keys(branches).map((key,_) =>
                            <Branch emotion={key} value={branches[key]} parentIndex={levelIndex} numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>
                        )}
                    </div>
                </div>
            // </Panel>
        );
    }
}