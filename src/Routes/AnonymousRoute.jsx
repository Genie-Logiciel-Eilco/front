import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getRole from '../Helpers/GetRole';

function AnonymousRoute({ component: Component, ...rest }) {
    const role = getRole();
    
    return (
        <Route {...rest} render={props => (            
            role === "ANONYMOUS"
            ? <Component {...props} />
            : role === "ROLE_ADMIN" 
            ? <Redirect to={{pathname : "/69420/home" , state :{ from : props.location }}}  />
            : <Redirect to={{pathname : "/books" , state : { from : props.location }}} />
            ) 
        }/>
    );
}

export { AnonymousRoute };