let past_id_script = null

function fetch_tool_item(item_id, title_tool){
    if(past_id_script == item_id) return
    if(past_id_script != null){
        document.getElementById(past_id_script).remove()
    }
    fetch(`/fetch_tool_item?id_tool=${item_id}`).then(response => response.json()).then(function(data){        
        document.getElementById("tool-info-container").innerHTML = data["tool"]
        document.getElementById("title-tool").innerHTML = title_tool
        
        let script = document.createElement("script")
        script.src = `../static/JS/${item_id}.js`
        script.id = item_id

        script.onload = function() {
            if (typeof setup === "function") setup(item_id)
        };
        
        document.body.appendChild(script)
        past_id_script = item_id
    })
}

function open_close(id){
    let item = document.getElementById(id)
    let item_content = item.querySelector(".item-content-container")
    let icon_content = item.querySelector(".item-header img")

    if (item_content.style.height && item_content.style.height !== "0px") {
        icon_content.style.rotate = "0deg"
        item_content.style.height = "0px"
    } else {
        item_content.style.height = item_content.scrollHeight-5 + "px"
        icon_content.style.rotate = "90deg"
    }

    return
}