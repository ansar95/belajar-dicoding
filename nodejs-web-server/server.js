const http = require ('http');

const requestListener = (request, response) => {
response.setHeader('Content-Type', 'text/html');
response.statusCode = 200;

  

  const {method, url} = request;
  
  if (url === '/'){

    //curl http://localhost:5000/
  }else if (url === '/about'){


  }else{
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