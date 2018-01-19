/*global document, $*/
/*eslint-disable no-unused-vars*/
function readOpenTime(data, tableName) {
    'use strict';
    
    var allRows = data.split(/\r?\n|\r/),
        timetable = document.getElementById(tableName),
        singleRow,
        rowCells,
        trNodeRoot,
        thNodeEmpty,
        thContent,
        thContentText,
        trNodeWD, // WD = Week Day
        tdNodeWD,
        tdTextNodeWD,
        tdNodeTime,
        tdTextNodeTime,
        headerText,
        locationText;

    if (tableName === "EHD" || tableName === "PHD") {
        headerText = "Helpdesk";
    } else if (tableName === "ESC" || tableName === "PSC") {
        headerText = "Service Center";
    }

    if (tableName === "EHD" || tableName === "ESC") {
        locationText = "Eisenstadt";
    } else if (tableName === "PHD" || tableName === "PSC") {
        locationText = "Pinkafeld";
    }

    for (singleRow = 0; singleRow < allRows.length; singleRow += 1) {
        rowCells = allRows[singleRow].split(";");

        if (singleRow === 0) {
            trNodeRoot = document.createElement("tr");
            timetable.appendChild(trNodeRoot);

            thNodeEmpty = document.createElement("th");
            trNodeRoot.appendChild(thNodeEmpty);

            thContent = document.createElement("th");
            thContentText = document.createTextNode(headerText);
            thContent.appendChild(thContentText);
            trNodeRoot.appendChild(thContent);
        }

        if (rowCells[0] === headerText && rowCells[1] === locationText) {
            trNodeWD = document.createElement("tr");
            tdNodeWD = document.createElement("td");
            tdNodeWD.setAttribute("id", "table-day");
            tdTextNodeWD = document.createTextNode(rowCells[2]);
            tdNodeWD.appendChild(tdTextNodeWD);
            trNodeWD.appendChild(tdNodeWD);

            timetable.appendChild(trNodeWD);

            tdNodeTime = document.createElement("td");
            tdTextNodeTime = document.createTextNode(rowCells[3] + " - " + rowCells[4]);
            tdNodeTime.appendChild(tdTextNodeTime);
            trNodeWD.appendChild(tdNodeTime);

        }

    }
}

$(document).ready(function () {
    'use strict';
    
    $.ajax({
        type: "GET",
        url: "oeffnungszeiten.csv",
        dataType: "text",
        success: function (data) {
            //Eisenstadt - HelpDesk
            readOpenTime(data, "EHD");
            //Eisenstadt - Service Center
            readOpenTime(data, "ESC");
            //Pinkafeld - HelpDesk
            readOpenTime(data, "PHD");
            //Pinkafeld - Service Center
            readOpenTime(data, "PSC");
        }
    });
});
