import Home from './pages/homeForCheck/homeForCheck';
import Index from './pages/index/index';
import Search from './pages/search/index';
import NotMatch from './pages/notMatch';

const Router = [{
    component: Home,
    path: '/'
}, {
    component: Index,
    path: '/fangfang'
}, {
    component: Search,
    path: '/search'
}, {
    component: NotMatch,
    path: '*'
}];

export default Router;
