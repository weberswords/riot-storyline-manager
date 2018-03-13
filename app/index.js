import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
var Accordion = require('react-bootstrap').Accordion;
var Panel = require('react-bootstrap').Panel;
var Button = require('react-bootstrap').Button;

function handleInputChange(event) {
    const value = event.target.value;
    console.log(value);

    this.setState({
        [event.target.name]: value
    });
}

class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: true,
            start: "00:00.000",
            end: "00:00.000",
            outcome: null,
            otherLevels: this.props.otherLevels
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
    }

    handleBranchInputChange(event) {
        const value = event.target.value;
        console.log(value);

        this.setState({
            [event.target.name]: value
        });
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
                        <label> Start Time: </label> <input name="start" type="text" label="start time" placeholder={this.state.start} value={this.state.start} onChange={this.handleInputChange}/>
                        <label> End Time: </label> <input name="end" type="text" label="end time" placeholder={this.state.end} value={this.state.end} onChange={this.handleInputChange}/>
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

class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: "00:00.000",
            end: "00:00.000",
            branches: [
                <Branch emotion="Anger" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} />,
                <Branch emotion="Fear" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} />,
                <Branch emotion="Calm" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels}/>,
                <Branch emotion="Disgust" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels}/>,
                <Branch emotion="Contempt" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels}/>,
                <Branch emotion="Surprise" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} />
            ]
        }
        this.show = this.show.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
    }

    show() {
        alert("this is level " + this.props.levelIndex);
    }

    handleLevelInputChange(event) {
        const value = event.target.value;
        console.log(value);

        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        const index = this.props.levelIndex;
        return (
            // <Panel header="Level {this.props.levelIndex}" eventKey={this.props.levelIndex}>
                <div className="level" id="level{this.props.levelIndex}">
                    <h3> Level {this.props.levelIndex} </h3>
                    <div className="content">
                        <form>
                            <label> Start Time: </label><input name="start" type="text" placeholder={this.state.start} value={this.state.start} onChange={this.handleInputChange}/>
                            <label> End Time: </label><input name="end" type="text" placeholder={this.state.end} value={this.state.end} onChange={this.handleInputChange}/>
                        </form>
                        <div>
                            { this.state.branches.map((branch) => <div> {branch} </div>) }
                        </div>
                    </div>
                </div>
            // </Panel>
        );
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: "vid/file/path",
            audio: "audio/file/path"
        }
        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.objectifyMedia = this.objectifyMedia.bind(this);
    }

    handleContainerInputChange(event) {
        const value = event.target.value;
        console.log(value);

        this.setState({
            [event.target.name]: value
        });   
    }

    objectifyMedia() {
        var mediaObj = new Object();
        mediaObj.video = this.state.video;
        mediaObj.audio = this.state.audio;

        return(new Object({media: mediaObj}));
    }

    handleSubmit(event) {
        event.preventDefault();
        var media = this.objectifyMedia();

        alert(JSON.stringify(media));
    }
  

    render() {
        const refName = (num) => ("level" + num);
        return (
            <div id="container">
                <form onSubmit={this.handleSubmit}>
                    <label>Video File: </label> <input name="video" type="text" value={this.state.video} placeholder={this.state.video} onChange={this.handleInputChange}/>
                    <label>Audio File: </label> <input name="audio" type="text"  value={this.state.audio} placeholder={this.state.audio} onChange={this.handleInputChange}/>
                    <br/>
                    <div>
                        { Array(this.props.numLevels).fill().map((_,index) =>
                            <Level ref={refName(index+1)} levelIndex={index+1} numLevels={this.props.numLevels} />
                        )}
                    </div>
                    <Button type="submit" name="export" bsStyle="primary">Export</Button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<Container numLevels={2}/>, document.getElementById('app'));