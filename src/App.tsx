import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import RouterConfig from './router.config';

import './App.less';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    {
                        RouterConfig.map((route, index) => {
                            return route.path === 'index' || route.path === '/' ? (
                                <Route key={index} exact path={route.path} component={route.component} />
                            ) : (
                                <Route key={index} path={route.path} component={route.component} />
                            )
                        })
                    }
                </Switch>
            </Router>
        </div>
    );
}

export default App;
