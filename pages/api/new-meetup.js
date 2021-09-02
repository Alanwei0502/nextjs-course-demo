// API route
// POST /api/new-meetup

import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://Alan:soyalan0502@cluster0.smp3m.mongodb.net/meetups?retryWrites=true&w=majority'); // connect database
    const db = client.db();

    const meetupsCollection = db.collection('meetupsCollection');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close(); // close database connection

    res.status(201).json({ message: 'Meetup inserted!' }); // status method which you can call on response to set a HTTP status code of the response which will be returned. You can then chain a JSON call here to prepare the JSON data that will be added to the outgoing response.
  }
}

export default handler;