import previous_assignment from './assignment-3.js';

export type BookID = string;

export interface Book {
  id?: BookID;
  name: string;
  author: string;
  description: string;
  price: number;
  image: string;
  stock?: number;
};

export interface Filter {
  from?: number;
  to?: number;
  name?: string;
  author?: string;
};

export interface WarehouseBook {
  shelf: ShelfId, count: number;
}

// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks(filters?: Filter[]): Promise<Book[]> {
  // updated this endpoint to return stock #
  return await previous_assignment.listBooks(filters);
}

async function createOrUpdateBook(book: Book): Promise<BookID> {
  return await previous_assignment.createOrUpdateBook(book);
}

async function removeBook(book: BookID): Promise<void> {
  await previous_assignment.removeBook(book);
}

export async function lookupBookById(book: BookID): Promise<Book | null> {
  const result = await fetch(`http://localhost:3000/books/${book}`);

  if (result.ok) {
    // And if it is valid, we parse the JSON result and return it.
    return await result.json() as Book;
  } else {
    console.error((`Failed to fetch book ${book}`));
    return null;
  }
}

export type ShelfId = string;
export type OrderId = string;

async function placeBooksOnShelf(bookId: BookID, numberOfBooks: number, shelf: ShelfId): Promise<void> {
  const result = await fetch('http://localhost:3000/warehouse/books', {
    method: 'POST',
    body: JSON.stringify({ bookId, count: numberOfBooks, shelf }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!result.ok) {
    throw new Error(`Failed to place book ${bookId} on shelf in warehouse`);
  }
}

async function orderBooks(order: BookID[]): Promise<{ orderId: OrderId; }> {
  const result = await fetch('http://localhost:3000/warehouse/orders', {
    method: 'POST',
    body: JSON.stringify({ order }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (result.ok) {
    return await result.json() as { orderId: OrderId; };
  } else {
    throw new Error(`Failed to create order in warehouse`);
  }
}

async function findBookOnShelf(book: BookID): Promise<WarehouseBook[] | null> {
  const result = await fetch(`http://localhost:3000/warehouse/books/${book}`);

  if (result.ok) {
    return await result.json() as WarehouseBook[];
  } else {
    console.error((`Failed to fetch book ${book}`));
    return null;
  }
}

async function fulfilOrder(order: OrderId, booksFulfilled: Array<{ book: BookID, shelf: ShelfId, numberOfBooks: number; }>): Promise<void> {
  throw new Error('Todo');
}

export interface Order {
  orderId: OrderId, books: Record<BookID, number>;
}
async function listOrders(): Promise<Order[] | null> {
  const result = await fetch(`http://localhost:3000/warehouse/orders`);

  if (result.ok) {
    // And if it is valid, we parse the JSON result and return it.
    return await result.json() as Order[];
  } else {
    throw new Error('Failed to fetch orders');
  }
}

const assignment = 'assignment-4';

export default {
  assignment,
  createOrUpdateBook,
  removeBook,
  listBooks,
  placeBooksOnShelf,
  orderBooks,
  findBookOnShelf,
  fulfilOrder,
  listOrders,
  lookupBookById
};
