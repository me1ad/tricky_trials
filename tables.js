function createTableFromScratch() {
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
    const trials = document.getElementById("trial-option").value;

    const table = makeTable(rows,cols,trials);
    var name = name_input.value.trim();
    
    setup_new_table(name, table);
    name_input.value = "";
}

function createPrefabTable(){
    const cols_input = document.getElementById("col-prefab");
    const row_list = document.getElementById("row-list");
    const row_list_children = row_list.children;
    const name_input = document.getElementById("prefab-name");

    if (!checkElementHasValue(cols_input)){
       document.getElementById("error-trial").style.display = "inline";
        return null
    } else {
        document.getElementById("error-trial").style.display = "none";
    }
    
    var cols = parseInt(cols_input.value) + 1;
    var rows = row_list.children.length;

    if (rows == 0){
        document.getElementById("error-rows").style.display = "inline";
        return null
    } else {
        document.getElementById("error-rows").style.display = "none";
    }

    const table = makeTable(rows,cols,false);
    var name = name_input.value.trim();

    for (let tr = 0; tr < rows; tr++){
        let row = row_list_children[tr];
        let row_name = row.firstChild.textContent.trim();
        let table_row_children = table.children[tr].children; //table>row>cellList

        table_row_children[0].firstChild.value = row_name; // cell>input>value
        console.log(row_name.toLowerCase() + "includes 'trial': " + row_name.toLowerCase().includes("trial"));
        if (row_name.toLowerCase().includes("trial")){
            for (let td = 1; td < cols; td++){
                console.log(table_row_children);
                let inp = table_row_children[td].firstChild;
                inp.setAttribute("value",td);
            }
        }
    }

    setup_new_table(name, table);
    name_input.value = "";
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