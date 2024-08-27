import { model, Schema } from 'mongoose';
import { EMAIL_REGEX, PHONE_REGEX } from '../../constants/index.js';

const contactSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      match: [PHONE_REGEX, 'Please fill a valid phone number'],
      required: true,
    },
    email: {
      type: String,
      match: [EMAIL_REGEX, 'Please fill a valid email address'],
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
const ContactCollection = model('contacts', contactSchema);
export default ContactCollection;
