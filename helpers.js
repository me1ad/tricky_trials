function deleteParent() {
    this.parentElement.remove()
    
}
function deleteGrandParent(){
    this.parentElement.parentElement.remove()
}

function checkElementHasValue(input){
    if (checkElementIsInput(input)){
        if (input.value == ""){
            return false
        }
            return true
    } else {
        console.log("Non input element id inputted into input checker");
        return false;
    }
}
function checkElementIsInput(element){
    console.log(element);
    return (element.tagName == "INPUT");
}

function makeButton(text){
    const button = document.createElement("button");
    button.innerHTML = text;
    button.style.padding = "2%";
    return button
}

function addRowName(){
    const inp = document.getElementById("row-namer");
    _addRowName(inp.value);
}

function _addRowName(name){
    var _name = name.trim() + " ";
    const list = document.getElementById("row-list");
    const el = document.createElement("li");
    el.innerHTML = _name;
    const del_but = document.createElement("button");
    del_but.innerHTML = "Remove Row";
    del_but.addEventListener("click", deleteParent);
    el.appendChild(del_but);
    list.appendChild(el);
}

function deleteCell() {
    const cell = document.createElement("td");
    const button = document.createElement("button");

    button.textContent = "Delete Row";
    button.addEventListener("click", deleteGrandParent);

    button.style.width = "100%";
    button.style.height = "100%";
    button.style.border = "none";
    button.style.outline = "none";
    button.style.background = "transparent";
    
    cell.style.background = "crimson";
    cell.style.width = "10%";
    cell.style.border = "2px solid crimson";

    cell.classList.add("no-copy");

    cell.appendChild(button);
    return cell;
}