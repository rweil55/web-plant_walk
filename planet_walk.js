
/*  Copyright by ROy Weil 2024
 *  Planet walk calculations by Roy Weil is licensed under CC BY-SA 4.0
 *      Attribution Required, Share Alike
*       https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1
*   must include the trailer information on any related html page.
*/
var planetNames = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
var astroInner = [0, 36, 67, 93, 141, 483, 886, 1782, 2793, 3670];
var astroOuter = [0, 46, 72, 100, 152, 520, 952, 1920, 3000, 3950]; // in million miles
var outputFormat = 'English';

function displayMenu() {
    menuLocation = document.getElementById('menu');
    menuLocation.innerHTML = '<ul>' +
        '<li><a href="index.html">Home</a> &nbsp; </li>' +
        ' <li> <a href="known_walks.html">Known Walks</a> &nbsp; </li>' +
        ' <li><a href="descriptions.html"> Planet descriptions</a> </li>' +
        ' <li textcolor:white; >Examples:' +
        '   <li onclick="simple();"> 1200 foot walk, </li > ' +
        '   <li onclick="brooke();"> Brooke Pioneer Trail </li > ' +
        '</li>' +
        '</ul>';
    trailerLocation = document.getElementById('trailer');
    trailerLocation.innerHTML = 'This page brought to you via the regional bicycle guide book <a href="https://freewheelingeasy.com" >FreewheelingEasy in Western Pennsylvania</a><br>' +
        '<span xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://planetwalk.freewheelingeasy.com/">Planet walk calculations</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://royweil.com/">Roy Weil</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>.</span>';

    /*
       ' <div id="sub" class="submenu"> ' +
        '<ul>' +
        '   <li onclick="simple();"> 1200 foot walk </li ><br> ' +
        '   <li onclick="brooke();"> Brooke Pioneer Trail </li > ' +
        '</ul>' +
        '</div > ' +
 '<ul>' +
        '   <li> 1200 foot walk </li > ' +
        '   <li> Brooke Pioneer Trail </li > ' +
        '</ul>' +

<ul id="menu-menu-2" class="nav-menu menucolor"><li id="menu-item-5720" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-5720"><a href="https://signmanual.eriepittsburghtrail.com/page-table-of-contents/">Table of Contents</a>
<ul class="sub-menu">
<li id="menu-item-5786" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5786"><a href="https://signmanual.eriepittsburghtrail.com/page-1-1-introduction/">1.1 Introduction</a></li>
<li id="menu-item-5273" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5273"><a href="https://signmanual.eriepittsburghtrail.com/page-1-3-getting-started/">1.3 Getting Started</a></li>
</ul>
</li>
<li id="menu-item-5188" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-5188"><a href="https://signmanual.eriepittsburghtrail.com/page-2-1-graphic-identity/">2.1 Graphic Identity</a>
<ul class="sub-menu">
<li id="menu-item-5787" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5787"><a href="https://signmanual.eriepittsburghtrail.com/page-2-2-ept-on-state-roads/">2.2 EPT on State Roads</a></li>
<li id="menu-item-5788" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5788"><a href="https://signmanual.eriepittsburghtrail.com/page-2-3-federal-signs-mutcd/">2.3 Federal Signs MUTCD</a></li>
<li id="menu-item-5789" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5789"><a href="https://signmanual.eriepittsburghtrail.com/page-2-4-individual-trail-logos/">2.4 Individual Trail Logos</a></li>
</ul>
</li>
<li id="menu-item-5189" class="menu-item menu-item-type-post_type

*/
}
function buildForm() {
    displayMenu();

    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'http:/');
    //  form.setAttribute('target', '_blank');

    form.appendChild(DropdownPlanets("planetFrom", 'Sun'));
    form.appendChild(textbox("planetFromDistance", '0'));
    form.appendChild(DropdownUnit("planetFromUnit"));

    form.appendChild(DropdownPlanets("planetTo", 'Earth'));
    form.appendChild(textbox("planetToDistance", '1'));
    form.appendChild(DropdownUnit("planetToUnit"));
    form.innerHTML += "<br>";

    form.appendChild(document.createTextNode("Output Units "));
    Radio(form, "outputFormat", "English", outputFormat);
    Radio(form, "outputFormat", "Metric", outputFormat);
    Radio(form, "outputFormat", "Steps", outputFormat);

    var formLocation = document.getElementById('setUpFrom');
    formLocation.appendChild(form);
    DisplayTable();
}

