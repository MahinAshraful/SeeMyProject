// models/link.js
import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  links: [{
    type: mongoose.Schema.Types.Mixed,
    default: []
  }]
});

export default mongoose.model('Link', linkSchema);