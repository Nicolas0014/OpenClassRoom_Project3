import Gallery from "./core/Gallery.js"
import Login from "./core/Login.js"
import Modale from "./core/Modale.js"

if (document.body.classList.contains('login-page')) {

    new Login(document.querySelector('.formulaire'));

} else {

    const gallery = new Gallery(document.querySelector('.gallery'));
    new Modale(document.getElementById('modale'));

    let token = window.localStorage.getItem("token"); // Récupération du token d'admin permettant d'afficher le bouton "modifier" (accès à l'espace admin)

    if (token) {
        document.querySelector('.edition-mode').style.display = null;
        document.querySelector('.js-modale').style.display = null;
        document.querySelector('.log').innerHTML = "logout";
    } else {}

    document.addEventListener('submitForm', () => {
        gallery.display();
    })

    document.addEventListener('deleteProject', () => {
        gallery.display();
    })

}