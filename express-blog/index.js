const express = require('express');
const app = express();
var exphbs = require('express3-handlebars');
var hbs = exphbs.create({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
    extname: '.html'
});
app.engine('html', hbs.engine);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('home');
})
var arr = [1,2,3,4]
app.get('/about', (req, res) => {
    var random = arr[Math.floor(Math.random() * arr.length)];
    console.log(random)
    res.render('about',{data:random});
})

app.use((req, res) => {
    res.status(404);
    res.render('404');
})

app.use((err, req, res, next) => {
    console.err(err.stack);
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), () => {
    console.log(`Express started on htt://localhost:${app.get('port')};press Ctrl-C to terminate.`);
})