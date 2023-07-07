// importing express liabrary
const express = require('express');
// importing path
const path = require('path')

// declaring a port 

const port = 10000;

// creating a express app by calling express
const app = express();
const Contact_list =[
    {
        name:"ravi",
        phone:9874563210
    },
    {
        name:"mane",
        phone:123456987
    }
]



// setting up template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


// setting up middleware
app.use(express.urlencoded());
app.use(express.static('assets'));



// creating route
app.get('/delete-contact/:phone',function(req,res){
    let phone = req.params.phone;
    let contact_index = Contact_list.findIndex(contact=>contact.phone==phone); 
    if (contact_index != -1){
        Contact_list.splice(contact_index,1);
    }
    res.redirect('/')
    
});


app.get('/', function(req,res){


    return res.render('home',{
        title:"ContactList",
        contactlist:Contact_list

    });

    // res.send(home)        // sending data as a response.
});

app.post('/create-contact',function(req,res){
    Contact_list.push(req.body);
    return  res.redirect('/') ;
});









app.listen(port,function(err){
    if(err){
        console.log("error while creating server",err)
        return
    }
    console.log("server created successfully on port :",port)

});