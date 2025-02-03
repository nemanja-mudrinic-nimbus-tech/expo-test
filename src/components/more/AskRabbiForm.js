import { View, Text, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import React, { useRef, useState } from 'react';

import Input from './Input';
import { COLORS } from '../../constants/colors';
import SelectDropdown from 'react-native-select-dropdown';
import DropdownIcon from '../../assets/svg/more/DropdownIcon';
import Submit from './Submit';
import axios from 'axios';
import { validateEmail } from '../../utils/validateEmail';
import { getUUID } from '../../utils/getUUID';

const options = [
  'Medicine Kashrus Questions',
  'Sabbath Mode Questions',
  'General Consumer Kashrus Questions',
  'Halacha Questions',
  'Alcoholic Beverage Kashrus Questions',
  'Bug Checking Questions',
];

export default function AskRabbiForm({ setModalVisible, setIsLoading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [clicked, setClicked] = useState(false);
  const subjectRef = useRef(null);

  const isEmpty = (value) => {
    return value.trim() === '';
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubject('');
  };

  const sendFormData = async () => {
    setIsLoading(true);
    setModalVisible(true);
    const uuid = await getUUID();
    await axios
      .post(`${process.env.EXPO_PUBLIC_BASE_URL}support/rabbi`, {
        subjectType: subject,
        name,
        email,
        phone,
        comments: message,
        deviceId: uuid,
        token: process.env.EXPO_PUBLIC_SUPPORT_TOKEN,
      })
      .then((res) => {
        setIsLoading(false);
        clearInputs();
        setClicked(false);
        subjectRef.current.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        setModalVisible(false);
        Alert.alert(
          'Error',
          'Something went wrong, check you internet connection and try again later.'
        );
      });
  };

  const onSubmit = async () => {
    if (
      !isEmpty(message) &&
      !isEmpty(phone) &&
      !isEmpty(email) &&
      !isEmpty(name) &&
      !isEmpty(subject) &&
      !!validateEmail(email)
    ) {
      await sendFormData();
    }
    setClicked(true);
  };

  return (
    <View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Subject</Text>
        <SelectDropdown
          ref={subjectRef}
          data={options}
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
          r
        />
        {isEmpty(subject) && clicked && <Text style={styles.error}>This field is required</Text>}
      </View>
      <KeyboardAvoidingView>
        <View>
          <Input label="Name" setState={setName} error={isEmpty(name) && clicked} value={name} />
          <Input
            label="Email"
            type="email-address"
            setState={setEmail}
            error={(isEmpty(email) && clicked) || (!validateEmail(email) && clicked)}
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
            style={styles.message}
            multiline={true}
            setState={setMessage}
            error={isEmpty(message) && clicked}
            value={message}
          />
        </View>
      </KeyboardAvoidingView>
      <Submit onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  message: {
    height: 140,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginTop: 2,
  },
  image: {
    width: 152,
    height: 125,
    borderRadius: 10,
    marginBottom: 33,
  },
});
