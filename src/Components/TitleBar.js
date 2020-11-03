import React from 'react';
import './TitleBar.css';

class TitleBar extends React.Component {
    constructor(props) {
        super(props);
    }

    doubleClick() {
        window.resizeDouble()
    }

    render() {
        return (
            <div className="TitleBar" onDoubleClick={() => { this.doubleClick() }} />
        )
    }
}

export default TitleBar;
