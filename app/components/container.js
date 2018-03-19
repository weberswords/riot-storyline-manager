import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Level from './level.js';
import TimeRange from './timeRange.js';
import Collapsible from 'react-collapsible';

import { convertToMillisecondsAndTrimState } from '../utilities/exportHelperFunctions'
import { defaultValues, createDefaultLevelsObject } from '../utilities/defaults';

import styles from '../style/index.css';

let Button = require('react-bootstrap').Button;
let FileSaver = require('file-saver');

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: {
                video: defaultValues.video,
                audio: defaultValues.audio
            },
            intros: {},
            credits: {},
            levels: createDefaultLevelsObject(this.props.numLevels)
        };

        // OTHER CHANGES
        this.handleMediaInputChange = this.handleMediaInputChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);

        // SLIDE CHANGES
        this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
        this.addSlide = this.addSlide.bind(this);
        this.deleteSlide = this.deleteSlide.bind(this);

        // EXPORT
        this.handleExport = this.handleExport.bind(this);
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
        let slidesCopy = JSON.parse(JSON.stringify(this.state[stateType]));

        slidesCopy[id] = {
            start: value[0],
            end: value[1]
        }

        this.setState({
            [stateType]: slidesCopy
        });
    }

    handleLevelChange(levelId, name, value) {
        let levelsCopy = JSON.parse(JSON.stringify(this.state.levels));

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
        const stateType = event.target.name; // credits or intros
        let slidesCopy = JSON.parse(JSON.stringify(this.state[stateType]));

        const stateTypes = this.state[stateType];
        let timeRangeId = null;

        if (Object.keys(stateTypes).length < 1) {
            timeRangeId = -1;
        }
        else {
            timeRangeId = Object.keys(stateTypes).reduce((a, b) => stateTypes[a] > stateTypes[b] ? a : b);
        }

        slidesCopy[parseInt(timeRangeId) + 1] = {
            start: defaultValues.time,
            end: defaultValues.time
        };

        this.setState({
            [stateType]: slidesCopy
        });
    }

    deleteSlide(event) {
        const stateType = event.target.name; // credits or intros
        const key = event.target.id;
        let slidesCopy = {};
        const allKeys = Object.keys(this.state[stateType]);

        for (const oneKey of allKeys) {
            if (oneKey != key) {
                slidesCopy[oneKey] = this.state[stateType][oneKey];
            }
            else {
            }
        }

        this.setState({
            [stateType]: slidesCopy
        });
    }

    handleExport(event) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        convertToMillisecondsAndTrimState(stateCopy, this.props.numFrames);

        event.preventDefault();

        let configJSON = JSON.stringify(stateCopy, null, 2);
        let blob = new Blob([configJSON], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "config.json");
    }

    render() {
        const levels = this.state.levels;
        const intros = this.state.intros;
        const credits = this.state.credits;

        return (
            <div id="container">
                <Collapsible trigger="Intro">
                    <Button name="intros" bsStyle="primary" onClick={this.addSlide}>
                        Add Intro Slide
                    </Button>
                    <br/>
                    <div> 
                        { Object.keys(intros).map((timeRangeId,_) =>
                            <div>
                                <TimeRange name="intros" id={timeRangeId} range={[intros[timeRangeId].start,
                                           intros[timeRangeId].end]} onChange={this.handleTimeRangeChange}/>
                                <Button name="intros" bsStyle="primary" id={timeRangeId}
                                        onClick={this.deleteSlide}>
                                    Delete Slide
                                </Button>
                            </div>
                        )}
                    </div>
                </Collapsible>
                    <div>
                        { Object.keys(levels).map((levelId,_) =>
                            <Level levelIndex={levels[levelId].index} numLevels={this.props.numLevels}
                                   onChange={this.handleLevelChange}
                                   range={[levels[levelId].start, levels[levelId].end]}
                                   branches={levels[levelId].branches}/>
                        )}
                    </div>
                    <Collapsible trigger="Credits">
                    <Button name="credits" bsStyle="primary" onClick={this.addSlide}>
                        Add Credit Slide
                    </Button>
                    <br/>
                    <div>
                        { Object.keys(credits).map((timeRangeId,_) =>
                            <div>
                                <TimeRange name="credits" id={timeRangeId} range={[credits[timeRangeId].start,
                                           credits[timeRangeId].end]} onChange={this.handleTimeRangeChange}/>
                                <Button name="credits" bsStyle="primary" id={timeRangeId}
                                    onClick={this.deleteSlide}>
                                    Delete Slide
                                </Button>
                            </div>
                        )}
                    </div>
                </Collapsible>
                <branches/>
                <Button onClick={this.handleExport} id="exportButton" name="export" bsStyle="primary">Export</Button>
            </div>
        );
    }
}