import React, { Component } from 'react';

class TitleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container">
                <h1 className="justify-content-sm-center">'Round Here</h1>
            </div>
         )
    }
}
 
export default TitleBar;