const paragraph = document.getElementById("edit");

//requiring path and fs modules
window.onload = function(){
  $('.btn btn-info btn-sm btn-success').hide();
  allTasks();

  //document.getElementById('forceEnter').style.display = 'none';
  $('#forceEnter').hide();

  //$(document).ready(function() {$('#forceEnter').hide();});
  
}

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
          temp+="<td id="+'name'+activity[i][2]+">"+activity[i][0]+"</td>";

          // Getting Activity description
          temp+="<td id="+'desc'+activity[i][2]+">"+activity[i][1]+"</td>";

          // this - to hold the current data while on click happens
          // temp+="<td>"+'<button class="btn btn-danger btn-sm btn-primary" onclick="deleteActivity(this)" id="'+activity[i][2]+'">'+'Delete'+"</button></td>"                   
          
          // temp+="<td>"+'<button class="btn btn-info btn-sm btn-primary" onclick="updateActivity(this)" id="'+activity[i][2]+'">'+'Update'+"</button></td>"
          
          temp+="<td>"+"<div>"+
          '<button class="btn btn-danger btn-sm btn-primary" style="margin-right:16px" onclick="deleteActivity(this)" id="'+activity[i][2]+'">'
          +'Delete'+"</button>"+ 
          '<button class="btn btn-info btn-sm btn-primary" style="margin-left:16px" onclick="updateActivity(this)" id="'+activity[i][2]+'">'
          +'Update'+"</button>"+
          '<button class="btn btn-success btn-sm btn-primary" style="margin-left:16px" onclick="updateActivity(this)" id="'+'done'+activity[i][2]+'">'+
          'Done'+"</button></div>"+"</td>"

       
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


async function updateActivity(tableData){

  let id=tableData.getAttribute("id")

  // Getting access to table data for activit and activity description
  const activityName = document.getElementById("name"+id);
  const activityDescription = document.getElementById("desc"+id);
  const endUpdate = document.getElementById("done"+id);
  console.log(activityName)

  // making selected row's data editable
  activityName.contentEditable = true;
  activityDescription.contentEditable = true;

  // higlighting the t=editable portion
  //$("#activityName").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  activityName.style.backgroundColor = "rgba(210, 221, 51, 0.651)";
  activityDescription.style.backgroundColor = "rgba(48, 189, 214, 0.801)";

  endUpdate.addEventListener("click", function() {
    // making selected row's data uneditable
  activityName.contentEditable = false;
  activityDescription.contentEditable = false;
  activityName.style.backgroundColor = "#ffe44d";
  activityDescription.style.backgroundColor= "#ffe44d";
  } )

  activityNameNew=document.getElementById(activityName).value;
  activityDescNew=document.getElementById(activityDescription).value;
  console.log(activityDescNew);
  console.log(activityNameNew);

  // Promise.all([

  //   fetch('http://127.0.0.1:5000/delete/'+id, {
  //       method: 'GET',
    
  //       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    
  //   })]).then(async([aa]) => {
      

  //     // Calling allTasks to get the new data after delete
  //     await allTasks();
  //     '<div class="alert alert-success" role="alert">'+'Task has been deleted !!!'+'</div>'
  //     console.log('Going to display alert message');

  //   }).then(async([aa]) => {
  //     let a = await aa.json();    
  //     displayDeleteMsg();

  //     console.log('Displayed alert message')

  //   }).catch((err) => {
  //       console.error(err);
  //   });
  
  

  
}
