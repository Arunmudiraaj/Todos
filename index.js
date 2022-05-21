console.log("Working");
document.getElementById("add").addEventListener("click", addFunc);
update();

const titleElement = document.getElementById("title");
const noTasksElement = document.getElementById("noTasks");
descriptionElement = document.getElementById("description");
titleElement.addEventListener("input", updatedTitle);
console.log(titleElement.value);




function addFunc() {
    let title = document.getElementById("title").value;
    let desp = document.getElementById("description").value;

    if(title.length<3){

        document.getElementById("titleHelp").innerHTML= "Title cannot be less than 3 characters";
        document.getElementById("titleHelp").classList.remove("text-muted");
        document.getElementById("titleHelp").classList.add("text-danger");
        document.getElementById("title").classList.add("border");
        document.getElementById("title").classList.add("border-danger");


        console.log('less title');

    }

    else{

    
    currentTask = [title, desp];

    if(localStorage.getItem("allTasks")==null){

        let jsonArray = [];
        jsonArray.push(currentTask);
        localStorage.setItem("allTasks", JSON.stringify(jsonArray))
        console.log(localStorage);

    }

    else{
        jsonArrayStr = localStorage.getItem("allTasks");
        jsonArray = JSON.parse(jsonArrayStr);
        jsonArray.push(currentTask);
        localStorage.setItem("allTasks", JSON.stringify(jsonArray));
        console.log(localStorage);

    }
    update();
    window.scrollTo(0, document.body.scrollHeight);

}

}
function update() {

    if(localStorage.getItem("allTasks")==null||localStorage.getItem("allTasks")=="[]") {
        console.log("No tasks to show")
    document.getElementById("noTasks").classList.remove("d-none");
    document.getElementById("noTasks").classList.add("d-block");
    document.getElementById("tableBody").innerHTML = "";
    console.log("No tasks to show completed")
    }

   else{
    console.log("there are tasks to show")

  
    let str= "";
    jsonArrayStr = localStorage.getItem("allTasks");
        jsonArray = JSON.parse(jsonArrayStr);

    jsonArray.forEach((element,index) => {

        str+= `
        <tr>
                <td scope="row" class="w-10">${index+1}</td>
                <td class="w-20">${element[0]}</td>
                <td class="w-50">${element[1]}</td>
                <td class="w-20"> <button type="button" class="btn btn-warning" onclick="del(${index})">Delete</button> </td>
            </tr>
        `   
    });

    document.getElementById("tableBody").innerHTML = str;
    document.getElementById("noTasks").classList.remove("d-block");
    document.getElementById("noTasks").classList.add("d-none");

    
}

}
function del(itemNo){

    jsonArrayStr = localStorage.getItem("allTasks");
    jsonArray = JSON.parse(jsonArrayStr);
    jsonArray.splice(itemNo, 1);
    localStorage.setItem("allTasks", JSON.stringify(jsonArray));
    update();

}
function clearTasks(){
    console.log("inside clear");
    if(localStorage.getItem("allTasks")==null || localStorage.getItem("allTasks")=="[]"){
       
        alert("Your Tasks database is already empty!");
        update();
    }
    else{

    if(confirm("Are you sure you want to delete all your tasks? This cannot be undone")){
        localStorage.clear();
    document.getElementById("tableBody").innerHTML = "";
    titleElement.value="";
    descriptionElement.value="";
    update();

    }
    
}
}
function updatedTitle(e){


if(e.target.value.length>2){
    document.getElementById("titleHelp").innerHTML= "Try to enter short and expressive title";
    document.getElementById("titleHelp").classList.add("text-muted");
    document.getElementById("title").classList.remove("border-danger");
}


}
