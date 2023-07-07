
let today = new Date();
let year = today.getFullYear();
let date = today.getDate();
let month = today.getMonth() + 1;


//User greetings with his/her own name...
if (localStorage.getItem("name") == null || localStorage.getItem("name") == undefined || localStorage.getItem("name")  == "") {
    let userName = prompt("Enter your name : ");
    localStorage.setItem("name", userName)
    console.log(userName + " From input now")
}
else if (localStorage.getItem("name") != null || localStorage.getItem("name") != undefined) {
    let userName = localStorage.getItem("name");
    userName = userName.trim();
    document.getElementById("greeting").innerHTML = `Welcome ${userName.charAt(0).toUpperCase() + userName.slice(1)}!! 🙏  `;
    console.log("The username " + userName + " coming from previous input (Local Storage)")
}

// After submiting on data entry by clicking submit button
let formHandler = document.querySelector("form")
formHandler.addEventListener("submit", (e) => {
    e.preventDefault();
    let heading = ""
    if (e.target.heading.value == "") {
        heading = `Another Day... ${date}/${month}/${year}`
    }
    else {
        heading = e.target.heading.value
    }
    let message = e.target.message.value
    let allData = JSON.parse(localStorage.getItem("diary") )?? [];
    let temp = {
        "date": date,
        "month": month,
        "year": year,
        "heading" : heading,
        "message" : message
    }
    allData.push(temp)
    localStorage.setItem("diary", JSON.stringify(allData) )
    showDiaryList()
}) 

// to delete an element
function dlt(i) {
    let userDataL = JSON.parse(localStorage.getItem("diary")) ?? [] ;
    userDataL.splice(i,1)
    console.log(userDataL)
    localStorage.setItem("diary", JSON.stringify(userDataL))
    showDiaryList()
}

// Show diary list
function showDiaryList() {
    let userDataList = JSON.parse(localStorage.getItem("diary")) ?? [] ;
    let doc = ""
    for (let i = 0; i<userDataList.length; i++) {
        doc = doc + `
        <div class="diaryList">
            <h5>Date</h5>
            <span>${userDataList[i].date}/${userDataList[i].month}/${userDataList[i].year}</span>  
            <span class="delete"  onclick="dlt(${i})"> <b>X</b>  Delete </span>
            <h5>Heading</h5>
            <span>${userDataList[i].heading}</span>
            <h5>Message</h5>
            <span>${userDataList[i].message}</span>
        </div> <br> `
    }
    let dryLst = document.getElementById("diary");
    dryLst.innerHTML = doc;
}

showDiaryList();

