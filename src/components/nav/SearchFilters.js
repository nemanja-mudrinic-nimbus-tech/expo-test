import {View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/colors';

export default function SearchFilters({
  filters,
  setFilters,
  typeFilters,
  categoryFilters,
  setActiveFilters,
  activeFilters,
}) {
  const getType = type => {
    switch (type) {
      case 'post':
        return 'Article';
      case 'video':
        return 'Video';
      case 'pdf':
        return 'PDF';
      default:
        return 'Article';
    }
  };
  const returnFlatListFilterData = () => {
    const newCategoryFilters = categoryFilters.map(item => {
      return {
        id: item.category_id,
        name: item.category_name,
        type: 'category',
      };
    });
    let types = [];
    const newTypeFilters = typeFilters
      .map(item => {
        return {
          id: item.id ?? item.article_id,
          name: item.type ?? item.article_type,
          type: 'type',
        };
      })
      .filter(item => {
        if (types.includes(item.name)) {
          return false;
        }
        types = [...types, item.name];
        return true;
      });
    if (filters.includes('category') && filters.includes('type')) {
      return [...newCategoryFilters, ...newTypeFilters];
    }
    if (filters.includes('category')) {
      return newCategoryFilters;
    }
    if (filters.includes('type')) {
      return newTypeFilters;
    }
    return [...newCategoryFilters, ...newTypeFilters];
  };
  return (
    <View style={styles.filter}>
      <FlatList
        initialNumToRender={20}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal={true}
        ListHeaderComponent={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() =>
                setFilters(prev => {
                  if (filters.includes('category')) {
                    return filters.filter(f => f !== 'category');
                  } else {
                    if (!filters.includes('type')) {
                      setActiveFilters(prevState => {
                        return prevState.filter(f => f.type === 'category');
                      });
                    }
                    return [...prev, 'category'];
                  }
                })
              }>
              <Text
                style={[
                  styles.filterBox,
                  filters.includes('category') && styles.filterBoxSelected,
                ]}>
                Category
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setFilters(prev => {
                  if (filters.includes('type')) {
                    return filters.filter(f => f !== 'type');
                  } else {
                    if (!filters.includes('category')) {
                      setActiveFilters(prevState => {
                        return prevState.filter(f => f.type === 'type');
                      });
                    }
                    return [...prev, 'type'];
                  }
                });
              }}>
              <Text
                style={[
                  styles.filterBox,
                  filters.includes('type') && styles.filterBoxSelected,
                ]}>
                Type
              </Text>
            </Pressable>
            {(categoryFilters.length !== 0 || typeFilters.length !== 0) && (
              <View style={styles.verticalLine} />
            )}
          </View>
        }
        data={returnFlatListFilterData()}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                // setFilters(prev => {
                //   if (filters.includes(item.id)) {
                //     return filters.filter(f => f !== item.id);
                //   } else {
                //     return [...prev, item.id];
                //   }
                // });
                setActiveFilters(prev => {
                  if (prev.filter(f => f.id === item.id).length > 0) {
                    return prev.filter(f => f.id !== item.id);
                  } else {
                    return [...prev, item];
                  }
                });
              }}>
              <Text
                style={[
                  styles.filterBox,
                  activeFilters.filter(f => f.id === item.id).length > 0 &&
                    styles.filterBoxSelected,
                ]}>
                {item.type === 'type' ? getType(item.name) : item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  filterBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
    fontSize: 15,
    marginRight: 10,
  },
  filterBoxSelected: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'rgba(255,255,255,0.5)',
    color: COLORS.main,
    overflow: 'hidden',
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginRight: 10,
  },
});
