import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Typography from '../ui/Typography';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Constants
import { COLORS } from '../../constants/colors';

import { shortenString } from '../../utils/shortenString';
import { useNavigation } from '@react-navigation/native';
import CollapseContainer from '../collapsable/collapsable';
import TextInfoBox from '../collapsable/TextInfoBox';
import RenderHTML from 'react-native-render-html';

export default function SingleItem({ filterSlug, isSearchResult = false, searchTerm, ...props }) {
  const {
    id,
    name,
    brand,
    catName,
    sabbath,
    features,
    model,
    icon,
    company,
    footnote,
    isSabbath,
    instruction,
    att,
    item_approved,
    item,
    thumbnail,
  } = props;
  const navigation = useNavigation();
  const finalName = shortenString(name, 120);
  const [expanded, setExpanded] = useState(false);
  const [isApproved, setIsApproved] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT = insets.top;
  const { width } = useWindowDimensions();
  const onItemPress = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (item.item_approved) {
      if (item.item_approved === '1') {
        setIsApproved('Approved');
      } else setIsApproved('Not Approved');
    }
  }, [item]);

  const contentWidth = useWindowDimensions().width;

  const [mainProp, setMainProp] = useState(contentWidth);

  return (
    <View style={styles.box}>
      {
        <>
          {item.icon && !sabbath && (
            <Image
              source={{
                uri: icon,
              }}
              style={styles.image}
            />
          )}
          {brand ? (
            <View style={styles.brandTitle}>
              {isSabbath && (
                <>
                  <Typography type="categoryTitle">{name ? finalName : brand}</Typography>
                </>
              )}
              {!isSabbath && (
                <>
                  <Typography type="categoryTitle">{brand}</Typography>
                  {!expanded && !!(name || brand) && <Text>{name ? finalName : brand}</Text>}
                  {expanded && !!(name || brand) && <Text>{name ? name : brand}</Text>}
                </>
              )}
            </View>
          ) : (
            <View style={styles.title}>
              {expanded ? (
                <Typography
                  style={{ alignSelf: 'flex-start', width: thumbnail ? '70%' : '100%' }}
                  type="categoryTitle"
                >
                  {name}
                </Typography>
              ) : (
                <Typography
                  style={{ alignSelf: 'flex-start', width: thumbnail ? '70%' : '100%' }}
                  type="categoryTitle"
                >
                  {finalName}
                </Typography>
              )}
              {thumbnail && (
                <Image
                  style={{ width: 100, height: 45, resizeMode: 'contain' }}
                  source={{
                    uri: thumbnail,
                  }}
                />
              )}
            </View>
          )}
          <View
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setMainProp(width);
            }}
            style={styles.collapsedBox}
          >
            <CollapseContainer expanded={expanded}>
              {!(instruction || sabbath || !brand) && <TextInfoBox text={''} />}
              {item?.brand && <TextInfoBox title="Brand" text={item.brand} />}
              {instruction && (
                <RenderHTML
                  baseStyle={{ width: mainProp - 12 * 4 }}
                  contentWidth={contentWidth}
                  source={{ html: instruction }}
                  defaultTextProps={{ selectable: true }}
                />
              )}
              {item.item_company && <TextInfoBox title="Company" text={item.item_company} />}
              {item.item_attributes && <TextInfoBox title="Type" text={item.item_attributes} />}
              {item.item_description && (
                <TextInfoBox title="Description" text={item.item_description} />
              )}
              {item.item_footNote && (
                <TextInfoBox title="Additional Info" text={item.item_footNote} />
              )}
              {item.item_note && (
                <RenderHTML
                  baseStyle={{ width: mainProp - 12 * 4 }}
                  contentWidth={contentWidth}
                  source={{ html: item.item_note }}
                  defaultTextProps={{ selectable: true }}
                />
              )}

              {sabbath && (
                <Pressable onPress={() => setModalVisible(true)}>
                  <View style={styles.sabbath}>
                    <AntDesign name="infocirlce" size={22} color="white" />
                    <Typography type="subtitle" style={styles.sabbathText}>
                      Sabbath Info
                    </Typography>
                  </View>
                </Pressable>
              )}

              {item.ProductDescription && (
                <View style={styles.productDescription}>
                  <Typography style={styles.featuresTitle} type="subtitle">
                    Product Description:
                  </Typography>
                  <Text selectable>{item.ProductDescription}</Text>
                </View>
              )}

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
                        baseStyle={{ width: mainProp - 12 * 4 }}
                        contentWidth={contentWidth}
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
            </CollapseContainer>
          </View>
          {(item.item_company ||
            item.item_attributes ||
            item?.brand ||
            item.item_footNote ||
            item.description ||
            item.item_description ||
            item.item_note ||
            instruction ||
            isApproved ||
            sabbath ||
            item.model ||
            item.features) && (
            <View style={styles.kosherSection}>
              <Text
                style={isApproved === 'Approved' ? styles.approvedText : styles.notApprovedText}
              >
                {!isSabbath &&
                  !(
                    isApproved === 'Approved' &&
                    (item.item_footNote || item.item_note || item.item_attributes)
                  ) &&
                  isApproved}
                {expanded &&
                  !isSabbath &&
                  (item.item_footNote || item.item_note || item.item_attributes) &&
                  isApproved === 'Approved' && (
                    <Text style={{ color: COLORS.orange }}>Approved, See Above</Text>
                  )}
              </Text>

              <>
                {item.item_company ||
                item.item_attributes ||
                item?.brand ||
                item.item_footNote ||
                item.description ||
                item.item_description ||
                item.item_note ||
                instruction ||
                sabbath ||
                item.model ||
                item.features ? (
                  <TouchableWithoutFeedback onPress={onItemPress}>
                    {!expanded ? (
                      <Text style={{ color: '#2F718F' }}>Important Info {'>>'} </Text>
                    ) : (
                      <Text style={{ color: '#2F718F' }}>Close {'<<'} </Text>
                    )}
                  </TouchableWithoutFeedback>
                ) : (
                  <></>
                )}
              </>
            </View>
          )}
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    minHeight: 70,
    marginBottom: 20,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    border: '1px solid',
    // Android shadow
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    flex: 1,
    minHeight: 30,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  approved: {
    color: COLORS.green,
    fontWeight: '700',
    marginLeft: 5,
  },
  not_approved: {
    color: COLORS.error,
    fontWeight: '700',
    marginLeft: 5,
  },
  brandTitle: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  kosherSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    // gap: 50,
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 1,
  },
  collapsedBox: {
    paddingHorizontal: 16,
  },
  approvedText: {
    color: COLORS.green,
  },
  notApprovedText: {
    color: COLORS.error,
  },
  sabbath: {
    backgroundColor: COLORS.labelColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
    width: 160,
    marginLeft: 10,
    marginBottom: 16,
  },
  sabbathText: {
    color: '#fff',
    marginLeft: 10,
  },
  features: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  productDescription: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 16,
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
    width: '100%',
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
  moreInfo: {
    position: 'absolute',

    right: 10,
    zIndex: 2,
  },
});