function DisplayTable() {
    // get the real word units
    console.log("DisplayTable 2");
    var astroMilMiles = [];
    var astroDifference = [];
    for (var i = 0; i < astroOuter.length; i++) {
        astroMilMiles[i] = (astroOuter[i] + astroInner[i]) / 2;
        astroDifference[i] = astroOuter[i] - astroInner[i];
        console.log("i = " + i + ", " + astroOuter[i] + ", " + astroInner[i] + "planet = " + astroMilMiles[i] + ", difference = " + astroDifference[i]);
    }
    console.log(astroMilMiles);
    // fetch the input values
    var startPlanet = document.getElementById('planetFrom')
    var startDistance = document.getElementById('planetFromDistance')
    var startUnit = document.getElementById('planetFromUnit')
    var endPlanet = document.getElementById('planetTo')
    var endDistance = document.getElementById('planetToDistance')
    var endUnit = document.getElementById('planetToUnit')
    if (startPlanet.value == endPlanet.value) {
        tableLocation = document.getElementById('tableResults');
        tableLocation.innerHTML = '<span style="color:red;">Start and end planets are the same</span>';
        OutputUnitsLocation = document.getElementById('OutputUnits');
        OutputUnitsLocation.innerHTML = '';
        return true;
    }

    var startDistance = convertInput2Feet(startDistance, startUnit);
    var endDistance = convertInput2Feet(endDistance, endUnit);
    var walkDistance = endDistance - startDistance;
    var worldDistance1 = astroDistance(startPlanet);
    var worldDistance2 = astroDistance(endPlanet);
    var worldDistance = worldDistance2 - worldDistance1;
    var scale = worldDistance / walkDistance;
    var temp = "walk distance" + walkDistance + ", world Distance = " + worldDistance + ", scale = " + scale;
    outputFormat = document.querySelector('input[name="outputFormat"]:checked').value;
    console.log(temp + ", outputFormat = " + outputFormat);
    //   --------------------------------------------------------------------- caculations down, now display the results in a table

    var table = document.createElement('table');
    table.setAttribute('border', '1');
    table.appendChild(headerRow('Planet', 'inner', 'outer', 'distance', 'distance', 'possible'));
    table.appendChild(headerRow('      ', '     ', '     ', 'to next ', 'from Sun', 'range   '));

    var sumDistance = startDistance;
    var planetWalk;
    for (var i = 0; i < planetNames.length; i++) {
        console.log("i = " + i + ", planet = " + astroMilMiles[i]);
        if (i == planetNames.length - 1) {
            planetWalk = ' ';
        } else {
            var d3 = astroMilMiles[i + 1] - astroMilMiles[i];
            planetWalk = d3 / scale
            console.log("ivalue = " + i + ", d1 = " + astroMilMiles[i + 1] + ", d2 = " + astroMilMiles[i] + ", d3 = " + d3 + ", scale = " + scale + ", planetWalk = " + planetWalk + "ivalue = " + i)
            planetWalk = planetWalk.toFixed(4);

        }
        $range = (astroDifference[i] / 2) / scale;
        table.appendChild(cellRow(planetNames[i], astroInner[i], astroOuter[i], DisplayFeet2outUnits(planetWalk), DisplayFeet2outUnits(sumDistance), "+-" + DisplayFeet2outUnits($range)));
        sumDistance = Number(sumDistance) + Number(planetWalk);
    }

    tableLocation = document.getElementById('tableResults');
    tableLocation.innerHTML = '';
    tableLocation.appendChild(table);
    return true;
}
function headerRow(p1, p2, p3, p4, p5, p6) {
    var row = document.createElement('tr');
    row.appendChild(document.createElement('th')).appendChild(document.createTextNode(p1));
    row.appendChild(document.createElement('th')).appendChild(document.createTextNode(p2));
    row.appendChild(document.createElement('th')).appendChild(document.createTextNode(p3));
    row.appendChild(document.createElement('th')).appendChild(document.createTextNode(p4));
    row.appendChild(document.createElement('th')).appendChild(document.createTextNode(p5));
    row.appendChild(document.createElement('th')).appendChild(document.createTextNode(p6));
    return row;
}
function cellRow(p1, p2, p3, p4, p5, p6) {
    var row = document.createElement('tr');
    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(p1));
    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(p2));
    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(p3));
    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(p4));
    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(p5));
    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(p6));
    return row;
}

