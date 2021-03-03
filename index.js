var open_nav = 0;
var slt_item = 0;
var slt_code = 0;

document.querySelectorAll('.side-sh-nav-item')[slt_item].style.color = "white";
document.querySelectorAll('.side-sh-nav-item')[slt_item].style.borderLeft = "3px solid red";
document.querySelectorAll('.side-nav-item')[slt_item].style.color = "white";
document.querySelectorAll('.cont')[slt_item].style.display = "inline-flex";
document.querySelectorAll('.crt-code-head-item')[slt_code].style.color = "white";
document.querySelectorAll('.crt-code-head-item')[slt_code].style.borderBottom = "1.5px solid white";
document.getElementById('crt-code-qiskit').style.display = "block";
document.getElementById('crt-code-QASM').style.display = "none";

var qiskit_code = document.getElementById('crt-code-qiskit');
var qasm_code = document.getElementById('crt-code-QASM');

qiskit_code.appendChild(defaultQiskitCode())
qasm_code.appendChild(defaultQASMCode())

var zero = [[1], [0]];
var one = [[0], [1]];
var H = [[1, 1], [1, -1]];
var X = [[0, 1], [1, 0]];
var I = [[1, 0], [0, 1]];
var reset = [[1, 1], [0, 0]];

runCircuit();


