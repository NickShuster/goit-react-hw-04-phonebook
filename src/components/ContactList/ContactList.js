import React from 'react';
import Contact from './Contact'; 

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(contact => (
      <Contact key={contact.id} {...contact} onDeleteContact={() => onDeleteContact(contact.id)} />
    ))}
  </ul>
);

export default ContactList;