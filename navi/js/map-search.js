/*global $, document, window, Graph, astar, setTimeout, grid0, grid1, grid2, grid3*/
/*eslint-disable no-loop-func, no-undef*/

/*definitions*/
// Die Stockwerke wurden bereits eingebunden
var eg0Map = document.getElementById('eg0Map');
var og1Map = document.getElementById('og1Map');
var og2Map = document.getElementById('og2Map');
var tb3Map = document.getElementById('tb3Map');

var mainMap = [eg0Map, og1Map, og2Map, tb3Map];

var graphEG = new Graph(grid0);
var rows0 = grid0.length;
var cols0 = grid0[0].length;

var graph1OG = new Graph(grid1);
var rows1 = grid1.length;
var cols1 = grid1[0].length;

var graph2OG = new Graph(grid2);
var rows2 = grid2.length;
var cols2 = grid2[0].length;

var graph3TL = new Graph(grid3);
var rows3 = grid3.length;
var cols3 = grid3[0].length;

var graph = [graphEG, graph1OG, graph2OG, graph3TL];
var rows = [rows0, rows1, rows2, rows3];
var cols = [cols0, cols1, cols2, cols3];
var grid = [grid0, grid1, grid2, grid3];

var gridElems = [],
    g = 0;

function initGrids(g) {
    'use strict';

    // vorläufiger Container für die zu erstellenden HTML-Elemente
    var docFrag = document.createDocumentFragment(),
        i = 0,
        elem,
        row,
        j;

    // Raster Elemente für begehbare Bereiche erzeugen
    for (i = 0; i < rows[g]; i += 1) {
        row = [];

        for (j = 0; j < cols[g]; j += 1) {
            // ignoriere nicht begehbare Bereiche
            if (grid[g][i][j] !== 0) {
                // Element erzeugen und Attribute setzen
                elem = document.createElement('div');
                elem.className = 'grid-box';
                elem.style.left = 100 / cols[g] * j + '%';
                elem.style.top = 100 / rows[g] * i + '%';
                elem.title = i + ', ' + j;
                //
                docFrag.appendChild(elem);
                row[j] = elem;
            }
        }
        // Elemente für späteren Zugriff speichern
        gridElems[g][i] = row;
    }
    mainMap[g].appendChild(docFrag);
}

var mainMapLength = mainMap.length;

for (g = 0; g < mainMapLength; g += 1) {
    gridElems[g] = [];
    initGrids(g);
}

function initMaps(start_st) {
    'use strict';

    if (start_st === "0") {
        $("#eg0Map").show();
        $("#og1Map").hide();
        $("#og2Map").hide();
        $("#tb3Map").hide();
    } else if (start_st === "1") {
        $("#eg0Map").hide();
        $("#og1Map").show();
        $("#og2Map").hide();
        $("#tb3Map").hide();
    } else if (start_st === "2") {
        $("#eg0Map").hide();
        $("#og1Map").hide();
        $("#og2Map").show();
        $("#tb3Map").hide();
    } else if (start_st === "3") {
        $("#eg0Map").hide();
        $("#og1Map").hide();
        $("#og2Map").hide();
        $("#tb3Map").show();
    }
}

function drawPath(st, start, end) {
    'use strict';

    // astar anwenden
    var result = astar.search(graph[st], start, end),
        resultLength = result.length,
        punkt = '',
        //start_x = result[0].parent.x,
        //start_y = result[0].parent.y,
        i = 0;

    // Ergebnisse anzeigen
    for (i = 0; i < resultLength; i += 1) {
        (function (ind) {
            setTimeout(function () {
                if (ind === 0){
                    punkt = 'start';
                    //gridElems[st][result[ind].x][result[ind].y].classList.add('waypoint', 'start');
                }
                else if (ind < (resultLength - 1)) {
                    punkt = 'path';
                    //gridElems[st][result[ind].x][result[ind].y].classList.add('waypoint', 'path');
                } else {
                    punkt = 'end';
                    //gridElems[st][result[ind].x][result[ind].y].classList.add('waypoint', 'end');
                }
                
                gridElems[st][result[ind].x][result[ind].y].classList.add('waypoint', punkt);
                
            }, 100 * ind);
        }(i));
    }
}

function initPathStartEnd(start_st, start_x, start_y, end_st, end_x, end_y) {
    //todo
    'use strict';

    // Entferne zuvor erstellen Path
    //$(".grid-box").removeClass("start end waypoint path");

    initMaps(start_st);

    var stockwerk = end_st,
        startY = start_y,
        startX = start_x,
        endX = end_x,
        endY = end_y,
        start = 0,
        end = 0;

    // ist Endpunkt im EG?
    if (stockwerk === "0") {
        start = graph[0].grid[startY][startX];
        end = graph[end_st].grid[endY][endX];
        drawPath(0, start, end);
    }
    
    if (stockwerk === "1") {
        start = graph[1].grid[startY][startX];
        end = graph[end_st].grid[endY][endX];
        drawPath(1, start, end);
    }
}

function searchEndpoint() {
    'use strict';

    var start_res = $.urlParam('start').split(","),
        end_res = $.urlParam('end').split(",");

    initPathStartEnd(start_res[0], start_res[1], start_res[2], end_res[0], end_res[1], end_res[2]);
}

$(document).ready(function () {
    'use strict';

    searchEndpoint();
});

// Übermittelter Wert aus URL wird an die function initPath übergeben
$.urlParam = function (name) {
    'use strict';

    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);

    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

$(document).ready(function () {
    'use strict';

    searchEndpoint();
});

// Übermittelter Wert aus URL wird an die function initPath übergeben
$.urlParam = function (name) {
    'use strict';

    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);

    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};