function convertInput2Feet(distance, unit) {
    var dist = parseFloat(distance.value);
    var result = 0;
    switch (unit.value) {
        case 'feet':
            result = dist;
            break;
        case 'meters':
            result = dist * 3.28084;
            break;
        case 'miles':
            result = dist * 5280;
            break;
        case 'kilometers':
            result = dist * 3280.84;
            break;
        case 'steps':
            result = dist * 2.5;
            break;
        default:
            result = "unknown units";
            break;
    }
    console.log("convertInput2Feet: " + dist + ", " + unit.value + ", result " + result);
    return result;
}
function astroDistance(planet) {
    var index = planetNames.indexOf(planet.value);

    return (astroInner[index] + astroOuter[index]) / 2;
}

function textbox(id, value) {
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', id);
    input.setAttribute('value', value);
    input.setAttribute('onchange', 'DisplayTable();');
    return input;
}
function DropdownUnit(id) {
    var dropdown = document.createElement('select');
    dropdown
    dropdown.setAttribute('id', id);
    dropdown.setAttribute('onchange', 'DisplayTable();');
    dropdown.appendChild(option('feet'));
    dropdown.appendChild(option('meters'));
    dropdown.appendChild(option('miles'));
    dropdown.appendChild(option('kilometers'));
    dropdown.appendChild(option('steps'));

    return dropdown;
} function DropdownPlanets(id, selected) {
    var dropdown = document.createElement('select');
    dropdown.setAttribute('id', id);
    dropdown.setAttribute('onchange', 'DisplayTable();');

    for (var i = 0; i < planetNames.length; i++) {
        dropdown.appendChild(option(planetNames[i], selected));
    }
    return dropdown;
}
function option(value, selected) {
    var option = document.createElement('option');
    option.setAttribute('value', value);
    if (value == selected) {
        option.setAttribute('selected', 'selected');
    }
    option.innerHTML = value;
    return option;
}
function Radio(Location, name, value, currentValue) {
    var radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', name);
    radio.setAttribute('value', value);
    if (value == currentValue) {
        radio.setAttribute('checked', 'checked');
    }
    radio.setAttribute('onchange', 'DisplayTable();');
    Location.appendChild(radio);
    Location.appendChild(document.createTextNode(value));
    return true
}
function DisplayFeet2outUnits(number) {
    number = Math.abs(number);
    if (number < .0001) {
        return '0';
    }

    switch (outputFormat) {
        case 'English':
            x = number * 1.0;
            if (number < 2640) {
                return x.toFixed(1) + ' ft';
            } else {
                x = x / 5280;
                return x.toFixed(3) + ' miles';
            }
        case 'Metric':
            x = number * 0.3048;
            if (number < 1540) { //  1/2 km
                return x.toFixed(1) + " m";
            } else {
                x = x / 1000;
                return x.toFixed(3) + " km";
            }
        case 'Steps':
            x = number / 2.5;
            if (x < 200) {
                return x.toFixed(1) + " steps";
            } else {
                return (Math.round(x) + " steps")
            }
        default:
            return 'unknown units';
    }
} // end of DisplayFeet2outUnits
function brooke() {

    document.getElementById('planetFrom').value = "Sun"
    document.getElementById('planetFromDistance').value = '6.9';
    document.getElementById('planetFromUnit').value = 'miles';
    document.getElementById('planetTo').value = "Pluto"
    document.getElementById('planetToDistance').value = '3.7';
    document.getElementById('planetToUnit').value = 'miles';
    DisplayTable();
} //
function simple() {
    document.getElementById('planetFrom').value = "Sun"
    document.getElementById('planetFromDistance').value = '0';
    document.getElementById('planetFromUnit').value = 'feet';
    document.getElementById('planetTo').value = "Earth"
    document.getElementById('planetToDistance').value = '100';
    document.getElementById('planetToUnit').value = 'feet';
    DisplayTable();
} //