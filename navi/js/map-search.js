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

/* Konstanten - Start */
function pointStart() {
    'use strict';

    return 'start';
}

function pointPath() {
    'use strict';

    return 'path';
}

function pointEnd() {
    'use strict';

    return 'end';
}

function wayPoint() {
    'use strict';

    return 'waypoint';
}

function groundFloor() {
    'use strict';

    return '0';
}

function firstFloor() {
    'use strict';

    return '1';
}

function secondFloor() {
    'use strict';

    return '2';
}

function thirdFloor() {
    'use strict';

    return '3';
}

function gfMap() {
    'use strict';

    return '#eg0Map';
}

function ffMap() {
    'use strict';

    return '#og1Map';
}

function sfMap() {
    'use strict';

    return '#og2Map';
}

function tfMap() {
    'use strict';

    return '#tb3Map';
}

function elementDiv() {
    'use strict';

    return 'div';
}

function cnGridBox() {
    'use strict';

    return 'grid-box';
}

function strPercent() {
    'use strict';

    return '%';
}

function strCommaSpace() {
    'use strict';

    return ', ';
}

function delimiterComma() {
    'use strict';

    return ',';
}

function regExp1() {
    'use strict';

    return '[\\?&]';
}

function regExp2() {
    'use strict';

    return '=([^&#]*)';
}
/* Konstanten - Ende */

/* Funktionen - Start */
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
                elem = document.createElement(elementDiv());
                elem.className = cnGridBox();
                elem.style.left = 100 / cols[g] * j + strPercent();
                elem.style.top = 100 / rows[g] * i + strPercent();
                elem.title = i + strCommaSpace() + j;
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

/* Main - Start */
var mainMapLength = mainMap.length;

for (g = 0; g < mainMapLength; g += 1) {
    gridElems[g] = [];
    initGrids(g);
}
/* Main - Ende */

function initMaps(start_st) {
    'use strict';

    if (start_st === groundFloor()) {
        $(gfMap()).show();
        $(ffMap()).hide();
        $(sfMap()).hide();
        $(tfMap()).hide();
    } else if (start_st === firstFloor()) {
        $(gfMap()).hide();
        $(ffMap()).show();
        $(sfMap()).hide();
        $(tfMap()).hide();
    } else if (start_st === secondFloor()) {
        $(gfMap()).hide();
        $(ffMap()).hide();
        $(sfMap()).show();
        $(tfMap()).hide();
    } else if (start_st === thirdFloor()) {
        $(gfMap()).hide();
        $(ffMap()).hide();
        $(sfMap()).hide();
        $(tfMap()).show();
    }
}

function drawPath(st, start, end) {
    'use strict';

    // astar anwenden
    var result = astar.search(graph[st], start, end),
        resultLength = result.length,
        punkt = '',
        i = 0;

    // Ergebnisse anzeigen
    for (i = 0; i < resultLength; i += 1) {
        (function (ind) {
            setTimeout(function () {
                if (ind === 0) {
                    punkt = pointStart();
                } else if (ind < (resultLength - 1)) {
                    punkt = pointPath();
                } else {
                    punkt = pointEnd();
                }

                gridElems[st][result[ind].x][result[ind].y].classList.add(wayPoint(), punkt);

            }, 100 * ind);
        }(i));
    }
}

function initPathStartEnd(start_st, start_x, start_y, end_st, end_x, end_y) {
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
    
    //ist der Start-Stock = End-Stock -> Navigation durch das gleiche Stockwerk
    if (start_st === end_st) {
        start = graph[stockwerk].grid[startY][startX];
        end = graph[stockwerk].grid[endY][endX];
        drawPath(stockwerk, start, end);
    }

    // ist Endpunkt im EG?
    /*if (stockwerk === groundFloor()) {
        start = graph[0].grid[startY][startX];
        end = graph[end_st].grid[endY][endX];
        drawPath(0, start, end);
    }

    if (stockwerk === firstFloor()) {
        start = graph[1].grid[startY][startX];
        end = graph[end_st].grid[endY][endX];
        drawPath(1, start, end);
    }*/
}

function searchEndpoint() {
    'use strict';

    var start_res = $.urlParam(pointStart()).split(delimiterComma()),
        end_res = $.urlParam(pointEnd()).split(delimiterComma());

    initPathStartEnd(start_res[0], start_res[1], start_res[2], end_res[0], end_res[1], end_res[2]);
}

$(document).ready(function () {
    'use strict';

    searchEndpoint();
});

// Übermittelter Wert aus URL wird an die function initPath übergeben
$.urlParam = function (name) {
    'use strict';

    var results = new RegExp(regExp1() + name + regExp2()).exec(window.location.href);

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

    var results = new RegExp(regExp1() + name + regExp2()).exec(window.location.href);

    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};
