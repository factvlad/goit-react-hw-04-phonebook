import { useEffect, useState } from "react";
import Notiflix from 'notiflix';
import { ContactForm, ContactList, Filter } from 'components';
import s from "./Contacts.module.scss"

function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    const localParsedCont = JSON.parse(localContacts);
    if (localParsedCont) {
      setContacts(localParsedCont)
    
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitDataForm = data => {
    if (contacts.find(el => el.name === data.name)) {
      Notiflix.Report.warning(
        `Warning`,
        `${data.name} is already in cotacts`,
        'Confirm'
      );
      return;
    }
    Notiflix.Notify.success('You have a new Contact');
    setContacts(prevState => [...prevState, data]);
  };

  const removeContacts = e => {
    const removeArr = contacts.filter(el => el.id !== e.target.id);
    Notiflix.Notify.failure('You delete the contact, Sorry Bro')
    return setContacts(removeArr)
  }

  const searchName = e => {
    setFilter(e.target.value);
  };

  const showContacts = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const renderFilter = showContacts()

  return (
    <div className={ s.container }>
      <h2>PhoneBook</h2>
      <ContactForm onSubmit={ submitDataForm } />
      <h2>Contacts</h2>
      <Filter value={ filter } searchName={ searchName } />
      <ContactList
        contacts={ renderFilter }
        removeContacts={ removeContacts } />
    </div>
  )
}

export default App;


