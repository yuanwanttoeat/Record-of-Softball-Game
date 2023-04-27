var home_player_map = {}
var guest_player_map = {}
var home_data = [];
var guest_data = [];
var current_out = 0;
var inning = 1;

window.onload = function () {
    read_from_cookies();
}

function order_increment(order) {
    if (order.value == 11) {
        order.value = 1;
    }
    else {
        order.value++;
    }
}

function reset_table() {
    // reset table and all records in cookies
    var table = document.getElementById("home-output-table");
    var other_table = document.getElementById("guest-output-table");
    var rowCount = table.rows.length;
    var other_rowCount = other_table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    for (var i = other_rowCount - 1; i > 0; i--) {
        other_table.deleteRow(i);
    }
    home_data = [];
    guest_data = [];
    document.cookie = "home_data=" + JSON.stringify(home_data);
    document.cookie = "guest_data=" + JSON.stringify(guest_data);
    document.getElementById("home-batting-order").value = 1;
    document.getElementById("guest-batting-order").value = 1;
    document.getElementById("home-runs").innerHTML = 0;
    document.getElementById("guest-runs").innerHTML = 0;
    document.getElementById("home-hits").innerHTML = 0;
    document.getElementById("guest-hits").innerHTML = 0;
    document.getElementById("home-errors").innerHTML = 0;
    document.getElementById("guest-errors").innerHTML = 0;
    for (var i = 1; i < 10; i++) {
        document.getElementById("scoreboard").rows[1].cells[i].innerHTML = "";
        document.getElementById("scoreboard").rows[2].cells[i].innerHTML = "";
    }
    current_out = 0;
    inning = 1;
}

function read_from_cookies() {
    // Load home team player map from cookie
    var home_player_map_cookie = document.cookie.split('; ').find(row => row.startsWith('home_player_map='));
    if (home_player_map_cookie) {
        home_player_map = JSON.parse(home_player_map_cookie.split('=')[1]);
    }
    // Load home team play records from cookie
    var home_data_cookie = document.cookie.split('; ').find(row => row.startsWith('home_data='));
    if (home_data_cookie) {
        home_data = JSON.parse(home_data_cookie.split('=')[1]);
        var table = document.getElementById("home-output-table");
        for (var i = 0; i < home_data.length; i++) {
            insertRow(table, home_data[i]["order"], home_data[i]["player_number"], home_data[i]["direction"], home_data[i]["result"], home_data[i]["RBI"], home_data[i]["out"]);
            scoreboard_update("home", home_data[i]["result"], home_data[i]["RBI"]);
            inning_calc(home_data[i]["out"]);
        }
    }
    // Reset current_out and inning
    current_out = 0;
    inning = 1;
    // Load guest team player map from cookie
    var guest_player_map_cookie = document.cookie.split('; ').find(row => row.startsWith('guest_player_map='));
    if (guest_player_map_cookie) {
        guest_player_map = JSON.parse(guest_player_map_cookie.split('=')[1]);
    }
    // Load guest team play records from cookie
    var guest_data_cookie = document.cookie.split('; ').find(row => row.startsWith('guest_data='));
    if (guest_data_cookie) {
        guest_data = JSON.parse(guest_data_cookie.split('=')[1]);
        var table = document.getElementById("guest-output-table");
        for (var i = 0; i < guest_data.length; i++) {
            insertRow(table, guest_data[i]["order"], guest_data[i]["player_number"], guest_data[i]["direction"], guest_data[i]["result"], guest_data[i]["RBI"], guest_data[i]["out"]);
            scoreboard_update("guest", guest_data[i]["result"], guest_data[i]["RBI"]);
            inning_calc(guest_data[i]["out"]);
        }
    }
}

function inning_calc(out) {
    current_out += parseInt(out);
    if (current_out == 3) {
        current_out = 0;
        inning++;
    }
}

// Function to render the current number of outs in the div with id "outs-display"
function out_render() {
    var outsDisplay = document.getElementById("outs-display");
    for (let i = 0; i < 3; i++) {
        outsDisplay.children[0].style.backgroundColor = "lightgrey";
    }
    for (let i = 0; i < current_out; i++) {
        outsDisplay.children[i].style.backgroundColor = "red";
    }
}

function update_player_number() {
    document.getElementById("guest-player-number").value = guest_player_map[document.getElementById("guest-batting-order").value];
    document.getElementById("home-player-number").value = home_player_map[document.getElementById("home-batting-order").value];
};

