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
/*FUNCION PARA GUARDAR EL FAVORITO A BORRAR EN STORAGE*/
function favoriteToDelete() {
  disLikes = document.querySelectorAll(".favorite__books__delete");
  disLikes.forEach((boton) => {
    boton.addEventListener("click", function deleteFavorite() {
      let titleDelete = this.parentNode.parentNode.firstChild.innerHTML;
      localStorage.setItem("titleDelete", JSON.stringify(titleDelete));
      let titelDelete = JSON.parse(localStorage.getItem("titleDelete"));
      /*COMPARAR SELECCIÓN CON FIREBASE*/
      db.collection("favoritos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docRef = db.collection("favoritos").doc();
            titleDb = doc.data().titulo;
            if (titleDb === titelDelete) {
              let id = doc.id;
              console.log(`BORRAMOS - ${titleDb}`);
              /*BORRAR FAVORITO DE FIREBASE*/
              db.collection("favoritos")
                .doc(`${id}`)
                .delete()
                .then(() => {
                  console.log(`Favorito ${titleDb} eliminado`);
                  location.reload();
                })
                .catch((error) => {
                  console.error("Error removing document: ", error);
                });
            }
          });
        });
    });
  });
}

/* TRAER FAVORITOS */
function traerFavoritos() {
  let userName = JSON.parse(localStorage.getItem("userName"));
  db.collection("favoritos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        titleDb = doc.data().titulo;
        imgUrlDb = doc.data().imgUrl;
        authorDb = doc.data().autor;
        weeksDb = doc.data().semanas;
        descriptionDb = doc.data().descripcion;
        amazonUrlDb = doc.data().amazon;
        if (userName === doc.data().nombre) {
          /*Creando un article por cada favorito de la base de datos*/
          let article = document.createElement("article");
          article.className = "list__article";
          document.querySelector(".favorite__section").appendChild(article);
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
          booksFavorites.className = "favorite__delete";
          booksFavorites.src = "./assets/delete.png";
          booksButton.className = "list__books__botton";
          booksButton.type = "click";
          booksButton2.className = "favorite__books__delete";
          booksButton2.type = "click";
          booksLink.href = `${amazonUrlDb}`;
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
          booksTitle.innerHTML = `${titleDb}`;
          booksAuthor.innerHTML = `${authorDb}`;
          booksImg.src = `${imgUrlDb}`;
          booksWeeks.innerHTML = `${weeksDb}`;
          booksDescription.innerHTML = `${descriptionDb}`;
          booksButton.innerHTML = "BUY IN AMAZON";
        }
      });
      favoriteToDelete();
    });
}

traerFavoritos();
