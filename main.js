
//requiring path and fs modules
window.onload = function(){
  allTasks();

  //document.getElementById('forceEnter').style.display = 'none';
  $('#forceEnter').hide();
  //$(document).ready(function() {$('#forceEnter').hide();});
  
}

// window.onclick = function(){
//   getNewTasks();
// }

// after deletion
function displayDeleteMsg(){
  alert("Activity has been successfully deleted");
}

async function deleteActivity(tableData){

  var answer = window.confirm("Are you sure you want to delete activity ?");
  console.log(answer);
  if (answer == true) {
      //some code
      console.log("Clicked delete")

  // a="<div class='alert alert-success' role='alert'>"+"Task has been deleted !!!"+"</div>"
  // document.getElementsByClassName("container").innerHTML = a;

  console.log(tableData);
  // Getting the id from the row which is clicked using 'getAttribute function'
  console.log(tableData.getAttribute("id"));
  let id=tableData.getAttribute("id")
  Promise.all([

    fetch('http://127.0.0.1:5000/delete/'+id, {
        method: 'GET',
    
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    
    })]).then(async([aa]) => {
      

      // Calling allTasks to get the new data after delete
      await allTasks();
      '<div class="alert alert-success" role="alert">'+'Task has been deleted !!!'+'</div>'
      console.log('Going to display alert message');

    }).then(async([aa]) => {
      let a = await aa.json();    
      displayDeleteMsg();

      console.log('Displayed alert message')

    }).catch((err) => {
        console.error(err);
    });
  }
  else {

    console.log("Activity not deleted")
      allTasks();
  }

  
}

//Promise.all waits for all the inside defined activity to complete and give output and then proceeds  
async function allTasks(){
  $('#forceEnter').hide();
  
Promise.all([
 
fetch('http://127.0.0.1:5000/activities', {
    method: 'GET',

    headers: { 'Content-type': 'application/x-www-form-urlencoded' },

})]).then(async([aa]) => {
  // wait for the result
    let activity = await aa.json();
    console.log(activity);         
    console.log(activity);
    console.log(activity.length);
                       
    if (activity.length> 0){
      var temp ='';
      //looping
      let j=1;

      for (let i=0;i<activity.length;i++)
          
        {
          
          temp+="<tr >";
          temp+="<th scope='row'>"+j+"</th>";
          ++j;
          // Getting Activity name

          //temp+="<td>"+activity[i][0]+"</td>";
          temp+="<td>"+activity[i][0]+"</td>";

          // Getting Activity description
          temp+="<td>"+activity[i][1]+"</td>";

          // this - to hold the current data while on click happens
          temp+="<td>"+'<button class="btn btn-danger btn-sm btn-primary" onclick="deleteActivity(this)" id="'+activity[i][2]+'">'+'Delete'+"</button></td>"                   

       };

       document.getElementById("data").innerHTML = temp;
  }

}).catch((err) => {
    console.error(err);
});   
}

async function addNewTasks(){
  
  
  activityName=document.getElementById("title").value;
  console.log(activityName);
  console.log('Title lenth is - ',activityName.length);

  activityDesc=document.getElementById("description").value;
  console.log(activityDesc);
  console.log("desc len is ",activityDesc.length);

  // Check if entries have been added
  if (activityName.length != 0 || activityDesc.length != 0){
  apiInsert='http://127.0.0.1:5000/insert/'+activityName+"/"+activityDesc
  console.log(apiInsert)

  Promise.all([

    fetch(apiInsert, {
        method: 'POST',
    
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    
    })]).then(async(res) => {
      
      allTasks();
    
    }).then(document.getElementById('description').value = ''
    ).then(
      document.getElementById('title').value = ''
    ).then(
      alert("Activity -"+activityName+" has been successfully added")
    ).
    catch((err) => {
        console.error(err);
    }); 

  }
  else{
        let msg="Entries cannot be blank";
        document.getElementById("forceEnter").style.display="block";
        document.getElementById("forceEnter").innerHTML = msg;
  }

}