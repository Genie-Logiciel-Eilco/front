import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getRole from '../Helpers/GetRole';
function AdminRoute({ component: Component, ...rest }) {
    const role = getRole();
    
    return (
        <Route {...rest} render={props => (            
            role === "ROLE_ADMIN"
            ? <Component {...props} />
            : <Redirect to={{pathname : "/404" , state :{ from : props.location }}}  />
            ) 
        }/>
    );
}

export { AdminRoute };