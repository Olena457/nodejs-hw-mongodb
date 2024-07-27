import { model, Schema } from 'mongoose';

const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phomeNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [emailRegex, 'Please enter a valid email address'],
      requered: false,
    },
    isFavourite: {
      type: Boolean,
      requered: false,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      requered: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const ContactsCollection = model('contacts', contactsSchema);
