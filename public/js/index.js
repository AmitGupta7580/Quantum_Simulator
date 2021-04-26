/* Utilities of quantum simulator */

/* Class for complex state of qubits */
class Com {
  constructor(real, img) {
    this.real = real;
    this.img = img;
  }
  useangle(angle) {
    this.real = Math.cos(angle);
    this.img = Math.sin(angle);
    return this;
  }
  modulus() {
    let mod = (this.real*this.real) + (this.img*this.img);
    return mod;
  }
}

var zero = [[new Com(1 , 0)], [new Com(0 , 0)]];
var one = [[new Com(0 , 0)], [new Com(1 , 0)]];
var H = [[new Com(1 , 0), new Com(1 , 0)], [new Com(1 , 0), new Com(-1 , 0)]];
var X = [[new Com(0 , 0), new Com(1 , 0)], [new Com(1 , 0), new Com(0 , 0)]];
var I = [[new Com(1 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(1 , 0)]];
var reset = [[new Com(1 , 0), new Com(1 , 0)], [new Com(0 , 0), new Com(0 , 0)]];

var favCNOT = [[new Com(1 , 0), new Com(0 , 0), new Com(0 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(1 , 0), new Com(0 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(0 , 0), new Com(0 , 0), new Com(1 , 0)], [new Com(0 , 0), new Com(0 , 0), new Com(1 , 0), new Com(0 , 0)]]; // [[I, 0], [0, X]], lower bit is controlled by higher bit
var unfavCNOT =  [[new Com(1 , 0), new Com(0 , 0), new Com(0 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(0 , 0), new Com(0 , 0), new Com(1 , 0)], [new Com(0 , 0), new Com(0 , 0), new Com(1 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(1 , 0), new Com(0 , 0), new Com(0 , 0)]]; // higher bit is controlled by lower bit

var R1 = [[new Com(1 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(0, 0).useangle(Math.PI)]];
var R2 = [[new Com(1 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(0, 0).useangle(Math.PI/2)]];
var R3 = [[new Com(1 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(0, 0).useangle(Math.PI/4)]];
var R4 = [[new Com(1 , 0), new Com(0 , 0)], [new Com(0 , 0), new Com(0, 0).useangle(Math.PI/8)]];

/* usefull functions */

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

/* Drag and drop functions */

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
  generateQiskitCode();
  displayCode('qiskit');
  generateQASMCode();
  displayCode('qasm');
  runCircuit();
}

/* Quantum mathematics */

function runCircuit() {
  var opreations = [];
  document.getElementById(tab).querySelectorAll('.qubit').forEach((qubit) => {
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
  var state = crossProduct(zero, zero);
  for(var i=0;i<3;i++){
    state = crossProduct(zero, state);
  }
  var invalid = false;
  for(var i = 0; i<15;i++){
    var dot=[],cx=[],opr=[], sopr=[], cflag=0, cnt_empty=0;
    for(var j = 0; j<5;j++){
      if(opreations[j][i] === 'H'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = H;
          }
          else{
            opr = crossProduct(H, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = H;
          }
          else{
            sopr = crossProduct(H, sopr);
          }
        }
      }
      else if(opreations[j][i] === 'X'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = X;
          }
          else{
            opr = crossProduct(X, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = X;
          }
          else{
            sopr = crossProduct(X, sopr);
          }
        }
      }
      else if(opreations[j][i] === '0'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = reset;
          }
          else{
            opr = crossProduct(reset, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = reset;
          }
          else{
            sopr = crossProduct(reset, sopr);
          }
        }
      }
      else if(opreations[j][i] === 'I'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = I;
          }
          else{
            opr = crossProduct(I, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = I;
          }
          else{
            sopr = crossProduct(I, sopr);
          }
        }
      }
      else if(opreations[j][i] === '--'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = I;
          }
          else{
            opr = crossProduct(I, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = I;
          }
          else{
            sopr = crossProduct(I, sopr);
          }
        }
        cnt_empty+=1;
      }
      else if(opreations[j][i] === 'R1'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = R1;
          }
          else{
            opr = crossProduct(R1, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = R1;
          }
          else{
            sopr = crossProduct(R1, sopr);
          }
        }
      }
      else if(opreations[j][i] === 'R2'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = R2;
          }
          else{
            opr = crossProduct(R2, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = R2;
          }
          else{
            sopr = crossProduct(R2, sopr);
          }
        }
      }
      else if(opreations[j][i] === 'R3'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = R3;
          }
          else{
            opr = crossProduct(R3, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = R3;
          }
          else{
            sopr = crossProduct(R3, sopr);
          }
        }
      }
      else if(opreations[j][i] === 'R4'){
        if(cflag === 0){
          if(opr.length === 0){
            opr = R4;
          }
          else{
            opr = crossProduct(R4, opr);
          }
        }
        else{
          if(sopr.length === 0){
            sopr = R4;
          }
          else{
            sopr = crossProduct(R4, sopr);
          }
        }
      }
      else if(opreations[j][i] === 'Mz'){
      }
      else if(opreations[j][i] === '*'){
        if(cflag>0){
          sopr = cnot(sopr, 'fav');
          if(opr.length === 0){
            opr = sopr;
          }
          else{
            opr = crossProduct(sopr, opr);
          }
          sopr = [];
          cflag -= 1;
        }
        else if(cflag === 0){
          cflag -= 1;
        }
        else{
          invalid = true;
        }
        dot.push(j);
      }
      else if(opreations[j][i] === 'CX'){
        if(cflag<0){
          sopr = cnot(sopr, 'unfav');
          if(opr.length === 0){
            opr = sopr;
          }
          else{
            opr = crossProduct(sopr, opr);
          }
          sopr = [];
          cflag += 1;
        }
        else if(cflag === 0){
          cflag += 1;
        }
        else{
          invalid = true;
        }
        cx.push(j);
      }
      else if(opreations[j][i] === 'CCX'){
        ccx.push(j);
      }
    }
    if(cnt_empty === 5){
      continue;
    }
    if(cflag){
      invalid = true;
    }
    if(invalid){
      console.log("lol");
      break;
    }
    state = dotProduct(opr, state);
  }
  if(invalid){
    document.getElementById(tab+'-code-qiskit').style.backgroundColor = 'red';
  }
  else{
    document.getElementById(tab+'-code-qiskit').style.backgroundColor = 'rgb(66, 66, 66)';
    // analysis state
    var normal_factor = 0;
    var labels = [];
    for(var i=0;i<state.length;i++){
      var amp = state[i][0].modulus();
      normal_factor += amp;
      if(amp!=0){
        labels.push(decimalToBinary(i));
      }
    }
    var percentage = [];
    for(var i=0;i<labels.length;i++){
      percentage.push((state[binaryToDecimal(labels[i])][0].modulus()*100)/normal_factor);
    }
    if(r>=1){
      drawMeasurementProbablity(labels, percentage);
    }
    if(r<=1){
      drawStateVector(state, Math.sqrt(normal_factor));
    }
  }
}
/* Utility functions in Above function */
function cnot(middleopr, type) {  // create matrix of opreation b/w cnot implementation
  if(type === 'fav'){
    if(middleopr.length === 0){
      return favCNOT;
    }
    var m1 = crossProduct(middleopr, I);
    var m2 = crossProduct(middleopr, X);
    var n = middleopr.length*2;
    for(var i=0;i<n; i++){
      for(var j=0;j<n;j++){
        m1[i].push(new Com(0, 0));
        m2[i].unshift(new Com(0, 0));
      }
    }
    for(var i=0;i<n;i++){
      m1.push(m2[i]);
    }
    return m1;
  }
  else if(type === 'unfav'){
    if(middleopr.length === 0){
      return unfavCNOT;
    }
    var m1 = crossProduct(middleopr, [[new Com(1, 0), new Com(0, 0)], [new Com(0, 0), new Com(0, 0)]]);
    var m2 = crossProduct(middleopr, [[new Com(0, 0), new Com(0, 0)], [new Com(0, 0), new Com(1, 0)]]);
    var n = middleopr.length*2;
    for(var i=0;i<n; i++){
      for(var j=0;j<n;j++){
        m1[i].push(m2[i][j]);
        m2[i].push(m1[i][j]);
      }
    }
    for(var i=0;i<n;i++){
      m1.push(m2[i]);
    }
    return m1;
  }
}
function crossProduct(M1, M2) { // M1*M2 Put M2 in M1
  var n1 = M1.length, n2 = M1[0].length, m1 = M2.length, m2 = M2[0].length;
  var ans = [];
  for(var i1=0;i1<n1;i1++){
    for(var j1=0;j1<m1;j1++){
      var x = [];
      for(var i2=0;i2<n2;i2++){
        for(var j2=0;j2<m2;j2++){
          x.push(new Com(M1[i1][i2].real*M2[j1][j2].real - M1[i1][i2].img*M2[j1][j2].img, M1[i1][i2].real*M2[j1][j2].img - M1[i1][i2].img*M2[j1][j2].real));
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
        var r = 0, img=0;
        for(var i=0;i<n2;i++){ // M1[i1][i]*M2[i][j2];
          r += M1[i1][i].real*M2[i][j2].real - M1[i1][i].img*M2[i][j2].img;
          img += M1[i1][i].real*M2[i][j2].img + M1[i1][i].img*M2[i][j2].real;
        }
        x.push(new Com(r, img));
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

/* Displaying Probablity and statevectors */

function drawMeasurementProbablity(l, p){
  var mp = document.getElementById('result-container1');
  while (mp.firstChild) {
    mp.removeChild(mp.firstChild);
  }
  // <canvas height="240vh" id="crt-res-statevector"></canvas>
  var can = document.createElement('CANVAS');
  can.setAttribute('height', '265vh');
  can.setAttribute('id', 'measure-prob');
  mp.appendChild(can);
  var ctx = document.getElementById('measure-prob').getContext('2d');
  var bgcolor = [];
  for(var i in p){
    bgcolor.push("#6970d5");
  }
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: l,
      datasets: [{
        label: 'Measurement Probablities',
        data: p,
        backgroundColor: bgcolor,
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
    var sign = '+';
    if((s[i][0].img/fac).toFixed(3)<0){
      console.log(s[i][0]);
      sign = '-';
    }
    var x = document.createElement('LI');
    x.innerHTML = String((s[i][0].real/fac).toFixed(3)) + sign + String(Math.abs(s[i][0].img/fac).toFixed(3)) + 'j';
    i1.appendChild(x);
  }
  for(var i=16;i<32;i++){
    var sign = '+';
    if(s[i][0].img<0){
      sign = '-';
    }
    var x = document.createElement('LI');
    x.innerHTML = String((s[i][0].real/fac).toFixed(3)) + sign + String(Math.abs(s[i][0].img/fac).toFixed(3)) + 'j';
    i2.appendChild(x);
  }
}

/* Copy code to clipboard function */

function copyCode() {
  if(slt_code === 0) { // qiskit-code
    navigator.clipboard.writeText(qiskit_code).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
  else if(slt_code === 1) { // qasm-code
    navigator.clipboard.writeText(qasm_code).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}

function showQASM(){
  document.querySelectorAll('.code-head-item')[slt_code].style.color = "rgb(155, 155, 155)";
  document.querySelectorAll('.code-head-item')[slt_code].style.borderBottom = "none";
  document.querySelectorAll('.code-head-item')[1].style.color = "white";
  document.querySelectorAll('.code-head-item')[1].style.borderBottom = "1.5px solid white";
  document.getElementById(tab+'-code-QASM').style.display = "block";
  document.getElementById(tab+'-code-qiskit').style.display = "none";
  slt_code = 1;
}
function showQiskit(){
  document.querySelectorAll('.code-head-item')[slt_code].style.color = "rgb(155, 155, 155)";
  document.querySelectorAll('.code-head-item')[slt_code].style.borderBottom = "none";
  document.querySelectorAll('.code-head-item')[0].style.color = "white";
  document.querySelectorAll('.code-head-item')[0].style.borderBottom = "1.5px solid white";
  document.getElementById(tab+'-code-qiskit').style.display = "block";
  document.getElementById(tab+'-code-QASM').style.display = "none";
  slt_code = 0;
}


function displayCode(type) {
  if(type === 'qiskit'){
    while (qiskit.firstChild) {
      qiskit.removeChild(qiskit.firstChild);
    }
    var code = qiskit_code.split('\n');
  }
  else if(type === 'qasm'){
    while (qasm.firstChild) {
      qasm.removeChild(qasm.firstChild);
    }
    var code = qasm_code.split('\n');
  }
  for(var c in code){
    var e = document.createElement('BR');
    var d = document.createElement('DIV');
    if(c<5){
      d.setAttribute('contenteditable', 'false');
    }
    if(type === 'qiskit'){
      d.innerHTML = code[c];
      d.appendChild(e);
      qiskit.appendChild(d);
    }
    else if(type === 'qasm'){
      d.innerHTML = code[c];
      d.appendChild(e);
      qasm.appendChild(d);
    }
  }
}
function generateQiskitCode() {
  var def_code = 'from qiskit import *\n\nq = QuantumRegister(5, "q")\nc = ClassicalRegister(5, "c")\nqc = QuantumCircuit(q, c)\n';
  var opreations = [];
  document.getElementById(tab).querySelectorAll('.qubit').forEach((qubit) => {
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
        def_code += '\nqc.h(q['+j+'])';
      }
      else if(opreations[j][i] === 'X'){
        def_code += '\nqc.x(q['+j+'])';
      }
      else if(opreations[j][i] === '0'){
        def_code += '\nqc.reset(q['+j+'])';
      }
      else if(opreations[j][i] === 'I'){
        def_code += '\nqc.id(q['+j+'])';
      }
      else if(opreations[j][i] === 'R1'){
        def_code += '\nqc.p(pi, q['+j+'])';
      }
      else if(opreations[j][i] === 'R2'){
        def_code += '\nqc.p(pi/2, q['+j+'])';
      }
      else if(opreations[j][i] === 'R3'){
        def_code += '\nqc.p(pi/4, q['+j+'])';
      }
      else if(opreations[j][i] === 'R4'){
        def_code += '\nqc.p(pi/8, q['+j+'])';
      }
      else if(opreations[j][i] === 'Mz'){
        def_code += '\nqc.measure(q['+j+'], c['+j+'])';
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
        def_code += '\nqc.cx(q['+dot[0]+'], q['+cx[0]+'])';
      }
    }
  }
  if(invalid){
    document.getElementById(tab+'-code-qiskit').style.backgroundColor = 'red';
  }
  else{
    document.getElementById(tab+'-code-qiskit').style.backgroundColor = 'rgb(66, 66, 66)';
  }
  qiskit_code = def_code;
}
function compileQiskit(val) {
  var code = val.replace('<div contenteditable="false">from qiskit import *<br></div><div contenteditable="false"><br></div><div contenteditable="false">q = QuantumRegister(5, "q")<br></div><div contenteditable="false">c = ClassicalRegister(5, "c")<br></div><div contenteditable="false">qc = QuantumCircuit(q, c)<br></div>', '').replace(/<\/div>/g, '?').replace(/div|<|>|br|&nbsp;/g, '').split('?');
  var invalid = false;
  document.querySelectorAll('.qubit').forEach((q) => {
    q.querySelectorAll('.qubit-gate').forEach((qg) => {
      qg.innerHTML = '--';
      qg.setAttribute('style', "background-color: rgb(218, 218, 218);");
    });
  });
  for(var c in code){
    if(code[c] === '')
      continue
    // opreations: h,x,r,p,i,c
    if(code[c].length>=4){
      var line = code[c].slice(0,4)+code[c].slice(4).replace(/ /g, '');
      var opr = line[3];
      // console.log(opr);
      switch(opr) {
        case 'h': // qc.h(q[j]), rgb(255, 204, 64)
          if(line.length === 10){
            var q = parseInt(line[7]);
            if(isNaN(q) || q>4 || (line.replace('qc.h(q[', ':').replace('])', ':') !== ':'+line[7]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = 'H';
                  qg.setAttribute('style', "background-color: rgb(255, 204, 64);");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'x': // qc.x(q[j]), rgb(255, 117, 37)
          if(line.length === 10){
            var q = parseInt(line[7]);
            if(isNaN(q) || q>4 || (line.replace('qc.x(q[', ':').replace('])', ':') !== ':'+line[7]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = 'X';
                  qg.setAttribute('style', "background-color: rgb(255, 117, 37);");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'r': // qc.reset(q[j]), black
          if(line.length === 14){
            var q = parseInt(line[11]);
            if(isNaN(q) || q>4 || (line.replace('qc.reset(q[', ':').replace('])', ':') !== ':'+line[11]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = '|0>';
                  qg.setAttribute('style', "background-color: black;");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'i': // qc.id(q[j]), rgb(195, 209, 255)
          if(line.length === 11){
            var q = parseInt(line[8]);
            if(isNaN(q) || q>4 || (line.replace('qc.id(q[', ':').replace('])', ':') !== ':'+line[8]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = 'I';
                  qg.setAttribute('style', "background-color: rgb(195, 209, 255);");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'c': // qc.cx(q[i], q[j]), rgb(255, 94, 0)
          if(line.length === 17){
            var q = parseInt(line[8]), p = parseInt(line[14]);
            if(isNaN(q) || isNaN(p) || p>4 || q>4 || p===q || (line.replace('qc.cx(q[', ':').replace('], q[', ':').replace('])', ':') !== ':'+line[8]+':'+line[14]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false,cx=-1,as=-1,i=0;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  cx = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              found = false;
              i = 0;
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  as = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              i = Math.max(as, cx);
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].innerHTML = '*';
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(165, 165, 165);");
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].innerHTML = 'CX';
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(255, 94, 0);");
            }
          }
          else if(line.length === 16){
            var q = parseInt(line[8]), p = parseInt(line[13]);
            if(isNaN(q) || isNaN(p) || p>4 || q>4 || p===q || (line.replace('qc.cx(q[', ':').replace('],q[', ':').replace('])', ':') !== ':'+line[8]+':'+line[13]+':')){
              console.log('res');
              invalid = true;
              break;
            }
            else{
              var found=false,cx=-1,as=-1,i=0;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  cx = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              found = false;
              i = 0;
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  as = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              i = Math.max(as, cx);
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].innerHTML = '*';
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(165, 165, 165);");
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].innerHTML = 'CX';
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(255, 94, 0);");
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'p': // qc.p(pi, q[j]), 
          if(line.length >= 13){
            var angle_frac = line.split('pi')[1][0] === '\/'?parseInt(line.split('pi')[1][1]):1;
            if(angle_frac === 1){ // R1 qc.p(pi, q[j]), 
              if(line.replace('qc.p(pi,', ':').replace('])', ':').replace('q[', ':') === ': :'+line[11]+':'){
                var q = parseInt(line[11]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('qc.p(pi,', ':').replace('])', ':').replace('q[', ':') === '::'+line[10]+':'){
                var q = parseInt(line[10]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('qc.p(pi/1,', ':').replace('])', ':').replace('q[', ':') === ': :'+line[13]+':'){
                var q = parseInt(line[13]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('qc.p(pi/1,', ':').replace('])', ':').replace('q[', ':') === '::'+line[12]+':'){
                var q = parseInt(line[12]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else if(angle_frac === 2){ // qc.p(pi/2, q[j]), 
              if(line.replace('qc.p(pi/2,', ':').replace('])', ':').replace('q[', ':') === ': :'+line[13]+':'){
                var q = parseInt(line[13]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R2';
                      qg.setAttribute('style', "background-color: rgb(108, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('qc.p(pi/2,', ':').replace('])', ':').replace('q[', ':') === '::'+line[12]+':'){
                var q = parseInt(line[12]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R2';
                      qg.setAttribute('style', "background-color: rgb(108, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else if(angle_frac === 4){
              if(line.replace('qc.p(pi/4,', ':').replace('])', ':').replace('q[', ':') === ': :'+line[13]+':'){
                var q = parseInt(line[13]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R3';
                      qg.setAttribute('style', "background-color: rgb(69, 255, 52);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('qc.p(pi/4,', ':').replace('])', ':').replace('q[', ':') === '::'+line[12]+':'){
                var q = parseInt(line[12]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R3';
                      qg.setAttribute('style', "background-color: rgb(69, 255, 52);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else if(angle_frac === 8){
              if(line.replace('qc.p(pi/8,', ':').replace('])', ':').replace('q[', ':') === ': :'+line[13]+':'){
                var q = parseInt(line[13]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R4';
                      qg.setAttribute('style', "background-color: rgb(0, 255, 13);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('qc.p(pi/8,', ':').replace('])', ':').replace('q[', ':') === '::'+line[12]+':'){
                var q = parseInt(line[12]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R4';
                      qg.setAttribute('style', "background-color: rgb(0, 255, 13);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else{
              invalid = true;
            }
          }
          else{
            invalid = true;
          }
          break;
        default:
          invalid = true;
      }
    }
    else{
      invalid = true;
    }
  }
  generateQASMCode();
  displayCode('qasm');
  runCircuit();

  if(invalid){
    document.getElementById(tab+'-code-qiskit').style.backgroundColor = 'red';
  }
  else{
    document.getElementById(tab+'-code-qiskit').style.backgroundColor = 'rgb(66, 66, 66)';
  }
}
function generateQASMCode() {
  var def_code = 'OPENQASM 2.0;\ninclude "qelib1.inc";\n\nqreg q[5];\ncreg c[5];\n';
  var opreations = [];
  document.getElementById(tab).querySelectorAll('.qubit').forEach((qubit) => {
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
        def_code += '\nh q['+j+'];';
      }
      else if(opreations[j][i] === 'X'){
        def_code += '\nx q['+j+'];';
      }
      else if(opreations[j][i] === '0'){
        def_code += '\nreset q['+j+'];';
      }
      else if(opreations[j][i] === 'I'){
        def_code += '\nid q['+j+'];';
      }
      else if(opreations[j][i] === 'R1'){
        def_code += '\np(pi) q['+j+'];';
      }
      else if(opreations[j][i] === 'R2'){
        def_code += '\np(pi/2)  q['+j+'];';
      }
      else if(opreations[j][i] === 'R3'){
        def_code += '\np(pi/4)  q['+j+'];';
      }
      else if(opreations[j][i] === 'R4'){
        def_code += '\np(pi/8)  q['+j+'];';
      }
      else if(opreations[j][i] === 'Mz'){
        def_code += '\nmeasure q['+j+'] -> c['+j+'];';
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
        def_code += '\ncx q['+dot[0]+'], q['+cx[0]+'];';
      }
    }
  }
  if(invalid){
    document.getElementById(tab+'-code-QASM').style.backgroundColor = 'red';
  }
  else{
    document.getElementById(tab+'-code-QASM').style.backgroundColor = 'rgb(66, 66, 66)';
  }
  qasm_code = def_code;
}
function compileQASM(val) {
  var code = val.replace('<div contenteditable="false">OPENQASM 2.0;<br></div><div contenteditable="false">include "qelib1.inc";<br></div><div contenteditable="false"><br></div><div contenteditable="false">qreg q[5];<br></div><div contenteditable="false">creg c[5];<br></div>', '').replace(/<\/div>/g, '?').replace(/div|<|>|br|&nbsp;/g, '').split('?');;
  var invalid = false;
  document.querySelectorAll('.qubit').forEach((q) => {
    q.querySelectorAll('.qubit-gate').forEach((qg) => {
      qg.innerHTML = '--';
      qg.setAttribute('style', "background-color: rgb(218, 218, 218);");
    });
  });
  for(var c in code){
    if(code[c] === '')
      continue
    // opreations: h,x,r,p,i,c
    if(code[c].length>0){
      var line = code[c];//.slice(0,4)+code[c].slice(4).replace(/ /g, '');
      var opr = line[0];
      switch(opr) {
        case 'h': // h q[j];, rgb(255, 204, 64)
          if(line.length === 7){
            var q = parseInt(line[4]);
            if(isNaN(q) || q>4 || (line.replace('h q[', ':').replace('];', ':') !== ':'+line[4]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = 'H';
                  qg.setAttribute('style', "background-color: rgb(255, 204, 64);");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'x': // x q[j];, rgb(255, 117, 37)
          if(line.length === 7){
            var q = parseInt(line[4]);
            if(isNaN(q) || q>4 || (line.replace('x q[', ':').replace('];', ':') !== ':'+line[4]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = 'X';
                  qg.setAttribute('style', "background-color: rgb(255, 117, 37);");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'r': // reset q[j];, black
          if(line.length === 11){
            var q = parseInt(line[8]);
            if(isNaN(q) || q>4 || (line.replace('reset q[', ':').replace('];', ':') !== ':'+line[8]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = '|0>';
                  qg.setAttribute('style', "background-color: black;");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'i': // id q[j];, rgb(195, 209, 255)
          if(line.length === 8){
            var q = parseInt(line[5]);
            if(isNaN(q) || q>4 || (line.replace('id q[', ':').replace('];', ':') !== ':'+line[5]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  qg.innerHTML = 'I';
                  qg.setAttribute('style', "background-color: rgb(195, 209, 255);");
                  found = true
                }
              });
              if(found === false){
                invalid = true;
              }
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'c': // cx q[j], q[i];, rgb(255, 94, 0)
          if(line.length === 14){
            var q = parseInt(line[5]), p = parseInt(line[11]);
            if(isNaN(q) || isNaN(p) || p>4 || q>4 || p===q || (line.replace('cx q[', ':').replace('], q[', ':').replace('];', ':') !== ':'+line[5]+':'+line[11]+':')){
              invalid = true;
              break;
            }
            else{
              var found=false,cx=-1,as=-1,i=0;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  cx = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              found = false;
              i = 0;
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  as = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              i = Math.max(as, cx);
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].innerHTML = '*';
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(165, 165, 165);");
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].innerHTML = 'CX';
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(255, 94, 0);");
            }
          }
          else if(line.length === 13){ // cx q[j],q[i];
            var q = parseInt(line[5]), p = parseInt(line[10]);
            if(isNaN(q) || isNaN(p) || p>4 || q>4 || p===q || (line.replace('cx q[', ':').replace('],q[', ':').replace('];', ':') !== ':'+line[5]+':'+line[10]+':')){
              console.log('res');
              invalid = true;
              break;
            }
            else{
              var found=false,cx=-1,as=-1,i=0;
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  cx = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              found = false;
              i = 0;
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate').forEach((qg) => {
                if(qg.innerHTML === '--' && found === false){
                  as = i;
                  found = true
                }
                i+=1;
              });
              if(found === false){
                invalid = true;
              }
              i = Math.max(as, cx);
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].innerHTML = '*';
              document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(165, 165, 165);");
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].innerHTML = 'CX';
              document.querySelectorAll('.qubit')[p].querySelectorAll('.qubit-gate')[i].setAttribute('style', "background-color: rgb(255, 94, 0);");
            }
          }
          else{
            invalid = true;
          }
          break;
        case 'p': // qc.p(pi, q[j]), 
          if(line.length >= 10){
            var angle_frac = line.split('pi')[1][0] === '\/'?parseInt(line.split('pi')[1][1]):1;
            if(angle_frac === 1){ // R1 p(pi) q[j];
              if(line.replace('p(pi)', ':').replace('];', ':').replace('q[', ':') === ': :'+line[8]+':'){
                var q = parseInt(line[8]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('p(pi)', ':').replace('];', ':').replace('q[', ':') === '::'+line[7]+':'){
                var q = parseInt(line[7]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('p(pi/1)', ':').replace('];', ':').replace('q[', ':') === ': :'+line[10]+':'){
                var q = parseInt(line[10]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('p(pi/1)', ':').replace('];', ':').replace('q[', ':') === '::'+line[9]+':'){
                var q = parseInt(line[9]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R1';
                      qg.setAttribute('style', "background-color: rgb(158, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else if(angle_frac === 2){ // R2 p(pi/2) q[j]);
              if(line.replace('p(pi/2)', ':').replace('];', ':').replace('q[', ':') === ': :'+line[10]+':'){
                var q = parseInt(line[10]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R2';
                      qg.setAttribute('style', "background-color: rgb(108, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('p(pi/2)', ':').replace('];', ':').replace('q[', ':') === '::'+line[9]+':'){
                var q = parseInt(line[9]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R2';
                      qg.setAttribute('style', "background-color: rgb(108, 255, 78);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else if(angle_frac === 4){
              if(line.replace('p(pi/4)', ':').replace('];', ':').replace('q[', ':') === ': :'+line[10]+':'){
                var q = parseInt(line[10]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R3';
                      qg.setAttribute('style', "background-color: rgb(69, 255, 52);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('p(pi/4)', ':').replace('];', ':').replace('q[', ':') === '::'+line[9]+':'){
                var q = parseInt(line[9]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R3';
                      qg.setAttribute('style', "background-color: rgb(69, 255, 52);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else if(angle_frac === 8){
              if(line.replace('p(pi/8)', ':').replace('];', ':').replace('q[', ':') === ': :'+line[10]+':'){
                var q = parseInt(line[10]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R4';
                      qg.setAttribute('style', "background-color: rgb(0, 255, 13);");
                      found = true
                    }
                  });
                }
              }
              else if(line.replace('p(pi/8)', ':').replace('];', ':').replace('q[', ':') === '::'+line[9]+':'){
                var q = parseInt(line[9]);
                if(isNaN(q) || q>4){
                  invalid = true;
                }
                else{
                  var found=false;
                  document.querySelectorAll('.qubit')[q].querySelectorAll('.qubit-gate').forEach((qg) => {
                    if(qg.innerHTML === '--' && found === false){
                      qg.innerHTML = 'R4';
                      qg.setAttribute('style', "background-color: rgb(0, 255, 13);");
                      found = true
                    }
                  });
                }
              }
              else{
                invalid = true;
              }
            }
            else{
              invalid = true;
            }
          }
          else{
            invalid = true;
          }
          break;
        default:
          invalid = true;
      }
    }
  }
  if(invalid){
    document.getElementById(tab+'-code-QASM').style.backgroundColor = 'red';
  }
  else{
    document.getElementById(tab+'-code-QASM').style.backgroundColor = 'rgb(66, 66, 66)';
  }
  generateQiskitCode();
  displayCode('qiskit');
  runCircuit();
}
