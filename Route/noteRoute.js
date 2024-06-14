import express from 'express'
import { DeleteNotesbyId, addNotes, getDeletedNotes, getNotes, getNotesbyName, togglePinStatus } from '../Controller/notecontroller.js';
const router = express.Router();

router.post("/create-notes", async (req, res) => {
    const firstNote = req.body;
    firstNote.createdAt = new Date();
    console.log(firstNote);
    try {
      if (!firstNote) {
        return res.status(400).json({ message: "no data available" });
      }
  
      const { title, tag, description } = firstNote;
      if (!title ||!tag || !description) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
  
      const result = await addNotes({ ...firstNote });
      console.log(result);
      if (!result.acknowledged) {
        return res.status(400).json({ message: "error occured" });
      }
  
      res.status(200).json({ data: { ...firstNote }, status: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error occured" });
    }
  });
  router.get("/all-notes", async (req, res) => {
    try {
      const allNotes = await getNotes(req);
    
      if (!allNotes) {
        return res.status(400).json({ message: "no data availabe" });
      }
      res.status(200).json({ data: allNotes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  });
  
 
  
  router.get("/notes-name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const notes = await getNotesbyName(name);
      console.log(notes);
      if (!notes) {
        return res.status(400).json({ message: "no data availabe" });
      }
      res.status(200).json({ data: notes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  });
  
 
  router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Wrong request" });
      }
  
      const result = await DeleteNotesbyId(id);
      console.log(result);
      if (!result || result.deletedCount === 0) {
        return res.status(400).json({ message: "error occured" });
      }
      return res.status(201).json({ status: result, message: "note deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  });

  router.get("/deleted-notes", async (req, res) => {
    try {
      const allNotes = await getDeletedNotes(req);
    
      if (!allNotes) {
        return res.status(400).json({ message: "no data available" });
      }
      res.status(200).json( { data: allNotes } );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  });

  router.put("/pin/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await togglePinStatus(id);
  
      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: "Error toggling pin status" });
      }
  
      res.status(200).json({ message: "Pin status toggled successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });


export const note_router = router;