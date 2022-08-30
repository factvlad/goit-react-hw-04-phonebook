import PropTypes from "prop-types"
import s from "../Contacts.module.scss"
import { nanoid } from "nanoid"
import React, { Component } from 'react'


class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, number } = this.state;
    this.props.onSubmit({
      name,
      number,
      id: nanoid(),
    });
    this.reset()
  }

  reset() {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { handleSubmit, handleChange } = this
    const { name, number } = this.state
    return (
      <>
        <form
          className={ s.form }
          onSubmit={ handleSubmit }
        >
          <input
            value={ name }
            onChange={ handleChange }
            type="text"
            name="name"
            placeholder="Alex Delarge"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <input
            value={ number }
            onChange={ handleChange }
            placeholder="459-12-56"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit">Add Contact</button>
        </form>
      </>
    );
  }
}

export default ContactForm;


ContactForm.propTypes = {
  onSubmit: PropTypes.func
}
