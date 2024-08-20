import React from 'react';

const ContactList = ({ contacts, deleteContact, editContact }) => {
  return (
    <div className="container">
      <h1>Contact List</h1>
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <div>
                <strong>{contact.name}</strong> <br />
                {contact.email} <br />
                {contact.phone}
              </div>
              <div>
                <button className="edit-button" onClick={() => editContact(index)}>Edit</button>
                <button className="delete-button" onClick={() => deleteContact(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
