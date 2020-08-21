
var eduRowCount = 1;
var skillRowCount = 1;
var userInfo = {};
var inputNameErr = false;
var inputAddrErr = false;
var inputEmailErr = false;
var inputPhoneErr = false;
var inputPhotoErr = false;
var inputSkillErr = false;
var inputPercentageErr = false;
var inputYearErr = false;
var inputgenderErr = false;
var inputHobbiesErr = false;

function addEduRow(){
    console.log("'adding row")

    if( this.eduRowCount == 7){
        alert("cannot add additional education information");
    } else{
        var eduTable = document.getElementById("eduInfoTable");
        var eduRow = document.getElementsByClassName("education-row")[0];
        console.log(eduRow.innerHTML);
        var row = document.createElement("tr");
        row.setAttribute("id", "eduTr"+eduRowCount);
        row.innerHTML = eduRow.innerHTML;
        eduTable.appendChild(row);
        eduRowCount++;
        // var levelNode = document.createElement("td");
        // levelNode
        // console.log(eduTable);
    }
}

function removeEduRow(el){
    console.log("remove row")

    if( this.eduRowCount == 1){
        alert("cannot remove education information");
    } else{
        var rowToDelete = el.parentElement.parentElement;
        el.parentElement.parentElement.parentElement.removeChild(rowToDelete);
        eduRowCount--;
    }
}

function addSkillRow(){
    console.log("'adding row")
    var skillTable = document.getElementById("skillTable");
    var skillRow = document.getElementsByClassName("skill-row")[0];
    var row1 = document.createElement("tr");
    row1.setAttribute("id", "skillTr"+skillRowCount);
    row1.innerHTML = skillRow.innerHTML;
    skillTable.appendChild(row1);
    skillRowCount++;
    // var levelNode = document.createElement("td");
    // levelNode
    // console.log(eduTable);

}

function removeSkillRow(el){
    console.log("remove row")

    if( this.skillRowCount == 1){
        alert("cannot remove skill information");
    } else{
        var rowToDelete = el.parentElement.parentElement;
        el.parentElement.parentElement.parentElement.removeChild(rowToDelete);
        skillRowCount--;
    }
}

function navigateToReadOnlyPage(){
    validateInput();

    if( inputNameErr || inputgenderErr || inputAddrErr || inputEmailErr || inputHobbiesErr || inputPhotoErr || inputPercentageErr || inputPhoneErr || inputYearErr || inputSkillErr){
        document.getElementById("formError").innerHTML = "Please correct errors before submitting";
        document.getElementById("formError").style.display = 'block';
        return false;
    } else{
        document.getElementById("formError").innerHTML = "";
        document.getElementById("formError").style.display = 'none';
    }
    userInfo.CandidateName = document.getElementById("candidateName").value;
    var ele = document.getElementsByName('gender'); 
              
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        userInfo.CandidateGender = ele[i].value; 
    } 

    userInfo.CandidateAddress = document.getElementById("address").value;
    userInfo.CandidateEmail = document.getElementById("email").value;
    userInfo.CandidatePhone = document.getElementById("phoneNo").value;

    var eduArr = [];
    for(var i=0; i < eduRowCount; i++){
        var eduRowInfo = {};
        var eduInfo = document.getElementById("eduTr"+i);
        var level = eduInfo.getElementsByTagName("td")[0].getElementsByTagName("select")[0].value;
        var year = eduInfo.getElementsByTagName("td")[1].getElementsByTagName("input")[0].value;
        var percentage = eduInfo.getElementsByTagName("td")[2].getElementsByTagName("input")[0].value;
        
        eduRowInfo.level = level;
        eduRowInfo.year = year;
        eduRowInfo.percentage = percentage;
        eduArr.push(eduRowInfo);
    }

    var skillArr = [];
    for(var j=0; j < skillRowCount; j++){
        var skillRowInfo = {};
        var skillInfo = document.getElementById("skillTr"+j);
        var selfRating = skillInfo.getElementsByTagName("td")[1].getElementsByTagName("select")[0].value;
        var skill = skillInfo.getElementsByTagName("td")[0].getElementsByTagName("input")[0].value;
        
        
        skillRowInfo.skill = skill;
        skillRowInfo.selfRating = selfRating;
        skillArr.push(skillRowInfo);
    }

    userInfo.CandidateEducation = eduArr;
    userInfo.CandidateSkill = skillArr;

    userInfo.CandidateHobbies = document.getElementById("hobbies").value;
    userInfo.CandidatePhoto = document.getElementById("photo").value;

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log(localStorage.getItem("userInfo"));
    var urlStr = window.location.toString().substring(0,window.location.toString().lastIndexOf("/"))
    location.href = urlStr + "/ViewUserInformation.html"
}

