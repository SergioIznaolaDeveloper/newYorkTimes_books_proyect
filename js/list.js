/*LIST*/
/*LOADER*/
window.addEventListener("load", () => {
  const content_loader = document.querySelector(".content__loader");
  content_loader.style.opacity = 0;
  content_loader.style.visibility = "hidden";
});
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
    console.log(books);
    for (let i = 0; i < books.length; i++) {
      let article = document.createElement("article");
      article.className = "list__article";
      document.querySelector(".list__section").appendChild(article);
      /*Creando los elementos del html*/
      let booksTitle = document.createElement("p");
      let booksAuthor = document.createElement("p");
      let booksImg = document.createElement("img");
      let booksWeeks = document.createElement("p");
      let booksDescription = document.createElement("p");
      let booksSubContent = document.createElement("div");
      let booksLink = document.createElement("a");
      // let booksFavorites = document.createElement("img");
      let booksButton = document.createElement("button");
      /*Añadiendo clases a las variables*/
      booksTitle.className = `list__books__title`;
      booksAuthor.className = `list__books__author`;
      booksImg.className = `list__books__img`;
      booksWeeks.className = "list__books__weeks";
      booksDescription.className = "list__books__description";
      booksSubContent.className = "books_subContent";
      // booksFavorites.className = "list__books__favorite";
      // booksFavorites.src = "./assets/corazon.png";
      booksButton.className = "list__books__botton";
      booksButton.type = "click";
      booksLink.href = `${books[i].amazon_product_url}`;
      booksLink.target = "_blank";
      /*Añadiendo los elementos creados al html*/
      article.appendChild(booksTitle);
      article.appendChild(booksAuthor);
      article.appendChild(booksImg);
      article.appendChild(booksWeeks);
      article.appendChild(booksDescription);
      // article.appendChild(booksFavorites);
      article.appendChild(booksSubContent);
      booksSubContent.appendChild(booksLink);
      // booksSubContent.appendChild(booksFavorites);
      booksLink.appendChild(booksButton);
      /*añadiendo los datos del fetch a los elementos html*/
      booksTitle.innerHTML = `${books[i].title.toUpperCase()}`;
      booksAuthor.innerHTML = `Written by: ${books[i].author}`;
      booksImg.src = `${books[i].book_image}`;
      booksWeeks.innerHTML = `Weeks on list: ${books[i].weeks_on_list}`;
      booksDescription.innerHTML = `${books[i].description}`;
      booksButton.innerHTML = "BUY IN AMAZON";
    }
    // /*array de articulos*/
    // let articles = document.querySelectorAll(".index__article");
    // /*FUNCION GUARDAR SELECCIÓN EN STORAGE*/
    // function atClick(event) {
    //   let selectionName = this.firstChild.innerHTML;
    //   let selectionLink = this.lastChild;
    //   console.log(selectionName);
    //   localStorage.setItem("userSelection", JSON.stringify(selectionName));
    //   selectionLink.href = "./favorites.html";
    // }

    // articles.forEach((boton) => {
    //   //Agregar listener
    //   boton.addEventListener("click", atClick);
    // });
  } catch (error) {
    console.log(`ERROR Error: ${error.stack}`);
  }
}
getList();
