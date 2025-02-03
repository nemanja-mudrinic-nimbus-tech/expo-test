import { View, Text, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import SentIcon from '../../assets/svg/more/SentIcon';
import Typography from '../ui/Typography';
import { COLORS } from '../../constants/colors';

export default function FormModal({ modalVisible, contact, isLoading, onSuccess }) {
  return (
    <Modal animationType="fade" visible={modalVisible} transparent>
      <View style={styles.modal}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.modalMessage}>
            <SentIcon />
            <View>
              <Typography type="title" style={styles.modalTitle}>
                {contact ? 'Sent!' : 'Question Sent!'}
              </Typography>
              <Text selectable style={styles.modalText}>
                {contact
                  ? 'Your message has been successfully sent, we’ll get back to you shortly.'
                  : 'Your question was sent to the Rabbi. The answer will be sent to you over email.'}
              </Text>
            </View>
            <Pressable style={styles.button} onPress={() => {
              onSuccess()
            }}>
              <Text style={styles.buttonText}>Back to app</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalMessage: {
    backgroundColor: '#fff',
    width: 320,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingVertical: 50,
  },
  modalTitle: {
    marginBottom: 21,
    marginTop: 30,
    textAlign: 'center',
  },
  modalText: {
    color: COLORS.secondaryTextColor,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.main,
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
