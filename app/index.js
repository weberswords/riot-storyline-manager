import React from 'react';
import ReactDOM from 'react-dom';

class Level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "visible": true
        }
    }

    handleRemoveLevelClick() {
        this.setState({ "visible": false });
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

    renderLevel(i) {
        return (
            <Level levelIndex={i} />
        )
    }

    render() {
        return (
            <div id="container">
                { this.renderLevel(0) }
                { this.renderLevel(1) }
            </div>
        );
    }
}


ReactDOM.render(<Container />, document.getElementById('app'));