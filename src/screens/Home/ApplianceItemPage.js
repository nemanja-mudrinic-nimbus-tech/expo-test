import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import RenderHTML from 'react-native-render-html';

import { COLORS } from '../../constants/colors';
import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pageAtom } from '../../atoms/pageAtom';

export default function ApplianceItemPage({ route }) {
  const { id, catName, title, model, sabbath, features, icon } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT = insets.top;

  const setPageAtom = useSetRecoilState(pageAtom);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, title];
    });
  }, []);

  return (
    <Wrapper back={true}>
      <View style={styles.header}>
        <Typography style={styles.title}>{title}</Typography>
      </View>
      <Typography style={styles.check}>Model: {model}</Typography>
      <Pressable onPress={() => setModalVisible(true)}>
        {sabbath && (
          <View style={styles.sabbath}>
            <AntDesign name="infocirlce" size={22} color="white" />
            <Typography type="subtitle" style={styles.sabbathText}>
              Sabbath Info
            </Typography>
          </View>
        )}
      </Pressable>
      {features && (
        <View style={styles.features}>
          <Typography style={styles.featuresTitle} type="subtitle">
            Features:
          </Typography>
          <Text selectable style={styles.featuresText}>
            {features}
          </Text>
        </View>
      )}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={[styles.modal, { paddingTop: STATUSBAR_HEIGHT }]}>
          <View>
            <View style={styles.modalHeader}>
              <Typography type="subtitle" style={styles.modalTitle}>
                Sabbath info
              </Typography>
              <Pressable onPress={() => setModalVisible(false)}>
                <AntDesign name="closecircle" size={18} color={COLORS.main} />
              </Pressable>
            </View>
            <ScrollView style={styles.sabbathBox}>
              <RenderHTML
                contentWidth={width}
                source={{ html: sabbath }}
                defaultTextProps={{ selectable: true }}
              />
            </ScrollView>
            <Pressable style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
              <Typography type="subtitle" style={{ color: COLORS.main }}>
                Close
              </Typography>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  catName: {
    color: COLORS.labelColor,
    fontSize: 15,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.mainTextColor,
    fontFamily: 'Noto-SansBold',
    flex: 1,
  },
  check: {
    color: COLORS.labelColor,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Noto-SansBold',
  },
  sabbath: {
    backgroundColor: COLORS.labelColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  sabbathText: {
    color: '#fff',
    marginLeft: 10,
  },
  features: {
    backgroundColor: COLORS.mainLight,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  featuresText: {
    fontWeight: '700',
  },
  featuresTitle: {
    color: COLORS.main,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingBottom: 20,
  },
  sabbathBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  modalCloseBtn: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: COLORS.main,
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.main,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.main,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
