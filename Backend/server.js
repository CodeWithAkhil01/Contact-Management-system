const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/CONTACT-MANAGEMENT');

// Define contact schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoints
app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.json(contact);
});

app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
