window.addEventListener('load', displayStuff);
var counter=document.getElementById("table").rows.length;
var sum=0;
document.getElementById("spent").innerHTML=sum;
var ent=0;
document.getElementById("a1").innerHTML=ent;
var gro=0;
document.getElementById("a2").innerHTML=gro;
var res=0;
document.getElementById("a3").innerHTML=res;
var sta=0;
document.getElementById("a4").innerHTML=sta;
var tra=0;
document.getElementById("a5").innerHTML=tra;
var ele=0;
document.getElementById("a6").innerHTML=ele;
var dict1={"Entertainement":ent, "Groceries":gro, "Restaurant":res, "Stationary":sta, "Transport":tra,"Electronics":ele};

function submitExpense() {
  var name= document.getElementById("fname");
  var price= document.getElementById("fnumber");
  var category = document.getElementById("fcategory");


  var vname=name.value;
  var vprice=price.value;
  var vcategory=category.value;
  


  

  
// Create an object with the data
var data = {
  'id': counter,
  'name': vname,
  'price': vprice,
  'category': vcategory
};



// Make a POST request to your FastAPI endpoint
fetch('http://127.0.0.1:8000/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})


  .then(response => response.json())
  .then(result => {
    // Handle the response from the server
    console.log(result);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
  window.location.reload();
  

  /*
  fetch(`http://127.0.0.1:8000/clear`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data deleted:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });*/
      
}




 



function del(b){  

  var vprice=b.parentNode.parentNode.cells[0].innerHTML;
  vprice = vprice.replace('<b>', '').replace('</b>', '');
  
  var row = b.parentNode.parentNode;
  var iddd=row.id;
  console.log(iddd);
  row.parentNode.removeChild(row);
  vcategory=b.parentNode.parentNode.cells[2].innerHTML;
  
  dict1[vcategory]-= +vprice;
  sum-= +vprice;
  document.getElementById("a1").innerHTML=dict1["Entertainement"];
  document.getElementById("a2").innerHTML=dict1["Groceries"];
  document.getElementById("a3").innerHTML=dict1["Restaurant"];
  document.getElementById("a4").innerHTML=dict1["Stationary"];
  document.getElementById("a5").innerHTML=dict1["Transport"];
  document.getElementById("a6").innerHTML=dict1["Electronics"];
  document.getElementById("spent").innerHTML=sum;
  


  fetch(`http://127.0.0.1:8000/del/${iddd}`, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data deleted:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}


function displayStuff() {
  fetch('http://127.0.0.1:8000/send/', {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})
.then(response => {
    console.log('Response Status:', response.status);  // Log the response status
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log("Works", data);
    for (var i = 0; i < data.length; i++) {
      var x= document.getElementById("table");
      row =x.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      row.id=data[i].id;
      cell1.innerHTML = "<b>"+data[i].price+"</b>";
      cell2.innerHTML = data[i].name.charAt(0).toUpperCase()+data[i].name.slice(1) ;
      cell3.innerHTML = data[i].category.charAt(0).toUpperCase()+data[i].category.slice(1) ;
      cell4.innerHTML = `<button type="button" class="btn btn-danger" onclick="del(this)">Delete</button>`;
      sum+= +data[i].price;
      dict1[data[i].category]+= +data[i].price;
      document.getElementById("spent").innerHTML=sum;
      document.getElementById("a1").innerHTML=dict1["Entertainement"];
      document.getElementById("a2").innerHTML=dict1["Groceries"];
      document.getElementById("a3").innerHTML=dict1["Restaurant"];
      document.getElementById("a4").innerHTML=dict1["Stationary"];
      document.getElementById("a5").innerHTML=dict1["Transport"];
      document.getElementById("a6").innerHTML=dict1["Electronics"];
      counter=data[i].id;
    }






})
.catch(error => {
    console.error('Error:', error);
});



}; 
