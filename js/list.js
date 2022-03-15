/*LOADER*/
window.addEventListener("load", () => {
  const content_loader = document.querySelector(".content__loader");
  content_loader.style.opacity = 0;
  content_loader.style.visibility = "hidden";
});
/*DB*/
const firebaseConfig = {
  apiKey: "AIzaSyCo1cuT5PZquatPmr2AA2-qbQxHnboyh68",
  authDomain: "auth-2298e.firebaseapp.com",
  projectId: "auth-2298e",
  storageBucket: "auth-2298e.appspot.com",
  messagingSenderId: "37066148286",
  appId: "1:37066148286:web:2c707aec3684259144d1ef",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let provider = new firebase.auth.GoogleAuthProvider();
const createUser = (user) => {
  db.collection("user")
    .add(user)
    .then((docRef) => console.log("User written with ID: ", docRef.id))
    .catch((error) => console.error("Error adding document: ", error));
};
let mailDb;
let allUsers = [];
let sameFavorite = 0;
let structureArr = [];
/*BOTÓN DEL LOGIN*/
async function login() {
  try {
    response = await firebase.auth().signInWithPopup(provider);
    userLog = response.user.displayName;
    console.log(`${userLog}`);
    if (userLog) {
      crearUsuario();
      document.querySelector(".nameUser").innerHTML = `Wellcome ${userLog}`;
      const log = document.querySelector(".list__button__login");
      document.querySelector(".list__contnent__login").style.display = "none";
      document.querySelector(".list__header__content").style.filter = "blur(0)";
      document.querySelector(".list__section").style.filter = "blur(0)";
      document.querySelector(".back__index").style.display = "block";
      document.querySelector(".back__favorites").style.display = "block";
      document
        .querySelectorAll(".list__books__botton2")
        .forEach((element) => (element.style.display = "block"));
      document
        .querySelectorAll(".list__books__favorite")
        .forEach((element) => (element.style.display = "block"));
    }
    /*NOMBRE AL STORAGE PARA PAGINA DE FAVORITOS*/
    localStorage.setItem("userName", JSON.stringify(userLog));
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
document.querySelector(".list__button__login").addEventListener("click", () => {
  login();
});
/*COMPROBAR SI FAVORITO YA EXISTE EN FIREBASE Y AÑADIR A STORAGE*/
function atClick(event) {
  let corazon1 = this.firstChild;
  corazon1.src = "./assets/corazon2.png";
  let titleSelect = this.parentNode.parentNode.firstChild.innerHTML;
  let authorSelect = this.parentNode.parentNode.childNodes[2].innerHTML;
  let imgUrlSelect = this.parentNode.parentNode.childNodes[3].src;
  let weeksSelect = this.parentNode.parentNode.childNodes[4].innerHTML;
  let descriptionSelect = this.parentNode.parentNode.childNodes[5].innerHTML;
  let amazonUrlSelect =
    this.parentNode.parentNode.childNodes[6].firstChild.href;

  localStorage.setItem("titleSelect", JSON.stringify(titleSelect));
  localStorage.setItem("authorSelect", JSON.stringify(authorSelect));
  localStorage.setItem("imgUrlSelect", JSON.stringify(imgUrlSelect));
  localStorage.setItem("weeklSelect", JSON.stringify(weeksSelect));
  localStorage.setItem("descriptionSelect", JSON.stringify(descriptionSelect));
  localStorage.setItem("amazonUrlSelect", JSON.stringify(amazonUrlSelect));
  traerFavoritos();
}

/* GUARDAR FAVORITO EN FIREBASE */
function traerFavoritos() {
  let titleSelect = JSON.parse(localStorage.getItem("titleSelect"));
  let authorSelect = JSON.parse(localStorage.getItem("authorSelect"));
  let imgUrlSelect = JSON.parse(localStorage.getItem("imgUrlSelect"));
  let weeksSelect = JSON.parse(localStorage.getItem("weeklSelect"));
  let descriptionSelect = JSON.parse(localStorage.getItem("descriptionSelect"));
  let amazonUrlSelect = JSON.parse(localStorage.getItem("amazonUrlSelect"));
  db.collection("favoritos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        titleDb = doc.data().titulo;
        if (titleDb === titleSelect) {
          sameFavorite += 1;
        }
      });
      if (sameFavorite >= 1) {
        console.log("YA FUE GUARDADO ANTERIORMENTE");
        sameFavorite = 0;
      } else {
        db.collection("favoritos").doc().set({
          nombre: userLog,
          titulo: titleSelect,
          autor: authorSelect,
          imgUrl: imgUrlSelect,
          semanas: weeksSelect,
          descripcion: descriptionSelect,
          amazon: amazonUrlSelect,
        });
        console.log("FAVORITO AÑADIDO");
      }
    });
}
/*FUNCIÓN PARA FETCH API Y PINTAR LIST*/
async function getList() {
  try {
    /*fetch de api nytimes*/
    let selectionUser = JSON.parse(localStorage.getItem("userSelection"));
    let response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${selectionUser}.json?api-key=CfqlRIKyzptHUR5CthXqjCnQwFZJReyj`
    );
    let data = await response.json();
    let books = data.results.books;
    for (let i = 0; i < books.length; i++) {
      let article = document.createElement("article");
      article.className = "list__article";
      document.querySelector(".list__section").appendChild(article);
      /*Creando los elementos del html*/
      let booksConector = document.createElement("p");
      let booksTitle = document.createElement("p");
      let booksAuthor = document.createElement("p");
      let booksImg = document.createElement("img");
      let booksWeeks = document.createElement("p");
      let booksDescription = document.createElement("p");
      let booksSubContent = document.createElement("div");
      let booksLink = document.createElement("a");
      let booksFavorites = document.createElement("img");
      let booksButton = document.createElement("button");
      let booksButton2 = document.createElement("button");
      /*Añadiendo clases a las variables*/
      booksConector.style.display = "none";
      booksTitle.className = `list__books__title`;
      booksAuthor.className = `list__books__author`;
      booksImg.className = `list__books__img`;
      booksWeeks.className = "list__books__weeks";
      booksDescription.className = "list__books__description";
      booksSubContent.className = "books_subContent";
      booksFavorites.className = "list__books__favorite";
      booksFavorites.src = "./assets/corazon.png";
      booksButton.className = "list__books__botton";
      booksButton.type = "click";
      booksButton2.className = "list__books__botton2";
      booksButton2.type = "click";
      booksLink.href = `${books[i].amazon_product_url}`;
      booksLink.target = "_blank";
      /*Añadiendo los elementos creados al html*/
      article.appendChild(booksTitle);
      article.appendChild(booksConector);
      article.appendChild(booksAuthor);
      article.appendChild(booksImg);
      article.appendChild(booksWeeks);
      article.appendChild(booksDescription);
      article.appendChild(booksFavorites);
      article.appendChild(booksSubContent);
      booksSubContent.appendChild(booksLink);
      booksButton2.appendChild(booksFavorites);
      booksLink.appendChild(booksButton);
      booksSubContent.appendChild(booksButton2);
      // /*añadiendo los datos del fetch a los elementos html*/
      booksTitle.innerHTML = `${books[i].title}`;
      booksAuthor.innerHTML = `Written by: ${books[i].author}`;
      booksImg.src = `${books[i].book_image}`;
      booksWeeks.innerHTML = `Weeks on list: ${books[i].weeks_on_list}`;
      booksDescription.innerHTML = `${books[i].description}`;
      booksButton.innerHTML = "BUY IN AMAZON";
      booksButton2.style.display = "none";
    }
    let likes = document.querySelectorAll(".list__books__botton2");
    /*MAPEAR BOTON DE FAVORITOS PARA ENVIAR LOS DATOS DE CADA BOTON EN CONCRETO*/
    likes.forEach((boton) => {
      boton.addEventListener("click", atClick);
    });
  } catch (error) {
    console.log(`ERROR Error: ${error.stack}`);
  }
}
getList();

/*BOTÓN QUIT DEL LOGIN*/
document.querySelector(".list__button__quit").addEventListener("click", () => {
  document.querySelector(".list__contnent__login").style.display = "none";
  document.querySelector(".list__header__content").style.filter = "blur(0)";
  document.querySelector(".list__section").style.filter = "blur(0)";
  document.querySelector(".back__index").style.display = "block";
  getList();
});

/*CREAR USUARIO*/
crearUsuario = () => {
  db.collection("user")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        mailDb = doc.data().mail;
        if (mailDb === response.user.email) {
          allUsers.push(response.user.email);
        }
      });
      if (allUsers.length >= 1) {
        console.log("User alredy exist");
      } else {
        createUser({
          nombre: response.user.displayName,
          mail: response.user.email,
        });
      }
    });
};
