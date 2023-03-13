var player_map = {}
var home_data = [];
var guest_data = [];
var current_out = 0;
var inning = 1;
var inning_half = 0;

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
    inning_half = 0;
}

function read_from_cookies() {
    var home_data_cookie = document.cookie.split('; ').find(row => row.startsWith('home_data='));
    if (home_data_cookie) {
        home_data = JSON.parse(home_data_cookie.split('=')[1]);
        for (var i = 0; i < home_data.length; i++) {
            var table = document.getElementById("home-output-table");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            cell1.innerHTML = home_data[i]["order"];
            cell2.innerHTML = home_data[i]["player_number"];
            cell3.innerHTML = home_data[i]["direction"];
            cell4.innerHTML = home_data[i]["result"];
            cell5.innerHTML = home_data[i]["RBI"];
            cell6.innerHTML = home_data[i]["out"];
            scoreboard_update("home", home_data[i]["result"], home_data[i]["RBI"]);
            inning_calc(home_data[i]["out"]);
        }
    }
    var guest_data_cookie = document.cookie.split('; ').find(row => row.startsWith('guest_data='));
    if (guest_data_cookie) {
        guest_data = JSON.parse(guest_data_cookie.split('=')[1]);
        for (var i = 0; i < guest_data.length; i++) {
            var table = document.getElementById("guest-output-table");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            cell1.innerHTML = guest_data[i]["order"];
            cell2.innerHTML = guest_data[i]["player_number"];
            cell3.innerHTML = guest_data[i]["direction"];
            cell4.innerHTML = guest_data[i]["result"];
            cell5.innerHTML = guest_data[i]["RBI"];
            cell6.innerHTML = guest_data[i]["out"];
            scoreboard_update("guest", guest_data[i]["result"], guest_data[i]["RBI"]);
            inning_calc(guest_data[i]["out"]);
        }
    }
}

function inning_calc(out) {
    current_out += parseInt(out);
    if (current_out == 3) {
        current_out = 0;
        if (inning_half == 0) {
            inning_half = 1;
        }
        else {
            inning_half = 0;
            inning++;
        }
    }
}

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

function addRecord(team) {
    if (team == "home") {
        var order = document.getElementById("home-batting-order");
        var direction = document.getElementById("home-batting-direction").value;
        var result = document.getElementById("home-batting-result").value;
        var RBI = document.getElementById("home-RBI").value;
        var player_number = document.getElementById("home-player-number").value;
        var out = document.getElementById("home-out").value;
        var table = document.getElementById("home-output-table");
    }
    else {
        var order = document.getElementById("guest-batting-order");
        var direction = document.getElementById("guest-batting-direction").value;
        var result = document.getElementById("guest-batting-result").value;
        var RBI = document.getElementById("guest-RBI").value;
        var player_number = document.getElementById("guest-player-number").value;
        var out = document.getElementById("guest-out").value;
        var table = document.getElementById("guest-output-table");
    }

    if (player_number == "") {
        return;
    }
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = order.value;
    cell2.innerHTML = player_number;
    cell3.innerHTML = direction;
    cell4.innerHTML = result;
    cell5.innerHTML = RBI;
    cell6.innerHTML = out;

    scoreboard_update(team, result, RBI);

    inning_calc(out);

    var data = {
        order: order.value,
        player_number: player_number,
        direction: direction,
        result: result,
        RBI: RBI,
        out: out
    };
    if (team == "home") {
        home_data.push(data);
        document.cookie = "home_data=" + JSON.stringify(home_data);
    }
    else {
        guest_data.push(data);
        document.cookie = "guest_data=" + JSON.stringify(guest_data);
    }

    order_increment(order);
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
