const yourCard = document.getElementById("your-card");
const newCard = document.getElementById("new-card");
const sectionNewCard = document.getElementById("section-new-card");
const sectionYourCard = document.getElementById("section-your-card");
const formCard = document.getElementById("card-form");
const containerCard = document.getElementById("cards-container");
const links = document.querySelectorAll('.tab-link');
//switch between the 'New Card' and 'View Card' sections.
newCard.addEventListener('click', () =>{
    sectionNewCard.classList.remove("hidden");
    sectionYourCard.classList.add("hidden");
    console.log("new card");
});
yourCard.addEventListener('click', () =>{
    sectionNewCard.classList.add("hidden");
    sectionYourCard.classList.remove("hidden");
    console.log("view card");
    viewCards();
});

//show card in section "Your Cards"
function viewCards(){
    containerCard.innerHTML = "";
    const cards = JSON.parse(localStorage.getItem("cards") || []);
    if(cards.length === 0){
        containerCard.innerHTML = "<p> No cards yet. </p>";
        return;
    }
    cards.forEach((card) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${card.title}</h3><p>${card.description}</p>`;
        containerCard.appendChild(div);
    });
};

// Save card to localStorage
formCard.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  if (!title || !description) return;

  const newCard = { title, description };
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.push(newCard);
  localStorage.setItem("cards", JSON.stringify(cards));

  formCard.reset();
  alert("Card saved!");
});



links.forEach(link =>{
link.addEventListener('click',(e)=>{
    e.preventDefault(); // prevent default link navigation
    links.forEach(l => l.classList.remove('active')); // remove active class from all links
    link.classList.add('active');
});
});