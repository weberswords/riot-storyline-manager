import React from 'react';
import ReactDOM from 'react-dom';

class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
        this.handleRemoveLevelClick = this.handleRemoveLevelClick.bind(this);
    }

    handleRemoveLevelClick() {
        this.setState({ visible: false });
    }

    level() {
        return (
            <div className="level" id="level {this.props.levelIndex}">
                <h3>Level {this.props.levelIndex} </h3>
                <div className="content">
                    <button className="remove" onClick={this.handleRemoveLevelClick}>Remove</button>
                    <div className="timer-range">timer ranges</div>
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
            levels: levels.concat([<Level levelIndex={levelIndex}/>])
        });
    }

    render() {
        return (
            <div id="container">
                <button id="addLevel" onClick={this.incrementLevels}>Add Level</button>
                <div>
                    {
                        this.state.levels.map((level) =>
                            <div> {level} </div>)
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Container />, document.getElementById('app'));