function showValues(){

    var savedData = JSON.parse(localStorage.getItem("userInfo"));
    document.getElementById("name_readonly").innerHTML = savedData.CandidateName;
    document.getElementById("gender_readonly").innerHTML = savedData.CandidateGender;
    document.getElementById("address_readonly").innerHTML = savedData.CandidateAddress;
    document.getElementById("phone_readonly").innerHTML = savedData.CandidatePhone;

    var education = savedData.CandidateEducation;
    var trStr = "";
    for(var i=0; i < education.length; i++){
        trStr = trStr.concat("<tr><td><span>Education &nbsp;</span>" + education[i].level +"</td>");
        trStr = trStr.concat("<td><span>&nbsp;Year &nbsp;</span>" + education[i].year +"</td>");
        trStr = trStr.concat("<td><span>&nbsp;Percentage &nbsp;</span>" + education[i].percentage +"</td></tr>");
    }

    var skills = savedData.CandidateSkill;
    var skillTrStr = "";

    for(var i=0; i < skills.length; i++){
        skillTrStr = skillTrStr.concat("<tr><td><span>Skill &nbsp;</span>" + skills[i].skill +"</td>");
        skillTrStr = skillTrStr.concat("<td><span>&nbsp;    Self Rating &nbsp;</span>" + skills[i].selfRating +"</td>");
    }

    document.getElementById("edu_readonly").innerHTML = trStr;
    document.getElementById("skill_readonly").innerHTML = skillTrStr;
    document.getElementById("hobbies_readonly").innerHTML = savedData.CandidateHobbies;
    document.getElementById("photo_readonly").innerHTML = savedData.CandidatePhoto;
    console.log(savedData.CandidateEducation);
    var candidateEducationArr =  savedData.CandidateEducation;
}




/**
 * Validation functions
 * 
 */

function validateInputName(){
    inputNameErr = false;
    document.getElementById("nameErr").style.display = 'none';
    name = document.getElementById("candidateName").value;
    if( name === ""){
        document.getElementById("nameErr").innerHTML = "Please enter name";
        document.getElementById("nameErr").style.display = 'block';
        inputNameErr = true;
    } else if(/\d/.test(name)){
        document.getElementById("nameErr").innerHTML = "Name cannot contain number";
        document.getElementById("nameErr").style.display = 'block';
        inputNameErr = true;
    } else if( name.length > 20){
       document.getElementById("nameErr").innerHTML = "Name can be 20 chars max";
       document.getElementById("nameErr").style.display = 'block';
       inputNameErr = true;
    } else{
        document.getElementById("nameErr").style.display = 'none';
        inputNameErr = false;
    }
}

function validateInputAddr(){
    inputAddrErr = false;
    document.getElementById("addrErr").style.display = 'none';
    var addr = document.getElementById("address").value;
    if( addr == "" ){
        document.getElementById("addrErr").innerHTML = "Please enter address";
       document.getElementById("addrErr").style.display = 'block';
       inputAddrErr = true;
    } else if( addr.length > 100){
       document.getElementById("addrErr").innerHTML = "Address can be 100 chars max";
       document.getElementById("addrErr").style.display = 'block';
       inputAddrErr = true;
    } else{
        document.getElementById("addrErr").style.display = 'none';
        inputAddrErr = false;
    }
}

function validateInputEmail(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    inputEmailErr = false;
    document.getElementById("emailErr").style.display = 'none';
    var emailVal = document.getElementById("email").value;
    if( emailVal == ""){
        document.getElementById("emailErr").innerHTML = "Please enter email";
       document.getElementById("emailErr").style.display = 'block';
       inputEmailErr = true;
    } else if( !emailVal.match(mailformat)){
       document.getElementById("emailErr").innerHTML = "Invalid email format";
       document.getElementById("emailErr").style.display = 'block';
       inputEmailErr = true;
    } else{
        document.getElementById("emailErr").style.display = 'none';
        inputEmailErr = false;
    }
}


function validateInputPhone(){
    var phonenoFmt = /^\d{10}$/;
    inputPhoneErr = false;
    document.getElementById("phNoErr").style.display = 'none';
    var phoneVal = document.getElementById("phoneNo").value;
    if( phoneVal == ""){
        document.getElementById("phNoErr").innerHTML = "Enter Phone Number";
       document.getElementById("phNoErr").style.display = 'block';
       inputPhoneErr = true;
    } else if( !phoneVal.match(phonenoFmt)){
       document.getElementById("phNoErr").innerHTML = "Invalid Phone Number";
       document.getElementById("phNoErr").style.display = 'block';
       inputPhoneErr = true;
    } else{
        document.getElementById("phNoErr").style.display = 'none';
        inputPhoneErr = false;
    }
}

