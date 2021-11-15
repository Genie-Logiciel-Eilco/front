import isAuthenticated from "./Authenticated";

const getRole = () => {
    try{
        if(isAuthenticated())
        return JSON.parse(localStorage.getItem("data")).role;
        else
        return "ANONYMOUS";   
    }
    catch(e){
        return "ANONYMOUS"
    }
    
    
    
}

export default getRole;