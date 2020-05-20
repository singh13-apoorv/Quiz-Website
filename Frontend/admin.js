console.log("JS CONNECTED");
var profname = document.getElementById("profname")
var ques = document.getElementById("ques")
var rate = document.getElementById("rate")
var subbtn = document.getElementById("subbtn")
var toStore = false;
var teachersList;
var innerStudent = document.getElementById("innerStudent");
var studentList = document.getElementById("studentList");
var studentBtn = document.getElementById("studentBtn");
var outerDiv = document.getElementById("outerDiv")
var resdiv = document.getElementById("resdiv");
fetch("http://localhost:3000/studentlist").then((response) => {
    return response.text();
}).then((data) => {
    data = JSON.parse(data);
    var str = '';
    var count = 0;
    data.forEach((element) => {
        str = str + `
        <div class="col-sm-4 card-outer-div">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"> ${element.name} || ${element.regno} </h5>
            <p class="card-text"><b>Class: </b> ${element.class}<br><b>Branch: </b> ${element.branch}</p>
            <a href="#" class="btn btn-primary evalclass" id="${element.regno}" onclick="getresp(event)">Evaluate</a>
          </div>
        </div>
      </div>`
        count = count + 1;
    })
    innerStudent.innerHTML = str;
})
var addController = document.getElementById("addController");
addController.onclick = () => {
    if (outerDiv.className == '') {
        outerDiv.className = "hide";
        studentList.className = '';
    }
    else {
        outerDiv.className = "";
        studentList.className = "hide";
    }
}
studentBtn.onclick = () => {
    studentList.className = '';
    outerDiv.className = "hide";
    resdiv.className = "hide";
}
async function getData() {
    response = await fetch("http://localhost:3000/teacherdata");
    data = await response.text();
    data = JSON.parse(data);
    return data;
}
profname.onblur = () => {
    getData().then((data) => {
        data.forEach(element => {
            if (element.eid == profname.value) {
                toStore = true;
            }
        });
    })
}

subbtn.onclick = () => {
    if (toStore) {
        var p = profname.value;
        var q = ques.value;
        var r = rate.value;
        var resp = false;
        url = "http://localhost:3000/newques";
        data = { 'name': p, 'question': q, 'level': r };
        params = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, params).then((response) => {
            return response.text();
        }).then((data) => {
            if (data) {
                alert("Your Question Successfully Saved");
            }
            else {
                alert("Question Not Saved.")
            }
        })
    }
    else {
        alert("Can't save the data check if the professor exists");
    }
}

var getresp = (e) => {
    studentList.className = "hide";
    var x = e.target.id;
    var url = `http://localhost:3000/getresponse/${x}`;
    fetch(url).then((response) => {
        return response.text()
    })
        .then((data) => {
            data = JSON.parse(data);
            str = '';
            data.forEach((element) => {
                str = str + `        
            <form>
            <fieldset disabled>
                <div class="form-group">
                    <label for="disabledTextInput"><b>Question</b></label>
                    <input type="text" class="form-control pkkafinclass" placeholder="${element.ques}"></input>
                </div>
                <div class="form-group">
                    <label for="disabledTextInput"><b>Given Answer</b></label>
                    <textarea type="text" class="form-control pkkafinsecclass" placeholder="${element.ans}"></textarea>
                </div>
                <form class="form-inline">
            </fieldset>
            <div class="form-group" style="margin-top:-2vh;">
            <label for="inputPassword6"><b>Marks:</b></label>
            <input type="number" class="form-control col-sm-2 pkkafinmarks" aria-describedby="passwordHelpInline">
            <small id="passwordHelpInline" class="text-muted">
                Must be b/w 0-10
            </small>
            </div>
            </form>
            <hr>
        </form>`
            })
            str = `<input class="form-control random" type="text" style="margin-top: 8vh;" id = "${x}" placeholder="Evaluating RegNo : ${x}" readonly>` + str + '<button class="btn btn-primary" style="margin-bottom:5vh;display:block;margin-left:auto;margin-right:auto;" onclick="pkkafinbtn()">Submit</button>'
            resdiv.innerHTML = str;
        })

}
var x = 0;
pkkafinbtn = () => {
    var pkkafinclass = document.getElementsByClassName("pkkafinclass");
    var pkkafinsecclass = document.getElementsByClassName("pkkafinsecclass");
    var pkkafinmarks = document.getElementsByClassName("pkkafinmarks");
    var random = document.getElementsByClassName("random");

    for (i = 0; i < pkkafinmarks.length; i++) {
        var data = { "ques": pkkafinclass[i].placeholder, "ans": pkkafinsecclass[i].placeholder, "regno": random[0].id, "marks": pkkafinmarks[i].value };
        var url = "http://localhost:3000/eval"
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
                    x = 1;
                }
            })
    }
    setTimeout(() => {
        if (x == 1) {
            alert("Can't Save Evaluation\nCheck if all the questions are evaluated successfully");
        }
        else {
            alert("Evaluation saved");
        }
    }, 1000)

}
