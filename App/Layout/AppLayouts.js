import {Route} from 'react-router-dom'

const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="DefaultLayout">
                <div className="Header">Header</div>
                <Component {...matchProps} />
                <div className="Footer">Footer</div>
            </div>
        )}/>
    )
};

//左右布局
const PostLayout = ({component: Component, ...rest}) => {
    return (
        <DefaultLayout {...rest} component={matchProps => (
            <div className="Post">
                <div className="Post-content">
                    <Component {...matchProps} />
                </div>
                <div className="Post-aside">
                    <div>SomeSideBar</div>
                </div>
            </div>
        )}/>
    );
};

//单一布局
const IndexLayout = ({component: Component, ...rest}) => {
    return (
        <DefaultLayout {...rest} component={matchProps => (
            <div className="Index">
                <div className="Index-content">
                    <Component {...matchProps} />
                </div>
            </div>
        )}/>
    );
}

module.exports = {PostLayout, IndexLayout}