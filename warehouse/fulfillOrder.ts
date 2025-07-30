import { z } from 'zod';
import { type ZodRouter } from 'koa-zod-router';
import { ObjectId } from 'mongodb';

import { getWarehouseDatabase } from '../database_access.js';

const db = getWarehouseDatabase();

export default function fulfillOrder(router: ZodRouter): void {
  router.register({
    name: 'fulfillAnOrder',
    method: 'post',
    path: '/warehouse/orders/:id/fulfillment',
    validate: {
      params:
        z.object({ id: z.string().min(1) })
      ,
      body: z.object({
        book: z.string().min(1),
        shelf: z.string().min(1),
        numberOfBooks: z.coerce.number(),
      }).array().min(1)
    },
    handler: async (ctx, next) => {
      const { body } = ctx.request;
      const { id } = ctx.request.params;

      // get a list of book IDs
      const bookIds = body.map(item => item.book);

      // make a list of books that need stock updates
      const booksToUpdate: Array<{ id: ObjectId, count: number; }> = [];

      // make a list of books that need to be removed, e.g. stock level will be 0
      const booksToRemove: ObjectId[] = [];


      try {

        // remove fulfilled order from the database
        await db.warehouseOrdersCollection.deleteOne({ _id: { $eq: ObjectId.createFromHexString(id) } });

        // check books from order against the warehouse
        await db.warehouseBooksCollection.find({ bookId: { $in: bookIds } })?.forEach(document => {
          // match document with book & shelf from request.
          const warehouseBook = body.find(item => item.book === document.bookId && item.shelf === document.shelf);
          if (warehouseBook === null || warehouseBook === undefined) return;

          const newInventoryAmount = warehouseBook.numberOfBooks - document.count;

          if (newInventoryAmount >= 1) {
            booksToUpdate.push({ id: document._id, count: newInventoryAmount });
          } else {
            booksToRemove.push(document._id);
          }
        });

        // remove books with no inventory remaining
        await db.warehouseBooksCollection.deleteMany({ _id: { $in: booksToRemove } });

        // update books with >= 1 inventory
        const updates = booksToUpdate.map(update => {
          return {
            updateOne: {
              filter: {
                _id: {
                  $eq: update.id
                }
              }, update: {
                $set: { count: update.count }
              }
            }
          };
        });
        await db.warehouseBooksCollection.bulkWrite(updates);

        // remove order
        await db.warehouseOrdersCollection.deleteOne({ _id: { $eq: ObjectId.createFromHexString(id) } });
      } catch (e) {
        throw new Error('Failed to fulfill order');
      }

      await next();
    }
  });
}