function scoreboard_update(team, result, RBI) {
    var scoreboard = document.getElementById("scoreboard");
    if (team == "home") {
        var run = document.getElementById("home-runs");
        var hit = document.getElementById("home-hits");
        var error = document.getElementById("guest-errors");
        var inning_cell = scoreboard.rows[2].cells[inning];
    }
    else {
        var run = document.getElementById("guest-runs");
        var hit = document.getElementById("guest-hits");
        var error = document.getElementById("home-errors");
        var inning_cell = scoreboard.rows[1].cells[inning];
    }
    run.innerHTML = parseInt(run.innerText) + parseInt(RBI.substr(0, 1));
    if (inning_cell.innerText == "") {
        inning_cell.innerHTML = 0;
    }
    inning_cell.innerHTML = parseInt(inning_cell.innerText) + parseInt(RBI.substr(0, 1));
    if (["1B", "2B", "3B", "HR"].includes(result.substr(0, 2))) {
        hit.innerHTML = parseInt(hit.innerText) + 1;
    }
    if (result.substr(0, 1) == "E") {
        error.innerHTML = parseInt(error.innerText) + 1;
    }
}

function insertRow(table, order, player_number, direction, result, RBI, out) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = order;
    cell2.innerHTML = player_number;
    cell3.innerHTML = direction;
    cell4.innerHTML = result;
    cell5.innerHTML = RBI;
    cell6.innerHTML = out;
}

function addRecord(team) {
    var order = document.getElementById(team + "-batting-order");
    var direction = document.getElementById(team + "-batting-direction");
    var result = document.getElementById(team + "-batting-result");
    var RBI = document.getElementById(team + "-RBI");
    var player_number = document.getElementById(team + "-player-number");
    var out = document.getElementById(team + "-out");
    var table = document.getElementById(team + "-output-table");

    if (player_number == "") {
        alert("Please enter a player number");
        return;
    }
    // Insert a record
    insertRow(table, order.value, player_number.value, direction.value, result.value, RBI.value, out.value);
    // Save batting order and player number mapping
    console.log(order.value, player_number.value)
    console.log(home_player_map, guest_player_map)
    if (team == "home") {
        home_player_map[order.value] = player_number.value;
        document.cookie = "home_player_map=" + JSON.stringify(home_player_map);
    }
    else {
        guest_player_map[order.value] = player_number.value;
        document.cookie = "guest_player_map=" + JSON.stringify(guest_player_map);
    }
    // Update the scoreboard
    scoreboard_update(team, result.value, RBI.value);
    // Update the number of outs and inning
    inning_calc(out.value);
    // Render the number of outs
    out_render();

    var data = {
        order: order.value,
        player_number: player_number.value,
        direction: direction.value,
        result: result.value,
        RBI: RBI.value,
        out: out.value
    };
    if (team == "home") {
        home_data.push(data);
        document.cookie = "home_data=" + JSON.stringify(home_data);
    }
    else {
        guest_data.push(data);
        document.cookie = "guest_data=" + JSON.stringify(guest_data);
    }

    // Reset the input fields
    if (team == "home") {
        player_number.value = home_player_map[order.value];
    }
    else {
        player_number.value = guest_player_map[order.value];
    }
    direction.selectedIndex = 0;
    result.selectedIndex = 0;
    RBI.selectedIndex = 0;
    out.selectedIndex = 0;

    order_increment(order);

    update_player_number();
}

function skip_order(team) {
    event.preventDefault();
    if (team == "home") {
        var order = document.getElementById("home-batting-order");
    }
    else {
        var order = document.getElementById("guest-batting-order");
    }
    order_increment(order);
}

function downloadCSV() {
    var csv = "";
    home_table = document.getElementById("home-output-table");
    guest_table = document.getElementById("guest-output-table");
    var home_rows = home_table.getElementsByTagName("tr");
    for (var i = 0; i < home_rows.length; i++) {
        var cells = home_rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            csv += cells[j].innerText + ",";
        }
        csv = csv.slice(0, -1);
        csv += "\n";
    }
    csv += "\n";
    var guest_rows = guest_table.getElementsByTagName("tr");
    for (var i = 0; i < guest_rows.length; i++) {
        var cells = guest_rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            csv += cells[j].innerText + ",";
        }
        csv = csv.slice(0, -1);
        csv += "\n";
    }

    var blob = new Blob([csv], { team: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "game-report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
