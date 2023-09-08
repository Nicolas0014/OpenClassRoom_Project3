export default class Login{
    constructor(formulaire){
        this.formulaire = formulaire;
        this.addListenerConnexion();
    }

    async addListenerConnexion(){
        const login = document.querySelector('.formulaire');
        login.addEventListener('submit', async (event) => {
            event.preventDefault();
            let logs = {
                email : event.target.querySelector("[name=email").value,
                password : event.target.querySelector("[name=password").value
            };

            logs = JSON.stringify(logs);

            let response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                body : logs,
                headers: { "Content-Type": "application/json" }
            });

            switch (response.status) {
                case 404 :
                    this.onIncorrectEmail();
                    break;
                case 401 :
                    this.onIncorrectPassword();
                    break;
                case 200 :
                    this.toHomePage();
                    const data = await response.json();
                    const token = data.token;
                    window.sessionStorage.setItem("token", token);
                    break;
                default :
                  console.log(`Une erreur inconnue est survenue`);
              }
        })
    }

    toHomePage(){
        document.location.href="index.html"; 
    }

    onIncorrectEmail(){
        alert("Identifiant incorrect. Veuillez réessayer.")
    }

    onIncorrectPassword(){
        alert("Mot de passe incorrect. Veuillez réessayer.")
    }

}
