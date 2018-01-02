/*global $, document, window, Graph, astar, setTimeout, grid4, grid5, grid6, grid7, grid8, grid9*/
/*eslint-disable no-loop-func, no-undef*/

/*definitions*/
// Die Stockwerke wurden bereits eingebunden
var heg0Map = document.getElementById('heg0Map');
var hog1Map = document.getElementById('hog1Map');
var seg0Map = document.getElementById('seg0Map');
var sog1Map = document.getElementById('sog1Map');
var leg0Map = document.getElementById('leg0Map');
var log1Map = document.getElementById('log1Map');

var mainMap = [heg0Map, hog1Map, seg0Map, sog1Map, leg0Map, log1Map];

var graphHEG = new Graph(grid4);
var rows4 = grid4.length;
var cols4 = grid4[0].length;

var graphHOG = new Graph(grid5);
var rows5 = grid5.length;
var cols5 = grid5[0].length;

var graphLEG = new Graph(grid6);
var rows6 = grid6.length;
var cols6 = grid6[0].length;

var graphLOG = new Graph(grid7);
var rows7 = grid7.length;
var cols7 = grid7[0].length;

var graphSEG = new Graph(grid8);
var rows8 = grid8.length;
var cols8 = grid8[0].length;

var graphSOG = new Graph(grid9);
var rows9 = grid9.length;
var cols9 = grid9[0].length;

var graph = [graphHEG, graphHOG, graphLEG, graphLOG, graphSEG, graphSOG];
var rows = [rows4, rows5, rows6, rows7, rows8, rows9];
var cols = [cols4, cols5, cols6, cols7, cols8, cols9];
var grid = [grid4, grid5, grid6, grid7, grid8, grid9];

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

function ani() {
    'use strict';

    return 'ani';
}

function wayPoint() {
    'use strict';

    return 'waypoint';
}

function getHEG() {
    'use strict';

    //Hauptgebäude - Erdgeschoß
    return '0';
}

function getHOG() {
    'use strict';

    //Hauptgebäude - Obergeschoß
    return '1';
}

function getSEG() {
    'use strict';

    //Seminartrakt - Erdgeschoß
    return '2';
}

function getSOG() {
    'use strict';

    //Seminartrakt - Obergeschoß
    return '3';
}

function getLEG() {
    'use strict';

    //Labortrakt - Erdgeschoß
    return '4';
}

function getLOG() {
    'use strict';

    //Labortrakt - Obergeschoß
    return '5';
}

function getHEGMap() {
    'use strict';

    return '#heg0Map';
}

function getHOGMap() {
    'use strict';

    return '#hog1Map';
}

function getLEGMap() {
    'use strict';

    return '#leg0Map';
}

function getLOGMap() {
    'use strict';

    return '#log1Map';
}

function getSEGMap() {
    'use strict';

    return '#seg0Map';
}

function getSOGMap() {
    'use strict';

    return '#sog1Map';
}

function showStairs() {
    'use strict';

    return '#stairs';
}

