
if(typeof ARTIFACT_CONTAINER === "undefined"){
    var ARTIFACT_CONTAINER
}

if(typeof SYMBOLS_CONTAINER === "undefined"){
    var SYMBOLS_CONTAINER
}

if(typeof SYMBOLS === "undefined"){
    var SYMBOLS = [[
                        "../static/resources/svg/Regular_triangle.svg",
                        "../static/resources/svg/reshot-icon-leo-sign-BX3HA62ET4.svg"
                    ],
                    [
                        "../static/resources/svg/Regular_triangle.svg",
                        "../static/resources/svg/reshot-icon-aries-sign-DMYTUSEKRA.svg"
                    ],
                    [
                        "../static/resources/svg/Alchemical_air_symbol.svg",
                        "../static/resources/svg/reshot-icon-gemini-sign-E5HPFXD2JY.svg"
                    ],
                    [
                        "../static/resources/svg/UpsideDown_triangle.svg",
                        "../static/resources/svg/reshot-icon-pisces-sign-LF89XP4K5B.svg"
                    ],
                    [
                        "../static/resources/svg/UpsideDown_triangle.svg",
                        "../static/resources/svg/reshot-icon-scorpio-sign-A5JDYRZXG2.svg"
                    ]]
}

function setup(key){
    if(key != "balmung_symbols") return

    SYMBOLS_CONTAINER = document.getElementById("Symbol-Container")
    ARTIFACT_CONTAINER = document.getElementById("Artifact-Selector")
    ARTIFACT_CONTAINER.addEventListener("mousedown", function(event){
        if(event.target.tagName === "IMG"){
            clean_artifacts()
            event.target.classList.add("selected")
        }
    })

}

function clean_artifacts(){
    let images = ARTIFACT_CONTAINER.querySelectorAll("img")

    images.forEach(img => {
        img.classList.remove("selected") //OPTIMIZED LATER WITH THE RESET FUNCTION
    });
}

function reset_symbols(){
    clean_artifacts()
    SYMBOLS_CONTAINER.innerHTML = ""
}


function get_symbols(index){
    let symbols = SYMBOLS[index]
    let elemental_symbol = symbols[0]
    let zodiac_symbol = symbols[1]

    let elemental_img = document.createElement("img")
    let zodiac_img = document.createElement("img")

    elemental_img.src = elemental_symbol
    elemental_img.id = "Alchemical-Symbol"

    zodiac_img.src = zodiac_symbol
    zodiac_img.id = "Zodiac-Symbol"

    SYMBOLS_CONTAINER.innerHTML = ""
    SYMBOLS_CONTAINER.appendChild(elemental_img)
    SYMBOLS_CONTAINER.appendChild(zodiac_img)

}