import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getRole from '../Helpers/GetRole';
function UserRoute({ component: Component, ...rest }) {
    const role = getRole();
    return (
        <Route {...rest} render={props => (            
            role === "ROLE_USER" || role === "ROLE_ADMIN"
            ? <Component {...props} />
            : <Redirect to={{pathname : "/Login" , state :{ from : props.location }}}  />
            ) 
        }/>
    );
}

export { UserRoute };