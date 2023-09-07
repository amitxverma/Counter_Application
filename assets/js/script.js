let cards = document.querySelectorAll('.admin-control .card');

cards.forEach((card) => {
    let nextButton = card.querySelector('.next-cta');
    let prevButton = card.querySelector('.prev-cta');
    let resetButton = card.querySelector('.reset-cta');
    let toggleSwitch = card.querySelector('.toggle-switch .switch input');

    nextButton.addEventListener('click', function () {
        let closestCard = this.closest('.card ');
        let cardId = closestCard.getAttribute('data-counter');

        let inputValue = localStorage.getItem(cardId + "-counter") || 0;
        inputValue++;
        localStorage.setItem(cardId + "-counter", inputValue);

        closestCard.querySelector('.counter-count').textContent = inputValue.toString().padStart('3', '0');
        // document.querySelector(`#${cardId} .counter-count`).textContent = inputValue.toString().padStart('3', '0');
        if (inputValue > 0) {
            closestCard.querySelector('.prev-cta').removeAttribute('disabled');
            closestCard.querySelector('.reset-cta').removeAttribute('disabled');
        }
    });

    prevButton.addEventListener('click', function () {
        let closestCard = this.closest('.card ');
        let cardId = closestCard.getAttribute('data-counter');

        let inputValue = localStorage.getItem(cardId + "-counter") || 1;
        inputValue--;
        localStorage.setItem(cardId + "-counter", inputValue);

        closestCard.querySelector('.counter-count').textContent = inputValue.toString().padStart('3', '0');
        // document.querySelector(`#${cardId} .counter-count`).textContent = inputValue.toString().padStart('3', '0');
        if (inputValue == 0) {
            closestCard.querySelector('.prev-cta').setAttribute('disabled', 'true');
            closestCard.querySelector('.reset-cta').setAttribute('disabled', 'true');
        }
    });

    resetButton.addEventListener('click', function () {
        let closestCard = this.closest('.card ');
        let cardId = closestCard.getAttribute('data-counter');

        let inputValue = localStorage.getItem(cardId + "-counter") || 0;
        inputValue = 0;
        localStorage.setItem(cardId + "-counter", inputValue);

        closestCard.querySelector('.counter-count').textContent = inputValue.toString().padStart('3', '0');
        // document.querySelector(`#${cardId} .counter-count`).textContent = inputValue.toString().padStart('3', '0');
        closestCard.querySelector('.prev-cta').setAttribute('disabled', 'true');
        closestCard.querySelector('.reset-cta').setAttribute('disabled', 'true');
    });

    toggleSwitch.addEventListener('change', function handleCard() {

        if (card.classList.contains("isDisabled")) {
            card.classList.remove("isDisabled");
            window.open(`./counterPrview.html#${this.getAttribute('data-id')}`);
            localStorage.setItem(`${this.getAttribute('data-id')}`,'true');
        } else {
            card.classList.add("isDisabled");
            localStorage.setItem(`${this.getAttribute('data-id')}`,'false');

        }
        // let counterCard = document.getElementById(card.getAttribute('data-counter')).closest('.col');
        // counterCard.classList.contains('d-none') ? counterCard.classList.remove('d-none') : counterCard.classList.add('d-none')
    })
})

window.onload = () => {
    let cards = document.querySelectorAll(".admin-control .card");
    let disabledCards = document.querySelectorAll(".admin-control .card .switch input:not(:checked)");

    cards.forEach(item => {
        let cardId = item.getAttribute('data-counter');
        let inputValue = localStorage.getItem(cardId + "-counter") || 0;

        item.querySelector('.counter-count').textContent = inputValue.toString().padStart('3', '0');
        // document.querySelector(`#${cardId} .counter-count`).textContent = inputValue.toString().padStart('3', '0');

        if (+inputValue) {
            item.querySelector('.prev-cta').removeAttribute('disabled');
            item.querySelector('.reset-cta').removeAttribute('disabled');
        }
    })

    disabledCards.forEach(item => {
        item.closest(".card").classList.add("isDisabled");
        // let userCard = document.querySelector(`.user-counter #${item.closest('.card').getAttribute('data-counter')}`);
        // userCard.closest('.col').classList.add('d-none');
    });
}