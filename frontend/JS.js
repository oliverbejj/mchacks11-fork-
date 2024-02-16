var counter = document.getElementById("table").rows.length;
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
  



  
  

  

  var dict={"id":counter, "name": vname, "price":vprice, "category":vcategory};

  sum+= +vprice;


  var x= document.getElementById("table");
  row =x.insertRow();
  
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  row.id=counter;
  cell1.innerHTML = "<b>"+vprice+"</b>";
  cell2.innerHTML = vname.charAt(0).toUpperCase()+vname.slice(1) ;
  cell3.innerHTML = vcategory.charAt(0).toUpperCase()+vcategory.slice(1) ;
  cell4.innerHTML = `<button type="button" class="btn btn-danger" onclick="del(this)">Delete</button>`;
  name.value="";
  price.value='';
  category.value='Default select';
  document.getElementById("spent").innerHTML=sum;


  
  dict1[vcategory]+= +vprice;
  document.getElementById("a1").innerHTML=dict1["Entertainement"];
  document.getElementById("a2").innerHTML=dict1["Groceries"];
  document.getElementById("a3").innerHTML=dict1["Restaurant"];
  document.getElementById("a4").innerHTML=dict1["Stationary"];
  document.getElementById("a5").innerHTML=dict1["Transport"];
  document.getElementById("a6").innerHTML=dict1["Electronics"];

  
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
    'Content-Type': 'application/json'
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

  /*
  fetch(`http://127.0.0.1:8000/clear`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data deleted:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      */
}




 



function del(b){  

  var vprice=b.parentNode.parentNode.cells[0].innerHTML;
  vprice = vprice.replace('<b>', '').replace('</b>', '');
  var iddd=b.id;
  var row = b.parentNode.parentNode;
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
  


  fetch(`http://127.0.0.1:8000/data/${iddd}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data deleted:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}


window.addEventListener('beforeunload', function() {
  
  fetch('http://localhost:8000/send')
    .then(response => response.json())
    .then(data => {
      
      // Display the data on the HTML page
      const dataStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
      console.log(dataStr);


    })
    .catch(rejected => {
      console.error(rejected);
    });
});
