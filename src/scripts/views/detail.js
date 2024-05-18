import Database from '../utils/idb';

const Detail = {
  async render() {
    return `
        <div class="page_detail">
            <div class="page1">
                <img src="" alt="Tidak Ditemukan" class="img_detail" id="img_detail">
            </div>
            <div class="page2">
                <h1 class="judul" id="judul"></h2>
                <p id="kota"></p>
                <p id="rating"></p>
                <p id="alamat"></p>
                <h4><b>Daftar Menu Makanan</b></h4>
                <ul id="food">
                    
                </ul>
                <h4><b>Daftar Menu Minuman</b></h4>
                <ul id="drink">
                    
                </ul>
                <p id="deskripsi"></p>
                <h4><b>Customer Review</b></h4>
                <ul id="customerReview">
                
                </ul>
                <button id="favButton" onclick="">[+] Favorit</button>
            </div>
        </div>
      `;
  },

  async afterRender() {
    function getIdFromUrl() {
      const path = `/${window.location.hash}`;
      // eslint-disable-next-line no-useless-escape
      const match = path.match(/\/#\/detail\/([^\/]+)/);
      if (match) {
        const idValue = match[1];
        return idValue;
      }
      return null;
    }

    const buttonFav = document.getElementById('favButton');

    try {
      const getAllDB = await Database.getAllDbs();
      getAllDB.forEach((res) => {
        // eslint-disable-next-line no-param-reassign
        res = res.id;
        if (getIdFromUrl().includes(res)) {
          buttonFav.textContent = '[-] Hapus Favorit';
        } else { /* empty */ }
      });
    } catch (err) {
      await console.log(err);
    }

    buttonFav.addEventListener('click', async () => {
      try {
        let duplicatesFav = false;
        const getAllDB = await Database.getAllDbs();
        getAllDB.forEach((res) => {
          // eslint-disable-next-line no-param-reassign
          res = res.id;
          if (getIdFromUrl().includes(res)) {
            duplicatesFav = true;
          }
        });
        if (duplicatesFav) {
          await Database.deleteDB(getIdFromUrl());
          buttonFav.textContent = '[+] Favorit';
        } else {
          Database.putDB({ id: getIdFromUrl() });
          buttonFav.textContent = '[-] Hapus Favorit';
        }
      } catch (err) {
        await console.log(err);
      }
    });

    // Ambil data dari JSON
    fetch(`https://restaurant-api.dicoding.dev/detail/${getIdFromUrl()}`)
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line no-param-reassign
        data = data.restaurant;
        document.getElementById('img_detail').src = `https://restaurant-api.dicoding.dev/images/medium/${data.pictureId}`;
        document.getElementById('judul').textContent = data.name;
        document.getElementById('kota').textContent = `Kota : ${data.city}`;
        document.getElementById('rating').textContent = `Rating : ${data.rating}`;
        document.getElementById('alamat').textContent = `Alamat : ${data.address}`;
        // DAFTAR MENU MAKANAN
        data.menus.foods.forEach((food) => {
          const LiFoods = document.createElement('li');
          const liFContent = document.createTextNode(food.name);
          LiFoods.appendChild(liFContent);

          const ulFelement = document.getElementById('food');
          ulFelement.appendChild(LiFoods);
        });
        // DAFTAR MENU MINUMAN
        data.menus.drinks.forEach((drink) => {
          const LiDrinks = document.createElement('li');

          const liDContent = document.createTextNode(drink.name);
          LiDrinks.appendChild(liDContent);

          const ulDelement = document.getElementById('drink');
          ulDelement.appendChild(LiDrinks);
        });
        document.getElementById('deskripsi').textContent = `Deskripsi : ${data.description}`;
        // DAFTAR CUSTOMER SERVICES
        data.customerReviews.forEach((cr) => {
          const LiCr = document.createElement('li');

          const liCRContent = document.createTextNode(`(${cr.name}) >> ${cr.review} [${cr.date}]`);
          LiCr.appendChild(liCRContent);

          const ulDelement = document.getElementById('customerReview');
          ulDelement.appendChild(LiCr);
        });
      }).catch((error) => console.error('Gagal mengambil data:', error));
  },
};

export default Detail;
