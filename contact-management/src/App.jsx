import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css'

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  const addContact = (contact) => {
    fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
      .then((response) => response.json())
      .then((newContact) => setContacts([...contacts, newContact]));
  };

  const updateContact = (contact) => {
    fetch(`http://localhost:5000/contacts/${contact._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
      .then((response) => response.json())
      .then((updatedContact) => {
        setContacts(
          contacts.map((c) => (c._id === updatedContact._id ? updatedContact : c))
        );
        setEditingContact(null);
      });
  };

  const deleteContact = (id) => {
    fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' })
      .then(() => setContacts(contacts.filter((contact) => contact._id !== id)));
  };

  const editContact = (contact) => {
    setEditingContact(contact);
  };

  return (
    <div className='container'>
      <h1>Contact Management </h1>
      <ContactForm addContact={addContact} updateContact={updateContact} editingContact={editingContact} />
      <ContactList contacts={contacts} deleteContact={deleteContact} editContact={editContact} />
    </div>
  );
};

export default App;
