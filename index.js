// Basic Server Structure

// 1. Import express
const express = require('express');
const cors = require('cors');
const RecipeInfo = require('./models/RecipeDB');
const path = require('path');

// 2. Initialising express
const app = new express();
app.use(cors());

// Parsing Body Parameter
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));


// 3. Api Creation
app.get('/', (req,res) =>{
    res.send('Congrats!! Server is Running');
});

app.get('/api',(req,res) =>{
    res.json([{"name":"Aswin","place":"wayanad"},{"name":"Amal","place":"kozhikode"}])
});

// create
app.post('/api/create', (req,res) =>{
    
    // console.log(req.body); //server data
    let recipe = new RecipeInfo(req.body); //passing to db
    recipe.save(); //saving to db
    res.send('Data Added');
    }
       
);

//read
app.get('/api/view', async(req,res) =>{
    try{
        let result = await RecipeInfo.find();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error)
    } 
});

// update
app.post('/api/update',async (req,res) =>{
    try{
        let result = await RecipeInfo.findByIdAndUpdate(req.body._id, req.body);
        res.send('Data Updated');
    }
    catch(error){
        res.status(500).send(error)
    } 
});

//delete
app.post('/api/delete',async (req,res) =>{
    try{
        let result = await RecipeInfo.findByIdAndDelete(req.body._id);
        res.send('Data Deleted');
    }
    catch(error){
        res.status(500).send(error)
    }   
});



app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname,'/build/index.html'));
})


// 4. Setting up the port number
app.listen(7000, () =>{
    console.log('Server is running in PORT 7000');
});
