import Gallery from "./core/Gallery.js"
import Login from "./core/Login.js"

new Gallery(document.querySelector('.gallery'));
new Login(document.querySelector('.formulaire'));

let token = window.localStorage.getItem("token");

if (token) {
    console.log("Admin");
} else {
    console.log("Visiteur simple");
} 


