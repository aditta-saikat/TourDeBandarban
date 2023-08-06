const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require("fs");
const { tourist, guide , jhoom, menu , restaurant} = require('./mongodb');
const { equal } = require('assert');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Image storage section
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // Adjust the file size limit as needed (here it's set to 20MB)
  },
});

//Landing Page
app.get('/', (req, res) => {
  res.render('TourDeBandarban');
});

app.get('/TourDeBandarban', (req, res) => {
  res.render('TourDeBandarban');
});


// Tourist 
app.route('/signin')
.get((req, res) => {
  res.render('signin');
})

.post(async (req, res) => {
  try {
    const check = await tourist.findOne({ email: req.body.email });

    if (check.password === req.body.password) {
      res.render('choose');
    } else {
      res.send('Wrong password!');
    }
  } catch {
    res.send('Wrong details!');
  }
});


app.route('/signup')
.get((req, res) => {
  res.render('signup');
})

.post(async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  };

  await tourist.insertMany([data]);

  res.render('choose');
});

//Guide

app.route('/guideSignup')
.get((req, res) => {
  res.render('guideSignup');
})

.post(async (req, res) => {
  const data = {
    nid: req.body.nid,
    password: req.body.password
  };

  await guide.insertMany([data]);

  res.render('guideSignin');
});


app.route('/guideSignin')
.get((req, res) => {
  res.render('guideSignin');
})

.post(async (req, res) => {
  try {
    const check = await guide.findOne({ nid: req.body.nid });

    if (check.password === req.body.password) {
      try {
        const docs = await guide.findOne({nid: check.nid});
        res.render('guideRegister', {
          data: docs
        });
      } catch (err) {
        console.log('Failed to retrieve the information: ' + err);
        res.status(500).send('Failed to retrieve the information.');
      }
    } else {
      res.send('Wrong password!');
    }
  } catch {
    res.send('Wrong details!');
  }
});


app.route('/guideRegister')
  .get((req, res) => {
    res.render('guideRegister');
  })
  .post(upload.single('myImage'), async (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    
    try {
      const data = {
        nid: req.body.nid,
        name: req.body.name,
        password: req.body.password,
        location: req.body.location,
        experience: req.body.experience,
        phone: req.body.phone,
        avail: req.body.avail,
        image: {
          contentType:req.file.mimetype,
          image:new Buffer(encode_img,'base64')
        }
        
      };
      

      await guide.updateOne({nid: req.body.nid} , data);
      

      console.log("Guide data saved to the database.");
      res.status(200).send("Guide registered successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to register the guide.");
    }
  });


//JhoomGhar

app.route('/jhoomSignup')
.get((req, res) => {
  res.render('jhoomSignup');
})

.post(async (req, res) => {
  const data = {
    nid: req.body.nid,
    password: req.body.password
  };

  await jhoom.insertMany([data]);

  res.render('jhoomSignin');
});


app.route('/jhoomSignin')
.get((req, res) => {
  res.render('jhoomSignin');
})

.post(async (req, res) => {
  try {
    const check = await jhoom.findOne({ nid: req.body.nid });

    if (check.password === req.body.password) {
      try {
        const docs = await jhoom.findOne({nid: check.nid});
        res.render('jhoomRegister', {
          data: docs
        });
      } catch (err) {
        console.log('Failed to retrieve the information: ' + err);
        res.status(500).send('Failed to retrieve the information.');
      }
    } else {
      res.send('Wrong password!');
    }
  } catch {
    res.send('Wrong details!');
  }
});





app.route('/jhoomRegister')
  .get((req, res) => {
    res.render('jhoomRegister');
  })
  .post(upload.single('myImage'), async (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    
    try {
      const data = {
        nid: req.body.nid,
        name: req.body.name,
        password: req.body.password,
        location: req.body.location,
        capacity: req.body.capacity,
        room: req.body.room,
        phone: req.body.phone,
        image: {
          contentType:req.file.mimetype,
          image:new Buffer(encode_img,'base64')
        }
      };
      

      await jhoom.updateOne({nid: req.body.nid} , data);

      console.log("Jhoomghar data saved to the database.");
      res.status(200).send("Jhoomghar registered successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to register the Jhoomghar Manger.");
    }
  });


