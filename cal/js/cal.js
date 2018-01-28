/*global $, document*/
$(document).ready(function () {
    'use strict';
    var lightRed = '#ff9f89',
        lightGreen = '#95b813',
        lightBlue = '#03528a',
        white = '#ffffff';
    
    $('#calendar').fullCalendar({
        header: {left: 'prev,next today', center: 'title', right: 'month,agendaWeek,agendaDay,listWeek'},   defaultDate: '2018-02-03',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [{ title: 'Präsentation App', start: '2018-02-03', color: lightRed},
                 { title: 'Abgabe Folien Endpräsentation', start: '2018-02-11', color: lightRed},
                 { title: 'Abgabe Selbsevaluierung', start: '2018-02-11', color: lightRed},
                 { title: 'Geburtstag :)', start: '2018-02-12', },
                 {title: 'Ferien', start: '2018-02-04', end: '2018-02-18', color: lightGreen},
                 {title: 'Conference', start: '2018-02-14', end: '2018-02-16', color: lightBlue, textColor: white},
                 {title: 'Valentinstagsessen', start: '2018-02-14T18:30:00', end: '2018-02-14T21:30:00'},
                 {title: 'Empirisches Forschungsdesign fertig schreiben', start: '2018-02-24', end: '2018-02-25', color: lightBlue, textColor: white},
                 {title: 'Endabgabe empirisches Forschungsdesign!!!', start: '2018-02-26T23:59:59', color: lightRed},
                 {title: 'MRW-ALV E.GH.HS2 - MIMK-3G2', start: '2018-03-03T08:30:00', end: '2018-03-03T12:00:00', color: lightRed},
                 {title: 'MRW-ALV E.GH.HS2 - MIMK-3G2', start: '2018-03-03T12:00:00', end: '2018-03-03T13:45:00', color: lightRed},
                 {title: 'Click for Google', url: 'http://google.com/', start: '2017-12-28'}
                ],
                timeFormat: 'H(:mm)'
    });
});