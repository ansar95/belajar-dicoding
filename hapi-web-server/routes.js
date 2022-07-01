const routes = [
 
 {
  method: 'GET',
  path: '/',
  handler: (Request, h) => {

    return 'Homepage';
  },
},
{
method: '*',
path: '/',
handler: (Request, h) => {
  return 'Halaman ini tidak bisa diakses dengan method tersebut';
  },
},
{
  method: 'GET',
  path: '/about',
  handler: (Request, h) => {

    return 'About Page';
  }, 
},
{
  method: '*',
  path: '/about',
  handler: (request, h) => {
    return 'Halaman ini tidak bisa diakses dengan method';
    },
  },
{
method: 'GET',
path: '/hello/{name?}',
handler: (request, h) => {
  const { name = "strange"} = request.params;
  return `Hello, ${name}`;
},
},
{
  method: '*',
  path: '/{any*}',
  handler: (Request, h) => {
    return 'Halaman tidak ditemukan';
  },

},

];
  module.exports = routes;