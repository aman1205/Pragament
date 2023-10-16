import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema({
  query: String,
  source_language: String,
  destination_language: String,
  translation: String,
});

const Translation = mongoose.model('Translation', translationSchema);

export default Translation;
