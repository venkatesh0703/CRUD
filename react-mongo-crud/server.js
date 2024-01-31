// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/react_mongo_crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({
    sno: String,
    name: String,
    description: String,
    startdate: String,
    deliverydate: String,
    type: String,
    client: String,
    orderno: String,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', async (req, res) => {
    const { sno,name, description,startdate,deliverydate,type,client,orderno } = req.body;

    const newItem = new Item({ sno,name, description,startdate,deliverydate,type,client,orderno });

    await newItem.save();

    res.json(newItem);
});

app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { sno,name, description,startdate,deliverydate,type,client,orderno } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(id, { sno,name, description,startdate,deliverydate,type,client,orderno }, { new: true });

    res.json(updatedItem);
});

app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;

    await Item.findByIdAndDelete(id);

    res.json({ message: 'Item deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
