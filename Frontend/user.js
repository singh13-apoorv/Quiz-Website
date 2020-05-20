console.log("JS CONNECTED")
var outID = document.getElementById("outID")
var home = document.getElementById("home");
var name1 = document.getElementById("name1");
var regno = document.getElementById("regno");
var classs = document.getElementById("classs");
var branch = document.getElementById("branch");
var signupbtn = document.getElementById("signupbtn");
var fin = document.getElementById("loginp");
fin.onchange = () => {
    if (fin.value == '') {
        fin.className = "form-control mr-sm-2 form-control is-invalid";
    }
    else {
        fin.className = "form-control mr-sm-2 form-control is-valid";
    }
}
fetch("http://localhost:3000/questions").then((response) => {
    return response.text()
}).then((data) => {
    data = JSON.parse(data);
    var str = ''
    data.forEach(element => {
        str = str + `        
        <div class="container">
        <form>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label"><b>Question</b></label>
                <div class="col-sm-10">
                    <input class="form-control getques" type="text" placeholder="${element.question}" readonly>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><b>Your Answer</b></label>
                <div class="col-sm-10">
                    <textarea class="form-control getans" rows="3"></textarea>
                </div>
            </div>
        </form>
    </div>`
    });
    str = str + '<button class="btn btn-primary" id="answersub" style="margin-left:50%;" onclick="givedata()">Submit</button>'
    outID.innerHTML = str;

})
var signBtn = document.getElementById("signBtn");
var signform = document.getElementById("signform");
signBtn.onclick = () => {
    signform.className = "";
    outID.className = "hide";
}
home.onclick = () => {
    signform.className = "hide";
    outID.className = "outerques";
}

signupbtn.onclick = () => {
    console.log("clicked");
    data = { 'name': name1.value, "regno": regno.value, "class": classs.value, "branch": branch.value };
    params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch("http://localhost:3000/newstudent", params).then((response) => {
        return response.text()
    }).then((doa) => {
        if (doa == "false") {
            alert("Can't Create User, may be the User Already Exists")
        }
        else {
            alert("User Successfully Created");
        }
    })
}

givedata = () => {
    var getques = document.getElementsByClassName("getques");
    var getans = document.getElementsByClassName("getans");
    var regno = document.getElementById("loginp");
    var url = "http://localhost:3000/submitresponse";
    var i = 0;
    var data = { "ques": getques[0].placeholder, "ans": getans[0].value, "regno": regno.value };
    params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    fetch(url, params)
        .then((response) => {
            return response.text();
        })
        .then((datafin) => {
            if (datafin == "false") {
                alert("Can't Save Responses.\nReasons-\n1.User not found in DB.\n2.User Already attempted the quiz");
            }
            else {
                alert("Responses Successfully Saved");
            }
        })
    for (i = 1; i < getques.length; i++) {
        var data = { "ques": getques[i].placeholder, "ans": getans[i].value, "regno": regno.value };
        params = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        fetch(url, params)
            .then((response) => {
                return response.text();
            })
            .then((datafin) => {
                if (datafin == "false") {
                    console.log("ANSWER NOT SEND");
                }
            })
    }
}

