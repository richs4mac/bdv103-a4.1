import { type ZodRouter } from 'koa-zod-router';
import type { WithId } from 'mongodb';
import { describe } from 'vitest';
import { z } from 'zod';
import { type Book } from '../adapter/assignment-2.js';
import { type BookDatabaseAccessor, getBookDatabase } from '../database_access.js';

interface Filter {
  from?: number;
  to?: number;
  name?: string;
  author?: string;
};

async function listBooks(filters: Filter[], db: BookDatabaseAccessor): Promise<Book[]> {
  const validFilters = filters?.filter(({ from, to, name, author }) =>
    typeof from === 'number' ||
    typeof to === 'number' ||
    (typeof name === 'string' && name.trim().length > 0) ||
    (typeof author === 'string' && author.trim().length > 0)
  ) ?? [];

  const query = validFilters.length > 0
    ? {
      $or: validFilters.map(({ from, to, name, author }) => {
        const filter: { price?: { $gte?: number, $lte?: number; }, name?: { $regex: string, $options: string; }, author?: { $regex: string, $options: string; }; } = {};
        if (typeof from === 'number') {
          filter.price = { $gte: from };
        }
        if (typeof to === 'number') {
          filter.price = { ...(filter.price ?? {}), $lte: to };
        }
        if (typeof name === 'string') {
          filter.name = { $regex: name.toLowerCase(), $options: 'ix' };
        }
        if (typeof author === 'string') {
          filter.author = { $regex: author.toLowerCase(), $options: 'ix' };
        }
        return filter;
      })
    }
    : {};

  const bookList = await db.bookCollection.find(query).map((document: WithId<Book>) => {
    const book: Book = {
      id: document._id.toHexString(),
      name: document.name,
      image: document.image,
      price: document.price,
      author: document.author,
      description: document.description
    };
    return book;
  }).toArray();

  return bookList;
}

export default function booksListRouter(router: ZodRouter): void {
  router.register({
    name: 'list books',
    method: 'get',
    path: '/books',
    validate: {
      query: z.object({
        filters: z.object({
          from: z.coerce.number().optional(),
          to: z.coerce.number().optional(),
          name: z.string().optional(),
          author: z.string().optional()
        }).array().optional()
      })
    },
    handler: async (ctx, next) => {
      const { filters = [] } = ctx.request.query;

      const db = getBookDatabase();

      const result = await listBooks(filters, db);
      ctx.body = result;

      await next();
    }
  });
}
