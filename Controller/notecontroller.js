import { client } from "../db.js";
import {ObjectId} from 'bson'
export async function getNotes() {
  return client.db("notes").collection("notes").find().toArray();
}

export async function addNotes(data) {
  
  return client.db("notes").collection("notes").insertOne(data);
}

export async function getNotesbyId(id) {
  return client
    .db("notes")
    .collection("notes")
    .findOne({ _id: new ObjectId(id) });
}

export async function getNotesbyName(name) {
  return client.db("notes").collection("notes").find({ title: name }).toArray();
}




export async function DeleteNotesbyId(id) {
  const note = await client
    .db("notes")
    .collection("notes")
    .findOne({ _id: new ObjectId(id) });

  if (note) {
    await client.db("deletedNotes").collection("deletedNotes").insertOne(note);
    return client.db("notes").collection("notes").deleteOne({ _id: new ObjectId(id) });
  }

  return { deletedCount: 0 };
}


export async function getDeletedNotes() {
  return client.db("deletedNotes").collection("deletedNotes").find().toArray();
}

export async function togglePinStatus(id) {
  const note = await client.db("notes").collection("notes").findOne({ _id: new ObjectId(id) });

  if (note) {
    const updatedNote = await client.db("notes").collection("notes").updateOne(
      { _id: new ObjectId(id) },
      { $set: { pinned: !note.pinned } }
    );
    return updatedNote;
  }

  throw new Error('Note not found');
}