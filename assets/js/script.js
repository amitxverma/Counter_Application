let cards = document.querySelectorAll('.admin-control .card');

cards.forEach((card) => {
    let nextButton = card.querySelector('.next-cta');
    let prevButton = card.querySelector('.prev-cta');
    let resetButton = card.querySelector('.reset-cta');
    let toggleSwitch = card.querySelector('.toggle-switch .switch input');

    nextButton.addEventListener('click', function increaseCounter() {
        let closestCard = this.closest('.card ');
        let cardId = closestCard.getAttribute('data-counter');

        let inputValue = localStorage.getItem(cardId+"-counter") || 0;        
        inputValue++;
        localStorage.setItem(cardId+"-counter", inputValue);
        
        closestCard.querySelector('.counter-count').textContent = inputValue.toString().padStart('3', '0');
        document.querySelector(`#${cardId} .counter-count`).textContent = inputValue.toString().padStart('3', '0');
        if (inputValue > 0) {
            closestCard.querySelector('.prev-cta').removeAttribute('disabled');
            closestCard.querySelector('.reset-cta').removeAttribute('disabled');
        }
    });

    prevButton.addEventListener('click', function decreaseCounter() {
        let closestCard = this.closest('.card ');
        let cardId = closestCard.getAttribute('data-counter');

        let inputValue = localStorage.getItem(cardId+"-counter") || 1;
        inputValue--;
        localStorage.setItem(cardId+"-counter", inputValue);

        closestCard.querySelector('.counter-count').textContent = inputValue.toString().padStart('3', '0');
        document.querySelector(`#${cardId} .counter-count`).textContent = inputValue.toString().padStart('3', '0');
        if (inputValue == 0) {
            closestCard.querySelector('.prev-cta').setAttribute('disabled', 'true');
            closestCard.querySelector('.reset-cta').setAttribute('disabled', 'true');
        }
    });

    resetButton.addEventListener('click', function decreaseCounter() {
        let closestCard = this.closest('.card ');
        let cardId = closestCard.getAttribute('data-counter');

        let inputValue = localStorage.getItem(cardId+"-counter") || 0;        
        inputValue = 0;
        localStorage.setItem(cardId+"-counter", inputValue);

        closestCard.querySelector('.counter-count').textContent = inputValue.toString().padStart('3', '0');
        document.querySelector(`#${cardId} .counter-count`).textContent = inputValue.toString().padStart('3', '0');
        closestCard.querySelector('.prev-cta').setAttribute('disabled', 'true');
        closestCard.querySelector('.reset-cta').setAttribute('disabled', 'true');        
    });

    toggleSwitch.addEventListener('change', function handleCard() {
        card.classList.contains("isDisabled")? card.classList.remove("isDisabled"):card.classList.add("isDisabled");
        let counterCard = document.getElementById(card.getAttribute('data-counter'));
        counterCard.closest('.col').classList.contains('d-none') ? counterCard.closest('.col').classList.remove('d-none'):counterCard.closest('.col').classList.add('d-none')
        // if(counterCard){
        //     counterCard.parentElement.remove();
        // } else {
        //     let targetNode = document.querySelector('.user-counter');
        //     let newNode = document.createElement('div');
        //     newNode.classList.add('col');
        //     newNode.style.order = card.getAttribute('data-counter').slice(-1);
        //     newNode.innerHTML = `<div class="card p-3 text-center" id="${card.getAttribute('data-counter')}">
        //         <p class="counter-count">${localStorage.getItem(card.getAttribute('data-counter')+"-counter".padStart('3', '0')) || '0'.padStart('3','0')}</p>                    
        //     </div>`;
        //     targetNode.append(newNode);
        // }
        // cardId.classList.contains('isDisabled') ?  cardId.classList.remove('isDisabled') : cardId.classList.add('isDisabled');
    })
})

window.onload = () => {
    let disabledCards = document.querySelectorAll(".admin-control .card .switch input:not(:checked)");

    disabledCards.forEach(item => {
        item.closest(".card").classList.add("isDisabled");
        let userCard = document.querySelector(`.user-counter #${item.closest('.card').getAttribute('data-counter')}`);
        userCard.closest('.col').classList.add('d-none')
        // let cardId = item.closest('.card').getAttribute('data-counter');
        // document.querySelector(`#${cardId}`).classList.add('isDisabled');
    })
}