//adminController/eventControllers/eventsControllers.js
const Event = require("./eventModels");

//view all events
exports.getAllEvents = async(req, res) => {
    try {
        const events = await Event.getAllEvents();
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json({message:"Failed to get all events", error:err.message});
    }
};

exports.newEvent = async(req, res) => {
    try {
        const eventData = req.body;
        const data = await Event.create(eventData);
        res.json({message: "Event added successfully", data});
    } catch (err) {
        res.status(400).json({message: "Error while adding event", error:err.message});
    }
};


exports.deleteEvent = async (req, res) => {
    const eventID = req.params.id;
    try {
        const result = await Event.delete(eventID);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (err) {
        console.error("Failed to delete event", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const eventID = req.params.id;
        const eventData = req.body;
        const result = await Event.updateEventByID(eventID, eventData);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Event updated successfully" });
        } else {
            res.status(404).json({ message: "Event not found with the provided ID" });
        }
    } catch (err) {
        res.status(400).json({ message: "Failed to update the event", error: err.message });
    }
};



exports.getEventByID = async (req, res) => {
    try {
        const eventID = req.params.id;
        const event = await Event.getByID(eventID);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (e) {
        console.error('Error retrieving event:', e);
        res.status(500).json({ error: 'event_retrieval_fail' });
    }
};
