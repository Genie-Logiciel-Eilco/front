const isAuthenticated = () => {
    try{
        return JSON.parse(localStorage.getItem('data')).hasOwnProperty("token");
    }
    catch(e){
        return {};
    }
    
}

export default isAuthenticated;