import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    let contactId = nanoid();
    const names = contacts.map(contact => contact.name);

    if (!names.find(el => el === name)) {
      setContacts(prevState => [
        ...prevState,
        { id: contactId, name: name, number: number },
      ]);
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  const deleteContact = id => {
    const allContacts = [...contacts];
    const index = allContacts.findIndex(person => person.id === id);
    allContacts.splice(index, 1);
    setContacts(allContacts);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storageContacts) {
      setContacts(storageContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const list = contacts.filter(
    contact =>
      filter === '' || contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{marginLeft: '50px',}}>
      <h1>PhoneBook</h1>
      <ContactForm addContact={addContact} deleteContact={deleteContact} />
      <h2>Contacts</h2>
      <Filter change={handleFilter} value={filter} />
      <ContactList list={list} deleteContact={deleteContact} />
    </div>
  );
};

export default App;