import { type ZodRouter } from 'koa-zod-router';
import { type Collection, type WithId } from 'mongodb';
import { type Order } from '../adapter/assignment-4.js';
import { getWarehouseDatabase, type WarehouseOrder } from '../database_access.js';

async function listOrders(warehouseOrdersCollection: Collection<WarehouseOrder>): Promise<Order[]> {
  const orderList = await warehouseOrdersCollection.find({})?.map((document: WithId<WarehouseOrder>) => {
    // count how many times each book was ordered
    const books: Record<string, number> = {};

    // this is another case of "I can't use reduce with this typescript config"
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    document.books.forEach(book => {
      // if book isn't in books object, add it
      if (books[book] !== undefined) {
        books[book] = 1;
      } else {
        // if it is in the books object, increment the order amount
        books[book] = books[book] + 1;
      }
    });

    return { orderId: document._id.toHexString(), books };
  }).toArray();

  return orderList;
}

export default function ordersListRouter(router: ZodRouter): void {
  router.register({
    name: 'list orders',
    method: 'get',
    path: '/warehouse/orders',
    handler: async (ctx, next) => {
      const db = getWarehouseDatabase();

      const result = await listOrders(db.warehouseOrdersCollection);
      ctx.body = result;

      await next();
    }
  });
}