function validateInputYear(){
    var yearFmt = /^\d{4}$/;
    inputYearErr = false;
    document.getElementById("eduErr").style.display = 'none';
    var dtYear = new Date().getFullYear();
    for(var i=0; i<eduRowCount; i++){
        var eduRow = document.getElementById("eduTr"+i);
        var yearVal = eduRow.getElementsByTagName("td")[1].children[1].value; 
        if( !yearVal){
            document.getElementById("eduErr").innerHTML = "Please enter Year value";
            document.getElementById("eduErr").style.display = 'block';
            inputYearErr = true;
        } else if( !yearVal.match(yearFmt)){
            document.getElementById("eduErr").innerHTML = "Invalid Year";
            document.getElementById("eduErr").style.display = 'block';
            inputYearErr = true;
        } else if(yearVal > dtYear){
            document.getElementById("eduErr").innerHTML = "Year cannot be a future value";
            document.getElementById("eduErr").style.display = 'block';
            inputYearErr = true;
        } else{
            document.getElementById("eduErr").innerHTML = "";
            document.getElementById("eduErr").style.display = 'none';
            inputYearErr = false;
        }
    }
}

function validateInputPercentage(){
    inputPercentageErr = false;
    document.getElementById("eduErr").style.display = 'none';
    for(var i=0; i<eduRowCount; i++){
        var eduRow = document.getElementById("eduTr"+i);
        var percentageVal = eduRow.getElementsByTagName("td")[2].children[1].value; 
        if( !percentageVal){
            document.getElementById("eduErr").innerHTML = "Please enter percentage value";
            document.getElementById("eduErr").style.display = 'block';
            inputPercentageErr = true;
        } else if( isNaN(parseFloat(percentageVal)) || parseFloat(percentageVal) > 100 || parseFloat(percentageVal) < 0){
            document.getElementById("eduErr").innerHTML = "Invalid Percentage value";
            document.getElementById("eduErr").style.display = 'block';
            inputPercentageErr = true;
        } else{
            document.getElementById("eduErr").innerHTML = "";
            document.getElementById("eduErr").style.display = 'none';
            inputYearErr = false;
        }
    }
}

function validateInputSkill(){
    inputSkillErr = false;
    document.getElementById("skillErr").style.display = 'none';
    for(var i=0; i<skillRowCount; i++){
        var skillRow = document.getElementById("skillTr"+i);
        var skillValue = skillRow.getElementsByTagName("td")[0].children[1].value; 
        if( !skillValue){
            document.getElementById("skillErr").innerHTML = "Please enter Skill value";
            document.getElementById("skillErr").style.display = 'block';
            inputSkillErr = true;
        } else{
            document.getElementById("skillErr").innerHTML = "";
            document.getElementById("skillErr").style.display = '';
            inputSkillErr = false;
        }
    }
}

function validateInputPhoto(){
    var urlFmt = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;
    inputPhotoErr = false;
    document.getElementById("photoErr").style.display = 'none';
    var photo = document.getElementById('photo').value;
    if( !photo.match(urlFmt)){
        document.getElementById("photoErr").innerHTML = "Invalid Photo URL";
        document.getElementById("photoErr").style.display = 'block';
        inputPhotoErr = true;
    } else {
        document.getElementById("photoErr").innerHTML = "";
        document.getElementById("photoErr").style.display = 'none';
        inputPhotoErr = false;
    }
}

function validateGender(){
    var ele = document.getElementsByName('gender'); 
    var checked = false;        
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
            checked = true;
    }

    if( !checked ){
        document.getElementById("genderErr").innerHTML = "Specify gender value";
        document.getElementById("genderErr").style.display = 'block';
        inputgenderErr = true; 
    } else{
        document.getElementById("genderErr").innerHTML = "";
        document.getElementById("genderErr").style.display = 'none';
        inputgenderErr = false;
    }
}

function validateInputHobbies(){
    var hobbies = document.getElementById("hobbies").value;
    if( hobbies == "" ){
        document.getElementById("hobbiesErr").innerHTML = "Enter hobbies";
        document.getElementById("hobbiesErr").style.display = 'block';
        inputHobbiesErr = true;
    } else{
        document.getElementById("hobbiesErr").innerHTML = "";
        document.getElementById("hobbiesErr").style.display = 'none';
        inputHobbiesErr = false;
    }
}

function validateInput(){
    validateInputName();
    validateGender();
    validateInputAddr();
    validateInputEmail();
    validateInputPhone();
    validateInputYear();
    validateInputPercentage();
    validateInputSkill();
    validateInputPhoto();
    validateInputHobbies();
}


