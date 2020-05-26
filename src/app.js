const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//defined paths for expresss config
const publicDirectoryPath = path.join(__dirname , '../public');
const viewPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname,'../template/partials')
const port  = process.env.POST || 3000

//setup handelbars and views location
app.set('view engine' , 'hbs');
app.set('views' , viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath));



app.get('',(req,res) =>
{
    res.render('index',
    {
        title:'Population Count',
        name:'Ashish sharma',
        footer:'Index page'
    });
}
)



app.get('/about',(req,res) =>
{
    res.render('about',
    {
        title:'About ',
        name:'Ashish sharma',
        footer:'about page'
    });
}
)

app.get('/help',(req,res) =>
{
    res.render('help',{
        
        title:'Help ',
        name:'Ashish sharma',
        helpText: "This is some helpful text",
        footer:'help page'
    });
}
)



app.get('/weather', (req,res) =>
{
    if(!req.query.address)
    {
       return res.send('Please enter an address');

    }

    geocode(req.query.address,(error,data) =>
    {
        
        forecast(data.latitude,data.longitude,(error,forecastdata) =>
        {
            
            res.send(
                {
                    forecast:forecastdata.POPULATION,
                    location:req.query.address,
                    address:data.location
                   
                }
            )
        }
        )
        
    })


    
}
)

app.get('/products',(req,res) =>
{

    if(!req.query.search)
    {
       return res.send(
            {
                error:"You must provide a search"
            }
        )
    }
    console.log(req.query.search);
    res.send(
        {
            products: []
        }
    )

})

app.get('/help/*' ,(req,res) =>
{
    res.render('error',
    {
        help:'Help page not found'
    });
})


app.get('*' ,(req,res) =>
{
    res.render('error',
    {
        help:'Page not found'
    });
})

app.listen(port , () =>
{
    console.log('server is set on port '+port);
})