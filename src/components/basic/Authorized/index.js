import React from 'react'
import router from 'umi/router';
import withRouter from 'umi/withRouter'


class Authorized extends React.Component {
    state = {
        authorizedMenuList: []
    }

    constructor(props) {
        super(props)
    }


    componentWillMount() {
        this.getAuthorizedMenuList(this.props.menuList)
    }


    componentWillUpdate(prevProps, prevState) {
        /*菜单无权限*/
        if (!this.state.authorizedMenuList.includes(prevProps.history.location.pathname)) {
           // router.push('/')
        }
    }


    componentDidUpdate(nextProps) {

    }

    getAuthorizedMenuList = data => data.forEach(item => {
        if (item.children && item.children.length > 0) {
            this.getAuthorizedMenuList(item.children)
        } else {
            if (item.url) {
                let authorizedMenuList = this.state.authorizedMenuList
                authorizedMenuList.push(item.url)
                this.setState({authorizedMenuList})
            }
        }
    })

    render() {
        const {userInfo, menuList, children} = this.props;
        /*未入驻*/
        if (userInfo.authStatus) {
            router.push('/authorize')
            return null
        }

        return <React.Fragment>{children}</React.Fragment>
    }
}

export default withRouter(Authorized)
