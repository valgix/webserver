const http = require('http');

class VWS {
  constructor() {
    this.server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });
    this.routes = {};
    this.routeArgs = {};
    this.loggerStatus = false;
  }

  handleRequest(req, res) {
    const url = req.url;
    const method = req.method;

    if (this.routes[url] && this.routes[url][method]) {
      res.statusCode = 200;
      res.setHeader(
        'Content-Type', 
        `text/plain; charset=${this.routeArgs.encoding ? this.routeArgs.encoding : 'UTF-8'}`
        );

      res.send = function (data) {
        res.end(data);
      };

      if(this.loggerStatus) {
        console.log(
          req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          req.url,
          this.routeArgs
        );
      }

      this.routes[url][method](req, res);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      res.end('Request Not Found // '+req.method);
    }
  }

  start(port, hostname) {
    this.server.listen(port, hostname ? hostname : '127.0.0.1');
    
    return {
      logger: () => {
        this.loggerStatus = true;
        return this;
      }
    };
  }

  go(url, args, handler) {
    if (!this.routes[url]) {
      this.routes[url] = {};
    }

    if(!args.method && !args.handler) {

      this.routes[url][args] = handler;

    } else {

      this.routes[url][args.method] = args.handler;
      
      this.routeArgs = args;

    }
  }
}

module.exports = VWS;
