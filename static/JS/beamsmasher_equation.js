
let array_items = [1,1,1]
let initial_index = 0

const MARGIN_COLORS = ["#FF4747","#47ACFF","#F2FF38"]
const BOX_TEXT = ["X","Y","Z"]

document.addEventListener('DOMContentLoaded', (event) => {
    DOC_ANS1 = document.getElementById("ans1")
    DOC_ANS2 = document.getElementById("ans2")
    DOC_ANS3 = document.getElementById("ans3")

    BOX_VARIABLES = [
        document.getElementById("x_value"),
        document.getElementById("y_value"),
        document.getElementById("z_value")
    ]

    CHALKBOARD = document.getElementById("chalkboard-container")
    IMG_ITEMS = CHALKBOARD.querySelectorAll("img");

    IMG_ITEMS.forEach(img => {
        img.addEventListener("mouseover", function() {
            img.style.backgroundColor = MARGIN_COLORS[initial_index];
        });

        img.addEventListener("mouseout", function() {
            img.style.backgroundColor = "transparent";
        });
    });
});

function reset_all(){
    array_items = [1,1,1]
    initial_index = 0

    for(let i=0; i<BOX_VARIABLES.length; i++){
        BOX_VARIABLES[i].innerHTML = BOX_TEXT[i]
    }

    DOC_ANS1.innerHTML = "- -"
    DOC_ANS2.innerHTML = "- -"
    DOC_ANS3.innerHTML = "- -"
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
    initial_index = initial_index + 1

    if(initial_index>2){
        initial_index = 0
    } 
    
    for(let i=0; i<array_items.length; i++){
        if(array_items[i] == 1){
            return
        }
    }

    let x = array_items[0]
    let y = array_items[1]
    let z = array_items[2]
    
    let [ans1, ans2, ans3] = solve_equations(x,y,z)

    DOC_ANS1.innerHTML = ans1
    DOC_ANS2.innerHTML = ans2
    DOC_ANS3.innerHTML = ans3
}