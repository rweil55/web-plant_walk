var planetNames = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
var astroInner = [0, 36, 67, 93, 141, 483, 886, 1782, 2793, 3670];
var astroOuter = [0, 46, 72, 100, 152, 520, 952, 1920, 3000, 3950]; // in million miles
var outputFormat = 'English';

function buildForm() {
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
            planetWalk = '';
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
    switch (outputFormat) {
        case 'English':
            if (number < 2640) {
                return number + ' ft';
            } else {
                return (number / 5280) + ' miles';
            }
        case 'Metric':
            if (number < 1540) { //  1/2 km
                return (number * 0.3048) + " m";
            } else {
                return (number * 0.0003048) + " km";
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
}