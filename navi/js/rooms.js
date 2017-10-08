$(document).ready(function () {
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
// Geladene Räume werden in Listenelemente gepackt
function processData(data) {
    var allRows = data.split(/\r?\n|\r/),
        table = "",
        caption1 = "",
        caption2 = "",
        caption3 = "",
        caption4 = "";

    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        var rowCells = allRows[singleRow].split(';');
        var datalist = document.getElementById('my-datalist');

        datalist.innerHTML += '<option value=' + rowCells[0] + '>';
        /*
        if (rowCells[1] == "0" && caption1 == "") {
            table += '<li class="list-caption">Erdgeschoß</li>';
            caption1 = 'full';
        } else if (rowCells[1] == "1" && caption2 == "") {
            table += '<li class="list-caption">1. Obergeschoß</li>';
            caption2 = 'full';
        } else if (rowCells[1] == "2" && caption3 == "") {
            table += '<li class="list-caption">2. Obergeschoß</li>';
            caption3 = 'full';
        } else if (rowCells[1] == "3" && caption4 == "") {
            table += '<li class="list-caption">Techlab</li>';
            caption4 = 'full';
        }
        
        table += '<li><a href="indoornavi-map.html?room=';
        table += rowCells[1];
        table += ',';
        table += rowCells[2];
        table += ',';
        table += rowCells[3];
        table += '">';
        table += rowCells[0];
        if (rowCells[4] != "") {
            table += ' – ';
            table += rowCells[4];
        }
        table += '</a></li>';*/
    }

    $('#raumliste').append(table);
}
