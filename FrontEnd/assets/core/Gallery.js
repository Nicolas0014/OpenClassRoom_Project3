export default class Gallery{
    constructor(container){
        this.container = container;
        this.display();
        this.addFilters();
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

    async addFilters(){
        let response = await fetch("http://localhost:5678/api/categories")
        let categories = await response.json();
        categories.unshift({
            id:0,
            name: "Tous"
        })
        const container = document.querySelector('.filters');
        for (let category of categories){
            const filter = document.createElement("div");
            filter.innerText = category.name;
            filter.classList.add('filter');
            if (category.id === 0){
                filter.classList.add('active');
            }

            filter.addEventListener('click', this.onFilterClick.bind(this, category.id))
            container.appendChild(filter);
        }
    }

    onFilterClick(id){
        console.log(this, id);
    }
}