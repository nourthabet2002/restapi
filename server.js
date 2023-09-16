const express=require('express');
const mongoose=require('mongoose');
const usermodel = require('./models/user');
const app = express();
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("connected to db");

}
)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const User = mongoose.model('User', userSchema);
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
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
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age,phonenumber } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
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
    const { id } = req.params;
  
    try {
      
      const deletedUser = await User.findByIdAndRemove(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted' });
    } catch (err) {
      
      res.status(500).json({ message: err.message });
    }
  });
  
 
  
  
  
  
  
