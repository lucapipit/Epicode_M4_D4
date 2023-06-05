
let promise = fetch("https://striveschool-api.herokuapp.com/books", {method: "GET"})
.then((response) => response.json())
.then((res) => {
    resAPI = res;
    console.log(resAPI);
    return appendBooks(resAPI);
})
.catch((err) => console.log(err));

let resAPI;
let resAPI_2;
let shoppingList = [];
let main = document.getElementById("main");
let modale = document.getElementById("modale");
let inputSearch = document.getElementById("searchInput");
let shopList = document.getElementById("shoppingList");
let detailRowBox = document.getElementById("detailRowBox");
let detailApi = "https://striveschool-api.herokuapp.com/books";

/* setTimeout(() => {console.log(resAPI_2);}, 2000); */
/* body button for closing */
let myBody = document.querySelector("body");
console.log(myBody);
myBody.addEventListener("click", () => {
    detailRowBox.classList.add("d-none");
})
/* navbar - tasto shopping list */
shopList.addEventListener("click", () => {
    modale.classList.toggle("d-none");
})

/* funzione filter per il motore di ricerca */
inputSearch.addEventListener("keydown", () => {
    let searchLetter = resAPI.filter(book => book.title.toUpperCase().includes(inputSearch.value.toUpperCase()))
    appendBooks(searchLetter);
})

/* funzione more info query page */
function infoButtonActivation(input){
   /*  let param = "";
    param = new URLSearchParams(location.search);
    let id = param.get("id");
    console.log(id);
    console.log(location.search);
 */
    fetch(detailApi + "/" + input)
    .then(response => response.json())
    .then((res) => {
        resAPI_2 = res;  
        console.log(resAPI_2);
        infoCardGenerator(resAPI_2);
        return resAPI_2;
    })
    .catch(err => "errore " + console.log(err));
    
}

/* funzione creazione card info/detail */
function infoCardGenerator(input){
    let imgDetailBox = document.getElementById("imgDetailBox");
    let imgDetail = document.createElement("img");
    imgDetailBox.innerHTML = "";
    imgDetail.src = input.img;
    imgDetail.classList.add("img-fluid");
    imgDetailBox.appendChild(imgDetail);
    let titleDetailBox = document.getElementById("titleDetailBox");
    titleDetailBox.classList.add("p-3", "display-6");
    titleDetailBox.innerText = input.title;
    let priceDetailBox = document.getElementById("priceDetailBox");
    priceDetailBox.classList.add("p-3", "display-6", "text-info")
    priceDetailBox.innerText = `${input.price}$`;
    detailRowBox.classList.remove("d-none");
}

/* funzione add to cart */
function shoppingCard(){
    let addButton = document.getElementsByClassName("addButton");
    let myCard = document.getElementsByClassName("card");
    for(i = 0; i < addButton.length; i++){
        let z = i;
        let j = z;
        addButton[i].addEventListener("click", () => {
            shoppingList.push(resAPI[z]);
            myCard[z].classList.toggle("selectedCard");
            appendSelectedBooks(shoppingList);
            console.log(shoppingList);
        })
    }
    return shoppingList;
}

/* funzione price */
function getTotPrice(input){
    let modaleTotPrice = document.getElementById("modaleTotPrice");
    let prc = 0;
    for(i = 0; i < shoppingList.length; i++){
        prc += parseFloat(shoppingList[i].price);
    }
    modaleTotPrice.innerHTML = "";
    modaleTotPrice.innerHTML = `Total:  ${(Math.round(prc*100))/100}$`;
}