//Restaurant

app.route('/restaurantSignup')
.get((req, res) => {
  res.render('restaurantSignup');
})

.post(async (req, res) => {
  const data = {
    nid: req.body.nid,
    password: req.body.password
  };

  const data1 = {
    nid: req.body.nid
  };

  await restaurant.insertMany([data]);
  await menu.insertMany([data1]);

  res.render('restaurantSignin');
});


app.route('/restaurantSignin')
.get((req, res) => {
  res.render('restaurantSignin');
})

.post(async (req, res) => {
  try {
    const check = await restaurant.findOne({ nid: req.body.nid });

    if (check.password === req.body.password) {
      try {
        const docs = await restaurant.findOne({nid: check.nid});
        res.render('restaurantRegister', {
          data: docs
        });
      } catch (err) {
        console.log('Failed to retrieve the information: ' + err);
        res.status(500).send('Failed to retrieve the information.');
      }
    } else {
      res.send('Wrong password!');
    }
  } catch {
    res.send('Wrong details!');
  }
});





app.route('/restaurantRegister')
  .get((req, res) => {
    res.render('restaurantRegister');
  })
  .post(upload.single('myImage'), async (req, res) => {
    
      var img = fs.readFileSync(req.file.path);
      var encode_img = img.toString('base64');
      try {
        const data = {
          nid: req.body.nid,
          ownername: req.body.ownername,
          rname: req.body.rname,
          password: req.body.password,
          location: req.body.location,
          phone: req.body.phone,
          image: {
            contentType:req.file.mimetype,
            image:new Buffer(encode_img,'base64')
          }
        };
     
        await restaurant.updateOne({nid: req.body.nid} , data);
  
        console.log("Restaurant data saved to the database.");
        res.status(200).send("Restaurant registered successfully!");
      } catch (err) {
        console.log(err);
        res.status(500).send("Failed to register the Restaurant Manager.");
      }
    
  });

//Choose destination
app.route('/choose')
.get(async function(req , res, next){
  res.render('choose');
})
.post(async function(req, res, next) {

  try {
    const docs = await guide.find({location: req.body.destination});
    const docs1 = await jhoom.find({location: req.body.destination});
    const docs2 = await restaurant.find({location: req.body.destination});
    
    res.render('tourist' , {
      data: docs,
      data1: docs1,
      data2: docs2
    });
  } catch (err) {
    console.log('Failed to retrieve the information: ' + err);
    res.status(500).send('Failed to retrieve the information.');
  }

});

// Menu Update

app.route('/menu')
  .get(async function(req, res, next) {
    const restaurantName = req.query.rname;
    
    try {
      const docs = await menu.find({rname: restaurantName});
      res.render('menu',{
        data: docs,
        data2: { rname: restaurantName },
      });
    } catch (err) {
      console.log('Failed to retrieve the information: ' + err);
      res.status(500).send('Failed to retrieve the information.');
    }
  })
  .post(upload.single('myImage'), async (req, res) => {
    try {
      const img = fs.readFileSync(req.file.path);
      const encode_img = img.toString('base64');

      const data1 = {
        name: req.body.name,
        rname: req.body.rname,
        price: req.body.price,
        image: {
          contentType:req.file.mimetype,
          image:new Buffer(encode_img,'base64')
        },
      };

      await menu.insertMany([data1]);

      console.log("Menu data saved to the database.");

      res.redirect(`/menu?rname=${encodeURIComponent(req.body.rname)}`);
      
      
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to save menu.");
    }
  });



app.delete('/deleteData', async (req, res) => {
  const nameToDelete = req.query.name; 

  try {
      await menu.deleteOne({ name: nameToDelete });
      res.json({ message: `Successfully deleted ${nameToDelete}` });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to delete data' });
  }
});



//Show Resturant Menu 
app.route('/resMenu')
.get(async function(req, res, next) {
  const restaurantName = req.query.rname;
  
  try {
    const docs = await menu.find({rname: restaurantName});
    res.render('resMenu',{
      data: docs
    });
  } catch (err) {
    console.log('Failed to retrieve the information: ' + err);
    res.status(500).send('Failed to retrieve the information.');
  }
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 8080;
}

app.listen(port, () => {
  console.log('Server has run successfully!');
});
