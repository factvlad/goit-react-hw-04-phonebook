import { Component } from "react";
import Notiflix from 'notiflix';
import { ContactForm, ContactList, Filter } from 'components';
import s from "./Contacts.module.scss"

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts")
    const parsedContacts = JSON.parse(contacts)


    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts
      })
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }

  }

  submitDataForm = (data) => {
    const { contacts } = this.state;
    if (contacts.find(el => el.name === data.name)) {
      Notiflix.Report.warning(
        `Warning`,
        `${data.name} is already in cotacts`,
        'Confirm'
      );
      return;
    }
    Notiflix.Notify.success('You have a new Contact');
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  removeContacts = (id) => {
    Notiflix.Notify.failure('You delete the contact')
    this.setState(({ contacts }) => {
      const newBooks = contacts.filter(item => item.id !== id);
      return {
        contacts: newBooks,
      }
    })
  }

  searchName = (e) => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  showContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(cont => cont.name.toLowerCase().includes(filter));
  };


  render() {
    const { removeContacts, searchName, showContacts, submitDataForm } = this
    const { filter } = this.state;

    return (
      <div className={ s.container }>
        <h2>PhoneBook</h2>
        <ContactForm onSubmit={ submitDataForm } />
        <h2>Contacts</h2>
        <Filter value={ filter } searchName={ searchName } />
        <ContactList
          contacts={ showContacts() }
          removeContacts={ removeContacts } />
      </div>
    );
  }
}


