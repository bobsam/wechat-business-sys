import React, { Component } from 'react';
import {RouteComponentProps} from 'react-router-dom';

class SearchPage extends Component<RouteComponentProps> {
    render() {
        console.log(this.props);

        return (
            <div className="p-search">
                <h1>Search page</h1>
            </div>
        );
    }
}

export default SearchPage;
