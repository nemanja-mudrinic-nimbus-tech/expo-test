import {View, StyleSheet, Text, Alert} from 'react-native';
import React, {useState, useRef} from 'react';
import Input from './Input';
import SelectDropdown from 'react-native-select-dropdown';
import DropdownIcon from '../../assets/svg/more/DropdownIcon';
import {COLORS} from '../../constants/colors';
import Submit from './Submit';
import axios from 'axios';
import {validateEmail} from '../../utils/validateEmail';

const subjectOptions = [
  'Medicine Kashrus Questions',
  'Appliance Questions',
  'General Consumer Kashrus Questions',
  'Halacha Questions',
  'Alcoholic beverage Kashrus questions',
  'Bug Checking Questions',
];

export default function ContactForm({setModalVisible, setIsLoading}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [clicked, setClicked] = useState(false);
  const subjectRef = useRef(null);
  const isEmpty = value => {
    if (value.trim() === '') {
      return true;
    }
    return false;
  };

  const url = process.env.EXPO_PUBLIC_BASE_URL;

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubject('');
  };

  const sendFormData = () => {
    const formData = new FormData();
    formData.append('subjectType', subject.trim());
    formData.append('name', name.trim());
    formData.append('email', email.trim());
    formData.append('phone', phone.trim());
    formData.append('comments', message.trim());
    formData.append('category', 'contact');
    const headers = {'Content-Type': 'multipart/form-data'};
    setIsLoading(true);
    setModalVisible(true);
    axios
      .post(url, formData, {
        headers: headers,
      })
      .then(res => {
        setIsLoading(false);
        clearInputs();
        setClicked(false);
        subjectRef.current.reset();
      })
      .catch(error => {
        setIsLoading(false);
        setModalVisible(false);
        Alert.alert(
          'Error',
          'Something went wrong, check you internet connection and try again later.',
        );
      });
  };

  const onSubmit = () => {
    if (
      !isEmpty(message) &&
      !isEmpty(phone) &&
      !isEmpty(email) &&
      !isEmpty(name) &&
      !isEmpty(subject) &&
      !!validateEmail(email)
    ) {
      sendFormData();
    }
    setClicked(true);
  };
  return (
    <View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Subject</Text>
        <SelectDropdown
          ref={subjectRef}
          data={subjectOptions}
          buttonStyle={styles.dropdown}
          onSelect={(selectedItem, index) => setSubject(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Select a subject"
          buttonTextStyle={styles.dropdownText}
          renderDropdownIcon={() => {
            return <DropdownIcon />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdownStyle}
          rowStyle={styles.dropdownRowStyle}
          rowTextStyle={styles.dropdownRowText}
        />
        {isEmpty(subject) && clicked && (
          <Text style={styles.error}>This field is required</Text>
        )}
      </View>
      <Input
        label="Name"
        setState={setName}
        error={isEmpty(name) && clicked}
        value={name}
      />
      <Input
        label="Email"
        type="email-address"
        setState={setEmail}
        error={
          (isEmpty(email) && clicked) || (!validateEmail(email) && clicked)
        }
        value={email}
      />
      <Input
        label="Phone"
        type="phone-pad"
        setState={setPhone}
        error={isEmpty(phone) && clicked}
        value={phone}
      />
      <Input
        label="Message"
        multiline={true}
        style={styles.message}
        setState={setMessage}
        error={isEmpty(message) && clicked}
        value={message}
      />
      <Submit onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    height: 140,
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.secondaryTextColor,
    borderRadius: 10,
    padding: 10,
    maxHeight: 48,
    width: '100%',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 13,
    color: COLORS.secondaryTextColor,
    marginBottom: 2,
  },
  dropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 10,
  },
  dropdownRowStyle: {
    backgroundColor: '#444',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.secondaryTextColor,
  },
  error: {
    color: 'red',
    marginTop: 2,
  },
});
