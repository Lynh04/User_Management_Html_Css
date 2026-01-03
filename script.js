const form = document.getElementById("addUserForm");
const btnAdd = document.getElementById("btnAdd");
const dialogAdd = document.getElementById("addUserDialog");
const btnClose = document.getElementById("closeDialog");
const btnCancel = document.getElementById("cancelDialog");
const deleteDialog = document.getElementById("deleteUserDialog");
const closeDelete = document.getElementById("closeDeleteDialog");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");
const createDialog = document.getElementById("createDialog");
const id = document.getElementById("id");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const listData = document.getElementById("listData");
const edit = document.getElementById("edit");
const deleteData = document.getElementById("deleteData");
const dialogTitle = document.getElementById("dialog-title");
const inputSearch = document.getElementById("inputsearch");

let listUser = JSON.parse(localStorage.getItem("User-management")) || [];
let currentEditId = null;

//function save localStorage
function saveLocalStorage() {
  localStorage.setItem("User-management", JSON.stringify(listUser));
}

//function render data
function renderData() {
  const searchValue = inputSearch.value.trim().toLowerCase();
  //tạo filterList
  const filterList = listUser.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue)
    );
  });
  listData.innerHTML = "";
  filterList.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user-item");
    userItem.innerHTML = `
        <div>${user.name}</div>
        <div>Email: ${user.email}</div>
        <div>Phone: ${user.phone}</div>
        <div class="edit-delete-container">
            <button class="edit-btn" id="edit" onclick="editUser(${user.id})">Edit</button>
            <button class="delete-btn" id="deleteData" onclick="deleteUser(${user.id})">Delete</button>
        </div>
        `;
    listData.appendChild(userItem);
  });
  //nếu search không có kết quả => hiển thị thông báo Không tìm thấy kết quả cho "hien"
  if (filterList.length === 0) {
    listData.innerHTML = `<div class="no-result">Không tìm thấy kết quả cho "${searchValue}"</div>`;
  }
  //nếu listData không có thì hiển thị => Chưa có người dùng nào Hãy thêm người dùng đầu tiên của bạn!
  if (listUser.length === 0) {
    listData.innerHTML = `<div class="no-result">Chưa có người dùng nào Hãy thêm người dùng đầu tiên của bạn!</div>`;
  }
}

renderData();

createDialog.onclick = function (e) {
  e.preventDefault();
  // cập nhật người dùng sau edit
  if (currentEditId !== null) {
    const user = listUser.find((user) => user.id === currentEditId);
    user.name = nameInput.value;
    user.email = email.value;
    user.phone = phone.value;
    saveLocalStorage();
    renderData();
    dialogTitle.textContent = "Add User";
    createDialog.textContent = "Create User";
    currentEditId = null;
  } else {
    const nameValue = nameInput.value;
    const emailValue = email.value;
    const phoneValue = phone.value;
    console.log(nameValue);

    const newUser = {
      id: Date.now(),
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    };
    // Thêm người dùng mới vào danh sách
    listUser.push(newUser);
  }

  // Lưu danh sách người dùng vào localStorage
  saveLocalStorage();
  // Render lại dữ liệu
  renderData();
  // Xóa giá trị trong các trường nhập liệu
  nameInput.value = "";
  email.value = "";
  phone.value = "";
  //close dialog
  dialogAdd.close();
};

//function xóa người dùng
function deleteUser(id) {
  listUser = listUser.filter((user) => user.id !== id);
  saveLocalStorage();
  renderData();
  dialogAdd.showModal();
}

confirmDelete.onclick = function () {
  listUser = listUser.filter((user) => user.id !== currentEditId);
  saveLocalStorage();
  renderData();
  deleteDialog.close();
};

//function edit người dùng
function editUser(id) {
  const user = listUser.find((user) => user.id === id);
  nameInput.value = user.name;
  email.value = user.email;
  phone.value = user.phone;
  currentEditId = id;
  dialogAdd.showModal();
}

btnAdd.onclick = function () {
  dialogAdd.showModal();
};

btnClose.onclick = function () {
  dialogAdd.close();
};

btnCancel.onclick = function () {
  dialogAdd.close();
};
closeDelete.onclick = function () {
  deleteDialog.close();
};

cancelDelete.onclick = function () {
  deleteDialog.close();
};

function deleteUser(id) {
  deleteDialog.showModal();
  currentEditId = id;
}

function editUser(id) {
  const user = listUser.find((user) => user.id === id);
  nameInput.value = user.name;
  email.value = user.email;
  phone.value = user.phone;
  currentEditId = id;
  dialogAdd.showModal();
  dialogTitle.textContent = "Edit User";
  createDialog.textContent = "Save Changes";
}

//lắng nghe sự kiện user nhập input
inputSearch.addEventListener("input", function () {
  renderData();
});
