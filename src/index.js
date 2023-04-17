document.addEventListener('DOMContentLoaded', () => { 

////////////// GLOBAL VARIABLES //////////////
let doggo
let dogBar = document.getElementById('dog-bar')
let dogInfo = document.getElementById('dog-info')

////////////// FUNCTIONS //////////////

function doggoSpan(doggo) {
    doggo.forEach(dog => {
        const dogSpan = document.createElement('span')
        const dogName = document.createElement('p')
        dogName.textContent = dog.name
        dogName.id = `${dog.id}`
        dogSpan.appendChild(dogName)
        dogBar.appendChild(dogSpan)

        dogName.addEventListener('click', event => {
            event.preventDefault(); 
            displayDogInfo(dog)
        })
    })
}

function displayDogInfo(doggo) { 
    const img = document.createElement('img');
    img.src = doggo.image;
    img.alt = doggo.name;
    dogInfo.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = doggo.name;
    dogInfo.appendChild(name);

    const button = document.createElement('button');
    button.classList.add('dog-status-btn');
    button.dataset.id = doggo.id;
    button.dataset.status = doggo.isGoodDog;
    button.textContent = doggo.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    dogInfo.appendChild(button);

    button.addEventListener('click', event => {
        event.preventDefault();
        const id = event.target.dataset.id;
        const isGoodDog = event.target.dataset.status === "true";
        updateDogStatus(id, !isGoodDog);
    });
}

function updateDogStatus(id, isGoodDog) { 
    fetch(`http://localhost:3000/pups/${id}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isGoodDog })
    })
    .then(response => response.json())
    .then(data => { 
        // Update the button text
        const dogButton = document.querySelector('#dog-info button')
        dogButton.textContent = isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    })
}

////////////// FETCH //////////////

fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => { 
        doggo = data;

        doggoSpan(doggo)
    })

})