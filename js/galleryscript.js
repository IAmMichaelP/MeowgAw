// sample stray data
const strayData = [
  { imgSrc: 'pics/cat/1.jpg', name: 'Cool Cat', type: 'cat', color: 'black',
    gender:'female', breed: 'Puspin', 
    story:"Insert short story, escription, characteristics, personality, disability, etc."},
  { imgSrc: 'pics/cat/2.jpg', name: 'Cute Cat', type: 'cat', color: 'black',
    gender:'female', breed: 'Unknown',
    story:"Insert short story, escription, characteristics, personality, disability, etc."},
  { imgSrc: 'pics/dog/1.jpg', name: 'Cute Dog', type: 'dog', color: 'brown',
    gender:'male', breed: 'Askal',
    story:"Insert short story, escription, characteristics, personality, disability, etc."},
  // can add more stray here
];

// function to store stray data in localStorage
function storeStrayData() {
  localStorage.setItem('strayData', JSON.stringify(strayData));
}

// function to retrieve stray data from localStorage
function retrieveStrayData() {
  const storedData = localStorage.getItem('strayData');   
  return storedData ? JSON.parse(storedData) : [];
}

// Function to display the modal with the corresponding stray data
function displayDescModal(stray) {
  const modal = document.getElementById('descModal');
  const modalContent = document.getElementById('desc');


  // modal content
  modalContent.innerHTML = `
    <div class="details-container">
      <h3>Meet ${stray.name}</h3>

      <div class="details">
        <div class="image">
          <img src="${stray.imgSrc}" alt="${stray.name}">
        </div>

        <div class="description">
          <p>Name: ${stray.name}</p>
          <p>Gender: ${stray.gender}</p>
          <p>Breed: ${stray.breed}</p>
          <p>Color: ${stray.color}</p><br>
        </div>
      </div>

      <h4>About ${stray.name}</h4>
      <p>${stray.story}</p>
    </div>

    <div class="adoptionForm">
      <h3>Interested in adopting ${stray.name}?</h3>

      <form>
        <label for="name">Full Name</label>
        <input type="text" id="name">
        <label for="email">Email Address</label>
        <input type="email" id="email">
        <label for="reason">Reason for Adoption</label>
        <input type="text" id="reason">

        <label for="interviewMode">Preferred Interview Mode:</label>
          <div id="interviewMode">
            <input type="radio" id="f2f" name="interview" value="face-to-face">
            <label for="f2f">Face-to-Face</label><br>
            <input type="radio" id="zoom" name="interview" value="zoom">
            <label for="zoom">Zoom</label>
          </div>

        <label for="schedule">Preferred Interview Schedule:</label>
        <input type="date" id="schedule">
        <button class="adoptButton" type="submit">Adopt ${stray.name}</button>
      </form>
    </div>
    `;

  modal.style.display = 'block';

  // Close the modal when the "x" is clicked
  const closeModal = document.querySelector('.close');
  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function displayStrayData() {
  const container = document.querySelector('.strayContainer');
  const storedStrayData = retrieveStrayData();

  storedStrayData.forEach((stray, index) => {
    const strayBox = document.createElement('div');
    strayBox.classList.add('strayBox');
    strayBox.setAttribute('data-index', index + 1);
    strayBox.setAttribute('data-name', stray.name);

    const img = document.createElement('img');
    img.src = stray.imgSrc;

    const p = document.createElement('p');
    p.textContent = stray.name;

    // Handle click event to display modal
    strayBox.addEventListener('click', () => displayDescModal(stray));

    strayBox.appendChild(img);
    strayBox.appendChild(p);
    container.appendChild(strayBox);
  });
}

// Call functions to store, retrieve, and display stray data
storeStrayData();
displayStrayData();

// for filtering strays
function showStrayData(category) {

    // keep buttons active when clicked
    document.getElementById('allBtn').classList.remove('active');
    document.getElementById('catBtn').classList.remove('active');
    document.getElementById('dogBtn').classList.remove('active');
    document.getElementById('otherBtn').classList.remove('active');
    
    document.getElementById(category + 'Btn').classList.add('active');

    const container = document.querySelector('.strayContainer');
    const storedStrayData = retrieveStrayData();

    // clear content
    container.innerHTML = '';

    // filter the stray data based on the category
    const filteredStrayData = category === 'all' ? storedStrayData : storedStrayData.filter(stray => stray.type === category);

    // display the filtered stray data
    filteredStrayData.forEach((stray, index) => {
        const strayBox = document.createElement('div');
        strayBox.classList.add('strayBox');
        strayBox.setAttribute('data-index', index + 1);
        strayBox.setAttribute('data-name', stray.name);

        const img = document.createElement('img');
        img.src = stray.imgSrc;

        const p = document.createElement('p');
        p.textContent = stray.name;

        strayBox.addEventListener('click', () => displayDescModal(stray));

        strayBox.appendChild(img);
        strayBox.appendChild(p);
        container.appendChild(strayBox);
    });
}

function closeDesc(popupId) {
    var popup = document.getElementById(popupId);
        popup.style.display = "none";
}