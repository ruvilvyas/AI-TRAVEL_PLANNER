import mongoose from 'mongoose';

const ItinerarySchema = new mongoose.Schema({
  destination: { type: String, required: true },
  budget: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  interests: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Itinerary || mongoose.model('Itinerary', ItinerarySchema);
