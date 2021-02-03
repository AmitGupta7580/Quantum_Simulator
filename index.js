var q1 = document.getElementById('crt-body-qubit-col-1');
var gt = document.getElementById('crt-body-gates-tab');
var q2 = document.getElementById('crt-body-qubit-col-2');
initialize();

function initialize() {
  Crt_createTable();
}

function togglemenu(id) {
  var i=1;
  document.querySelectorAll(".qc-nav-list-item").forEach((c) => {
    if(i === id){
      c.classList.add('active');
    }
    else{
      c.classList.remove('active');
    }
    i += 1;
  });
  i = 1;
  document.querySelectorAll(".sp").forEach((c) => {
    if(i === id){
      c.classList.add('activesp');
    }
    else{
      c.classList.remove('activesp');
    }
    i += 1;
  });
}

/* Circuit Functions */
function Crt_createTable() {
  qubits = parseInt(document.getElementById('crt-qubit-inp').value);
  gates = parseInt(document.getElementById('crt-gates-inp').value);
  while (q1.firstChild) {
    q1.removeChild(q1.firstChild);
  }
  while (q2.firstChild) {
    q2.removeChild(q2.firstChild);
  }
  while (gt.firstChild) {
    gt.removeChild(gt.firstChild);
  }
  if(qubits === "" || gates === "" || qubits === undefined || gates === undefined || qubits === null || gates === null){
    document.getElementById('sk-bar').innerHTML = "Enter valid number of qubits and gates";
    showSnackbar();
  }
  else{
    for(var i=0; i<qubits; i++) {
      q1.appendChild(Crt_getQubitCol(i+1, "inp"));
      var tr = document.createElement('TR');
      for(var j=0; j<gates; j++) {
        tr.appendChild(Crt_getGatesTab(i+1, j+1));
      }
      gt.appendChild(tr);
      q2.appendChild(Crt_getQubitCol(i+1, "out"));
    }
  }
}
function Crt_addQubits() {
  if(qubits === "" || gates === "" || qubits === undefined || gates === undefined || qubits === null || gates === null){
    document.getElementById('sk-bar').innerHTML = "Enter valid number of qubits and gates";
    showSnackbar();
  }
  else{
    if(qubits === 25) {
      document.getElementById('sk-bar').innerHTML = "Qubits does not excced 25";
      showSnackbar();
    }
    else {
      qubits += 1;
      q1.appendChild(Crt_getQubitCol(qubits, "inp"));
      q2.appendChild(Crt_getQubitCol(qubits, "out"));
      var tr = document.createElement('TR');
      for(var j=0; j<gates; j++) {
        tr.appendChild(Crt_getGatesTab(qubits, j+1));
      }
      gt.appendChild(tr);
    }
  }
}
function Crt_subQubits() {
  if(qubits === "" || gates === "" || qubits === undefined || gates === undefined || qubits === null || gates === null){
    document.getElementById('sk-bar').innerHTML = "Enter valid number of qubits and gates";
    showSnackbar();
  }
  else{
    if(qubits >= 2){
      qubits -= 1;
      q1.removeChild(q1.lastChild);
      q2.removeChild(q2.lastChild);
      gt.removeChild(gt.lastChild);
    }
    else{
      document.getElementById('sk-bar').innerHTML = "Cannot Remove more Qubits";
      showSnackbar();
    }
  }
}
function Crt_addGates() {
  if(qubits === "" || gates === "" || qubits === undefined || gates === undefined || qubits === null || gates === null){
    document.getElementById('sk-bar').innerHTML = "Enter valid number of qubits and gates";
    showSnackbar();
  }
  else{
    if(gates === 25) {
      document.getElementById('sk-bar').innerHTML = "Gates does not excced 25";
      showSnackbar();
    }
    else {
      gates += 1;
      var ch = gt.childNodes;
      for(var i=0;i<qubits; i++) {
        ch[i].appendChild(Crt_getGatesTab(i+1, gates));
      }
    }
  }
}
function Crt_subGates() {
  if(qubits === "" || gates === "" || qubits === undefined || gates === undefined || qubits === null || gates === null){
    document.getElementById('sk-bar').innerHTML = "Enter valid number of qubits and gates";
    showSnackbar();
  }
  else{
    if(gates >= 2){
      gates -= 1;
      var ch = gt.childNodes;
      for(var i=0;i<qubits; i++) {
        ch[i].removeChild(ch[i].lastChild);
      }
    }
    else{
      document.getElementById('sk-bar').innerHTML = "Cannot Remove more Gates";
      showSnackbar();
    }
  }
}
function Crt_getQubitCol(id, t) {
  /*
    <td>
      <input class="crt-qubit-out" id="qubit-out-1" type="text" value="0" disabled>
    </td>
  */
  var tr = document.createElement('TR');
  var td = document.createElement('TD');
  if(t === "out") {
    var inp = document.createElement('INPUT');

    inp.setAttribute("class", "crt-qubit-out")
    inp.setAttribute("id", "qubit-out-"+id);
    inp.setAttribute("type", "text");
    inp.setAttribute("value", "0");
    inp.disabled = true;

    td.appendChild(inp);
    tr.appendChild(td);
    return tr;
  }
  else {
    var slt = document.createElement('SELECT');
    var opt1 = document.createElement('OPTION');
    var opt2 = document.createElement('OPTION');
    var optxt1 = document.createTextNode("0");
    var optxt2 = document.createTextNode("1");

    slt.setAttribute("class", "crt-body-qubit-slt");
    slt.setAttribute("id", "qubit-inp-"+id);
    opt1.setAttribute("value", "0");
    opt2.setAttribute("value", "1");

    opt1.appendChild(optxt1);
    opt2.appendChild(optxt2);
    slt.appendChild(opt1);
    slt.appendChild(opt2);
    td.appendChild(slt);
    tr.appendChild(td);
    return tr;
  }
}
function Crt_getGatesTab(id_q, id_g) {
  var td = document.createElement('TD');
  var slt = document.createElement('SELECT');
  var opt1 = document.createElement('OPTION');
  var opt2 = document.createElement('OPTION');
  var opt3 = document.createElement('OPTION');
  var opt4 = document.createElement('OPTION');
  var optxt1 = document.createTextNode("----");
  var optxt2 = document.createTextNode("*");
  var optxt3 = document.createTextNode("H");
  var optxt4 = document.createTextNode("X");

  slt.setAttribute("class", "crt-body-gate-slt");
  slt.setAttribute("id", "gate-"+id_q+"-"+id_g);
  opt1.setAttribute("value", "Line");
  opt2.setAttribute("value", "Point");
  opt3.setAttribute("value", "Hadamard");
  opt4.setAttribute("value", "Not");

  opt1.appendChild(optxt1);
  opt2.appendChild(optxt2);
  opt3.appendChild(optxt3);
  opt4.appendChild(optxt4);
  slt.appendChild(opt1);
  slt.appendChild(opt2);
  slt.appendChild(opt3);
  slt.appendChild(opt4);
  td.appendChild(slt);
  return td;
}
function Crt_computeResult() {
  if(qubits === "" || gates === "" || qubits === undefined || gates === undefined || qubits === null || gates === null){
    document.getElementById('sk-bar').innerHTML = "Enter valid number of qubits and gates";
    showSnackbar();
  }
  else{
    if(Crt_checkCircuit()) {
      var inp = [];
      for(var i=1; i<=qubits; i++) {
        var x = document.getElementById('qubit-inp-'+i).value;
        console.log(x);
        if(x === "0") {
          inp.push(["1", x]);
        }
        else {
          inp.push([0, 1]);
        }
      }
      console.log(inp);
      for(var j=1; j<=gates; j++) {
        for(var i=1; i<=qubits; i++) {
          var g = document.getElementById('gate-'+i+'-'+j).value, a,b;
          if(g === "Hadamard") {
            a = inp[i-1][0] + inp[i-1][1];
            b = inp[i-1][0] - inp[i-1][1];
          }
          else if(g === "Not") {
            a = inp[i-1][1];
            b = inp[i-1][0];
          }
          else if(g === "Point") {

          }
          inp[i-1] = [a, b];
        }
      }
      for(var i=1; i<=qubits; i++) {
        var a = inp[i-1][0], b = inp[i-1][1], out;
        var rem = (a*a) + (b*b);
        rem = Math.sqrt(rem);
        if(a%rem === 0 && b%rem === 0) {
          a = a/rem;
          b = b/rem;
          if(a === 0) {
            out = b+".|1>";
          }
          else if(b === 0) {
            out = a+".|0>";
          }
          else {
            out = a+".|0> + "+b+".|1>";
          }
        }
        else{
          if(a === 0) {
            out = "(1/"+rem+")("+b+".|1>)";
          }
          else if(b === 0) {
            out = "(1/"+rem+")("+a+".|0>)";
          }
          else {
            out = "(1/"+rem+")("+a+".|0> + "+b+".|1>)";
          }
        }
        document.getElementById('qubit-out-'+i).value = out;
      }
    }
    else {
      document.getElementById('sk-bar').innerHTML = "Invalid Circuit";
      showSnackbar();
    }
  }
}
function Crt_checkCircuit() {
  for(var j=1; j<=gates; j++) {
    var flag1 = false;
    var flag2 = false;
    for(var i=1;i<=qubits; i++) {
      var x = document.getElementById('gate-'+i+'-'+j).value;
      if(x === "Hadamard") {
        flag1 = true;
      }
      else if(x === "Point") {
        flag2 = true;
      }
    }   
    if(flag1 && flag2) {
      return false;
    }
  }
  return true;
}