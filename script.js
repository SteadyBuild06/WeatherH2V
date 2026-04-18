const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    alert("You searched for: " + city);
});