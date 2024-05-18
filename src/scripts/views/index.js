const index = {
  async render() {
    return `
        <main id="maincontent">
          <div class="restaurant-container" id="restaurant-list"></div>
        </main>
      `;
  },

  async afterRender() {
    function displayRestaurants(data) {
      const restaurantList = document.getElementById('restaurant-list');

      let countRest = 0;
      data.restaurants.forEach((restaurant) => {
        // eslint-disable-next-line no-plusplus
        countRest++;
        const restaurantDiv = document.createElement('div');
        restaurantDiv.className = 'restaurant';

        const restaurantImage = document.createElement('img');
        restaurantImage.src = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
        restaurantImage.alt = restaurant.name;

        const restaurantInfo = document.createElement('div');
        restaurantInfo.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p>Kota: ${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
                <p>Deskripsi: ${restaurant.description}</p>
                <a href="/#/detail/${restaurant.id}" class="detail" id="${countRest}">detail</a>
            `;

        restaurantDiv.appendChild(restaurantImage);
        restaurantDiv.appendChild(restaurantInfo);

        restaurantList.appendChild(restaurantDiv);
      });
    }

    // Ambil data dari JSON
    fetch('https://restaurant-api.dicoding.dev/list')
      .then((response) => response.json())
      .then((data) => displayRestaurants(data))
      .catch((error) => console.error('Gagal mengambil data:', error));
  },
};

export default index;