function showBuilding() {
    'use strict';

    return '#building';
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

function getFour() {
    'use strict';

    return 4;
}

function getEight() {
    'use strict';

    return 8;
}

function getNineTeen() {
    'use strict';

    return 19;
}

function getTwentyOne() {
    'use strict';

    return 21;
}

function getHGtoTLX() {
    'use strict';

    return 1;
}

function getHGtoTLY() {
    'use strict';

    return 0;
}

function getThirdFloorX() {
    'use strict';

    return 23;
}

function getThirdFloorY() {
    'use strict';

    return 23;
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

function initEisenstadtMaps() { /*start_st*/
    'use strict';
    /*$(showStairs()).hide();
    $(showBuilding()).hide();

    if (start_st === groundFloor()) {
        $(eGFMap()).show();
        $(eFFMap()).hide();
        $(eSFMap()).hide();
        $(eTFMap()).hide();
    } else if (start_st === firstFloor()) {
        $(eGFMap()).hide();
        $(eFFMap()).show();
        $(eSFMap()).hide();
        $(eTFMap()).hide();
    } else if (start_st === secondFloor()) {
        $(eGFMap()).hide();
        $(eFFMap()).hide();
        $(eSFMap()).show();
        $(eTFMap()).hide();
    } else if (start_st === thirdFloor()) {
        $(eGFMap()).hide();
        $(eFFMap()).hide();
        $(eFFMap()).hide();
        $(eTFMap()).show();
    }*/
}

function initMaps(start_st) {
    'use strict';
    $(showStairs()).hide();
    $(showBuilding()).hide();

    if (start_st === getHEG()) {
        $(getHEGMap()).show();
        $(getHOGMap()).hide();
        $(getLEGMap()).hide();
        $(getLOGMap()).hide();
        $(getSEGMap()).hide();
        $(getSOGMap()).hide();
    } else if (start_st === getHOG()) {
        $(getHEGMap()).hide();
        $(getHOGMap()).show();
        $(getLEGMap()).hide();
        $(getLOGMap()).hide();
        $(getSEGMap()).hide();
        $(getSOGMap()).hide();
    } else if (start_st === getLEG()) {
        $(getHEGMap()).hide();
        $(getHOGMap()).hide();
        $(getLEGMap()).show();
        $(getLOGMap()).hide();
        $(getSEGMap()).hide();
        $(getSOGMap()).hide();
    } else if (start_st === getLOG()) {
        $(getHEGMap()).hide();
        $(getHOGMap()).hide();
        $(getLEGMap()).hide();
        $(getLOGMap()).show();
        $(getSEGMap()).hide();
        $(getSOGMap()).hide();
    } else if (start_st === getSEG()) {
        $(getHEGMap()).hide();
        $(getHOGMap()).hide();
        $(getLEGMap()).hide();
        $(getLOGMap()).hide();
        $(getSEGMap()).show();
        $(getSOGMap()).hide();
    } else if (start_st === getSOG()) {
        $(getHEGMap()).hide();
        $(getHOGMap()).hide();
        $(getLEGMap()).hide();
        $(getLOGMap()).hide();
        $(getSEGMap()).hide();
        $(getSOGMap()).show();
    }
}

function checkStairsBuilding(stairs, building) {
    'use strict';

    if ((stairs) && (!building)) {
        $(showStairs()).show();
        $(showBuilding()).hide();
    } else if ((building) && (!stairs)) {
        $(showStairs()).hide();
        $(showBuilding()).show();
    } else if ((!building) && (!stairs)) {
        $(showStairs()).hide();
        $(showBuilding()).hide();
    }
}

function getPoint(i, length, stairs, building) {
    'use strict';

    var point = '';

    if (i === 0) {
        point = pointStart();
    } else if (i < (length - 1)) {
        point = pointPath();
    } else {
        point = pointEnd();

        checkStairsBuilding(stairs, building);
    }

    return point;
}

function drawPath(st, start, end, stairs, building, ani) {
    'use strict';

    // astar anwenden
    var result = astar.search(graph[st], start, end),
        resultLength = result.length,
        punkt = '',
        i = 0;

    // Ergebnisse anzeigen
    for (i = 0; i < resultLength; i += 1) {
        if (ani) {
            (function (ind) {
                setTimeout(function () {
                    punkt = getPoint(ind, resultLength, stairs, building);
                    gridElems[st][result[ind].x][result[ind].y].classList.add(wayPoint(), punkt);
                }, 100 * ind);
            }(i));
        } else {
            punkt = getPoint(i, resultLength, stairs, building);
            gridElems[st][result[i].x][result[i].y].classList.add(wayPoint(), punkt);
        }
    }
}

function getStaircaseX(startX) {
    'use strict';

    var diffFour = 0,
        diffNineteen = 0,
        stX = Number(startX);

    if (stX > getFour()) {
        diffFour = stX - getFour();
    } else {
        diffFour = getFour() - stX;
    }

    if (stX > getNineTeen()) {
        diffNineteen = stX - getNineTeen();
    } else {
        diffNineteen = getNineTeen() - stX;
    }

    if (diffFour < diffNineteen) {
        return getFour();
    } else if (diffNineteen < diffFour) {
        return getNineTeen();
    }
}

function getStaircaseY(startY) {
    'use strict';

    var diffEight = 0,
        diffTwentyOne = 0,
        stY = Number(startY);

    if (stY > getEight()) {
        diffEight = stY - getEight();
    } else {
        diffEight = getEight() - stY;
    }

    if (stY > getTwentyOne()) {
        diffTwentyOne = stY - getTwentyOne();
    } else {
        diffTwentyOne = getTwentyOne() - stY;
    }

    if (diffEight < diffTwentyOne) {
        return getEight();
    } else if (diffTwentyOne < diffEight) {
        return getTwentyOne();
    }
}

function goToFloor(start_st, start_x, start_y, end_st, end_x, end_y, ani) {//ToDo1
    'use strict';
    var stairX = 0,
        stairY = 0,
        start = 0,
        end = 0,
        startX = start_x,
        startY = start_y,
        endY = end_y,
        endX = end_x,
        stockwerk = end_st,
        strMessage = '';

    //X- & Y-Koordinaten der nähesten Stiegen finden
    stairY = getStaircaseX(startY);
    stairX = getStaircaseY(startX);

    start = graph[start_st].grid[startY][startX];
    end = graph[start_st].grid[stairY][stairX];
    drawPath(start_st, start, end, true, false, ani);

    if (stockwerk === groundFloor()) {
        strMessage = 'Gehe ins Erdgeschoß!';
    } else {
        strMessage = 'Gehe in den ' + stockwerk + '. Stock!';
    }

    // Klicke auf den Button, um in das andere Stockwerk zu gelangen
    $("#stairs").append(strMessage).off("click touch").on("click touch", function () {
        initEisenstadtMaps(end_st);

        //von Stiege bis zum Endpunkt
        start = graph[end_st].grid[stairY][stairX];
        end = graph[end_st].grid[endY][endX];
        drawPath(end_st, start, end, false, false, ani);
    });
}

function goToTL(start_st, start_x, start_y, end_st, end_x, end_y, ani) {
    'use strict';

    var stairX = 0,
        stairY = 0,
        start = 0,
        end = 0,
        strMessageEG = 'Gehe ins Erdgeschoß!',
        strMessageTL = 'Gehe zum Techlab!',
        gfTrue = false;

    start = graph[start_st].grid[start_y][start_x];

    if (start_st !== groundFloor()) {
        stairY = getStaircaseX(start_y);
        stairX = getStaircaseY(start_x);

        end = graph[start_st].grid[stairY][stairX];
        drawPath(start_st, start, end, true, false, ani);

        // Klicke auf den Button, um in das andere Stockwerk zu gelangen
        $(showStairs()).append(strMessageEG).off("click touch").on("click touch", function () {
            initEisenstadtMaps(groundFloor());

            start = graph[groundFloor()].grid[stairY][stairX];
            end = graph[groundFloor()].grid[getHGtoTLY()][getHGtoTLX()];
            drawPath(groundFloor(), start, end, false, true, ani);

            setTimeout(function () {
                gfTrue = true;
            }, 500);

        });

        $(showBuilding()).append(strMessageTL).off("click touch").on("click touch", function () {
            if (gfTrue) {
                initEisenstadtMaps(end_st);
                start = graph[thirdFloor()].grid[getThirdFloorY()][getThirdFloorX()];
                end = graph[end_st].grid[end_y][end_x];
                drawPath(end_st, start, end, false, false, ani);
            }
        });
    } else if (start_st === groundFloor()) {
        end = graph[start_st].grid[getHGtoTLY()][getHGtoTLX()];
        drawPath(start_st, start, end, false, true, ani);

        $(showBuilding()).append(strMessageTL).off("click touch").on("click touch", function () {
            initEisenstadtMaps(end_st);

            start = graph[thirdFloor()].grid[getThirdFloorY()][getThirdFloorX()];
            end = graph[end_st].grid[end_y][end_x];
            drawPath(end_st, start, end, false, false, ani);
        });
    }
}

function goToHG(start_st, start_x, start_y, end_st, end_x, end_y, ani) {
    'use strict';

    var start = 0,
        end = 0,
        strMessageHG = 'Gehe zum Hauptgebäude!';

    start = graph[start_st].grid[start_y][start_x];
    end = graph[thirdFloor()].grid[getThirdFloorY()][getThirdFloorX()];
    drawPath(start_st, start, end, false, true, ani);

    $(showBuilding()).append(strMessageHG).off("click touch").on("click touch", function () {
        initEisenstadtMaps(groundFloor());

        if (end_st === groundFloor()) {
            start = graph[groundFloor()].grid[getHGtoTLY()][getHGtoTLX()];
            end = graph[end_st].grid[end_y][end_x];
            drawPath(groundFloor(), start, end, false, false, ani);
        } else {
            goToFloor(groundFloor(), getHGtoTLX(), getHGtoTLY(), end_st, end_x, end_y, ani);
        }
    });
}

function initPathStartEnd(start_st, start_x, start_y, end_st, end_x, end_y, ani) {
    'use strict';

    // Entferne zuvor erstellen Path
    $(".grid-box").removeClass("start end waypoint path");
    $("#stairs").hide().html('<span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>');
    $("#building").hide().html('<span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>');

    initMaps(start_st);

    var startY = start_y,
        startX = start_x,
        endX = end_x,
        endY = end_y,
        start = 0,
        end = 0;

    start = graph[start_st].grid[startY][startX];


    if (start_st === end_st) {
        //ist der Start-Stock = End-Stock -> Navigation durch das gleiche Stockwerk
        end = graph[end_st].grid[endY][endX];
        drawPath(end_st, start, end, false, false, ani);
    } else if (((start_st === getHEG()) && (end_st === getHOG())) ||
        ((start_st === getHOG()) && (end_st === getHEG())) ||
        ((start_st === getSEG()) && (end_st === getSOG())) ||
        ((start_st === getSOG()) && (end_st === getSEG())) ||
        ((start_st === getLEG()) && (end_st === getLOG())) ||
        ((start_st === getLOG()) && (end_st === getLEG()))) {
        goToFloor(start_st, start_x, start_y, end_st, end_x, end_y, ani);
    }


    /*else if ((start_st !== thirdFloor()) && (end_st !== thirdFloor())) {
        //wenn die Navigation im selben Gebäude ist, aber in unterschiedlichen Stockwerken!
        goToFloor(start_st, start_x, start_y, end_st, end_x, end_y, ani);
    } else if ((start_st !== thirdFloor()) && (end_st === thirdFloor())) {
        //wenn die Navigation von Hauptgebäude zu TechLab geht!
        goToTL(start_st, start_x, start_y, end_st, end_x, end_y, ani);
    } else if ((start_st === thirdFloor()) && ((end_st === groundFloor()) || (end_st === firstFloor()) || (end_st === secondFloor()))) {
        //wenn die Navigation von Techlab zu Hauptgebäude geht!
        goToHG(start_st, start_x, start_y, end_st, end_x, end_y, ani);
    }*/
}

function searchEndpoint() {
    'use strict';

    var start_res = $.urlParam(pointStart()).split(delimiterComma()),
        end_res = $.urlParam(pointEnd()).split(delimiterComma()),
        animation = $.urlParam(ani()),
        aniBool = false;

    if (animation === "true") {
        aniBool = true;
    } else {
        aniBool = false;
    }

    initPathStartEnd(start_res[0], start_res[1], start_res[2], end_res[0], end_res[1], end_res[2], aniBool);
}

$(document).ready(function () {
    'use strict';
    var url = window.location.href;

    if (url.indexOf('?') !== -1) {
        searchEndpoint();
    } else {
        initMaps(getHEG());
    }
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

/*$(document).ready(function () {
    'use strict';

    //searchEndpoint();
});*/

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
