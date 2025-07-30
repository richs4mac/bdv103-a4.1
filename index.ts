import Koa from 'koa';
import cors from '@koa/cors';
import zodRouter from 'koa-zod-router';
import qs from 'koa-qs';
import booksList from './books/list.js';
import createOrUpdateBook from './books/create_or_update.js';
import deleteBook from './books/delete.js';
import getBookByIdRouter from './books/getBookById.js';
import placeBookOnShelf from './warehouse/placeBookOnShelf.js';
import warehouseBookByIdRouter from './warehouse/getBookById.js';

const app = new Koa();

// We use koa-qs to enable parsing complex query strings, like our filters.
qs(app);

// And we add cors to ensure we can access our API from the mcmasterful-books website
app.use(cors());

const router = zodRouter();

/**
 * Books router
 */

// Setup Get Book By ID Route
getBookByIdRouter(router);

// Setup Book List Route
booksList(router);

// Setup Book Create Route
createOrUpdateBook(router);

// Setup Book Delete Route
deleteBook(router);

/**
 * Warehouse router
 */

placeBookOnShelf(router);
warehouseBookByIdRouter(router);

app.use(router.routes());

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
