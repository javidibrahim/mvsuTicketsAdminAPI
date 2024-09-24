const express = require('express');
const router = express.Router();

// Example data store (in-memory)
let events = [
    { id: 1, name: 'Event 1' },
    { id: 2, name: 'Event 2' },
];

// Route to get all events
router.get('/events', (req, res) => {
    res.json({ events });
});

// Route to get a single event by ID
router.get('/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ event });
});

// Route to create a new event
router.post('/events', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Event name is required' });
    }
    const newEvent = { id: events.length + 1, name };
    events.push(newEvent);
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
});

// Route to update an existing event
router.put('/events/:id', (req, res) => {
    const { name } = req.body;
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    if (!name) {
        return res.status(400).json({ message: 'Event name is required' });
    }
    event.name = name;
    res.json({ message: 'Event updated successfully', event });
});

// Route to delete an event
router.delete('/events/:id', (req, res) => {
    events = events.filter(e => e.id !== parseInt(req.params.id));
    res.json({ message: 'Event deleted successfully' });
});

module.exports = router;
