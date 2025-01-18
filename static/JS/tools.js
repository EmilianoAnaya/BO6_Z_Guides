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