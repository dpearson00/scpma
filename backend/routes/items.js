const express = require('express');
const router = express.Router();
const { Item } = require('../models');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        if (!items) {
            return res.status(404).json({ error: 'Items not found.'});
        }
        res.json(items);
    } catch (error) {
        console.error('Error fetching items: ', error);
        res.status(500).json({ error: 'An error occured while fetching items.'});
    }
});

// Create a new item
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required.'});
        }
        const newItem = await Item.create({ name, description });
        if (!newItem) {
            return res.status(404).json({ error: 'Item could not be created.'}); // Fix error code
        }
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding item: ', error);
        res.status(500).json({ error: 'An error occured while adding item.'});
    }
});

// Update an item
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required.'});
        }
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found.'});
        }
        const updatedItem = await item.update({ name, description });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item could not be updated.'}); // Fix error code
        }
        const items = [updatedItem, item];
        res.status(200).json(items);
    } catch (error) {
        console.error('Error updating item: ', error);
        res.status(500).json({ error: 'An error occured while updating item.'});
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found.'});
        }
        const destroyed = await item.destroy();
        if (!destroyed) {
            return res.status(404).json({ error: 'Item could not be deleted.'}); // Fix error code
        }
        res.status(204).send('Item deleted successfully.');
    } catch (error) {
        console.error('Error deleting item: ', error);
        res.status(500).json({ error: 'An error occured while deleting item.'});
    }
});

module.exports = router;