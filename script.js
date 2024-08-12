const inputBox = document.getElementById("tier");
const submitBtnEle = document.getElementById("submit");
const tierSection = document.querySelector(".tier-list-section");
const imageForm = document.getElementById("image-form")
const imageInputBox = document.getElementById("image-input");
const nonTierImageContainer = document.querySelector(".non-tier-section");
const tierColorEle = document.getElementById("tier-color");
const itemContainersEles = document.getElementsByClassName("item-container");
const tierListsElements = document.querySelectorAll(".tier-list");

let currentDragEle;

Array.from(itemContainersEles).forEach(item => setUpItemContainer(item));

submitBtnEle.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputBox.value == ""){
        alert("Please enter the value");
        return;
    }
    tierSection.appendChild(createTierList(inputBox.value));
    inputBox.value = "";
})

imageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageUrl = imageInputBox.value;
    imageInputBox.value = "";
    if(imageUrl.trim() == ""){
        alert("Please enter a valid image.")
        return;
    }
    const newImageDiv = createTierImageItem(imageUrl);
    nonTierImageContainer.appendChild(newImageDiv);

})

function createTierImageItem (txt = ""){
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("item-container");
    imageDiv.setAttribute("draggable", "true");
    const img = document.createElement("img");
    img.src = txt;
    imageDiv.appendChild(img);
    setUpItemContainer(imageDiv);
    setUpBackEvent(imageDiv);
    return imageDiv;
}

function setUpBackEvent (ele){
    ele.addEventListener("dblclick", (e) => {
        setUpBackEventHelper(e);
    })
}

function setUpBackEventHelper(e){
    const element = e.target.parentNode;
        if (element.parentNode !== nonTierImageContainer){
            // element.remove();
            nonTierImageContainer.appendChild(element);
        }
}


function createTierList (txt = ""){
    const newTierList = document.createElement("div");
    newTierList.classList.add("tier-list");

    const heading = document.createElement("h1");
    heading.setAttribute("contentEditable", ""); // made the text editable
    heading.textContent = txt;
    heading.style.backgroundColor = tierColorEle.value;
    tierColorEle.value = createRandomColor();

    const tierListItem = document.createElement("div");
    tierListItem.classList.add("tier-list-items");


    // can delete the tier list 
    heading.addEventListener("dblclick", (e) => {
        const allTierItem = (e.target.parentNode.querySelectorAll(".item-container"));
        allTierItem.forEach(item => {
            nonTierImageContainer.appendChild(item);
        })
        e.target.parentNode.remove();

    })

    setUpDropZone(tierListItem);
    newTierList.appendChild(heading);
    newTierList.appendChild(tierListItem);

    return newTierList;
}


function createRandomColor (){
    return `#${(Math.floor(Math.random()*256)).toString(16)}${(Math.floor(Math.random()*256)).toString(16)}${(Math.floor(Math.random()*256)).toString(16)}`;
}



function setUpItemContainer (itemEle){
    itemEle.addEventListener("dragstart", (e)=> {
        currentDragEle = e.target.parentNode;

    })
}


function setUpDropZone (tierEle) {
    tierEle.addEventListener("drop", (e) => {
        e.preventDefault();

    })

    tierEle.addEventListener("dragover", function (e){
        if (this !== currentDragEle.parentNode){
            e.target.appendChild(currentDragEle);
        }
    })
}