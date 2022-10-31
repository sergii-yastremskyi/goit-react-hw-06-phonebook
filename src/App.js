

import styles from './components/shared/shared.module.css';
import './App.css';
import { css } from 'styled-components';
import Form from './components/form/';
import ContactsList from './components/contactsList/';
import Filter from './components/filter';
import { useSelector, useDispatch } from 'react-redux';

import { getContacts } from './components/redux/selectors';
import { addContact } from './components/redux/contactsSlice';
import { deleteContact } from './components/redux/contactsSlice';
import { setFilter } from './components/redux/filterSlice';
import { getFilter } from './components/redux/selectors';
export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  console.log(contacts.contacts)
  
  const filter = useSelector(getFilter);
  
  // const [localFilter, setLocalFilter] = useState('');
   
  // useEffect(() => { window.localStorage.setItem('contacts', JSON.stringify(contacts)) }, [contacts]);


  const formSubmitHandler = (name, number) => {
    const isExist = contacts.contacts.some(contact => {
      return contact.name === name
    })
    if (!isExist) { 
      dispatch(addContact(name, number));
    } else {alert(`${name} already in contacts`);
    }};

  const changeFilter = evt => {
  dispatch(setFilter(evt.currentTarget.value));
  
  };
 const getVisibleContacts = () => {
   
    const normalizedFilter = filter.toLowerCase();

   return contacts.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
 const handleDelete = id => {
   dispatch(deleteContact(id));  
  };
   
  
   const visibleContacts = getVisibleContacts();
  return (
    <>
        <div className={(styles.container, styles.border)}>
        <h1>Phonebook</h1>
          <Form onSubmit={formSubmitHandler} />
        </div>
        <div className={styles.container}>
          <h1>Contacts</h1>
          <Filter
            className={css.filter}
            value={filter}
            onChange={changeFilter}
          />
          <ContactsList
            className={styles.contactList}
            onDelete={handleDelete}
             contacts={visibleContacts}
          //  contacts={contacts}
          />
        </div>
      </>
  )
}


// class App extends Component {
//   static defaultProps = {
//     contacts: '',
//     name: '',
//   };

//   static propTypes = {};

//   state = {
//     contacts:[
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ] ,
//     name: '',
//     filter: '',
//   };

//   formSubmitHandler = (name,number) => {   
// console.log('formSubmitHandler', name, number)
//     const isExist = this.state.contacts.some(contact => {
//       return contact.name === name
//     })

//     if (!isExist) { 
//        this.setState(prev => {
//       const newContact = {
//         id: nanoid(),
//         name: name,
//         number: number,
//       }

//       return {
//         contacts: [...prev.contacts, newContact],
//       };
//     });
//     } else {alert(`${name} already in contacts`);
//     }
//   };

  
  
//   componentDidMount() {
//     const { contacts } = this.state;
//     const localContacts = JSON.parse(localStorage.getItem('contacts'))
//     if (localContacts) {
//        this.setState ({
//          contacts: localContacts,
//        })
//     }
//     document.title='goit-react-wh-04-phonebook'
//   }

//   componentDidUpdate(prevProps, prevState) { 
//     if (this.state.contacts !== prevState.contacts) { 
//      localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
    
//     }
//   }
  


//   changeFilter = evt => {
//     this.setState({ filter: evt.currentTarget.value });
//   };
//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };
//   handleDelete = id => {
//     this.setState(prev => {
//       const newContacts = prev.contacts.filter(item => item.id !== id);

//       return {
//         contacts: newContacts,
//       };
//     });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
    
//     return (
//       <>
//         <div className={(styles.container, styles.border)}>
//           <h1>Phonebook</h1>
//           <Form onSubmit={this.formSubmitHandler} />
//         </div>
//         <div className={styles.container}>
//           <h1>Contacts</h1>
//           <Filter
//             className={css.filter}
//             value={filter}
//             onChange={this.changeFilter}
//           />
//           <ContactsList
//             className={styles.contactList}
//             onDelete={this.handleDelete}
//             contacts={visibleContacts}
//           />
//         </div>
//       </>
//     );
//   }
// }

// export default App;
