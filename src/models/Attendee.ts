import { Schema, model, Document } from 'mongoose';
import { IAttendee } from '../types';

export interface IAttendeeDocument extends IAttendee, Document {}

const attendeeSchema = new Schema<IAttendeeDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  state: { type: String, required: true },
  hearAboutUs: { type: String, required: true },
  registrationCode: { type: String, required: true, unique: true },
  registeredAt: { type: Date, default: Date.now }
});

export default model<IAttendeeDocument>('Attendee', attendeeSchema);
