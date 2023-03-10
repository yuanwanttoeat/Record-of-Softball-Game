var us_data = [];
var other_data = [];

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
    var table = document.getElementById("outputTable");
    var other_table = document.getElementById("otherOutputTable");
    var rowCount = table.rows.length;
    var other_rowCount = other_table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    for (var i = other_rowCount - 1; i > 0; i--) {
        other_table.deleteRow(i);
    }
    us_data = [];
    other_data = [];
    document.cookie = "us_data=" + JSON.stringify(us_data);
    document.cookie = "other_data=" + JSON.stringify(other_data);
}

function read_from_cookies() {
    var us_data_cookie = document.cookie.split('; ').find(row => row.startsWith('us_data='));
    if (us_data_cookie) {
        us_data = JSON.parse(us_data_cookie.split('=')[1]);
        console.log(us_data)
        for (var i = 0; i < us_data.length; i++) {
            var table = document.getElementById("outputTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = us_data[i]["order"];
            cell2.innerHTML = us_data[i]["playerNumber"];
            cell3.innerHTML = us_data[i]["direction"];
            cell4.innerHTML = us_data[i]["result"];
            cell5.innerHTML = us_data[i]["RBI"];
        }
    }
    var other_data_cookie = document.cookie.split('; ').find(row => row.startsWith('other_data='));
    if (other_data_cookie) {
        other_data = JSON.parse(other_data_cookie.split('=')[1]);
        for (var i = 0; i < other_data.length; i++) {
            var table = document.getElementById("otherOutputTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = us_data["order"];
            cell2.innerHTML = us_data["playerNumber"];
            cell3.innerHTML = us_data["direction"];
            cell4.innerHTML = us_data["result"];
            cell5.innerHTML = us_data["RBI"];
        }
    }
}

function addRecord(type) {
    if (type == "us") {
        var order = document.getElementById("battingOrder");
        var direction = document.getElementById("battingDirection").value;
        var result = document.getElementById("battingResult").value;
        var RBI = document.getElementById("RBI").value;
        var playerNumber = document.getElementById("playerNumber").value;
        var table = document.getElementById("outputTable");
        var run = document.getElementById("UsRun");
        var hit = document.getElementById("UsHit");
        var error = document.getElementById("OtherError");
    }
    else {
        var order = document.getElementById("OtherbattingOrder");
        var direction = document.getElementById("defenderPosition").value;
        var result = document.getElementById("defendingResult").value;
        var RBI = document.getElementById("OtherRBI").value;
        var playerNumber = document.getElementById("OtherplayerNumber").value;
        var table = document.getElementById("otherOutputTable");
        var run = document.getElementById("OtherRun");
        var hit = document.getElementById("OtherHit");
        var error = document.getElementById("UsError");
    }
    if (playerNumber == "") {
        return;
    }
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = order.value;
    cell2.innerHTML = playerNumber;
    cell3.innerHTML = direction;
    cell4.innerHTML = result;
    cell5.innerHTML = RBI;
    alert(parseInt(run.innerText) + parseInt(RBI.substr(0,1)))
    run.innerHTML = parseInt(run.innerText) + parseInt(RBI.substr(0,1));
    if(["1B","2B","3B","HR"].includes(result.substr(0,2))){
        hit.innerHTML = parseInt(hit.innerText) + 1;
    }
    if(result.substr(0,1) == "E"){
        error.innerHTML = parseInt(error.innerText) + 1;
    }

    var data = {
        order: order.value,
        playerNumber: playerNumber,
        direction: direction,
        result: result,
        RBI: RBI
    };
    if (type == "us") {
        us_data.push(data);
        document.cookie = "us_data=" + JSON.stringify(us_data);
    }
    else {
        other_data.push(data);
        document.cookie = "other_data=" + JSON.stringify(other_data);
    }

    order_increment(order);
}

function skip_order(type) {
    event.preventDefault();
    if (type == "us") {
        var order = document.getElementById("battingOrder");
    }
    else {
        var order = document.getElementById("OtherbattingOrder");
    }
    order_increment(order);
}

function downloadCSV(type) {
    if (type == "us") {
        var table = document.getElementById("outputTable");
    }
    else {
        var table = document.getElementById("otherOutputTable");
    }
    var rows = table.getElementsByTagName("tr");
    var csv = "";
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            csv += cells[j].innerText + ",";
        }
        csv = csv.slice(0, -1);
        csv += "\n";
    }

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "game-report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
