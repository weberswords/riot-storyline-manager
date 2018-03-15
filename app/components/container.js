import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Level from './level.js';
import TimeRange from './timeRange.js';

// let Accordion = require('react-bootstrap').Accordion;
// let Panel = require('react-bootstrap').Panel;
let Button = require('react-bootstrap').Button;
let FileSaver = require('file-saver');

const defaults = {
    time: "00:00.000",
    enabled: true,
    videoPath: "vid/file/path",
    audioPath: "audio/file/path"
}

const createDefaultBranch = () => {
    return {
        start: defaults.time,
        end: defaults.time,
        enabled: defaults.enabled,
        outcome: null
    };
}

const createDefaultBranchesObject = () => {
    const emotions = ["anger", "fear", "calm", "disgust", "contempt", "surprise"];
    
    let branches = {}
    emotions.forEach((emotion) => branches[emotion] = createDefaultBranch());
    return branches;
}

const createDefaultLevelsObject = (numLevels) => {
    const populatedLevels = {};

    for (let i = 1; i <= numLevels; i++) {
        const levelId = "level" + i;
        
        populatedLevels[levelId] =  {
            index: i,
            start: defaults.time,
            end: defaults.time,
            branches: createDefaultBranchesObject()
        };
    }
    return populatedLevels;
}


export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: {
                video: defaults.videoPath,
                audio: defaults.audioPath
            },
            intros: {},
            credits: {},
            levels: createDefaultLevelsObject(this.props.numLevels)
        }

        // OTHER CHANGES
        this.handleMediaInputChange = this.handleMediaInputChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);

        // SLIDE CHANGES
        this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);

        // OTHER THINGS
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeDisabledBranches = this.removeDisabledBranches.bind(this);
        this.addSlide = this.addSlide.bind(this);
    }

    handleMediaInputChange(event) {
        const value = event.target.value;
        let updatedMedia = this.state.media;
        updatedMedia[event.target.name] = value;

        this.setState({
            media: updatedMedia
        });
    }

    handleTimeRangeChange(stateType, id, value) {
        let slidesCopy = Object.assign({}, this.state[stateType]);

        slidesCopy[id] = {
            start: value[0],
            end: value[1]
        }

        this.setState({
            [stateType]: slidesCopy
        });
    }

    handleLevelChange(levelId, name, value) {
        let levelsCopy = Object.assign({}, this.state.levels);

        if (name === "range") {
            levelsCopy[levelId].start = value[0];
            levelsCopy[levelId].end = value[1];
        }
        else {
            levelsCopy[levelId][name] = value;
        }

        this.setState({
            levels: levelsCopy
        });
    }

    addSlide(event) {
        let stateType = event.target.name; // credits or intros
        let slidesCopy = Object.assign({}, this.state[stateType]);

        const timeRangeId = Object.keys(slidesCopy).length;

        slidesCopy[timeRangeId] = {
            start: defaults.time,
            end: defaults.time
        };

        this.setState({
            [stateType]: slidesCopy
        });
    }

    removeDisabledBranches() {
        let updatedLevels = Object.assign({}, this.state.levels);

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

        let configJSON = JSON.stringify(this.state, null, 2);
        // alert(configJSON);
        let blob = new Blob([configJSON], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "config.json");
    }

    render() {
        const levels = this.state.levels;
        const video = this.state.media.video;
        const audio = this.state.media.audio;
        const intros = this.state.intros;
        const credits = this.state.credits;

        return (
            <div id="container">
                <form onSubmit={this.handleSubmit}>
                    <label>Video File: </label> <input name="video" type="text" value={video} placeholder={video} onChange={this.handleMediaInputChange}/>
                    <label>Audio File: </label> <input name="audio" type="text"  value={audio} placeholder={audio} onChange={this.handleMediaInputChange}/>
                    <br/>

                    <Button name="intros" bsStyle="primary" onClick={this.addSlide}>Add Intro Slide</Button>
                    <div> 
                        { Object.keys(intros).map((timeRangeId,_) =>
                            <TimeRange name="intros" id={timeRangeId} range={[intros[timeRangeId].start, intros[timeRangeId].end]} onChange={this.handleTimeRangeChange}/>
                        )}
                    </div>

                    <div>
                        { Object.keys(levels).map((levelId,_) =>
                            <Level levelIndex={levels[levelId].index} numLevels={this.props.numLevels} onChange={this.handleLevelChange} range={[levels[levelId].start,levels[levelId].end]} branches={levels[levelId].branches}/>
                        )}
                    </div>

                    <Button name="credits" bsStyle="primary" onClick={this.addSlide}>Add Credit Slide</Button>
                    <div> 
                        { Object.keys(credits).map((timeRangeId,_) =>
                            <TimeRange name="credits" id={timeRangeId} range={[credits[timeRangeId].start, credits[timeRangeId].end]} onChange={this.handleTimeRangeChange}/>
                        )}
                    </div>

                    <Button type="submit" name="export" bsStyle="primary">Export</Button>
                </form>
            </div>
        );
    }
}