import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: localStorage.getItem('filter') || '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const savedFilter = localStorage.getItem('filter');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }

    if (savedFilter) {
      this.setState({ filter: savedFilter });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    localStorage.setItem('filter', this.state.filter);
  }

  handleNameChange = event => {
    const newName = event.target.value;
    if (/^[a-zA-Zа-яА-Я]+([ '-][a-zA-Zа-яА-Я ]*)*$/.test(newName) || newName === '') {
      this.setState({ name: newName });
    }
  };

  handleNumberChange = event => {
    const newNumber = event.target.value;
    if (/^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(newNumber) || newNumber === '') {
      this.setState({ number: newNumber });
    }
  };

  handleAddContact = event => {
    event.preventDefault();
    const { name, number, contacts } = this.state;
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

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleFilterChange = newFilterValue => {
    this.setState({ filter: newFilterValue });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, name, number } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
          onAddContact={this.handleAddContact}
        />
        <Filter filterValue={filter} onFilterChange={this.handleFilterChange} />
        <h2>Contacts</h2>
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;