function changeTab(id){
  if(id === 5){
    return;
  }
  document.querySelectorAll('.side-sh-nav-item')[slt_item].style.color = "rgb(192, 192, 192)";
  document.querySelectorAll('.side-sh-nav-item')[slt_item].style.borderLeft = "none";
  document.querySelectorAll('.side-nav-item')[slt_item].style.color = "rgb(192, 192, 192)";
  document.querySelectorAll('.cont')[slt_item].style.display = "none";
  document.querySelectorAll('.side-sh-nav-item')[id].style.color = "white";
  document.querySelectorAll('.side-sh-nav-item')[id].style.borderLeft = "3px solid red";
  document.querySelectorAll('.side-nav-item')[id].style.color = "white";
  document.querySelectorAll('.cont')[id].style.display = "inline-flex";
  slt_item = id;
}
function toggleSlideMenu(){
  var hambar = document.getElementById('slide-nav-btn');
  var bar = document.getElementById('side-nav-bar');
  if(open_nav){
    hambar.childNodes[0].className = "fas fa-bars";
    bar.style.visibility = "hidden";
    document.querySelectorAll('.side-sh-nav-item').forEach((e) => {
      e.className = 'side-sh-nav-item tooltip';
    });
  }
  else{
    hambar.childNodes[0].className = "fas fa-times";
    bar.style.visibility = "visible";
    document.querySelectorAll('.side-sh-nav-item').forEach((e) => {
      console.log(e);
      e.className = 'side-sh-nav-item tooltiptog';
    });
  }
  open_nav = 1-open_nav;
}
function showQASM(){
  document.querySelectorAll('.crt-code-head-item')[slt_code].style.color = "rgb(155, 155, 155)";
  document.querySelectorAll('.crt-code-head-item')[slt_code].style.borderBottom = "none";
  document.querySelectorAll('.crt-code-head-item')[1].style.color = "white";
  document.querySelectorAll('.crt-code-head-item')[1].style.borderBottom = "1.5px solid white";
  document.getElementById('crt-code-QASM').style.display = "block";
  document.getElementById('crt-code-qiskit').style.display = "none";
  slt_code = 1;
}
function showQiskit(){
  document.querySelectorAll('.crt-code-head-item')[slt_code].style.color = "rgb(155, 155, 155)";
  document.querySelectorAll('.crt-code-head-item')[slt_code].style.borderBottom = "none";
  document.querySelectorAll('.crt-code-head-item')[0].style.color = "white";
  document.querySelectorAll('.crt-code-head-item')[0].style.borderBottom = "1.5px solid white";
  document.getElementById('crt-code-qiskit').style.display = "block";
  document.getElementById('crt-code-QASM').style.display = "none";
  slt_code = 0;
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("opreation", ev.target.innerHTML);
  ev.dataTransfer.setData("color", ev.target.style.backgroundColor);
}
function drop(ev) {
  ev.preventDefault();
  ev.target.style.backgroundColor = ev.dataTransfer.getData("color");
  ev.target.innerHTML = ev.dataTransfer.getData("opreation");
  writeQiskitCode();
  runCircuit();
}
function defaultQiskitCode() {
  // <ol>
  //   <li class="crt-code-qiskit-line">from qiskit import *</li>
  //   <li class="crt-code-qiskit-line"></li>
  //   <li class="crt-code-qiskit-line">q = QuantumRegister(4, 'q')</li>
  //   <li class="crt-code-qiskit-line">c = ClassicalRegister(4, 'c')</li>
  //   <li class="crt-code-qiskit-line">qc = QuantumCircuit(q, c)</li>
  // </ol>
  var elem = document.createElement('OL');
  var i1 = document.createElement('LI');
  var i2 = document.createElement('LI');
  var i3 = document.createElement('LI');
  var i4 = document.createElement('LI');
  var i5 = document.createElement('LI');
  var i6 = document.createElement('LI');

  i1.innerHTML = 'from qiskit import *';
  i2.innerHTML = '';
  i3.innerHTML = "q = QuantumRegister(4, 'q')";
  i4.innerHTML = "c = ClassicalRegister(4, 'c')";
  i5.innerHTML = "qc = QuantumCircuit(q, c)";
  i6.innerHTML = '';
  i1.setAttribute('class', 'crt-code-qiskit-line');
  i2.setAttribute('class', 'crt-code-qiskit-line');
  i3.setAttribute('class', 'crt-code-qiskit-line');
  i4.setAttribute('class', 'crt-code-qiskit-line');
  i5.setAttribute('class', 'crt-code-qiskit-line');
  i6.setAttribute('class', 'crt-code-qiskit-line');

  elem.appendChild(i1);
  elem.appendChild(i2);
  elem.appendChild(i3);
  elem.appendChild(i4);
  elem.appendChild(i5);
  elem.appendChild(i6);
  return elem;
}
function defaultQASMCode() {
  // <ol>
  //   <li>OPENQASM 2.0;</li>
  //   <li>include "qelib1.inc";</li>
  //   <li></li>
  //   <li>qreg q[4];</li>
  //   <li>creg c[4];</li>
  // </ol>
  var elem = document.createElement('OL');
  var i1 = document.createElement('LI');
  var i2 = document.createElement('LI');
  var i3 = document.createElement('LI');
  var i4 = document.createElement('LI');
  var i5 = document.createElement('LI');

  i1.innerHTML = 'OPENQASM 2.0;';
  i2.innerHTML = 'include "qelib1.inc";';
  i3.innerHTML = "";
  i4.innerHTML = "qreg q[4];";
  i5.innerHTML = "creg c[4];";
  i1.setAttribute('class', 'crt-code-qasm-line');
  i2.setAttribute('class', 'crt-code-qasm-line');
  i3.setAttribute('class', 'crt-code-qasm-line');
  i4.setAttribute('class', 'crt-code-qasm-line');
  i5.setAttribute('class', 'crt-code-qasm-line');

  elem.appendChild(i1);
  elem.appendChild(i2);
  elem.appendChild(i3);
  elem.appendChild(i4);
  elem.appendChild(i5);
  return elem;
}
function writeQiskitCode() {
  var def_code = defaultQiskitCode();
  var opreations = [];
  document.getElementById('crt-crt-crt-qubit').querySelectorAll('.qubit').forEach((qubit) => {
    var op = [];
    qubit.querySelectorAll('.qubit-gate').forEach((g) => {
      var o = g.innerHTML;
      if(o === "|0&gt;"){
        o = '0';
      }
      op.push(o);
    });
    opreations.push(op);
  });
  var invalid = false;
  for(var i = 0; i<15;i++){
    var dot=[],cx=[];
    for(var j = 0; j<5;j++){
      if(opreations[j][i] === 'H'){
        var l = document.createElement('LI');
        l.innerHTML = 'qc.h(q['+j+'])';
        l.setAttribute('class', 'crt-code-qiskit-line');
        def_code.appendChild(l);
      }
      else if(opreations[j][i] === 'X'){
        var l = document.createElement('LI');
        l.innerHTML = 'qc.x(q['+j+'])';
        l.setAttribute('class', 'crt-code-qiskit-line');
        def_code.appendChild(l);
      }
      else if(opreations[j][i] === '0'){
        var l = document.createElement('LI');
        l.innerHTML = 'qc.reset(q['+j+'])';
        l.setAttribute('class', 'crt-code-qiskit-line');
        def_code.appendChild(l);
      }
      else if(opreations[j][i] === 'I'){
        var l = document.createElement('LI');
        l.innerHTML = 'qc.id(q['+j+'])';
        l.setAttribute('class', 'crt-code-qiskit-line');
        def_code.appendChild(l);
      }
      else if(opreations[j][i] === 'Mz'){
        var l = document.createElement('LI');
        l.innerHTML = 'qc.measure(q['+j+'], c['+j+'])';
        l.setAttribute('class', 'crt-code-qiskit-line');
        def_code.appendChild(l);
      }
      else if(opreations[j][i] === '*'){
        dot.push(j);
      }
      else if(opreations[j][i] === 'CX'){
        cx.push(j);
      }
      else if(opreations[j][i] === 'CCX'){
        ccx.push(j);
      }
    }
    if(cx.length === 1){
      if(dot.length !== 1){
        invalid = true;
      }
      else{
        var l = document.createElement('LI');
        l.innerHTML = 'qc.cx(q['+dot[0]+'], q['+cx[0]+'])';
        l.setAttribute('class', 'crt-code-qiskit-line');
        def_code.appendChild(l);
      }
    }
  }
  if(invalid){
    document.getElementById('crt-code-qiskit').style.backgroundColor = 'red';
  }
  else{
    document.getElementById('crt-code-qiskit').style.backgroundColor = 'rgb(66, 66, 66)';
  }
  while (qiskit_code.firstChild) {
    qiskit_code.removeChild(qiskit_code.firstChild);
  }
  qiskit_code.appendChild(def_code);
}
function runCircuit() {
  var opreations = [];
  document.getElementById('crt-crt-crt-qubit').querySelectorAll('.qubit').forEach((qubit) => {
    var op = [];
    qubit.querySelectorAll('.qubit-gate').forEach((g) => {
      var o = g.innerHTML;
      if(o === "|0&gt;"){
        o = '0';
      }
      op.push(o);
    });
    opreations.push(op);
  });
  var state = crossProduct(zero, zero)
  for(var i=0;i<3;i++){
    state = crossProduct(zero, state);
  }
  var invalid = false;
  for(var i = 0; i<15;i++){
    var dot=[],cx=[],opr=[];
    for(var j = 0; j<5;j++){
      if(opreations[j][i] === 'H'){
        if(opr.length === 0){
          opr = H;
        }
        else{
          opr = crossProduct(H, opr);
        }
      }
      else if(opreations[j][i] === 'X'){
        if(opr.length === 0){
          opr = X;
        }
        else{
          opr = crossProduct(X, opr);
        }
      }
      else if(opreations[j][i] === '0'){
        if(opr.length === 0){
          opr = reset;
        }
        else{
          opr = crossProduct(reset, opr);
        }
      }
      else if(opreations[j][i] === 'I'){
        if(opr.length === 0){
          opr = I;
        }
        else{
          opr = crossProduct(I, opr);
        }
      }
      else if(opreations[j][i] === '--'){
        if(opr.length === 0){
          opr = I;
        }
        else{
          opr = crossProduct(I, opr);
        }
      }
      else if(opreations[j][i] === 'Mz'){
      }
      else if(opreations[j][i] === '*'){
        dot.push(j);
      }
      else if(opreations[j][i] === 'CX'){
        cx.push(j);
      }
      else if(opreations[j][i] === 'CCX'){
        ccx.push(j);
      }
    }
    if(cx.length === 1){
      if(dot.length !== 1){
        invalid = true;
      }
      else{
        // opreation on cnot gate
      }
    }
    state = dotProduct(opr, state);
  }
  if(invalid){
    document.getElementById('crt-code-qiskit').style.backgroundColor = 'red';
  }
  else{
    document.getElementById('crt-code-qiskit').style.backgroundColor = 'rgb(66, 66, 66)';
    // analysis state
    var normal_factor = 0;
    var labels = [];
    for(var i=0;i<state.length;i++){
      normal_factor += Math.abs(state[i][0]);
      if(state[i][0]!=0){
        labels.push(decimalToBinary(i));
      }
    }
    var percentage = [];
    for(var i=0;i<labels.length;i++){
      percentage.push((Math.abs(state[binaryToDecimal(labels[i])][0])*100)/normal_factor);
    }
    drawMeasurementProbablity(labels, percentage);
    drawStateVector(state, normal_factor);
  }
}
function crossProduct(M1, M2){
  var n1 = M1.length, n2 = M1[0].length, m1 = M2.length, m2 = M2[0].length;
  var ans = [];
  for(var i1=0;i1<n1;i1++){
    for(var j1=0;j1<m1;j1++){
      var x = [];
      for(var i2=0;i2<n2;i2++){
        for(var j2=0;j2<m2;j2++){
          x.push(M1[i1][i2]*M2[j1][j2]);
        }
      }
      ans.push(x);
    }
  }
  return ans;
}
function dotProduct(M1, M2){
  var n1 = M1.length, n2 = M1[0].length, m1 = M2.length, m2 = M2[0].length;
  if(n2 === m1){
    var ans = [];
    for(var i1=0;i1<n1;i1++){
      var x = [];
      for(var j2=0;j2<m2;j2++){
        var p = 0;
        for(var i=0;i<n2;i++){
          p += M1[i1][i]*M2[i][j2];
        }
        x.push(p);
      }
      ans.push(x);
    }
    return ans;
  }
  else{
    console.log('Invalid Dot Product');
  }
}
function decimalToBinary(x){
  var ans = '';
  for(var i=0;i<5;i++){
    ans = String(parseInt(x%2)) + ans;
    x = parseInt(x/2);
  }
  return ans;
}
function binaryToDecimal(x){
  var ans=0,p=1;
  for(var i=4;i>=0;i--){
    ans += parseInt(x[i])*p;
    p = p*2;
  }
  return ans;
}

function drawMeasurementProbablity(l, p){
  var mp = document.getElementById('result-container1');
  while (mp.firstChild) {
    mp.removeChild(mp.firstChild);
  }
  // <canvas height="240vh" id="crt-res-statevector"></canvas>
  var can = document.createElement('CANVAS');
  can.setAttribute('height', '265vh');
  can.setAttribute('id', 'crt-res-measure-prob');
  mp.appendChild(can);
  var ctx = document.getElementById('crt-res-measure-prob').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: l,
      datasets: [{
        label: 'Measurement Probablities',
          data: p,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
function drawStateVector(s, fac){
  var i1 = document.getElementById('stv1');
  var i2 = document.getElementById('stv2');
  while (i1.firstChild) {
    i1.removeChild(i1.firstChild);
  }
  while (i2.firstChild) {
    i2.removeChild(i2.firstChild);
  }
  for(var i=0;i<16;i++){
    var x = document.createElement('LI');
    x.innerHTML = String(Math.sqrt(Math.abs(s[i][0])/fac));
    i1.appendChild(x);
  }
  for(var i=16;i<32;i++){
    var x = document.createElement('LI');
    x.innerHTML = String(Math.sqrt(Math.abs(s[i][0])/fac));
    i2.appendChild(x);
  }
}