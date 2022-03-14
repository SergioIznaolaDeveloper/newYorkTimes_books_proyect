/*INDEX*/
/*FIREBASE*/
const firebaseConfig = {
  apiKey: "AIzaSyCo1cuT5PZquatPmr2AA2-qbQxHnboyh68",
  authDomain: "auth-2298e.firebaseapp.com",
  projectId: "auth-2298e",
  storageBucket: "auth-2298e.appspot.com",
  messagingSenderId: "37066148286",
  appId: "1:37066148286:web:2c707aec3684259144d1ef"
};

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const createUser = (user) => {
//   db.collection("newYorkTimes")
//     .add(user)
//     .then((docRef) => console.log("User written with ID: ", docRef.id))
//     .catch((error) => console.error("Error adding document: ", error));
// };
/*LOADER*/
window.onload = function (){
  const content_loader = document.querySelector(".content__loader")
  content_loader.style.opacity = 0
  content_loader.style.visibility = "hidden"
}
/*FUNCIÓN PARA FETCH API Y PINTAR INDEX*/
async function getArticles() {
  try {
    /*fetch de api nytimes*/
    let response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=CfqlRIKyzptHUR5CthXqjCnQwFZJReyj`
    );
    let data = await response.json();
    let results = data.results;
    for (let i = 0; i < results.length; i++) {
      let article = document.createElement("article");
      article.className = "index__article";
      document.querySelector(".index__section").appendChild(article);
      /*Creando los elementos del html*/
      let articleTitle = document.createElement("p");
      let nameEncode = document.createElement("p");
      let articleOldest = document.createElement("p");
      let articleNewest = document.createElement("p");
      let articleUpdated = document.createElement("p");
      let articleLink = document.createElement("a");
      let articleButton = document.createElement("button");
    
      /*Añadiendo clases a las variables*/
      articleTitle.className = `index__section__title`;
      nameEncode.className = `index__section__nameEncode`;
      articleOldest.className = "index__section__oldest";
      articleNewest.className = "index__section__newest";
      articleUpdated.className = "index__section__update";
      articleButton.className = "index__section__botton";
      articleButton.type = "click";
      /*Añadiendo los elementos creados al html*/
      article.appendChild(nameEncode);
      article.appendChild(articleTitle);
      article.appendChild(articleOldest);
      article.appendChild(articleNewest);
      article.appendChild(articleUpdated);
      article.appendChild(articleLink);
      articleLink.appendChild(articleButton);
      /*añadiendo los datos del fetch a los elementos html*/
      articleTitle.innerHTML = `${results[i].list_name.toUpperCase()}`;
      nameEncode.innerHTML = results[i].list_name_encoded;
      articleOldest.innerHTML = `Oldest: ${results[i].oldest_published_date}`;
      articleNewest.innerHTML = `Newest: ${results[i].newest_published_date}`;
      articleUpdated.innerHTML = `Updated: ${results[i].updated.toLowerCase()}`;
      articleButton.innerHTML = "READ MORE";
    }
    /*array de articulos*/
    let articles = document.querySelectorAll(".index__article");
    /*FUNCION GUARDAR SELECCIÓN EN STORAGE*/
    function atClick(event) {
      let selectionName = this.firstChild.innerHTML;
      let selectionLink = this.lastChild;
      console.log(selectionName);
      localStorage.setItem("userSelection", JSON.stringify(selectionName));
      selectionLink.href = "./list.html";
    }

    articles.forEach((boton) => {
      //Agregar listener
      boton.addEventListener("click", atClick);
    });
  } catch (error) {
    console.log(`ERROR Error: ${error.stack}`);
  }
}
getArticles();
