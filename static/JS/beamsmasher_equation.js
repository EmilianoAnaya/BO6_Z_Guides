
if (typeof array_items === "undefined") {
    var array_items;
}
if (typeof initial_index === "undefined") {
    var initial_index;
}
if (typeof ANSWERS === "undefined") {
    var ANSWERS, BOX_VARIABLES, CHALKBOARD;
}
if (typeof MARGIN_COLORS === "undefined") {
    var MARGIN_COLORS = ["#FF4747", "#47ACFF", "#F2FF38"];
}
if (typeof BOX_TEXT === "undefined") {
    var BOX_TEXT = ["X", "Y", "Z"];
}

function setup(key){
    if(key != "beamsmasher_equation") return

    ANSWERS = [
        document.getElementById("ans1"),
        document.getElementById("ans2"),
        document.getElementById("ans3")
    ]

    BOX_VARIABLES = [
        document.getElementById("x_value"),
        document.getElementById("y_value"),
        document.getElementById("z_value")
    ]

    CHALKBOARD = document.getElementById("chalkboard-container")
    CHALKBOARD.addEventListener("mouseover", function(event) {
        if (event.target.tagName === "IMG") {
            event.target.style.backgroundColor = MARGIN_COLORS[initial_index];
        }
    });
    
    CHALKBOARD.addEventListener("mouseout", function(event) {
        if (event.target.tagName === "IMG") {
            event.target.style.backgroundColor = "transparent";
        }
    });
    
    CHALKBOARD.addEventListener("mousedown", function(event) {
        if (event.target.tagName === "IMG") {
            event.target.style.backgroundColor = "#1A694D";
        }
    });
    
    CHALKBOARD.addEventListener("mouseup", function(event) {
        if (event.target.tagName === "IMG") {
            let tmp_index = initial_index > 1 ? 0 : initial_index + 1;
            event.target.style.backgroundColor = MARGIN_COLORS[tmp_index];
        }
    });

    reset_all()
}


function reset_all(){
    array_items = [1,1,1]
    initial_index = 0

    for(let i=0; i<BOX_VARIABLES.length; i++){
        BOX_VARIABLES[i].innerHTML = BOX_TEXT[i]
    }

    ANSWERS.forEach(element => {
        element.innerHTML = "- -"
    });
}

function set_initial_index(value){
    initial_index = value
    return
}

function solve_equations(x, y, z){
    let ans1 = (2*x + 11).toString().padStart(2,'0')
    let ans2 = ((2*z + y) - 5).toString().padStart(2,'0')
    let ans3 = (Math.abs((y + z) - x)).toString().padStart(2,'0')

    return [ans1, ans2, ans3]
}


function calculate_equations(value){
    array_items[initial_index] = value
    BOX_VARIABLES[initial_index].innerHTML = value
    initial_index = initial_index > 1 ? 0 : initial_index + 1
    
    if (array_items.some(item => item === 1)) {
        return;
    }
    
    let [x,y,z] = array_items
    let answers = solve_equations(x,y,z)

    ANSWERS.forEach((element, i) => {
        element.innerHTML = answers[i]
    })
}