import {Route} from 'react-router-dom'

//默认头，底样式，待补充
const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="DefaultLayout">
                <div className="Header">详见AppLayout------Header</div>
                <Component {...matchProps} />
                <div className="Footer">详见AppLayout------Footer</div>
            </div>
        )}/>
    )
};

//左右布局,具体样式待补充
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