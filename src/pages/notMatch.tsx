import React, { Component } from 'react';
import {RouteComponentProps} from 'react-router-dom';

class NotMatch extends Component<RouteComponentProps> {
    render () {
        return (
            <div>
              <h3>
                No match for <code>{this.props.match.url}</code>
              </h3>
            </div>
        );
    }
};

export default NotMatch;
