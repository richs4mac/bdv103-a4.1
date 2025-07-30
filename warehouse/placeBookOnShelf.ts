import { type ZodRouter } from 'koa-zod-router';
import { z } from 'zod';

import { lookupBookById } from '../adapter/assignment-4.js';
import { getWarehouseDatabase } from '../database_access.js';

const db = getWarehouseDatabase();

export default function placeBookOnShelf(router: ZodRouter): void {
  router.register({
    name: 'place book on shelf in warehouse',
    method: 'post',
    path: '/warehouse/books',
    validate: {
      body: z.object({
        bookId: z.string().min(1),
        count: z.coerce.number(),
        shelf: z.string().min(1),
      })
    },
    handler: async (ctx, next) => {
      const { bookId, count, shelf } = ctx.request.body;

      // check if book exists in books DB
      const book = await lookupBookById(bookId);

      if (book === null) {
        // no book in books DB = bad request
        ctx.statusCode = 400;
      } else {
        try {
          await db.warehouseBooksCollection.insertOne({
            bookId, count, shelf,
          });
        } catch (e) {
          ctx.statusCode = 500;
        }
      }

      await next();
    }
  });
}
