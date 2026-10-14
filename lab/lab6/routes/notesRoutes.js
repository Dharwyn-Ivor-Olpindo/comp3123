const express = require('express');
const router = express.Router();
const NotesModel = require('../models/NotesModel.js');

router.post('/notes', async (request, response) => {
    if (!request.body.content) {
        return response.status(400).send({
            message: "Note content in the POST body cannot be left empty"
        })
    }

    try {
        const note = new NotesModel({
            noteTitle: request.body.content.noteTitle,
            noteDescription: request.body.content.noteDescription,
            priority: request.body.content.priority,
            dateAdded: request.body.content.dateAdded,
            dateUpdated: request.body.content.dateUpdated
        })

        const savedNote = await note.save()
        response.status(201).send(savedNote)
    } catch (error) {
        response.status(500).send({
            message: error.message || "Some error occured while creating the note"
        })
    }
})

router.get('/notes', async (request, response) => {
    try {
        const notes = await NotesModel.find();
        response.status(200).send(notes);
    } catch (error) {
        response.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        });
    }
});

// 3. RETRIEVE a single note with noteId (GET)
router.get('/notes/:noteId', async (request, response) => {
    try {
        const note = await NotesModel.findById(request.params.noteId);
        if (!note) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        response.status(200).send(note);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        return response.status(500).send({
            message: "Error retrieving note with id " + request.params.noteId
        });
    }
});

// 4. UPDATE a note with noteId (PUT)
router.put('/notes/:noteId', async (request, response) => {
    if (!request.body.content) {
        return response.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    try {
        const note = await NotesModel.findByIdAndUpdate(
            request.params.noteId,
            {
                noteTitle: request.body.content.noteTitle,
                noteDescription: request.body.content.noteDescription,
                priority: request.body.content.priority,
                dateAdded: request.body.content.dateAdded,
                dateUpdated: request.body.content.dateUpdated
            },
            { new: true }
        );

        if (!note) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        response.status(200).send(note);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        return response.status(500).send({
            message: "Error updating note with id " + request.params.noteId
        });
    }
});

// 5. DELETE a note with noteId (DELETE)
router.delete('/notes/:noteId', async (request, response) => {
    try {
        const note = await NotesModel.findByIdAndDelete(request.params.noteId);
        
        if (!note) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        response.status(200).send({ message: "Note deleted successfully!" });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        return response.status(500).send({
            message: "Could not delete note with id " + request.params.noteId
        });
    }
});

module.exports = router;
