/*global document, $*/
/*eslint-disable no-unused-vars*/

function readOEH(data, tabName) {
    'use strict';

    var allRows = data.split(/\r?\n|\r/),
        persTable = document.getElementById(tabName),
        singleRow,
        rowCells,
        pNode,
        strongNode,
        strongNodeText,
        brNode,
        pPosNode,
        pNodeText,
        aNodeMail,
        aNodeMailText,
        h4Node,
        strongNodeDep,
        strongNodeDepText,
        pNodeRoot,
        strongNodeJG,
        strongNodeJGText,
        pNodePers,
        pNodePersText,
        lastDep = "",
        lastJG = "";

    brNode = document.createElement("br");

    for (singleRow = 0; singleRow < allRows.length; singleRow += 1) {
        rowCells = allRows[singleRow].split(";");

        if (rowCells[0] === "HV" || rowCells[0] === "SV") {
            if (tabName === "tab" + rowCells[0]) {
                pNode = document.createElement("p");
                persTable.appendChild(pNode);

                brNode = document.createElement("br");
                pNode.appendChild(brNode);

                strongNode = document.createElement("strong");
                strongNodeText = document.createTextNode(rowCells[1]);
                strongNode.appendChild(strongNodeText);
                pNode.appendChild(strongNode);

                brNode = document.createElement("br");
                pNode.appendChild(brNode);

                pPosNode = document.createElement("p");
                pNodeText = document.createTextNode(rowCells[2]);
                pNode.appendChild(pNodeText);
                pNode.appendChild(pPosNode);

                //brNode = document.createElement("br");
                //pNode.appendChild(brNode);

                aNodeMail = document.createElement("a");
                aNodeMail.setAttribute("href", "mailto:" + rowCells[3]);
                aNodeMailText = document.createTextNode(rowCells[3]);
                aNodeMail.appendChild(aNodeMailText);
                pNode.appendChild(aNodeMail);
            }
        } else if (rowCells[0] === "JV") {
            if (tabName === "tab" + rowCells[0]) {
                if (lastDep === "" || lastDep !== rowCells[1]) {
                    h4Node = document.createElement("h4");
                    h4Node.setAttribute("class", "h4-main");
                    strongNodeDep = document.createElement("strong");
                    strongNodeDepText = document.createTextNode(rowCells[1]);
                    strongNodeDep.appendChild(strongNodeDepText);
                    h4Node.appendChild(strongNodeDep);
                    persTable.appendChild(h4Node);
                    
                    lastDep = rowCells[1];
                }

                if (lastJG === "" || lastJG !== rowCells[2]) {
                    pNodeRoot = document.createElement("p");
                    persTable.appendChild(pNodeRoot);

                    strongNodeJG = document.createElement("strong");
                    strongNodeJGText = document.createTextNode(rowCells[2]);
                    strongNodeJG.appendChild(strongNodeJGText);
                    pNodeRoot.appendChild(strongNodeJG);
                    
                    lastJG = rowCells[2];
                }

                brNode = document.createElement("br");
                pNodeRoot.appendChild(brNode);

                pNodePers = document.createElement("p");
                pNodePersText = document.createTextNode(rowCells[3]);
                pNodePers.appendChild(pNodePersText);
                pNodeRoot.appendChild(pNodePers);
            }
        }
    }
}

$(document).ready(function () {
    'use strict';

    $.ajax({
        type: "GET",
        url: "OEH.csv",
        dataType: "text",
        success: function (data) {
            //Hochschulvertretung
            readOEH(data, "tabHV");
            readOEH(data, "tabSV");
            readOEH(data, "tabJV");
        }
    });
});
