import Home from './pages/index/index';
import Search from './pages/search/index';
import NotMatch from './pages/notMatch';

const Router = [{
    component: Home,
    path: '/'
}, {
    component: Search,
    path: '/search'
}, {
    component: NotMatch,
    path: '*'
}];

export default Router;
