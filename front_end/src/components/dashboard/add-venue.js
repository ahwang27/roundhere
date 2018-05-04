import React, { Component } from 'react';
import axios from 'axios';

class AddVenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            category: '',
            address: '',
            reject: false
        }
    }

    submitVenue = async () => {
        if (this.submitOK()) {
            try {
                let res = await axios.post(`http://localhost:4000/venues/`, {
                    "name": this.state.name,
                    "description": this.state.description,
                    "category": this.state.category,
                    "address": this.state.address
                });

                this.props.getVenues();
                this.props.venueFlag();

                this.setState({
                    name: '',
                    description: '',
                    category: '',
                    address: '',
                    reject: false
                });

            } catch (err) {
                console.log(err.message)
            }
        } else {
            this.submitReject();
        }

    }

    submitOK = () => {
        if (this.state.name.length > 3 &&
            this.state.description.length > 3 &&
            this.state.category != 'Choose...' &&
            this.state.address.length > 5) {
            return true;
        } else {
            return false;
        }
    }

    submitReject = () => {
        this.setState({ reject: true });
    }

    // cancelSubmit = () => {
    //      this.props.venueFlag;
    // }

    render() {
        return (
            <div className="container" style={{ margin: '1.5em 2em' }}>
                <div className="col-md-12 card" style={{ padding: '1.5em 2em' }} >
                    <form>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label"> Venue Name </label>
                            <div className="col-md-9">
                                <input
                                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                                    value={this.state.name}
                                    className="form-control"
                                    placeholder="venue" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3"> Category </label>
                            <div className="col-md-9">
                                <select
                                    className="form-control"
                                    value={this.state.category}
                                    onChange={(e) => { this.setState({ category: e.target.value }) }}>
                                    <option defaultValue> Choose...</option>
                                    <option> Public Park / Beach </option>
                                    <option> Grab a Bite </option>
                                    <option> Museum / Educational Attraction </option>
                                    <option> Paid Admission </option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label"> Description </label>
                            <div className="col-md-9">
                                <input
                                    onChange={(e) => { this.setState({ description: e.target.value }) }}
                                    value={this.state.description}
                                    className="form-control"
                                    placeholder="description" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label"> Address </label>
                            <div className="col-md-9">
                                <input
                                    onChange={(e) => { this.setState({ address: e.target.value }) }}
                                    value={this.state.address}
                                    className="form-control"
                                    placeholder="city, state, zip" />
                            </div>
                        </div>

                    </form>
                    <div className="row justify-content-end" style={{ marginTop: '0.5em' }}>
                        <div style={{marginRight: '24em', color: 'red'}}>
                            {this.state.reject ? <div> Please complete each section </div> : ''}
                        </div>
                            <button
                                className="btn btn-info"
                                onClick={e => this.submitVenue()}
                            > Submit </button>
                            <p
                                href="null"
                                className="col-md-offset-1"
                                onClick={this.props.venueFlag}
                                style={{ marginTop: '0.5em', marginLeft: '2em', color: 'gray' }}
                            > Cancel </p>
                        
                    </div>


                </div>

            </div>
        )
    }
}

export default AddVenue;