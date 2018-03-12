import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
// import { Button } from 'react-bootstrap/lib/Button';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/lib/Alert';


class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: true,
            start: "00:00.000",
            end: "00:00.000",
            outcome: null
        }
    }

    handleToggle() {
        this.setState({
            enabled: !this.state.enabled
        });
    }

    branch() {
        if (this.props.otherLevels.length > 0) {
            return (
                <select>
                    {
                        this.props.otherLevels.map((level) =>
                            <option value={level.getLevelIndex()}>Level {level.getLevelIndex()}</option>)
                    }
                </select>
            );
        }
        else {
            return null;
        }
    }

    render() {
        console.log(this.props.otherLevels);

        return(
            <div>
                <h4>Branch {this.props.emotion} </h4>
                <input type="checkbox" bsStyle="primary" bsSize="large" onClick={this.handleToggle} /><span> Disable </span>
                {this.branch()}
            </div>
        );
    }
}

class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            branches: [
                <Branch emotion="anger" otherLevels={this.props.otherLevels} />,
                <Branch emotion="fear" otherLevels={this.props.otherLevels}/>,
                <Branch emotion="calm" otherLevels={this.props.otherLevels}/>,
                <Branch emotion="disgust" otherLevels={this.props.otherLevels}/>,
                <Branch emotion="contempt" otherLevels={this.props.otherLevels}/>,
                <Branch emotion="surprise" otherLevels={this.props.otherLevels} />
            ]
        }
        this.handleRemoveLevelClick = this.handleRemoveLevelClick.bind(this);
    }

    getLevelIndex() {
        return this.props.levelIndex;
    }

    handleRemoveLevelClick() {
        this.setState({ visible: false });
    }

    level() {
        return (
            <div className="level" id="level {this.props.levelIndex}">
                <h3>Level {this.props.levelIndex} </h3>
                <div className="content">
                    <Button className="remove" bsStyle="primary" onClick={this.handleRemoveLevelClick}>Remove</Button>
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

    render() {
        return (
            this.state.visible ? this.level() : null
        );
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: []
        }
        this.incrementLevels = this.incrementLevels.bind(this);
    }

    incrementLevels() {
        const levelIndex = this.state.levels.length;
        const levels = this.state.levels.slice(0, levelIndex);

        this.setState({
            levels: levels.concat([<Level levelIndex={levelIndex} otherLevels={ this.state.levels }/>])
        });
    }

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
                        this.state.levels.map((level) =>
                            <div> {level} </div>)
                    }
                </div>
                <Button id="addLevel" bsStyle="primary" onClick={this.incrementLevels}>Add Level</Button>
                <Button id="export" bsStyle="primary" onClick={this.handleExport}>Export</Button>
            </div>
        );
    }
}

ReactDOM.render(<Container />, document.getElementById('app'));