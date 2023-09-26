export function stopPropagation(e){
    e.stopPropagation();
}

export function createTitle(content){
    let title = document.createElement("h2");
    title.innerHTML = content;
    return title;
}

export function createInput(type, value= null, nameAndId= null){
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

export function createImg(src,alt){
    let img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    return img;
}

export function createIcon(class1, class2){
    let icon = document.createElement('i');
    icon.classList.add(class1, class2);
    return icon;
}

export function createLabel(forContent){
    let label = document.createElement("label");
    label.setAttribute("for", forContent);
    label.innerHTML = forContent.charAt(0).toUpperCase() + forContent.slice(1); // Première lettre en majuscule
    return label;
}

export function createDiv(className){
    let div = document.createElement("div");
    div.classList.add(className);
    return div;
}


