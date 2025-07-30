import { type ZodRouter } from 'koa-zod-router';
import { type Collection, ObjectId, type WithId } from 'mongodb';
import { z } from 'zod';
import { type Book } from '../adapter/assignment-4.js';
import { getBookDatabase, getWarehouseDatabase, type WarehouseBook } from '../database_access.js';

function convertBookFromDocument(document: WithId<Book> | null, warehouseCount: number): Book | null {
  if (document === null) return null;

  return {
    id: document._id.toHexString(),
    name: document.name,
    image: document.image,
    price: document.price,
    author: document.author,
    description: document.description,
    stock: warehouseCount,
  };
};

async function getBookById(bookId: string, bookCollection: Collection<Book>, warehouseBooksCollection: Collection<WarehouseBook>): Promise<Book | null> {
  const document = await bookCollection.findOne({ _id: new ObjectId(bookId) });

  // get all warehouse books with this book ID and add up their counts together
  const warehouseCount = await warehouseBooksCollection.find({ book: new ObjectId(bookId) })?.map((document) => document.count
  ).toArray().then(arr => {
    // it wouldn't let me use arr.reduce here, it said arr didn't have an iterator
    let total = 0;
    arr.forEach(item => {
      total += item;
    });
    return total;
  });

  const result = convertBookFromDocument(document, warehouseCount);

  return result;
}

export default function getBookByIdRouter(router: ZodRouter): void {
  router.register({
    name: 'get book by ID',
    method: 'get',
    path: '/books/:id',
    validate:
    {
      params: z.object({ id: z.string().min(1) })
    },
    handler: async (ctx, next) => {
      const { id } = ctx.request.params;
      const booksDb = getBookDatabase();
      const warehouseDb = getWarehouseDatabase();

      const result = await getBookById(id, booksDb.bookCollection, warehouseDb.warehouseBooksCollection);
      ctx.body = result;

      await next();
    }
  });
}
