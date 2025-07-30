import { type ZodRouter } from 'koa-zod-router';
import { z } from 'zod';

import { getWarehouseDatabase } from '../database_access.js';

const db = getWarehouseDatabase();

export default function orderBooks(router: ZodRouter): void {
  router.register({
    name: 'create order in warehouse',
    method: 'post',
    path: '/warehouse/orders',
    validate: {
      body: z.object({
        order: z.string().min(1).array().min(1) // array of at least 1 non-empty string
      })
    },
    handler: async (ctx, next) => {
      const { order } = ctx.request.body;

      // assume there's at least 1 book to be ordered
      // because the zod schema would filter out empty arrays & empty string
      try {
        await db.warehouseOrdersCollection.insertOne({
          books: order
        });
      } catch (e) {
        ctx.statusCode = 500;
      }

      await next();
    }
  });
}
