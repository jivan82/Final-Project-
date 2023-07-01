export const API = "http://localhost:5000";
const user = JSON.parse(localStorage.getItem("userInfo"));
export const ID = user && user.data.id;
export const token = user && user.data.token;
