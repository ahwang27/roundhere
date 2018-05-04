import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TitleBar from './title-bar'

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            searchClicked: false
        }
    }

    searchClicked = () => {
        this.setState({searchClicked: true});
    }

    render() {
        if (this.state.searchClicked) {
            return (
                <Redirect to="/dashboard" />
            )
        }

        return (
            <div className="container card" style={{ marginTop: '5em', backgroundColor: 'lightblue' }}>
                <div className="container col-md-auto" style={{ marginTop: '1em' }} >
                    <TitleBar />
                </div>

                <div className="form-group row justify-content-center" style={{ marginTop: '2em', marginBottom: '2em' }}>
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="City, State or Zip Code"
                            value={this.state.searchField}
                            onChange={e => this.setState({ searchField: e.target.value })}
                        />
                    </div>
                    <div>
                        <button
                            className="btn btn-success"
                            onClick={e => this.searchClicked()}
                        > Search </button>
                    </div>

                </div>


            </div>
        )
    }
}

export default SearchPage;