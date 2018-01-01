/*global $, document, window, alert*/
/*eslint-disable no-unused-vars*/
function initSearchFields(boolEisenstadt) {
    'use strict';

    var startSelect,
        startRes,
        endSelect,
        endRes,
        optStart,
        optEnd,
        i,
        j,
        startID,
        endID;

    if (boolEisenstadt === true) {
        startID = "room-list-start-e";
        endID = "room-list-end-e";
    } else {
        startID = "room-list-start-p";
        endID = "room-list-end-p";
    }

    startSelect = document.getElementById(startID);
    startRes = $.urlParam("start");

    for (i = 0; i < startSelect.options.length; i = i + 1) {
        optStart = startSelect.options[i];

        if (optStart.value === startRes) {
            optStart.selected = true;
        } else {
            optStart.selected = false;
        }
    }

    endSelect = document.getElementById(endID);
    endRes = $.urlParam("end");

    for (j = 0; j < endSelect.options.length; j = j + 1) {
        optEnd = endSelect.options[j];

        if (optEnd.value === endRes) {
            optEnd.selected = true;
        } else {
            optEnd.selected = false;
        }
    }
}

function setActiveTab(boolEisenstadt) {
    'use strict';

    var tabEisenstadt = document.getElementById("tab-eisenstadt"),
        tabPinkafeld = document.getElementById("tab-pinkafeld");

    tabEisenstadt.removeAttribute("class");
    tabPinkafeld.removeAttribute("class");

    if (boolEisenstadt === true) {
        tabEisenstadt.setAttribute("class", "active");
    } else {
        tabPinkafeld.setAttribute("class", "active");
    }
}

function processData(allRows, boolEisenstadt) {
    'use strict';
    var dataListStart,
        dataListEnd,
        table = '',
        caption1 = '',
        caption2 = '',
        caption3 = '',
        caption4 = '',
        caption5 = '',
        caption6 = '',
        caption7 = '',
        caption8 = '',
        caption9 = '',
        caption10 = '',
        first = true,
        singleRow = 0,
        rowCells,
        level = '',
        url;

    if (boolEisenstadt === true) {
        dataListStart = document.getElementById("room-list-start-e");
        dataListEnd = document.getElementById("room-list-end-e");
    } else {
        dataListStart = document.getElementById("room-list-start-p");
        dataListEnd = document.getElementById("room-list-end-p");
    }

    for (singleRow = 0; singleRow < allRows.length; singleRow += 1) {
        rowCells = allRows[singleRow].split(';');

        if (rowCells[1] === '0' && caption1 === '') {
            level = 'Erdgeschoß';
            caption1 = 'full';
        } else if (rowCells[1] === '1' && caption2 === '') {
            level = '1. Obergeschoß';
            caption2 = 'full';
        } else if (rowCells[1] === '2' && caption3 === '') {
            level = '2. Obergeschoß';
            caption3 = 'full';
        } else if (rowCells[1] === '3' && caption4 === '') {
            level = 'TechLab';
            caption4 = 'full';
        } else if (rowCells[1] === '4' && caption5 === '') {
            level = 'Hauptgebäude EG';
            caption5 = 'full';
        } else if (rowCells[1] === '5' && caption6 === '') {
            level = 'Hautgebäude DG';
            caption6 = 'full';
        } else if (rowCells[1] === '6' && caption7 === '') {
            level = 'Labortrakt EG';
            caption7 = 'full';
        } else if (rowCells[1] === '7' && caption8 === '') {
            level = 'Labortrakt 1. OG';
            caption8 = 'full';
        } else if (rowCells[1] === '8' && caption9 === '') {
            level = 'Seminartrakt EG';
            caption9 = 'full';
        } else if (rowCells[1] === '9' && caption10 === '') {
            level = 'Labortrakt 1. OG';
            caption10 = 'full';
        }

        if (level !== null) {
            if (first) {
                first = false;
            } else {
                dataListStart.innerHTML += '</optgroup>';
                dataListEnd.innerHTML += '</optgroup>';
            }

            dataListStart.innerHTML += '<optgroup label="' + level + '">';
            dataListEnd.innerHTML += '<optgroup label="' + level + '">';
            level = null;
        }

        dataListStart.innerHTML += '<option value=' + rowCells[1] + "," + rowCells[3] + "," + rowCells[2] + '>' + rowCells[0] + '</option>';
        dataListEnd.innerHTML += '<option value=' + rowCells[1] + "," + rowCells[3] + "," + rowCells[2] + '>' + rowCells[0] + '</option>';

        table += '<li class="list-caption">' + level + '</li>';
        table += '<li><a href="indoornavi-map.html?room=';
        table += '<li><a href="navi.html?room=';
        table += rowCells[1];
        table += ',';
        table += rowCells[2];
        table += ',';
        table += rowCells[3];
        table += '">';
        table += rowCells[0];

        if (rowCells[4] !== "") {
            table += ' – ';
            table += rowCells[4];
        }

        table += '</a></li>';
    }

    $('#raumliste').append(table);

    //prüfen, ob es im Parameter ?-> gibt!
    //dann loop über alle einträge UND die selektierten setzen
    url = window.location.href;

    if (url.indexOf('?') !== -1) {
        initSearchFields(boolEisenstadt);
        setActiveTab(boolEisenstadt);
    }
}

function processEisenstadtData(data) {
    'use strict';

    var allRows = data.split(/\r?\n|\r/);

    processData(allRows, true);
}

function processPinkafeldData(data) {
    'use strict';

    var allRows = data.split(/\r?\n|\r/);

    processData(allRows, false);
}

$(document).ready(function () {
    'use strict';

    // Lädt Räume aus der CSV
    $.ajax({
        type: "GET",
        url: "raumliste-eisenstadt.csv",
        dataType: "text",
        success: function (data) {
            processEisenstadtData(data);
        }
    });

    $.ajax({
        type: "GET",
        url: "raumliste-pinkafeld.csv",
        success: function (data) {
            processPinkafeldData(data);
        }
    });

    // Suchfunktion
    /*$('#search').hideseek({
        highlight: true,
        navigation: true,
        headers: '.list-caption'
    });*/
});

function checkStartAndEnd(bool_eisenstadt) {
    'use strict';
    var startPoint, endPoint, animation, strUndefined = "undefined,undefined,undefined";

    if (bool_eisenstadt === true) {
        startPoint = document.getElementById("room-list-start-e").value;
        endPoint = document.getElementById("room-list-end-e").value;
        animation = document.getElementById("animation");
    } else {
        startPoint = document.getElementById("room-list-start-p").value;
        endPoint = document.getElementById("room-list-end-p").value;
        animation = document.getElementById("animation-p");
    }
    if (startPoint === strUndefined && endPoint === strUndefined) {
        alert("ACHTUNG! Du hast weder den Startraum noch den Zielraum ausgewählt!");
    } else if (startPoint === strUndefined) {
        alert("ACHTUNG! Du hast keinen Startraum ausgewählt!");
    } else if (endPoint === strUndefined) {
        alert("ACTUNG! Du hast keinen Zielraum ausgewählt!");
    } else if (startPoint === endPoint) {
        alert("Der Start- und Zielraum sind ident! Bitte zwei unterschiedliche Räume wählen!");
    } else {
        //window.location.href = "indoornavi-map.html?start=" + startPoint + "&end=" + endPoint + "&ani=" + animation.checked;
        window.location.href = "navi.html?start=" + startPoint + "&end=" + endPoint + "&ani=" + animation.checked;
    }
}
