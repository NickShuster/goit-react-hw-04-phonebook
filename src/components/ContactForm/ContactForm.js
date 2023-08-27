import React from 'react';

const ContactForm = ({ name, number, onNameChange, onNumberChange, onAddContact }) => {
  return (
    <form onSubmit={onAddContact}>
      <div>
        <label>
          <span className="label-text">Name:</span>
          <input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onNameChange}
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
            onChange={onNumberChange}
            className="contact-input"
          />
        </label>
      </div>
      <button type="submit" className="add-button">Add Contact</button>
    </form>
  );
};

export default ContactForm;