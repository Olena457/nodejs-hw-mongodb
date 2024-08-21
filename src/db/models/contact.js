import { model, Schema } from 'mongoose';
import { EMAIL_REGEX, PHONE_REGEX } from '../../constants/index.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      match: [EMAIL_REGEX, 'Please fill a valid phone number'],
      required: true,
    },
    email: {
      type: String,
      match: [PHONE_REGEX, 'Please fill a valid email address'],
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },

    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const ContactsCollection = model('contacts', contactsSchema);
