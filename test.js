const vws = require('./index.js');

const app = new vws();

app.start(3000, () => {
    console.log('Server has been started')
}).logger();

app.go('/hello', {
    method: 'GET',
    encoding: 'UTF-8',
    handler: (req, res) => {
        res.send('Hello')
    }
});
