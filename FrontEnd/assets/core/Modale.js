import {stopPropagation, createDiv, createIcon, createImg, createInput, createLabel, createTitle} from "./functions.js"

export default class Modale{
    constructor(container){
        this.container = container;
        this.addListenerOpen();
        this.imgdata = null;
    }

    async display(){  
        let response = await fetch("http://localhost:5678/api/works");
        let works = await response.json();
        const modaleWrapper = this.container.querySelector(".modale-wrapper");
        modaleWrapper.innerHTML = ""; 
        
        const modaleStop = this.container.querySelector(".js-modale-stop")
        modaleStop.addEventListener('click', stopPropagation);

        let title = createTitle("Galerie photo");
        modaleWrapper.appendChild(title);

        let closeIcon = createIcon('fa-solid','fa-xmark');
        closeIcon.classList.add("js-modale-close");
        closeIcon.addEventListener('click', this.closeModale.bind(this));
        modaleWrapper.appendChild(closeIcon);

        const modaleGallery = createDiv("modale-gallery");

        for (let work of works){
            let figure = document.createElement("figure");

            let img = createImg(work.imageUrl,work.title);
            figure.appendChild(img);

            let trashbox = document.createElement("span");
            trashbox.classList.add('trash-box');

            let trash = createIcon('fa-solid', 'fa-trash-can');
            trashbox.appendChild(trash);

            figure.appendChild(trashbox);

            modaleGallery.appendChild(figure);
        }

        modaleWrapper.appendChild(modaleGallery);

        let input = createInput("submit","Ajouter une photo");
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
        modale.addEventListener('click', this.closeModale.bind(this));
        this.display();
    }

    closeModale(){
        const modale = this.container;
        modale.style.display = "none";
        modale.removeEventListener('click', this.closeModale);
        modale.querySelector(".js-modale-close").removeEventListener('click', this.closeModale);
        modale.querySelector(".js-modale-stop").removeEventListener('click', stopPropagation);
    }

    openAddProject(){
        const modaleWrapper = this.container.querySelector(".modale-wrapper");
        modaleWrapper.innerHTML = "";

        let title = createTitle("Ajout photo");
        modaleWrapper.appendChild(title);

        let closeIcon = createIcon('fa-solid','fa-xmark');
        closeIcon.addEventListener('click', this.closeModale.bind(this));
        modaleWrapper.appendChild(closeIcon);

        let returnIcon = createIcon('fa-solid','fa-arrow-left');
        modaleWrapper.appendChild(returnIcon);
        returnIcon.addEventListener('click', this.openModale.bind(this));

        
        let form = document.createElement("form");
        form.addEventListener('submit', this.onSubmitForm.bind(this));

            let bgDiv = createDiv("new-picture-container");

            let icon = createIcon("fa-regular", "fa-image");
            bgDiv.appendChild(icon);

            let pictureLabel = createLabel("image");
            pictureLabel.innerHTML = "+ Ajouter photo";
            bgDiv.appendChild(pictureLabel);

            let pictureInput = createInput("file", null, "image");
            pictureInput.required = true;
            pictureInput.addEventListener("change", this.previewFile.bind(this));
            bgDiv.appendChild(pictureInput);

            let span = document.createElement("span");
            span.innerHTML = "jpg, png : 4mo max";
            bgDiv.appendChild(span);

        form.appendChild(bgDiv);

            let divTitle = createDiv("input-container");
            let titleLabel = createLabel("title");
            let titleInput = createInput("text", null, "title");
            titleInput.required = true;

            divTitle.appendChild(titleLabel);
            divTitle.appendChild(titleInput);

        form.appendChild(divTitle);

            let divCategory = createDiv("input-container");
            let categoryLabel = createLabel("category");
            let categorySelect = document.createElement("select");
            categorySelect.id = "category";            
            categorySelect.name = "category";
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

        let input = createInput("submit","Valider");
        form.appendChild(input);

    }

    onSubmitForm(e){
        console.log(e.target)
        e.preventDefault();
        const formData = new FormData(e.target);
        debugger
    }

    previewFile(e){
        const fileReader = new FileReader();
        const fileInput = document.getElementById('photo');
        const selectedFile = fileInput.files[0];
        
        if (selectedFile) {
            fileReader.onload = this.onFileLoad.bind(this);
            fileReader.readAsDataURL(selectedFile); // Lire un fichier uploadé
        }
    }

    onFileLoad(e){
        const container = document.querySelector(".new-picture-container");
        this.imgdata = e.target.result;
        let img = createImg(this.imgdata,"image à ajouter");
        container.appendChild(img);
    }


}
