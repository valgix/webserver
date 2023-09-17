# Valgix Web Server
Pre-beta 1.0.x

### Require from modules
```js
const vws = require('vws')
```

### **And enjoy ;)**

#

# Example:
```js
const vws = require('vws');

const app = new vws;

app.start(3000, 'localhost', () => {
    console.log(`Server has been started on ValgixWebServer ;)`)
}).logger();

app.go('/', {
    method: 'GET',
    handler: (req, res) => {
        res.send("Hello");
    }
})

// Fast handler method
app.go('/justpage', 'GET', (req, res) => { res.send('Hello, im Valgix ;)') })
```

#Middleware
```js
const vws = require('vws');

const app = new vws;

app.start(3000, 'localhost', () => {
    console.log(`Server has been started on ValgixWebServer ;)`)
}).logger();

app.use((req, res, done) => {
    if(req.url == '/anypage') {
        return done();
    }
    
    res.send('Access denied');
})

app.go('/', {
    method: 'GET',
    handler: (req, res) => {
        res.send("Hello");
    }
})

app.go('/anypage', {
    method: 'GET',
    handler: (req, res) => {
        res.send("This is allowed page ;)");
    }
})
```
