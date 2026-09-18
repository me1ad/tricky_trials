function createTable() {
    const rows_input = document.getElementById("rows");
    const cols_input = document.getElementById("columns");
    const name_input = document.getElementById("scratch-name");

    console.log(rows_input, cols_input);

    if (!checkElementHasValue(rows_input) || !checkElementHasValue(cols_input)){
        document.getElementById("error-scratch").style.display = "inline";
        return null
    } else {
        document.getElementById("error-scratch").style.display = "none";
    }

    var rows = parseInt(rows_input.value);
    var cols = parseInt(cols_input.value);
    const trials = document.getElementById("trial-option").checked;
    console.log(trials);
    const table = makeTable(rows,cols,trials);
    var name = name_input.value.trim();
    
    setup_new_table(name, table);
    name_input.value = "";
}

function openCreateTable(){
    document.getElementById('create-table').style.display='flex';
}

function closeCreateTable(){
    document.getElementById('create-table').style.display='none';
}

function setup_new_table(name, _table){
    number_of_tables += 1;
    let title = document.createElement("h2");
    if (name == ""){
        title.innerHTML = "Table " + number_of_tables;
    } else {
        title.innerHTML = name;
    }
    
    _table.setAttribute("number", number_of_tables);
    
    const copyButton = makeButton("Copy Table");
    copyButton.setAttribute("number", number_of_tables);
    copyButton.addEventListener("click",copyTableN);

    table_container.appendChild(title);
    table_container.appendChild(copyButton);
    table_container.appendChild(_table);
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