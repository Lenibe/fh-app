/*global $, document*/
/*eslint-disable no-unused-vars*/

function searchPerson() {
    'use strict';

    var input, filter, ul, li, strong, i, str;

    input = document.getElementById("searchPerson");
    filter = input.value.toUpperCase();
    ul = document.getElementById("personList");
    li = ul.getElementsByTagName("li");
    //ToDo
    str = ul.getElementsByTagName("strong");

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
        persList;

    persList = document.getElementById('pList');
    
    persList.innerHTML += '<ul id="personList">';
    
    for (singleRow = 0; singleRow < allRows.length; singleRow += 1) {
        rowCells = allRows[singleRow].split(';');
        persList.innerHTML += '<li id="pListIcons">';
        persList.innerHTML += '<div id="pListRows">';

        //Person-Image
        persList.innerHTML += '<div id="person-image">';
        persList.innerHTML += '<img src="img/person/' + rowCells[0] + '" width="130" height="130">';
        persList.innerHTML += '</div>';

        persList.innerHTML += '<div id="person-content">';

        //Person-Name
        persList.innerHTML += '<div id="person-name"><strong>' + rowCells[1] + '</strong></div>';

        //Person-Function
        persList.innerHTML += '<div id="person-function"><span>' + rowCells[2] + '</span></div>';

        //Person-Institute
        persList.innerHTML += '<div id="person-institute"><span>' + rowCells[3] + '</span></div>';

        //Person-Location -> Navigate?
        persList.innerHTML += '<div id="person-location"><span>' + rowCells[4] + '</span></div>';

        //Person-Email
        persList.innerHTML += '<div id="person-mail">';
        persList.innerHTML += '<span><a href="javascript:linkTo_UnCryptMailto(&#39;ocknvq,ugbgp0cmiwgnBhj/dwtigpncpf0cv&#39;);">' + rowCells[5] + '</a></span>';
        persList.innerHTML += '</div>';

        //Person-Phone
        persList.innerHTML += '<div id="person-phone"><span><a href="tel:' + rowCells[6] + '">' + rowCells[6] + '</a></span></div>';

        persList.innerHTML += '</div></div><hr/></li>';
    }
    persList.innerHTML += '</ul>';
    
    setStyles();
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
