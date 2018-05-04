import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import axios from 'axios';

// Components imported
import TitleBar from '.././title-bar';
import AddVenue from './add-venue';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            newVenueFlag: false
         }
    }

    getVenues = async () => {
        try {
            let res = await axios.get(`http://localhost:4000/venues/`);
            this.setState({ data: res.data.venues })
        } catch (err) {
            console.log(err.message);
        }
    }

    venueFlagOff = () => {
        this.setState({newVenueFlag: false});
        console.log('ln31 run')
    }

    componentDidMount() {
        this.getVenues();
    }

    render() { 
        return ( 
            <div className="container">
                <div className="row container" >
                    <TitleBar />
                </div>

                <div className="row" style={{ margin: '2em' }}>
                    <button className="btn btn-warning" onClick={e => this.setState({newVenueFlag: true})}>Add Venue</button>

                    {
                        this.state.newVenueFlag ? <AddVenue venueFlag={this.venueFlagOff.bind(this)} getVenues={this.componentDidMount.bind(this)}/> : ''
                    }

                </div>

                <div className="container-fluid" style={{ margin: '2em' }}>
                    <ReactTable
                        data={this.state.data}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]) === filter.value}
                        columns={[
                            {
                                Header: "Name",
                                accessor: "name",
                                filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["name"] }),
                                filterAll: true
                            },
                            {
                                Header: "Category",
                                accessor: "category",
                                filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["category"] }),
                                filterAll: true
                            },
                            {
                                Header: "Description",
                                accessor: "description",
                                filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["description"] }),
                                filterAll: true
                            },
                            {
                                Header: "Address",
                                accessor: "address",
                                filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["address"] }),
                                filterAll: true
                            }
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </div>
            </div>
         )
    }
}
 
export default Dashboard;