
/* Example jS */

var slt_ex_item = 0;
var slt_ex_code = 0;
document.querySelectorAll('.ex-cont')[slt_ex_item].style.display = "inline-flex";

function toggleExample(val){
  document.getElementById('ex').querySelectorAll('.ex-cont')[slt_ex_item].style.display = "none";
  document.getElementById('ex').querySelectorAll('.ex-cont')[val].style.display = "inline-flex";
  slt_ex_item = val;
  slt_ex_code = 0;
}
function ex_drop(ev){
  ev.preventDefault();
  ev.target.style.backgroundColor = ev.dataTransfer.getData("color");
  ev.target.innerHTML = ev.dataTransfer.getData("opreation");
}
function showExQiskit(num){
  document.querySelectorAll('.crt-code-head-item')[slt_ex_code].style.color = "rgb(155, 155, 155)";
  document.querySelectorAll('.crt-code-head-item')[slt_code].style.borderBottom = "none";
  document.querySelectorAll('.crt-code-head-item')[1].style.color = "white";
  document.querySelectorAll('.crt-code-head-item')[1].style.borderBottom = "1.5px solid white";
  document.getElementById('crt-code-QASM').style.display = "block";
  document.getElementById('crt-code-qiskit').style.display = "none";
  slt_ex_code = 0;
}
function showExQASM(num){
  document.querySelectorAll('.crt-code-head-item')[slt_code].style.color = "rgb(155, 155, 155)";
  document.querySelectorAll('.crt-code-head-item')[slt_code].style.borderBottom = "none";
  document.querySelectorAll('.crt-code-head-item')[0].style.color = "white";
  document.querySelectorAll('.crt-code-head-item')[0].style.borderBottom = "1.5px solid white";
  document.getElementById('crt-code-qiskit').style.display = "block";
  document.getElementById('crt-code-QASM').style.display = "none";
  slt_ex_code = 1;
}