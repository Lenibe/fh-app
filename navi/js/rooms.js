/*global $, document, window, alert*/
/*eslint-disable no-unused-vars*/

function processData(data) {
    'use strict';

    var allRows = data.split(/\r?\n|\r/),
        table = '',
        caption1 = '',
        caption2 = '',
        caption3 = '',
        caption4 = '',
        first = true,
        singleRow = 0,
        rowCells,
        dataListStart,
        dataListEnd,
        level = '';

    //datalist.innerHTML += '<optgroup label="Erdgeschoß">';
    //datalist.innerHTML += '<select name="rooms">';
    for (singleRow = 0; singleRow < allRows.length; singleRow += 1) {
        rowCells = allRows[singleRow].split(';');
        dataListStart = document.getElementById('room-list-start');
        dataListEnd = document.getElementById('room-list-end');

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
}

$(document).ready(function () {
    'use strict';

    // Lädt Räume aus der CSV
    $.ajax({
        type: "GET",
        url: "raumliste.csv",
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });

    // Suchfunktion
    $('#search').hideseek({
        highlight: true,
        navigation: true,
        headers: '.list-caption'
    });
});

function checkStartAndEnd() {
    'use strict';

    var startPoint = document.getElementById("room-list-start").value,
        endPoint = document.getElementById("room-list-end").value,
        strUndefined = "undefined,undefined,undefined",
        animation = document.getElementById("animation");
    
    if (startPoint === strUndefined && endPoint === strUndefined) {
        alert("ACHTUNG! Du hast weder den Startraum noch den Zielraum ausgewählt!");
    } else if (startPoint === strUndefined) {
        alert("ACHTUNG! Du hast keinen Startraum ausgewählt!");
    } else if (endPoint === strUndefined) {
        alert("ACTUNG! Du hast keinen Zielraum ausgewählt!");
    } else if (startPoint === endPoint) {
        alert("Der Start- und Zielraum sind ident! Bitte zwei unterschiedliche Räume wählen!");
    } else {
        window.location.href = "indoornavi-map.html?start=" + startPoint + "&end=" + endPoint + "&ani=" + animation.checked;
    }
}
