import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getting all the notes: ", error);
    res.status(500).json({'message': 'Internal server error'});
  }
}

export async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({"message":"Note not found"});
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in get note by id:", error);
    res.status(500).json({"message":"Error in server getting note"});
  }
}

export async function createNote(req, res) {
  try {
    const {title, content} = req.body;
    const newNote = new Note({title, content});

    const saveNote = await newNote.save();

    res.status(201).json(saveNote);
  } catch (error) {
    console.log("Error in the note adding: ",error);
    res.status(500).json({'message':'cannot able to add note'});
  }
}

export async function updateNote(req, res) {
  try {
    const {title, content} = req.body;
    const updatedNote =  await Note.findByIdAndUpdate(
      req.params.id, 
      {title, content},
      {new: true}
    );

    if(!updatedNote) return res.status(404).json({"message": "Note not found"});
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote:", error);
    res.status(500).json({'message':"Error in server in update note"});
  }
}

export async function deleteNote(req, res) {
  try {
    const isDeleted = await Note.findByIdAndDelete(req.params.id);
    if(!isDeleted) return res.status(404).json({"message":"Id not found for delete"});
    res.status(200).json({"message":"Note deleted sucessfully"});
  } catch (error) {
    console.log("Error in delete note:", error);
    res.status(500).json({"message":"Server error in delete note"});
  }
}
