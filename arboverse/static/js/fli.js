const card = document.querySelectorAll('.card__inner');

card.forEach((card) => {
     card.addEventListener("click", () => {
          card.classList.toggle("is-flipped");
     });
});