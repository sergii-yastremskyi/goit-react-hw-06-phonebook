import Contact from '../contact';
import PropTypes from 'prop-types';
import css from './contactList.module.css';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../redux/selectors';

const ContactsList = () => {
  const { contacts } = useSelector(getContacts);
  const filter = useSelector(getFilter)
  const getVisibleContacts = () => {
   
    const normalizedFilter = filter.toLowerCase();

   return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const visibleContacts = getVisibleContacts();


  return (
    <ul className={css.contactList}>
      {visibleContacts.map(contact => (
        <Contact key={contact.id}  data={contact} />
      ))}
    </ul>
  );
};

// ContactsList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       phone: PropTypes.string,
//     }),
//   ),
//   onDelete: PropTypes.func,
// };

export default ContactsList;
