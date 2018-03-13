import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

var Accordion = require('react-bootstrap').Accordion;
var Panel = require('react-bootstrap').Panel;
var Button = require('react-bootstrap').Button;
var FileSaver = require('file-saver');
var ReactBootstrapSlider = require('react-bootstrap-slider');


const defaults = {
    time: "00:00.000",
    enabled: true,
    videoPath: "vid/file/path",
    audioPath: "audio/file/path"
}

const branches = ["anger", "fear", "calm", "disgust", "contempt", "surprise"];

const defaultBranchesObject = (function() {
    var populatedBranches = new Object();

    for (var i=0; i<branches.length;i++) {
        var branch = new Object();
        branch.start = defaults.time;
        branch.end = defaults.time;
        branch.enabled = defaults.enabled;
        branch.outcome = null;

        populatedBranches[branches[i]] = branch;
    }

    return populatedBranches;
})();

function createDefaultLevelsObject(numLevels) {
    var populatedLevels = new Object();

    for (var i=1; i<=numLevels;i++) {
        var levelId = "level" + i;
        var level = new Object();
        level.start = defaults.time;
        level.end = defaults.time;
        level.branches = defaultBranchesObject;

        populatedLevels[levelId] = level;
    }

    return populatedLevels;
}

//******************************************************************
//
// BRANCH
//
//******************************************************************
class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: true,
            start: defaults.time,
            end: defaults.time,
            outcome: null
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleBranchInputChange = this.handleBranchInputChange.bind(this);
    }

    handleBranchInputChange(event) {
        const value = event.target.value;

        this.setState({
            [event.target.name]: value
        });

        console.log(this.state);
        this.props.onChange(this.props.emotion, this.state);
    }

    handleToggle() {
        this.setState({
            enabled: !this.state.enabled
        });
    }

    getOtherLevelIndices() {
        return Array(this.props.numLevels).fill()
                                          .map((_, i) => i+1)
                                          .filter(index => index !== this.props.parentIndex);
    }

    branch() {
        const otherLevelIndices = this.getOtherLevelIndices();
        const emotionWithIndex = this.props.emotion + this.props.parentIndex;

        if (otherLevelIndices.length > 0) {
            if (this.state.enabled) {
                return (
                    <div>
                        <input name="enabled" type="hidden" value={this.state.enabled} />
                        <label> Start Time: </label> <input name="start" type="text" label="start time" placeholder={this.state.start} value={this.state.start} onChange={this.handleBranchInputChange}/>
                        <label> End Time: </label> <input name="end" type="text" label="end time" placeholder={this.state.end} value={this.state.end} onChange={this.handleBranchInputChange}/>
                        <select name="outcome" value={this.state.outcome} onChange={this.handleBranchInputChange}>
                            { otherLevelIndices.map((i) => <option value={i}>Level {i}</option>) }
                        </select>
                    </div>
                );
            }
            return(null);
        }
        return null;
    }

    render() {
        return(
            <div>
                <h6> {this.props.emotion} Branch </h6>
                <input type="checkbox" bsStyle="primary" bsSize="large" onClick={this.handleToggle}/><span> Disable </span>
                { this.branch() }
            </div>
        );
    }
}


//******************************************************************
//
// LEVEL
//
//******************************************************************
class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: defaults.time,
            end: defaults.time,
            branches: defaultBranchesObject
        }
        this.handleLevelInputChange = this.handleLevelInputChange.bind(this);
        this.handleBranchChange = this.handleBranchChange.bind(this);
    }

    handleLevelInputChange(event) {
        const value = event.target.value;

        this.setState({
            [event.target.name]: value
        });

        var levelId = "level" + this.props.levelIndex;
        this.props.onChange(levelId, this.state);
    }

    handleBranchChange(branchId, branch) {
        this.setState({
            [branchId]: branch
        })
    }

    render() {
        const index = this.props.levelIndex;
        return (
            // <Panel header="Level {this.props.levelIndex}" eventKey={this.props.levelIndex}>
                <div className="level" id="level{this.props.levelIndex}">
                    <h3> Level {this.props.levelIndex} </h3>
                    <div className="content">
                        <label> Start Time: </label><input name="start" type="text" placeholder={this.state.start} value={this.state.start} onChange={this.handleLevelInputChange}/>
                        <label> End Time: </label><input name="end" type="text" placeholder={this.state.end} value={this.state.end} onChange={this.handleLevelInputChange}/>

                        <Branch emotion={branches[0]} parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>,
                        <Branch emotion={branches[1]} parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>,
                        <Branch emotion={branches[2]} parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>,
                        <Branch emotion={branches[3]} parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>,
                        <Branch emotion={branches[4]} parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>,
                        <Branch emotion={branches[5]} parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} onChange={this.handleBranchChange}/>
                    </div>
                </div>
            // </Panel>
        );
    }
}

//******************************************************************
//
// CONTAINER
//
//******************************************************************

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: {
                video: defaults.videoPath,
                audio: defaults.audioPath
            },
            levels: createDefaultLevelsObject(this.props.numLevels)
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

    handleLevelChange(levelId, level) {
        var levelsCopy = Object.assign({}, this.state.levels);
        levelsCopy[levelId] = level;

        this.setState({
            levels: levelsCopy
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var configJSON = JSON.stringify(this.state, null, 2);

        var blob = new Blob([configJSON], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "config.json");

    }

    render() {
        const refName = (num) => ("level" + num);
        return (
            <div id="container">
                <form onSubmit={this.handleSubmit}>
                    <label>Video File: </label> <input name="video" type="text" value={this.state.media.video} placeholder={this.state.media.video} onChange={this.handleInputChange}/>
                    <label>Audio File: </label> <input name="audio" type="text"  value={this.state.media.audio} placeholder={this.state.media.audio} onChange={this.handleInputChange}/>
                    <br/>
                    <div>
                        { Array(this.props.numLevels).fill().map((_,index) =>
                            <Level levelIndex={index+1} numLevels={this.props.numLevels} onChange={this.handleLevelChange}/>
                        )}
                    </div>
                    <Button type="submit" name="export" bsStyle="primary">Export</Button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<Container numLevels={2}/>, document.getElementById('app'));