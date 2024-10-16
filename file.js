const baseURL = 'http://localhost:3000/ramens';

document.addEventListener('DOMContentLoaded', main);

function main() {
    displayRamens();
    addSubmitListener();
}

async function displayRamens() {
    try {
        const response = await fetch(baseURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const ramens = await response.json();
        const ramenMenu = document.getElementById('ramen-menu');

        ramens.forEach(ramen => {
            const img = document.createElement('img');
            img.src = ramen.image;
            img.alt = `Image of ${ramen.name}`;
            img.addEventListener('click', () => handleClick(ramen));
            ramenMenu.appendChild(img);
        });

    
        if (ramens.length > 0) {
            handleClick(ramens[0]);
        }
    } catch (error) {
        console.error('Error fetching ramen data:', error);
    }
}

function handleClick(ramen) {
    document.getElementById('detail-image').src = ramen.image;
    document.getElementById('detail-name').innerText = ramen.name;
    document.getElementById('detail-description').innerText = ramen.description;
    document.getElementById('detail-rating').innerText = ramen.rating || 'N/A';
    document.getElementById('detail-comment').innerText = ramen.comment || 'N/A';


    document.getElementById('new-rating').value = ramen.rating || '';
    document.getElementById('new-comment').value = ramen.comment || '';
}

function addSubmitListener() {
    const newRamenForm = document.getElementById('new-ramen');
    newRamenForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;

       
        const newRamen = { name, image };

        
        const ramenMenu = document.getElementById('ramen-menu');
        const img = document.createElement('img');
        img.src = newRamen.image;
        img.alt = `Image of ${newRamen.name}`;
        img.addEventListener('click', () => handleClick(newRamen));
        ramenMenu.appendChild(img);

        
        newRamenForm.reset();
    });

    
    const editRamenForm = document.getElementById('edit-ramen');
    editRamenForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const rating = document.getElementById('new-rating').value;
        const comment = document.getElementById('new-comment').value;

        
        document.getElementById('detail-rating').innerText = rating;
        document.getElementById('detail-comment').innerText = comment;
    });
}
