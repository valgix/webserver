# Valgix Web Server
Pre-beta 1.0.x

# Installing

### Download files

### create vws folder in node_modules folder and move files to the vws folder

### Require from modules
```
const vws = require('vws')
```

### **And enjoy ;)**

# Example:
```
const vws = require('vws');

const app = new vws();

app.start(3000, () => {
    console.log('Server has been started on 3000 port')
}).logger(); // If you want logger

app.go('/hello', {
    method: 'GET',
    encoding: 'UTF-8', // Option, if you want set encoding
    handler: (req, res) => {
        res.send('Hello')
    }
});
```
