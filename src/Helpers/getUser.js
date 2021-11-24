import isAuthenticated from "./Authenticated";

const getUser = () => {
    
    if(isAuthenticated()){
        return JSON.parse(localStorage.getItem("data")).hasOwnProperty("user");
    }
    else{ 
        return {
            role : "ANONYMOUS"
        }};   
}

export default getUser;