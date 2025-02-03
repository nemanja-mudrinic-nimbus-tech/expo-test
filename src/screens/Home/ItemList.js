import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import NavHeader from '../../components/nav/NavHeader';
import List from '../../components/home/List';
import { pageAtom } from '../../atoms/pageAtom';

export default function ItemList({ route }) {
  const { certification, dataType, listID, parentID, title } = route.params;
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
    <View>
      <NavHeader back={true} />
      <View style={styles.root}>
        <List
          dataType={dataType}
          listID={listID}
          catName={title}
          parentID={parentID}
          certification={certification}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  loading: {
    marginTop: 20,
  },
});
