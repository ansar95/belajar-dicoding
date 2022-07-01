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
  handler: (Request, h) => {
    return 'Halaman ini tidak bisa diakses dengan method';
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