/* funzione generatore libri */
function appendBooks(input){
    main.innerHTML = "";
    input.forEach(book => {
        /* card parent */
        let card = document.createElement("div");
        card.classList.add("card", "m-1", "cardCustom");
        /* book img */
        let imgBox = document.createElement("div");
        imgBox.classList.add("cardImgBox")
        let img = document.createElement("img");
        img.classList.add("cardImg")
        img.src = book.img;
        /* card body */
        let card_body = document.createElement("div");
        card_body.classList.add("card-body", "bg-transparent,", "m-3", "d-flex", "flex-column", "justify-content-between")
        /* book title */
        let title = document.createElement("h5");
        title.classList.add("card-title", "text-light", "text-truncate", "fw-light");
        title.innerText = book.title;
        /* price block */
        let priceBlock = document.createElement("div");
        let price$ = document.createElement("span");
        price$.classList.add("card-text", "text-info", "display-6");
        price$.innerText = "$ ";
        let price = document.createElement("span");
        price.classList.add("card-text", "text-info", "display-5");
        price.innerText = book.price;
        /* buttons */
        let buttonsBox = document.createElement("div");
        /* button add to cart */
        let button = document.createElement("a");
        button.classList.add("btn", "btn-outline-info", "addButton", "py-1", "my-2", "text-center", "d-block");
        button.href = "#"/* "index.html?id=" + asin */;
        button.innerText = "add to cart";
        /* button details */
        let btnMoreInfo = document.createElement("a");
        btnMoreInfo.classList.add("btn", "btn-outline-light", "infoButton", "py-1", "my-2", "text-center", "d-block")
        /* btnMoreInfo.href = "index.html?id=" + book.asin; */
        btnMoreInfo.innerText = "info";
        btnMoreInfo.addEventListener("click", () => {
            infoButtonActivation(book.asin);
        })
    
        /* append */
        imgBox.appendChild(img);
        card.appendChild(imgBox);
        card.appendChild(card_body);
        card_body.appendChild(title);
        priceBlock.appendChild(price$);
        priceBlock.appendChild(price);
        card_body.appendChild(priceBlock);
        card_body.appendChild(buttonsBox);
        buttonsBox.appendChild(button);   
        buttonsBox.appendChild(btnMoreInfo);
        main.appendChild(card);
    });
    shoppingCard();
}

/* funzione per la visualizzazione dei libri selezionati - input: shoppingList (arry) */
function appendSelectedBooks(input){
    let modaleContents = document.getElementById("modaleContents");
    console.log(modaleContents);
    modaleContents.innerHTML = "";
    for(i = 0; i < input.length; i++){
        let z = i;
        /* card */
        let orizCard = document.createElement("div");
        orizCard.classList.add("orizCard", "m-1", "w-100", "row", "bg-dark", "border-info");
        /* image */
        let imgThumbnail = document.createElement("img");
        imgThumbnail.classList.add("col-2", "orizImg");
        imgThumbnail.src = input[i].img;
        /* card body */
        let orizBodyBox = document.createElement("div");
        orizBodyBox.classList.add("gap-2", "col-9", "px-4", "py-2", "d-flex", "flex-column", "justify-content-between");
        /* title */
        let orizTitle = document.createElement("h4");
        orizTitle.classList.add("display-8", "text-light", "fw-light");
        orizTitle.innerText = input[i].title;
        /* price */
        let priceBlock = document.createElement("div");
        let price$ = document.createElement("span");
        price$.classList.add("card-text", "text-info", "display-2");
        price$.innerText = "$ ";
        let price = document.createElement("span");
        price.classList.add("card-text", "text-info", "display-1");
        price.innerText = input[i].price;
        /* remove button */
        let removeBtn = document.createElement("button");
        removeBtn.classList.add("col", "btn", "btn-danger", "ms-1", "p-1", "rounded-0", "removeBtnCustom", "fw-light");
        removeBtn.innerText = "X";
        removeBtn.addEventListener("click", () => {
            console.log(input[z]);
            input.splice(z, 1);
            appendSelectedBooks(shoppingList);
        });
        orizCard.appendChild(imgThumbnail);
        priceBlock.appendChild(price$);
        priceBlock.appendChild(price);
        orizBodyBox.appendChild(orizTitle);
        orizBodyBox.appendChild(priceBlock);
        orizCard.appendChild(orizBodyBox);
        orizCard.appendChild(removeBtn);
        modaleContents.appendChild(orizCard);    
    } 
    /* console.log(shoppingList[0].querySelector(".card-body").querySelector(".card-text").innerText); */
    /* console.log(shoppingList[0].children[1].children[2].innerText); */
    /* console.log(shoppingList[0].asin); */
    getTotPrice(shoppingList);
}