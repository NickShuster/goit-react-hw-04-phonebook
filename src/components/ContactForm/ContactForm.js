import React, { useState } from 'react';

const ContactForm = ({ onAddContact }) => {
   const [name, setName] = useState('');
    const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
           <span className="label-text">Name:</span>
          <input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
                onChange={handleNameChange}
            className="contact-input"
          />
        </label>
      </div>
      <div>
        <label>
             <span className="label-text">Phone Number:</span>
          <input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
              value={number}
            onChange={handleNumberChange}
              className="contact-input"
          />
        </label>
        </div>
      <button type="submit" className="add-button">Add Contact</button>
    </form>
  );
};

export default ContactForm;