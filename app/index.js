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
                        this.state.otherLevels.map((level, i) =>
                            <option value={i}>Level {i}</option>)
                    }
                </select>
            );
        }
        else {
            return null;
        }
    }

    render() {
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
                <Branch emotion="anger" otherLevels={[]}/>,
                <Branch emotion="fear" otherLevels={[]}/>,
                <Branch emotion="calm" otherLevels={[]}/>,
                <Branch emotion="disgust" otherLevels={[]}/>,
                <Branch emotion="contempt" otherLevels={[]}/>,
                <Branch emotion="surprise" otherLevels={[]}/>
            ],
            otherLevels: this.props.otherLevels
        }
        this.handleRemoveLevelClick = this.handleRemoveLevelClick.bind(this);
        this.updateOtherLevels = this.updateOtherLevels.bind(this);
    }

    handleRemoveLevelClick() {
        this.setState({ visible: false });
    }

    updateOtherLevels(levels) {
        this.setState({otherLevels: levels});
    }

    componentDidMount() {
        this.setState({
            branches: [
                <Branch emotion="anger" otherLevels={this.state.otherLevels} />,
                <Branch emotion="fear" otherLevels={this.state.otherLevels}/>,
                <Branch emotion="calm" otherLevels={this.state.otherLevels}/>,
                <Branch emotion="disgust" otherLevels={this.state.otherLevels}/>,
                <Branch emotion="contempt" otherLevels={this.state.otherLevels}/>,
                <Branch emotion="surprise" otherLevels={this.state.otherLevels} />
            ]
        });

        console.log("called componentDidMount");
        console.log(this.state.otherLevels);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            otherLevels: nextProps.otherLevels
        });
        console.log("called componentWillReceiveProps");
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
            levels: [],
            message: "i have not changed"
        }
        this.incrementLevels = this.incrementLevels.bind(this);
    }

    incrementLevels() {
        const levelIndex = this.state.levels.length;
        const levels = this.state.levels.slice(0, levelIndex);

        this.setState({
            levels: levels.concat([<Level ref="level" levelIndex={levelIndex} otherLevels={ this.state.levels }/>])
        });

        this.refs.level.updateOtherLevels(this.state.levels);
    }

    // onUpdate(levels) {
    //     this.setState({ levels });
    // }

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
                        this.state.levels.map(level =>
                            <div> { level } </div>)
                    }
                </div>
                <Button id="addLevel" bsStyle="primary" onClick={this.incrementLevels}>Add Level</Button>
                <Button id="export" bsStyle="primary" onClick={this.handleExport}>Export</Button>
            </div>
        );
    }
}

ReactDOM.render(<Container />, document.getElementById('app'));