import { type ZodRouter } from 'koa-zod-router';
import { type WithId } from 'mongodb';
import { z } from 'zod';
import { type WarehouseBook } from '../adapter/assignment-4.js';
import { getWarehouseDatabase } from '../database_access.js';

// there could be multiple books in the warehouse that correspond to one bookId
// from the books database
export default function warehouseBookByIdRouter(router: ZodRouter): void {
  router.register({
    name: 'list books from the warehouse by book ID',
    method: 'get',
    path: '/warehouse/books/:bookId',
    validate: {
      params: z.object({
        bookId: z.string().min(1),
      })
    },
    handler: async (ctx, next) => {
      const { bookId } = ctx.request.params;

      const db = getWarehouseDatabase();

      const warehouseBookList = await db.warehouseBooksCollection.find({ bookId })?.map((document: WithId<WarehouseBook>) => {
        const book: WarehouseBook = {
          count: document.count,
          shelf: document.shelf,
        };
        return book;
      }).toArray();

      ctx.body = warehouseBookList;

      await next();
    }
  });
}
