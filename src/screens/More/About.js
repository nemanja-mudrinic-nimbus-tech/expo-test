import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';

import { getUUID } from '../../utils/getUUID';
import CopyIcon from '../../assets/svg/CopyIcon';

const About = () => {
  const [deviceId, setDeviceId] = useState();
  const environment = process.env.EXPO_PUBLIC_NODE_ENV;

  // Specify the release date and time in CET
  const releaseDateCET = '2025-02-13T17:13:08+01:00';
  const dateObject = new Date(releaseDateCET);

  const formattedDate = dateObject.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const formattedTime = dateObject.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const fetchData = async () => {
      const uuid = await getUUID();
      setDeviceId(uuid);
    };

    fetchData();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(deviceId);
  };

  return (
    <Wrapper back={true}>
      <View style={{ marginBottom: 18 }}>
        <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
          About
        </Typography>
      </View>
      <View style={styles.infoBox}>
        <Text style={{ fontWeight: 700, marginBottom: 2 }}>App version</Text>
        <Text selectable>4.2.9</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={{ fontWeight: 700, marginBottom: 2 }}>Build Number</Text>

        <Text>{Platform.OS === 'ios' ? 364 : 464}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={{ fontWeight: 700, marginBottom: 2 }}>Release Date</Text>
        <Text>{`${formattedDate}`}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={{ fontWeight: 700, marginBottom: 2 }}>App Token</Text>
        <View style={styles.deviceBox}>
          <Text>{deviceId && deviceId}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <CopyIcon />
          </TouchableOpacity>
        </View>
      </View>
      {environment !== 'prod' && (
        <View style={styles.infoBox}>
          <Text style={{ fontWeight: 700, marginBottom: 2 }}>Environment</Text>
          <Text>{environment}</Text>
        </View>
      )}
    </Wrapper>
  );
};

export default About;

const styles = StyleSheet.create({
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
  },
  deviceBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
