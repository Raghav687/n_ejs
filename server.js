const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 
const database = require('./config/database');
const Class = require('./model/classSchema');
const req = require('express/lib/request');


const app = express();
mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

dotenv.config();
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 



app.listen(process.env.PORT || 8000,(err)=>{
    if(err) console.log(err)
    else console.log(`Running on ${process.env.PORT}`)
    console.log(mongoose.connection.readyState);
})

app.get('/api/class',async(req,res) => {
    try {
        const student = await Class.find();
        console.log(student);
        res.send(student)
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
})

// using route paramter
app.get('/api/class/:roll_no',async(req,res) =>{
    try {
        const id = req.params.roll_no;
        const student = await Class.findOne({roll_no:id});
        if(student)
           res.json(student);
        else res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
})

// using query params
app.get('/api/class/',async(req,res) => {
    try {
        const id = req.query.roll_no;
        const student = await Class.findOne({roll_no:id});
        if(student)
           res.json(student);
        else res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
})
app.post('/api/class',async(req,res) => {
    try {
        const {name,roll_no,classes} = req.body;
        console.log(req.body);
        const newStudent = new Class({name,roll_no,classes});
        const SavedStudent = await newStudent.save();
        res.json(SavedStudent);
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
})

// Update using PUT Request
app.put('/api/class/:roll_no',async(req,res) => {
    try {
        const id = req.params.roll_no;
        const updatedStudentRequest = req.body;
        const updatedStudent = await Class.findOneAndUpdate(
            {roll_no : id},
            updatedStudentRequest,
            {new : true}
        )
        if (updatedStudent)
            res.json(updatedStudent);
        else 
            res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
})

app.delete('/api/class/:roll_no',async(req,res) => {
    try {
        const id = req.params.roll_no;
        const deletedStudent = await Class.findOneAndDelete({roll_no:id});
        if(deletedStudent)
           res.json({ message: 'User deleted successfully' });
        else 
        res.json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
})