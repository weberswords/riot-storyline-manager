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

function createDefaultBranch(emotion) {
    var branch = new Object();
    branch.start = defaults.time;
    branch.end = defaults.time;
    branch.enabled = defaults.enabled;
    branch.outcome = null;    
    return branch;
}


function createDefaultBranchesObject() {
    const branches = ["anger", "fear", "calm", "disgust", "contempt", "surprise"];
    var populatedBranches = new Object();

    for (var i=0; i<branches.length;i++) {
        var branch = createDefaultBranch(branches[i]);
        populatedBranches[branches[i]] = branch;
    }

    return populatedBranches;
}

function createDefaultLevelsObject(numLevels) {
    var populatedLevels = new Object();

    for (var i=1; i<=numLevels;i++) {
        var levelId = "level" + i;
        var level = new Object();

        level.index = i;
        level.start = defaults.time;
        level.end = defaults.time;
        level.branches = createDefaultBranchesObject();

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
        this.handleBranchInputChange = this.handleBranchInputChange.bind(this);
    }

    handleBranchInputChange(event) {
        const name = event.target.name;
        const value = event.target.name === "enabled" ? !this.props.value.enabled : event.target.value;
        this.props.onChange(this.props.emotion, name, value);
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
                    <label> Start Time: </label> <input name="start" type="text" label="start time" placeholder={branch.start} value={branch.start} onChange={this.handleBranchInputChange}/>
                    <label> End Time: </label> <input name="end" type="text" label="end time" placeholder={branch.end} value={branch.end} onChange={this.handleBranchInputChange}/>
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
                <input type="checkbox" name="enabled" bsStyle="primary" bsSize="large" onClick={this.handleBranchInputChange}/><span> Disable </span>
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
        this.handleLevelInputChange = this.handleLevelInputChange.bind(this);
        this.handleBranchChange = this.handleBranchChange.bind(this);
        this.handleEnableToggle = this.handleEnableToggle.bind(this);
    }

    handleLevelInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const levelId = "level" + this.props.levelIndex;

        this.props.onChange(levelId, name, value);
    }

    handleEnableToggle(branches, emotion, value) {
        if (value === "true") {
            var branch = createDefaultBranch(emotion);
            branches[emotion] = branch;
        } else {
            delete branches[emotion];
        }
    }

    handleBranchChange(emotion, name, value) {
        var branches = Object.assign({}, this.props.branches);

        if (name === "enabled") {
            // this.handleEnableToggle(branches, emotion, value);
            branches[emotion][name] = value;
        } else {
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
        this.removeDisabledBranches = this.removeDisabledBranches.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        var updatedMedia = this.state.media;
        updatedMedia[event.target.name] = value;

        this.setState({
            media: updatedMedia
        });
    }

    handleLevelChange(levelId, name, value) {
        var levelsCopy = Object.assign({}, this.state.levels);
        
        var level = levelsCopy[levelId];
        level[name] = value;

        levelsCopy[levelId] = level;

        this.setState({
            levels: levelsCopy
        });
    }

    removeDisabledBranches() {
        var updatedLevels = Object.assign({}, this.state.levels);

        Object.keys(updatedLevels).map( function(levelId,_) {

            Object.keys(updatedLevels[levelId].branches).map( function(emotion,_) {

                if (!updatedLevels[levelId].branches[emotion].enabled) {
                    delete updatedLevels[levelId].branches[emotion];
                }

            });

        });

        this.setState({
            levels: updatedLevels
        });
    }

    handleSubmit(event) {
        this.removeDisabledBranches();
        event.preventDefault();

        var configJSON = JSON.stringify(this.state, null, 2);
        // alert(configJSON);
        var blob = new Blob([configJSON], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "config.json");
    }

    render() {
        const levels = this.state.levels;
        const video = this.state.media.video;
        const audio = this.state.media.audio;

        return (
            <div id="container">
                <form onSubmit={this.handleSubmit}>
                    <label>Video File: </label> <input name="video" type="text" value={video} placeholder={video} onChange={this.handleInputChange}/>
                    <label>Audio File: </label> <input name="audio" type="text"  value={audio} placeholder={audio} onChange={this.handleInputChange}/>
                    <br/>
                    <div>
                        { Object.keys(levels).map((levelId,_) =>
                            <Level levelIndex={levels[levelId].index} numLevels={this.props.numLevels} onChange={this.handleLevelChange} start={levels[levelId].start} end={levels[levelId].end} branches={levels[levelId].branches}/>
                        )}
                    </div>
                    <Button type="submit" name="export" bsStyle="primary">Export</Button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<Container numLevels={3}/>, document.getElementById('app'));