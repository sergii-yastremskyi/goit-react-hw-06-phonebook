
import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../redux/selectors';
import { addContact } from '../redux/contactsSlice';




export default function Form() {
  const dispatch = useDispatch();
   const {contacts} = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const formSubmitHandler = (name, number) => {
  
    const isExist = contacts.some(contact => {
      return contact.name === name
    })
    if (!isExist) { 
      dispatch(addContact(name, number));
    } else {alert(`${name} already in contacts`);
    }};
  const handleChange = e => { 
    const { name,value } = e.currentTarget;
    switch (name) { 
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
   const handleSubmit = e => {
    e.preventDefault();

    formSubmitHandler(name,number);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
   
  };
  const nameId = nanoid();
  const phoneId = nanoid();
  
  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.formContainer}>
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className={css.formContainer}>
          <label htmlFor={phoneId}>Phone</label>
          <input
            id={phoneId}
            onChange={handleChange}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    </div>
  )
}





