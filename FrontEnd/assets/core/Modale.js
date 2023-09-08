export default class Modale{
    constructor(container){
        this.container = container;
        this.addListenerOpen();
    }

    async display(){  
        let response = await fetch("http://localhost:5678/api/works");
        let works = await response.json();
        const modaleWrapper = this.container.querySelector(".modale-wrapper");
        modaleWrapper.innerHTML = ""; 

        let title = this.createTitle("Galerie photo");
        modaleWrapper.appendChild(title);

        let closeIcon = this.createIcon('fa-solid','fa-xmark');
        modaleWrapper.appendChild(closeIcon);

        const modaleGallery = this.createDiv("modale-gallery");
        modaleWrapper.appendChild(modaleGallery);

        for (let work of works){
            let figure = document.createElement("figure");

            let img = this.createImg(work.imageUrl,work.title);
            figure.appendChild(img);

            let trashbox = document.createElement("span");
            trashbox.classList.add('trash-box');

            let trash = this.createIcon('fa-solid', 'fa-trash-can');
            trashbox.appendChild(trash);

            figure.appendChild(trashbox);

            modaleGallery.appendChild(figure);
        }

        let input = this.createInput("submit","Ajouter une photo");
        input.addEventListener('click',this.openAddProject.bind(this));

        modaleWrapper.appendChild(input);
    }

    addListenerOpen(){
        const modalLink = document.querySelector('a[href*="'+this.container.id+'"]');
        modalLink.addEventListener('click', this.openModale.bind(this));
    }

    openModale(){        
        const modale = this.container;
        modale.style.display = null;
        this.display();
        modale.addEventListener('click', this.closeModale.bind(this));
        modale.querySelector(".js-modale-close").addEventListener('click', this.closeModale.bind(this));
        modale.querySelector(".js-modale-stop").addEventListener('click', this.stopPropagation);
    }

    closeModale(){
        const modale = this.container;
        modale.style.display = "none";
        modale.removeEventListener('click', this.closeModale);
        modale.querySelector(".js-modale-close").removeEventListener('click', this.closeModale);
        modale.querySelector(".js-modale-stop").removeEventListener('click', this.stopPropagation);
    }

    openAddProject(){
        const modaleWrapper = this.container.querySelector(".modale-wrapper");
        modaleWrapper.innerHTML = "";

        let title = this.createTitle("Ajout photo");
        modaleWrapper.appendChild(title);

        let closeIcon = this.createIcon('fa-solid','fa-xmark');
        modaleWrapper.appendChild(closeIcon);

        let returnIcon = this.createIcon('fa-solid','fa-arrow-left');
        modaleWrapper.appendChild(returnIcon);
        
        let form = document.createElement("form");

            let bgDiv = this.createDiv("new-picture-container");

            let icon = this.createIcon("fa-regular", "fa-image");
            bgDiv.appendChild(icon);

            let pictureLabel = this.createLabel("photo");
            pictureLabel.innerHTML = "+ Ajouter photo";
            bgDiv.appendChild(pictureLabel);

            let pictureInput = this.createInput("file", null, "photo");
            pictureInput.required = true;
            pictureInput.addEventListener("change", this.previewFile.bind(this));
            bgDiv.appendChild(pictureInput);

            let span = document.createElement("span");
            span.innerHTML = "jpg, png : 4mo max";
            bgDiv.appendChild(span);

        form.appendChild(bgDiv);

            let divTitle = this.createDiv("input-container");
            let titleLabel = this.createLabel("titre");
            let titleInput = this.createInput("text", null, "titre");
            titleInput.required = true;

            divTitle.appendChild(titleLabel);
            divTitle.appendChild(titleInput);

        form.appendChild(divTitle);

            let divCategory = this.createDiv("input-container");
            let categoryLabel = this.createLabel("categorie");
            let categorySelect = document.createElement("select");
            categorySelect.id = "categorie";            
            categorySelect.name = "categorie";
            categorySelect.required = true;

            const categoriesList = Array.from(document.querySelector(".filters").getElementsByTagName('div'));
            categoriesList.shift();

            for (let category of categoriesList){
                let categoryName = category.innerHTML;
                let option = document.createElement("option");
                option.value = categoryName;
                option.innerHTML = categoryName;
                categorySelect.appendChild(option);
            }
           
            divCategory.appendChild(categoryLabel);
            divCategory.appendChild(categorySelect);

        form.appendChild(divCategory);
        modaleWrapper.appendChild(form);

        let input = this.createInput("submit","Valider");
        input.disabled = true;
        modaleWrapper.appendChild(input);

    }

    closeAddProject(){
        // Recharger un display
    }

    onPictureSubmit(){
        // Appel à l'API pour POST
    }

    stopPropagation(e){
        e.stopPropagation();
    }
    
    createTitle(content){
        let title = document.createElement("h2");
        title.innerHTML = content;
        return title;
    }

    createInput(type, value= null, nameAndId= null){
        let input = document.createElement("input");
        input.type = type;

        if (type === "submit"){
            input.value = value;
            return input;
        } else {
            input.id = nameAndId;
            input.name = nameAndId;
            return input;
        }
    }

    createImg(src,alt){
        let img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        return img;
    }

    createIcon(class1, class2){
        let icon = document.createElement('i');
        icon.classList.add(class1, class2);
        return icon;
    }

    createLabel(forContent){
        let label = document.createElement("label");
        label.setAttribute("for", forContent);
        label.innerHTML = forContent.charAt(0).toUpperCase() + forContent.slice(1); // Première lettre en majuscule
        return label;
    }

    createDiv(className){
        let div = document.createElement("div");
        div.classList.add(className);
        return div;
    }

    previewFile(){
        const fileInput = document.getElementById('photo');
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            const container = document.querySelector(".new-picture-container");
            container.innerHTML = "";
            let img = this.createImg("./assets/images/" + selectedFile.name,"image à ajouter");
            container.appendChild(img);
        }
    }
}
