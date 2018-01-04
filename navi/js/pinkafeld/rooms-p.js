/*global $, document, window, alert*/
/*eslint-disable no-unused-vars*/
function initSearchFields() {
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

    startID = "room-list-start-p";
    endID = "room-list-end-p";

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

function processData(data) {
    'use strict';

    var allRows = data.split(/\r?\n|\r/),
        dataListStart,
        dataListEnd,
        table = '',
        caption1 = '',
        caption2 = '',
        caption3 = '',
        caption4 = '',
        caption5 = '',
        caption6 = '',
        first = true,
        singleRow = 0,
        rowCells,
        level = '',
        url;
    
    url = window.location.href;

    if (url.indexOf('?') === -1) {
        initMaps(getHEG());
    }
    
    dataListStart = document.getElementById("room-list-start-p");
    dataListEnd = document.getElementById("room-list-end-p");

    for (singleRow = 0; singleRow < allRows.length; singleRow += 1) {
        rowCells = allRows[singleRow].split(';');

        if (rowCells[1] === '0' && caption1 === '') {
            level = 'Hauptgebäude EG';
            caption1 = 'full';
        } else if (rowCells[1] === '1' && caption2 === '') {
            level = 'Hautgebäude DG';
            caption2 = 'full';
        } else if (rowCells[1] === '2' && caption3 === '') {
            level = 'Seminartrakt EG';
            caption3 = 'full';
        } else if (rowCells[1] === '3' && caption4 === '') {
            level = 'Seminartrakt 1. OG';
            caption4 = 'full';
        } else if (rowCells[1] === '4' && caption5 === '') {
            level = 'Labortrakt EG';
            caption5 = 'full';
        } else if (rowCells[1] === '5' && caption6 === '') {
            level = 'Labortrakt 1. OG';
            caption6 = 'full';
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
    }

    //prüfen, ob es im Parameter ?-> gibt!
    //dann loop über alle einträge UND die selektierten setzen
    if (url.indexOf('?') !== -1) {
        initSearchFields();
    }
}

$(document).ready(function () {
    'use strict';

    // Lädt Räume aus der CSV
    $.ajax({
        type: "GET",
        url: "raumliste-pinkafeld.csv",
        success: function (data) {
            processData(data);
        }
    });
});

function checkStartAndEnd() {
    'use strict';
    var startPoint, endPoint, animation, strUndefined = "undefined,undefined,undefined", strHTML;

    startPoint = document.getElementById("room-list-start-p").value;
    endPoint = document.getElementById("room-list-end-p").value;
    animation = document.getElementById("animation-p");
    strHTML = "pnavi.html?start=";
    
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
        window.location.href = strHTML + startPoint + "&end=" + endPoint + "&ani=" + animation.checked;
    }
}
