function setup_new_table(name, _table){
    number_of_tables += 1;
    let title = document.createElement("h2");
    if (name == ""){
        title.innerHTML = "Table " + number_of_tables;
    } else {
        title.innerHTML = name;
    }
    
    console.log(title);
    table_container.appendChild(title);
    table_container.appendChild(_table);
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

function makeTable(rows,cols,trial){
    const table = document.createElement("table")
    for (let i = 0; i < rows; i++){
        
        const row = document.createElement("tr");
        
        for (let j = 0; j < cols; j++){
            
            const cell = document.createElement("td");
            let inp = document.createElement("input");
            
            if (trial && i == 0){
                if (j == 0){
                    inp.setAttribute("value","Trial");
                } else {
                    inp.setAttribute("value",j);
                }
            }

            cell.appendChild(inp);
            row.appendChild(cell);
        }

        row.appendChild(deleteCell());
        table.appendChild(row);
    }
    table.setAttribute("rows",rows);
    table.setAttribute("cols",cols);
    return table;
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