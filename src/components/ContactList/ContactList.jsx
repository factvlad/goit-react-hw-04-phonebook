import PropTypes from "prop-types"
import s from "../Contacts.module.scss"

const ContactList = ({ contacts, removeContacts }) => {
  const contactsList = contacts.map(({ id, name, number }) => (
    <li className={ s.contacts } key={ id }>{ name } : { number }
      <span
        className={ s.btnDel }
        type="button"
        onClick={ () => removeContacts(id) }
        id={ id }
      >
        X
      </span>
    </li>
  ))

  return (
    <>
      <ul className={ s.contacts }>
        { contactsList }
      </ul>
    </>
  );
}


export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContacts: PropTypes.func.isRequired,
};
