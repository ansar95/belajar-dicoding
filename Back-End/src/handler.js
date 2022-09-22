const {nanoid} = require('nanoid');
const books = require('./books');

const addBooksHandler = (Request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = Request.payload;

  const id = nanoid(16);

  const finished = (pageCount === readPage);

  const insertedAt = new Date().toDateString();
  const updatedAt = insertedAt;


  if(!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
  });
  response.code(400);
  return response;
  }

  if(readPage>pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if(isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;

};

const getAllBooksHandler = (Request, h) => {
  const { name, reading, finished } = Request.query;
  let Books = books;

  if (name !== undefined) 
    Books = Books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));

  if (reading !== undefined) 
    Books = Books.filter((book) => book.reading === !!Number(reading));

  if (finished !== undefined)
    Books = Books.filter((book) => book.finished === !!Number(finished));

    const response = h.response({
    status: 'success',
    data: {
      books: Books.map((book) => ({id: book.id, name: book.name, publisher: book.publisher}))
      
      },
  });
  response.code(200);
  return response;

};
    
const getBooksByIdHandler = (Request, h) => {
const { id } = Request.params;

const book = books.filter((n) => n.id === id)[0];

if (book !== undefined) {
  return{
    status: 'success',
    data: {
      book,
    },
  };
}
const response = h.response({
  status:'fail',
  message: 'Buku tidak ditemukan',
});
response.code(404);
return response;

};

const editBooksByIdHandler = (Request,h) => {
const { id } = Request.params;
const { name, year, author, summary, publisher, pageCount, readPage, reading } = Request.payload;
const updatedAt = new Date().toISOString();

if(!name){
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Mohon isi nama buku',
});
response.code(400);
return response;
}

if(readPage > pageCount){
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
  });
  response.code(400);
  return response;
}



const index = books.findIndex((book) => book.id === id);

if (index !== -1){
  books[index] = {
    ...books[index],
    name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',  
  });
  response.code(200);
  return response;
}
const response = h.response({
  status: 'fail',
  message: 'Gagal memperbarui buku. Id tidak ditemukan',  
});
response.code(404);
return response;


};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBookByIdHandler 
};