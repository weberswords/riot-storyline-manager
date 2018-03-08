import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                Hello World!!!
            </div>
        );
    }
}
// export default App;

ReactDOM.render(<App />, document.getElementById('app'));