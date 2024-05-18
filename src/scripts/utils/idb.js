import { openDB } from 'idb';

const STORE_NAME = 'restaurant';
const OBJECT_STORE_NAME = 'favRest';

const dbPromise = openDB(STORE_NAME, 1, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
  },
});

const Database = {
  async getDB(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllDbs() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putDB(Obj) {
    return (await dbPromise).add(OBJECT_STORE_NAME, Obj);
  },
  async updateDB(Obj) {
    return (await dbPromise).put(OBJECT_STORE_NAME, Obj);
  },
  async deleteDB(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default Database;
