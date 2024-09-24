const express = require("express");
const events = express.Router();
const {
    getAllEvents,
    newEvent,
    deleteEvent,
    updateEvent, getEventByID,
} = require("./eventControllers");

const {authenticateToken, isAdmin} = require("../../authServer/authServerMiddleware");



/**
 * @route GET /api/events
 * @description Get all event list
 * @access Public
 */
events.get('/', getAllEvents);

/**
 * @route GET /api/events
 * @description Get event info
 * @access Public
 */
events.get('/:id', getEventByID);

/**
 * @route POST /api/events/newEvent
 * @description Get all event list
 * @access Public
 */
events.post('/newEvent', authenticateToken, isAdmin, newEvent);

/**
 * @route PUT /api/events/:id
 * @description Updates event
 * @access Public
 */
events.put('/:id', authenticateToken, isAdmin, updateEvent);

/**
 * @route DELETE /api/events/:id
 * @description Delete event
 * @access Public
 */
events.delete('/:id', authenticateToken, isAdmin, deleteEvent);


module.exports = events;