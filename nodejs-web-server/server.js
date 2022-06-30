const http = require ('http');

const requestListener = (request, response) => {

response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'NodeJS');

const {method, url} = request;

if (url === '/'){
  if(method === 'GET'){
      response.statusCode = 200;
      response.end('<h1>Ini Halaman Homepage</h1>');
    }else{
      response.statusCode = 400;
      response.end(`<h1>Halaman tidak dapat di akses dengan ${method} request</h1>`);
    }
    
  }else if (url === '/about'){
    if(method === 'GET'){
      response.statusCode = 200;
      response.end('<h1>Ini Halaman About</h1>');
    }else if(method === 'POST'){
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
      response.statusCode = 200;
        response.end(`<h1>Hallo, ${name} ini halaman about </h1>`);
      });  
    

    }else{
      response.statusCode = 400;

      response.end(`<h1>Halaman tidak dapat di akses dengan ${method} request</h1>`);
    }

  }else{
    response.statusCode = 404;

    response.end ('<h1>Halaman Tidak Di Temukan</h1>');
  }
    
  /**
  //ini body request
    if(method === 'GET'){
      response.end('<h1>Hello GET</h1>')
  }
  if(method === 'POST'){
    let body = [];
    
    request.on('data', (chunk) => {
      body.push(chunk);
    });
    
    request.on('end', () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      response.end(`<h1>Hallo, ${name}! </h1>`);
    });  
  }
   */
  
  if(method === 'PUT'){
    response.end('<h1>Hello PUT</h1>')
  }

  if(method === 'DELETE'){
    response.end('<h1>Hello DELETE</h1>')
  }

  
};


const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});