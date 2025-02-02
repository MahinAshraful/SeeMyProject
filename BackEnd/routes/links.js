import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/initialize-links', async (req, res) => {
  try {
    console.log('Starting initialize-links route');
    
    // Check MongoDB connection
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    // Get users
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log('Users found:', users.length);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found in database' });
    }

    // Check if links collection already exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Existing collections:', collections.map(c => c.name));

    const linkDocuments = users.map(user => ({
      email: user.email,
      links: []
    }));
    console.log('Link documents to insert:', linkDocuments);
    
    const result = await mongoose.connection.db.collection('links').insertMany(linkDocuments);
    console.log('Insert result:', result);

    res.json({ 
      success: true,
      usersFound: users.length,
      documentsInserted: result.insertedCount
    });
  } catch (error) {
    console.error('Error in initialize-links:', error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

export { router as default };