const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const boxs = document.querySelectorAll(".box");

let drag = null;
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

btn.onclick = function () {
  if (input.value != "") {
    boxs[0].innerHTML += `<li>
    <input type="text" class="item" value="${input.value}" draggable="true" disabled />
    <p class="edit">&#9998;</p>
    <p class="delete">&#10006;</p>
    </li>
    `;
    addTaskToArray(input.value);
    input.value = "";
  } else alert("Please add a task");
  dragItem();
};

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
  };
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  console.log(arrayOfTasks);
}
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function dragItem() {
  let items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("dragstart", function () {
      drag = item;
      item.style.opacity = "0.5";
    });
    item.addEventListener("dragend", function () {
      drag = null;
      item.style.opacity = "1";
    });
    boxs.forEach((box) => {
      box.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      // box.addEventListener("dragleave", function () {});
      box.addEventListener("drop", function () {
        box.append(drag);
        // console.log("droped");
      });
    });
  });
}
