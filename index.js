function order_increment(order) {
    if (order.value == 11) {
        order.value = 1;
    }
    else {
        order.value++;
    }
}

function displaySelection(type) {
    if (type == "us") {
        var order = document.getElementById("battingOrder");
        var direction = document.getElementById("battingDirection").value;
        var result = document.getElementById("battingResult").value;
        var RBI = document.getElementById("RBI").value;
        var playerNumber = document.getElementById("playerNumber").value;
        var table = document.getElementById("outputTable");
    }
    else {
        var order = document.getElementById("OtherbattingOrder");
        var direction = document.getElementById("defenderPosition").value;
        var result = document.getElementById("defendingResult").value;
        var RBI = document.getElementById("OtherRBI").value;
        var playerNumber = document.getElementById("OtherplayerNumber").value;
        var table = document.getElementById("otherOutputTable");
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

function downloadCSV() {
    var table = document.getElementById("outputTable");
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
    link.setAttribute("download", "table.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadCSV1() {
    var table = document.getElementById("outputTable1");
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
    link.setAttribute("download", "table.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getplayerNumber() {
    var playerNumber = document.getElementById("playerNumber").value;
    alert("Player name is: " + playerNumber);
}