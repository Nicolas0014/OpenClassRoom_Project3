export default class Gallery{
    constructor(container){
        this.container = container;
        this.display();
    }

    async display(){
        let response = await fetch("http://localhost:5678/api/works");
        let works = await response.json();
        const container = document.querySelector('.gallery');
        for (let work of works){
            let figure = document.createElement("figure");

            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            let figcaption = document.createElement("figcaption");
            figcaption.innerText = work.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            container.appendChild(figure);
        }

    }
}