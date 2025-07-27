import { type ZodRouter } from 'koa-zod-router';
import { ObjectId, type WithId, type Collection } from 'mongodb';
import { z } from 'zod';
import { type Book } from '../adapter/assignment-2.js';
import { getBookDatabase } from '../database_access.js';

function convertBookFromDocument(document: WithId<Book> | null): Book | null {
  if (document === null) return null;

  return {
    id: document._id.toHexString(),
    name: document.name,
    image: document.image,
    price: document.price,
    author: document.author,
    description: document.description
  };
};

async function getBookById(bookId: string, bookCollection: Collection<Book>): Promise<Book | null> {
  const document = await bookCollection.findOne({ _id: new ObjectId(bookId) });

  const result = convertBookFromDocument(document);

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
      const db = getBookDatabase();

      const result = await getBookById(id, db.bookCollection);
      ctx.body = result;

      await next();
    }
  });
}
