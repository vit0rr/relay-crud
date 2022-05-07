class List {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class User {
  constructor(id, name, address, email, age) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.age = age;
  }
}

const userList = new List(1, "User List");
let users = [
  new User(1, "Vitor", "Rua Pereira 21, NY", "vitor@gmail.com", "21"),
];

let curUser = 1;
function addUser(name, address, email, age) {
  const newUser = new User(curUsers, name, address, email, age);
  users.push(newUser);
  newUser.id = curUsers;
  curUsers += 1;
  return newUser;
}

function updateUser(name, address, email, oldEmail, age) {
  let User = user.find((w) => w.email === oldEmail);
  User.name = name;
  User.address = address;
  User.email = email;
  User.age = age;
  return User;
}

function deleteUser(id, email) {
  users = users.filder(function (User) {
    return User.email !== email;
  });
  return { id };
}

function getList(id){
    return id === userList.id ? userList: null;
}

function getUser(email) {
    return users.find(w => w.email === email);
}

function getUsers(){
    return users;
}

export {
    List,
    User,
    getList,
    getUser,
    getUsers,
    addUser,
    updateUser,
    deleteUser
}