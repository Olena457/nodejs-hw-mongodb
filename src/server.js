import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', 8081));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    console.log('contacts:', contacts);
    res.status(200).json({
      status: 200,
      message: 'Contacts successfully found!',
      data: contacts,
    });
  });
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        massage: ` Not found contact with id:${contactId}`,
      });
    }
    res.status(200).json({
      status: 200,
      massage: ` Succssesfully  found contact with id:${contactId}`,
      data: contact,
    });
  });

  app.use('*', (req, res, _next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, _next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
