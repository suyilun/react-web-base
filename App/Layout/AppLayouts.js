import {Route} from 'react-router-dom'

const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="DefaultLayout">
                <div className="Header">Header1111</div>
                <Component {...matchProps} />
                <div className="Footer">Footer222</div>
            </div>
        )}/>
    )
};

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

const DefaultIndexLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={ matchProps => (
            <Component  {...matchProps} />
        )}/>
    )
}

const IndexLayout = ({component: Component, ...rest}) => {
    return (
        <DefaultIndexLayout {...rest} component={matchProps => (
            <div className="Index">
                <div className="Index-content">
                    <Component {...matchProps} />
                </div>
            </div>
        )}/>
    );
}

module.exports = {PostLayout, IndexLayout}