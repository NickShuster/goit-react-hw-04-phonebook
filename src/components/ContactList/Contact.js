import React, { useContext } from 'react';

const ContactContext = React.createContext();

const Contact = ({ id, name, number }) => {
  const onDeleteContact = useContext(ContactContext);

  return (
    <li>
      {name}: {number}
      <button onClick={() => onDeleteContact(id)}>Delete</button>
    </li>
  );
};

export default Contact;