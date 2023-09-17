const express=require('express');
const mongoose=require('mongoose');
const usermodel = require('./models/user');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

}
)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await usermodel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/add",async(req,res)=>{
    let newuser = usermodel({
        name:"nour",
        age:21,
        phonenumber:25447600,
}); var response = newuser.save();

    res.json(response);
 
})
app.put('/users', async (req, res) => {
     const  id  ="6506cd6e16c7bf1a8173125d";
     const { name, age,phonenumber } ={
      name :"jjjj",
      age :33,
      phonenumber: 4444444
     };
    
  
    try {
      const updatedUser = await usermodel.findByIdAndUpdate(
        id,
        { name, age,phonenumber },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
app.delete('/users/:id', async (req, res) => {
console.log(req.params);
    const id  = req.params.id;

  
    try {
      
      const deletedUser = await usermodel.findByIdAndRemove(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted' });
    } catch (err) {
      
      res.status(500).json({ message: err.message });
    }
  });
  
 
  
  
  
  
  
