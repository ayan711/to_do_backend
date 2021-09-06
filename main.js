
//requiring path and fs modules
window.onload = function(){
  allTasks();
}

function deleteActivity(tableData){

  console.log("Clicked delete")

  a="<div class='alert alert-success' role='alert'>"+"Task has been deleted !!!"+"</div>"
  document.getElementsByClassName("container").innerHTML = a;

  console.log("Showed Alert")
  // <div class='alert alert-success' role='alert'>"+"Task has been deleted !!!"+"</div>
  // //a=alert("Are you sure you wantto delete the activity");

  // console.log(tableData);
  // // Getting the id from the row which is clicked using 'getAttribute function'
  // console.log(tableData.getAttribute("id"));
  // let id=tableData.getAttribute("id")
  // Promise.all([

  //   fetch('http://127.0.0.1:5000/delete/'+id, {
  //       method: 'GET',
    
  //       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    
  //   })]).then(async([aa]) => {
      

  //     // Calling allTasks to get the new data after delete
  //     allTasks();
  //     '<div class="alert alert-success" role="alert">'+'Task has been deleted !!!'+'</div>'
  //     console.log('Displayed alert message')

  //   }).catch((err) => {
  //       console.error(err);
  //   });

}

//Promise.all waits for all the inside defined activity to complete and give output and then proceeds  
function allTasks(){
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
