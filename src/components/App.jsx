import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState(localStorage.getItem('filter') || '');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const savedFilter = localStorage.getItem('filter');

    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }

    if (savedFilter) {
      setFilter(savedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorage.setItem('filter', filter);
  }, [contacts, filter]);

  const handleNameChange = event => {
    const newName = event.target.value;
    if (/^[a-zA-Zа-яА-Я]+([ '-][a-zA-Zа-яА-Я ]*)*$/.test(newName) || newName === '') {
      setName(newName);
    }
  };

  const handleNumberChange = event => {
    const newNumber = event.target.value;
    if (/^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(newNumber) || newNumber === '') {
      setNumber(newNumber);
    }
  };

  const handleAddContact = event => {
    event.preventDefault();
    if (name.trim() === '' || number.trim() === '') return;

    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      alert(`Contact with name "${name}" already exists.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleFilterChange = newFilterValue => {
    setFilter(newFilterValue);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddContact={handleAddContact}
      />
      <Filter filterValue={filter} onFilterChange={handleFilterChange} />
      <h2>Contacts</h2>
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;