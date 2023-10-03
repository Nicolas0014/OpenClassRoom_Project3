import Gallery from "./core/Gallery.js"
import Login from "./core/Login.js"
import Modale from "./core/Modale.js"

new Gallery(document.querySelector('.gallery'));
new Login(document.querySelector('.formulaire'));
new Modale(document.getElementById('modale'));

let token = window.localStorage.getItem("token");

if (token) {
    console.log("Admin");
    // Afficher le bouton "Modifier" à côté de "Mes projets"
} else {
    console.log("Visiteur simple");
} 


