const dropArea = document.querySelector(".drag-area"),
  dragText = document.querySelector(".drag-title"),
  fileList = document.querySelector(".file-list");
let filesArray = localStorage.getItem("fileListArr")
  ? JSON.parse(localStorage.getItem("fileListArr"))
  : [];

// Set display when page loads
(function () {
  fileList.innerHTML = "";
  displayList(filesArray);
})();

//Trashcan icon animation on hover over
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Dosyayı Yüklemek İçin Bırak";
});

dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "Dosya Yüklemek İçin Sürükle ve Bırak";
});

// On file drop gets an items object then parses their names to an array and saves it locally
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "Dosya Yüklemek İçin Sürükle ve Bırak";
  let file = e.dataTransfer.files;
  let nameArray = Object.values(file).map((x) => x.name);
  console.log(nameArray);
  localStorage.setItem(
    "fileListArr",
    JSON.stringify(filesArray.concat(nameArray))
  );
  filesArray = localStorage.getItem("fileListArr")
    ? JSON.parse(localStorage.getItem("fileListArr"))
    : [];
  nameArray = "";
  fileList.innerHTML = "";
  displayList(filesArray);
});

//Diplay list of items on the screen
function displayList(arr) {
  arr.forEach((element, index) => {
    const listItem = document.createElement("li");
    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.setAttribute("src", "trash-closed.png");
    deleteIcon.setAttribute("id", `${index}`);
    listItem.textContent = element;
    fileList.appendChild(listItem);
    listItem.appendChild(deleteIcon);
    deleteIcon.addEventListener("mouseover", (e) => {
      deleteIcon.setAttribute("src", "trash-open.png");
    });
    deleteIcon.addEventListener("mouseleave", (e) => {
      deleteIcon.setAttribute("src", "trash-closed.png");
    });
  });
}

//Delete item event listener
fileList.addEventListener("click", deleteListItem);

//selects and deletes item upon clicking trash icon
function deleteListItem(e) {
  if (e.target.classList[0] !== "delete-icon") return;
  const deleteID = e.target.id;
  console.log(deleteID);
  filesArray.splice(deleteID, 1);
  localStorage.setItem("fileListArr", JSON.stringify(filesArray));
  fileList.innerHTML = "";
  displayList(filesArray);
}
