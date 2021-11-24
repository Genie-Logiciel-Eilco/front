export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("data")).token;
    return { Authorization: "Bearer " + user };
    // return { Authorization : "Bearer " + "TempToken"};
}