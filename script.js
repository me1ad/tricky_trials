let table_container;
let number_of_tables = 0;

function start(){
    table_container = document.getElementById('table-container');
}

function deleteParent() {
      this.parentElement.remove()
    }
function deleteGrandParent(){
    this.parentElement.parentElement.remove()
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

    cell.appendChild(button);
    return cell;
}
function createTableFromScratch() {
    const rows_input = document.getElementById("rows");
    const cols_input = document.getElementById("columns");
    const name_input = document.getElementById("scratch-name");

    console.log(rows_input, cols_input);

    if (!checkElementHasValue(rows_input) || !checkElementHasValue(cols_input)){
        const error = document.createElement("p");
        error.innerHTML = "please input values for both rows and columns."
        document.getElementById("table-from-scratch").appendChild(error);
        return null
    }

    const table = document.createElement('table');
    var rows = parseInt(rows_input.value);
    var cols = parseInt(cols_input.value);
    var name = name_input.value.trim();
    const trials = document.getElementById("trial-option").value;
    
    for (let i = 0; i < rows; i++){
        
        const row = document.createElement("tr");
        
        for (let j = 0; j < cols; j++){
            
            const cell = document.createElement("td");
            let inp = document.createElement("input");
            
            if (trials && i == 0){
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
    
    name_input.value = "";
    setup_new_table(name, table);
    
}
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