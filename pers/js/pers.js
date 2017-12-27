/*global $, document*/
/*eslint-disable no-unused-vars*/

function searchPerson() {
    'use strict';

    var input, filter, ul, li, strong, i;

    input = document.getElementById("searchPerson");
    filter = input.value.toUpperCase();
    ul = document.getElementById("personList");
    li = ul.getElementsByTagName("li");
        
    for (i = 0; i < li.length; i += 1) {
        strong = li[i].getElementsByTagName("strong").item(0);

        if (strong.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function setStyles() {
    'use strict';
    
    var pList = document.getElementById('pList');
    
    pList.style.listStyleType = "none";
    pList.style.textAlign = "center";
}

function processPersonData(data) {
    'use strict';

    var allRows = data.split(/\r?\n|\r/),
        singleRow = 0,
        rowCells,
        persList,
        pListIconsNode, 
        pListRowsNode, 
        pDivImageNode, 
        pImageNode, 
        pDivContentNode, 
        pDivPersonNameNode, 
        pStrongNode, 
        pStrongTextNode,
        pDivPersonFunctionNode,
        pSpanPersonFunctionNode,
        pSpanPersonFunctionTextNode,
        pDivPersonInstituteNode,
        pSpanPersonInstituteNode,
        pSpanPersonInstituteTextNode,
        pDivPersonLocationNode,
        pSpanPersonLocationNode,
        pSpanPersonLocationTextNode,
        pDivPersonMailNode,
        pSpanPersonMailNode,
        pAPersonMailNode,
        pAPersonMailTextNode,
        pDivPersonPhoneNode,
        pSpanPersonPhoneNode,
        pAPersonPhoneNode,
        pAPersonPhoneTextNode,
        strMail,
        resMail,
        pHR;

    persList = document.getElementById('personList');
    
    for (singleRow = 0; singleRow < allRows.length; singleRow += 1) {
        rowCells = allRows[singleRow].split(';');
        
        pListIconsNode = document.createElement('li');
        pListIconsNode.setAttribute('id', 'pListIcons');
        persList.appendChild(pListIconsNode);
        
        pListRowsNode = document.createElement('div');
        pListRowsNode.setAttribute('id', 'pListRows');
        pListRowsNode.setAttribute('class', 'pListRows');
        pListIconsNode.appendChild(pListRowsNode);

        //Person-Image
        pDivImageNode = document.createElement('div');
        pDivImageNode.setAttribute('id', 'person-image');
        pListRowsNode.appendChild(pDivImageNode);
        
        pImageNode = document.createElement('img');
        pImageNode.setAttribute('src', 'img/person/' +  rowCells[0]);
        pImageNode.setAttribute('width', '130');
        pImageNode.setAttribute('height', '130');
        pDivImageNode.appendChild(pImageNode);
        
        pDivContentNode = document.createElement('div');
        pDivContentNode.setAttribute('id', 'person-content');
        pDivContentNode.setAttribute('class', 'person-content');
        pListRowsNode.appendChild(pDivContentNode);
        
        //Person-Name
        pDivPersonNameNode = document.createElement('div');
        pDivPersonNameNode.setAttribute('id', 'person-name');
        pDivContentNode.appendChild(pDivPersonNameNode);
        pStrongNode = document.createElement('strong');
        pStrongTextNode = document.createTextNode(rowCells[1]);
        pStrongNode.appendChild(pStrongTextNode);
        pDivPersonNameNode.appendChild(pStrongNode);

        //Person-Function
        pDivPersonFunctionNode = document.createElement('div');
        pDivPersonFunctionNode.setAttribute('id', 'person-function');
        pDivContentNode.appendChild(pDivPersonFunctionNode);
        pSpanPersonFunctionNode = document.createElement('span');
        pSpanPersonFunctionTextNode = document.createTextNode(rowCells[2]);
        pSpanPersonFunctionNode.appendChild(pSpanPersonFunctionTextNode);
        pDivPersonFunctionNode.appendChild(pSpanPersonFunctionNode);

        //Person-Institute
        pDivPersonInstituteNode = document.createElement('div');
        pDivPersonInstituteNode.setAttribute('id', 'person-institute');
        pDivContentNode.appendChild(pDivPersonInstituteNode);
        pSpanPersonInstituteNode = document.createElement('span');
        pSpanPersonInstituteTextNode = document.createTextNode(rowCells[3]);
        pSpanPersonInstituteNode.appendChild(pSpanPersonInstituteTextNode);
        pDivPersonInstituteNode.appendChild(pSpanPersonInstituteNode);
        
        //Person-Location -> Navigate?
        pDivPersonLocationNode = document.createElement('div');
        pDivPersonLocationNode.setAttribute('id', 'person-location');
        pDivContentNode.appendChild(pDivPersonLocationNode);
        pSpanPersonLocationNode = document.createElement('span');
        pSpanPersonLocationTextNode = document.createTextNode(rowCells[4]);
        pSpanPersonLocationNode.appendChild(pSpanPersonLocationTextNode);
        pDivPersonLocationNode.appendChild(pSpanPersonLocationNode);

        //Person-Email
        pDivPersonMailNode = document.createElement('div');
        pDivPersonMailNode.setAttribute('id', 'person-mail');
        pDivContentNode.appendChild(pDivPersonMailNode);
        
        strMail = rowCells[5];
        resMail = strMail.replace("[at]", "@");
        
        pSpanPersonMailNode = document.createElement('span');
        pAPersonMailNode = document.createElement('a');
        
        pAPersonMailNode.setAttribute('href', 'mailto:' + resMail);
        pAPersonMailTextNode = document.createTextNode(rowCells[5]);
        
        pAPersonMailNode.appendChild(pAPersonMailTextNode);
        pSpanPersonMailNode.appendChild(pAPersonMailNode);
        pDivPersonMailNode.appendChild(pSpanPersonMailNode);

        //Person-Phone
        pDivPersonPhoneNode = document.createElement('div');
        pDivPersonPhoneNode.setAttribute('id', 'person-phone');
        pDivContentNode.appendChild(pDivPersonPhoneNode);
        pSpanPersonPhoneNode = document.createElement('span');
        pAPersonPhoneNode = document.createElement('a');
        pAPersonPhoneNode.setAttribute('href', 'tel:' + rowCells[6]);
        pAPersonPhoneTextNode = document.createTextNode(rowCells[6]);
        pAPersonPhoneNode.appendChild(pAPersonPhoneTextNode);
        pSpanPersonPhoneNode.appendChild(pAPersonPhoneNode);
        pDivPersonPhoneNode.appendChild(pSpanPersonPhoneNode);
        
        pHR = document.createElement('hr');
        pListIconsNode.appendChild(pHR);
    }
    
    //setStyles();
}

$(document).ready(function () {
    'use strict';

    // Liest die Personen aus CSV
    $.ajax({
        type: "GET",
        url: "personen.csv",
        dataType: "text",
        success: function (data) {
            processPersonData(data);
        }
    });
});
