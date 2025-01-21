
function fetch_tool_item(item_id, title_tool){
    fetch('/fetch_tool_item').then(response => response.json()).then(function(data){
        document.getElementById("tool-info-container").innerHTML = data[item_id]
        document.getElementById("title-tool").innerHTML = title_tool
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
        item_content.style.height = item_content.scrollHeight + "px"
        icon_content.style.rotate = "90deg"
    }

    return
}