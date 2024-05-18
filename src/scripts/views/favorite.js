import Database from '../utils/idb';

const Favorite = {
  async render() {
    return `
        <main id="maincontent">
            <h1>FAVORITE LIST</h1>
            <div class="restaurant-container" id="restaurant-favorite"></div>
        </main>
        `;
  },

  async afterRender() {
    function displayRestaurants(data) {
      const { restaurant } = data;
      const restaurantList = document.getElementById('restaurant-favorite');
      let countRest = 0;
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
    }

    // Ambil data dari JSON
    try {
      const getAllDB = await Database.getAllDbs();
      getAllDB.forEach((res) => {
        // eslint-disable-next-line no-param-reassign
        res = res.id;
        fetch(`https://restaurant-api.dicoding.dev/detail/${res}`)
          .then((response) => response.json())
          .then((data) => displayRestaurants(data))
          .catch((error) => console.error('Gagal mengambil data:', error));
      });
    } catch (err) {
      await console.log(err);
    }
  },
};

export default Favorite;
