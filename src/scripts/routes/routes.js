import index from '../views/index';
import Detail from '../views/detail';
import Favorite from '../views/favorite';

const routes = {
  '/': index, // default page
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
