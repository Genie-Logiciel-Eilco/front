import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';

export default function Logout() {
    let history = useHistory();

    useEffect(() => {
        localStorage.clear();
        history.push('/Login');
    }, []);

    return (
        <div>
            
        </div>
    )
}
