import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import { Button } from 'react-bootstrap';

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
        if (otherLevelIndices.length > 0) {
            if (!this.state.enabled) {
                return (
                    <select disabled>
                        { otherLevelIndices.map((i) => <option value={i}>Level {i}</option>) }
                    </select>
                );
            }

            return (
                <select>
                    { otherLevelIndices.map((i) => <option value={i}>Level {i}</option>) }
                </select>
            );
        }
        return null;
    }

    render() {
        return(
            <div>
                <h4>Branch {this.props.emotion} </h4>
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
                <Branch emotion="anger" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} />,
                <Branch emotion="fear" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} />,
                <Branch emotion="calm" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels}/>,
                <Branch emotion="disgust" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels}/>,
                <Branch emotion="contempt" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels}/>,
                <Branch emotion="surprise" parentIndex={this.props.levelIndex} numLevels={this.props.numLevels} />
            ]
        }
    }

    render() {
        return (
            <div className="level" id="level {this.props.levelIndex}">
                <h3>Level {this.props.levelIndex} </h3>
                <div className="content">
                    <div className="timer-range">timer ranges</div>
                    <div>
                        {
                            this.state.branches.map((branch) =>
                            <div> {branch} </div>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

class Container extends React.Component {
    // still gotta do this
    handleExport() {
        alert("export that shit");
        // <Alert ("export that shit") />
    }

    render() {
        return (
            <div id="container">
                <label>Video File:</label> <input type="text" value="vid file path"/>
                <label>Audio File:</label> <input type="text"  value="audio file path"/>
                <br/>
                <div>
                    {
                        Array(this.props.numLevels).fill().map((_,index) =>
                            <Level levelIndex={index+1} numLevels={this.props.numLevels} />)
                    }
                </div>
                <Button id="export" bsStyle="primary" onClick={this.handleExport}>Export</Button>
            </div>
        );
    }
}

ReactDOM.render(<Container numLevels={5}/>, document.getElementById('app'));