let table_container;
let number_of_tables = 0;
//import { setup_new_table, checkElementHasValue } from "./helpers";


function start(){
    table_container = document.getElementById('table-container');
}

async function copyTable(table) { // AI Generated

    const copy = table.cloneNode(true);
    const numberOfColumns = table.children[0].children.length;
    const numberOfRows = table.children.length;

    // Copy computed styles BEFORE removing/replacing elements
    const originalElements = [
        table,
        ...table.querySelectorAll("*")
    ];

    const copiedElements = [
        copy,
        ...copy.querySelectorAll("*")
    ];

    originalElements.forEach((original, i) => {

        const copied = copiedElements[i];

        if (!copied) return;

        const style = getComputedStyle(original);

        copied.style.border = style.border;
        copied.style.fontFamily = style.fontFamily;
        copied.style.fontSize = style.fontSize;
        copied.style.fontWeight = style.fontWeight;
        copied.style.fontStyle = style.fontStyle;
        copied.style.textAlign = style.textAlign;
        copied.style.verticalAlign = style.verticalAlign;
        copied.style.backgroundColor = style.backgroundColor;
        copied.style.color = style.color;
    });

    // equal cell widths
    copy.querySelectorAll("td, th").forEach(cell => {
        cell.style.width = `${100 / numberOfColumns}%`;
        cell.style.height = "50px";

        if (cell.children.length === 0 && cell.textContent.trim() === "") {
            cell.appendChild(document.createTextNode("\u00A0"));
        }
    });

    // Remove things that shouldn't appear in Word
    copy.querySelectorAll(".no-copy").forEach(element => {
        element.remove();
    });

    // Replace inputs with their current values
    copy.querySelectorAll("input, textarea, select").forEach(element => {

        let value = "";

        if (element.tagName === "SELECT") {

            if (element.selectedIndex >= 0) {
                value = element.options[element.selectedIndex].text;
            }

        } else {
            value = element.value;
        }

        element.replaceWith(document.createTextNode(value));
    });

    // Make sure Word treats it as a table
    copy.style.borderCollapse = "collapse";
    copy.style.fontSize = "10pt";
    copy.style.width = "80%";

    copy.querySelectorAll("th, td").forEach(cell => {
        cell.style.padding = "3px";
        cell.style.fontSize = "10pt";
    });

    const html = copy.outerHTML;
    const text = copy.innerText;

    await navigator.clipboard.write([
        new ClipboardItem({
            "text/html": new Blob(
                [html],
                { type: "text/html" }
            ),
            "text/plain": new Blob(
                [text],
                { type: "text/plain" }
            )
        })
    ]);
}


function getTableN(n){
    for (const table of table_container.children){
        if (table.tagName == "TABLE" && table.getAttribute("number") == n){
            console.log("Table found");
            return table;
        }
    }
    console.log("Table not found");
    return null;
}

function copyTableN(){
    let n = this.getAttribute("number");
    copyTable(getTableN(n));
}