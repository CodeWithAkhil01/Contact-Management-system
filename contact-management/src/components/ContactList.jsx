import React from 'react';

const ContactList = ({ contacts, deleteContact, editContact }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact._id}>
          <div>
            {contact.name} - {contact.email} - {contact.phone}
          </div>
          <div>
            <button className="edit-button" onClick={() => editContact(contact)}>Edit</button>
            <button className="delete-button" onClick={() => deleteContact(contact._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
