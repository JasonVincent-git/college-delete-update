var form = document.getElementById('form');
var collegeName = document.getElementById('collegeName');
var repName = document.getElementById('repName');
var repEmail = document.getElementById('repEmail');

var cName = Array();
var rName = Array();
var rEmail = Array();

form.addEventListener('submit', e => {
	e.preventDefault();

	checkInputs();
  form.reset();
  Table();
});


function checkInputs(){
  if(collegeName.value.trim() === '') {
		setErrorFor(collegeName, 'College Name cannot be blank');
	}else{setSuccessFor(collegeName);}
  if(repName.value.trim() === '') {
		setErrorFor(repName, 'Representative Name cannot be blank');
	}else{setSuccessFor(repName);}
  if(repEmail.value.trim() === '') {
		setErrorFor(repEmail, 'Representative Email cannot be blank');
	}else{setSuccessFor(repEmail);}

  if(collegeName.value!=='' && repName.value!=='' && repEmail.value!==''){
    cName.push(collegeName.value.trim());
    rName.push(repName.value.trim());
    rEmail.push(repEmail.value.trim());
  }
}

function setErrorFor(input, message) {
	const Control = input.parentElement;
  Control.className = "control error";
	const small = Control.querySelector('small');
	small.innerText = message;
}
function setSuccessFor(input){
  const Control = input.parentElement;
  Control.className = "control success";
}

function Table(){
  var text = "<table id='table'>";
  text += "<tr>";
  text += "<th>" + "College Name" + "</th>";
  text += "<th>" + "Representative Name" + "</th>";
  text += "<th>" + "Representative Email" + "</th>";
  text += "<th>" + "Edit/Delete" + "</th>";
  text += "</tr>";
  for(i=0; i<cName.length; i++){
    text += "<tr>";
    text += "<td id='cName"+ i +"'>" + cName[i] + "</td>";
    text += "<td id='rName"+ i +"'>" + rName[i] + "</td>";
    text += "<td id='rEmail"+ i +"'>" + rEmail[i] + "</td>";
    text += "<td><button onclick='deleteRow(this);' class='delete'>Delete</button><button onclick='editRow("+ i +");' class='delete' id='edit"+i+"'>Edit</button><button class='deleteHidden' id='save"+i+"' onclick='saveRow("+ i +")'>Save</button></td>";
    text += "</tr>";
  }
  text+= "</table>";

  document.getElementById("table").innerHTML = text;
}

function deleteRow(i){
  var row = i.parentElement.parentElement;
  var id = cName.indexOf(row.querySelector('td').innerHTML);
  cName.splice(id-1, 1);
  rName.splice(id-1, 1);
  rEmail.splice(id-1, 1);
  row.remove();
}

function editRow(i){
  document.getElementById("save"+ i +"").className = "delete";
  document.getElementById("edit"+ i +"").className = "deleteHidden";

  var colName = document.getElementById("cName"+i);
  var repName = document.getElementById("rName"+i);
  var repEmail = document.getElementById("rEmail"+i);

  var col_name_data = colName.innerHTML;
  var rep_name_data = repName.innerHTML;
  var rep_email_data = repEmail.innerHTML;

  colName.innerHTML="<input type='text' id='cName_text"+i+"' value='"+col_name_data+"'>";
  repName.innerHTML="<input type='text' id='rName_text"+i+"' value='"+rep_name_data+"'>";
  repEmail.innerHTML="<input type='email' id='rEmail_text"+i+"' value='"+rep_email_data+"'>";
}

function saveRow(i){
  document.getElementById("edit"+ i +"").className = "delete";
  document.getElementById("save"+ i +"").className = "deleteHidden";

  var colName = document.getElementById("cName_text"+i).value;
  var repName = document.getElementById("rName_text"+i).value;
  var repEmail = document.getElementById("rEmail_text"+i).value;

  document.getElementById("cName"+i).innerHTML = colName;
  document.getElementById("rName"+i).innerHTML = repName;
  document.getElementById("rEmail"+i).innerHTML = repEmail;

  cName[parseInt(i)] = colName;
  rName[parseInt(i)] = repName;
  rEmail[parseInt(i)] = repEmail;
}
