import { View, StyleSheet, Text } from 'react-native';
const NotificationModal = ({ text }) => {
  return (
    <View style={styles.rootBg}>
      <View style={styles.root}>
        <View style={styles.textBox}>
          <Text style={{ textAlign: 'center' }}>{text}</Text>
        </View>
        <View style={styles.buttonBox}>
          <Text style={{ textAlign: 'center' }}>Ok</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    height: 'auto',
    width: '80%',
    backgroundColor: 'blue',
    borderRadius: 16,
    // position: 'absolute',
    // top: '20%',
    // left: '10%',
    zIndex: 50,
    textAlign: 'center',
  },
  textBox: {
    height: 'auto',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  buttonBox: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  rootBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // opacity: 0.2,
    zIndex: 1000,
    height: '100%',
    width: '100%',
    // position: 'relative',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
