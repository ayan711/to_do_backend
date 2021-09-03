
//requiring path and fs modules
window.onload = function(){
  allTasks()
}

async function allTasks(){
Promise.all([

fetch('http://127.0.0.1:5000/activities', {
    method: 'GET',

    headers: { 'Content-type': 'application/x-www-form-urlencoded' },

})]).then(async([aa]) => {

    let activity = await aa.json();
    console.log(activity);         
    console.log(activity);
    console.log(activity.length);
                       
    for (let i=0;i<activity.length;i++)
    {
      let arr=activity[i];

      console.log(activity[i]);
      console.log(activity[i]);
      console.log(activity[i].activity_ID);
      $("#activity_tab").append('<p> '+activity[i][0]+'        '+activity[i][1]+'        '+activity[i][1]+' </p>  ');
  
    }

}).catch((err) => {
    console.error(err);
});   
}
