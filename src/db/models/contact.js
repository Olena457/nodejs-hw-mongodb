import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },

    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const ContactCollection = model('Contact', contactSchema);

// import { EMAIL_REGEX } from '../../constants/index.js';

// const contactsSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: false,
//       // match: [EMAIL_GEX, 'Please fill a valid phone number'],
//     },
//     isFavourite: {
//       type: Boolean,
//       required: false,
//       default: false,
//     },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       default: 'personal',
//       required: true,
//     },

//     userId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );
// export const ContactsCollection = model('contacts', contactsSchema);
