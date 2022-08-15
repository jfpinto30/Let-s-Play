

const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the data
const getData = () => [
    { imgSrc: "./img/Beer.svg", id: 1, name: "beer" },
    { imgSrc: "./img/Burger.svg", id: 2, name: "burger" },
    { imgSrc: "./img/Cake.svg", id: 3, name: "cake" },
    { imgSrc: "./img/Candy.svg", id: 4, name: "candy" },
    { imgSrc: "./img/chicken.svg", id: 5, name: "chicken" },
    { imgSrc: "./img/Donut.svg", id: 6, name: "donut" },
    { imgSrc: "./img/pancake.svg", id: 7, name: "pancake" },
    { imgSrc: "./img/wokBox.svg", id: 8, name: "wokBox" },
    { imgSrc: "./img/Beer.svg", id: 9, name: "beer" },
    { imgSrc: "./img/Burger.svg", id: 10, name: "burger" },
    { imgSrc: "./img/Cake.svg", id: 11, name: "cake" },
    { imgSrc: "./img/Candy.svg", id: 12, name: "candy" },
    { imgSrc: "./img/chicken.svg", id: 13, name: "chicken" },
    { imgSrc: "./img/Donut.svg", id: 14, name: "donut" },
    { imgSrc: "./img/pancake.svg", id: 15, name: "pancake" },
    { imgSrc: "./img/wokBox.svg", id: 16, name: "wokBox" },
]

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card Generator
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach((item) => {
     const card = document.createElement("div");
     const face = document.createElement("img");
     const back = document.createElement("div");
     card.classList = "card";
     face.classList = "face";
     back.classList = "back";
    //Attach info to cards
    face.src = item.imgSrc;
    card.setAttribute("name",item.name);
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

   card.addEventListener('click', (e) => {
     card.classList.toggle("toggleCard");  
     checkCards(e); 
   });
  });
};
//Check Cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    
    //Logic
    if (flippedCards.length === 2) {
      if (
        flippedCards[0].getAttribute("name") === 
        flippedCards[1].getAttribute("name")
     ) {
        console.log("match");
        flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            card.style.pointerEvents = "none";
        });
     } else {
        console.log("wrong");
        flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            setTimeout(() => card.classList.remove("toggleCard"), 1000);
        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
        if (playerLives === 0) {
            restart("Try again");
        }
      }
    }
    //Run a check to see if we won the game
    if (toggleCard.length === 16) {
        restart("You Won!");
    }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize
        setTimeout (() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);

    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text),100);
};

cardGenerator();

