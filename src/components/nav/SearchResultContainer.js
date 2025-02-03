import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  useWindowDimensions,
  Platform,
  Modal,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import RenderHTML from 'react-native-render-html';

import { COLORS } from '../../constants/colors';
import Category from '../home/Category';
import SingleArticle from '../home/SingleArticle';
import SingleItem from '../home/SingleItem';
import SubCategory from '../home/SubCategory';
import Typography from '../ui/Typography';
import PassoverSingleItem from '../home/passover/PassoverSingleItem';
import CompanySingleItem from '../home/CompanySingleItem';
import Collapsible from 'react-native-collapsible';
import ArrowIconUP from '../../assets/svg/ArrowIconUp';
import ArrowIconDown from '../../assets/svg/ArrowIconDown';
import SmartFilterBox from '../collapsable/SmartFilterBox';
import { pageAtom } from '../../atoms/pageAtom';
import SingleAlert from '../alerts/SingleAlert';
import CerealItem from '../home/CerealItem';
import PassoverPaidItem from '../home/passover/PassoverPaidItem';
import { PAGES } from '../../constants/pages';
import { useNavigation } from '@react-navigation/native';
import { useApplicationContext } from '../../shared/context/applicationContext';
import { useReadAlerts } from '../../../src/hooks/view/useReadAlerts';

export default function SearchResultContainer({
  isLoading,
  searchResults,
  error,
  setEmptyState,
  activeFilters,
  searchTerm,
  setMainFilter,
  setSmartFilter,
  mainFilter,
  currentSmartFilter,
  setIsLoading,
  emptyState,
  isPassoverTime,
}) {
  const [localList, setLocalList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const page = useRecoilValue(pageAtom);
  const [localSmartFilters, setLocalSmartFilters] = useState();
  const [localSpinner, setLocalSpinner] = useState(false);
  const navigation = useNavigation();
  const contentWidth = useWindowDimensions().width - 34;
  const { showModal, passoverModalIsClosed } = useApplicationContext();

  const fnReadAlerts = useReadAlerts();
  const [readAlert, setReadAlerts] = useState({});

  useEffect(() => {
    (async () => {
      const a = await fnReadAlerts();
      setReadAlerts(a);
    })();
  }, []);

  useEffect(() => {
    if (!searchResults?.results?.length) {
      setLocalSpinner(true);
      setLocalList([]);
      setExpanded({});
      setTimeout(() => {
        setLocalSpinner(false);
      }, 150);
    } else {
      setEmptyState(null);
      setLocalSpinner(true);
      const filterList = filterSearchResult(searchResults);
      const reorderedResponse = reorderBasedOnTitles(page, filterList);
      if (!filterList.results.length) {
        setTimeout(() => {
          setLocalSpinner(false);
        }, 150);
        setLocalList([]);
        setExpanded({});
        return;
      }
      const sortedResults = reorderedResponse?.results.map((results) => {
        // Create a copy of the items array and sort it
        const sortedItems = [...results.items].map((item) => ({
          ...item,
          sortName: determineSortName(item),
        }));

        // Return the results with the sorted items
        return { ...results, items: sortedItems };
      });

      setLocalList([...sortedResults]);
      if (
        reorderedResponse.results.length === 1 ||
        (page.length && page[page.length - 1] === reorderedResponse?.results[0]?.title)
      ) {
        setExpanded({
          [reorderedResponse?.results[0]?.title]: true,
        });
      }
      setTimeout(() => {
        setLocalSpinner(false);
      }, 150);
    }
  }, [activeFilters, searchResults, currentSmartFilter, mainFilter, page]);

  const filterSearchResult = (searchResult) => {
    setIsLoading(true);

    let filteredResults = searchResult.results.map((group) => {
      const filteredItems = group.items.filter((item) => {
        const isMainFilterMatch = mainFilter === 'All' || item.mainFilter === mainFilter;
        return isMainFilterMatch;
      });
      return {
        count: filteredItems.length.toString(),
        title: group.title,
        page: group.page,
        items: filteredItems,
      };
    });

    let filteredArray = filteredResults.filter((item) => item.count > 0);

    const uniqueSmartFilters = new Set();

    filteredArray.forEach((item) => {
      item.items.forEach((subItem) => {
        const smartFilters = subItem.smartFilter?.split(';').map((s) => s.trim());
        smartFilters?.forEach((sf) => {
          uniqueSmartFilters.add(sf);
        });
      });
    });

    const removedOldSelectedSmartFilters = currentSmartFilter.filter((filterName) =>
      Array.from(uniqueSmartFilters).includes(filterName)
    );
    if (JSON.stringify(currentSmartFilter) !== JSON.stringify(removedOldSelectedSmartFilters)) {
      setSmartFilter(removedOldSelectedSmartFilters);
    }

    filteredResults = filteredArray.map((group) => {
      const filteredItems = group.items.filter((item) => {
        if (currentSmartFilter.length === 0) {
          return true;
        }

        if (!item.smartFilter) {
          return false;
        }

        // Split the item's smartFilter into an array by the semicolon delimiter.
        const itemSmartFilters = item.smartFilter.split(';').filter(Boolean); // filter(Boolean) removes any empty strings from the array

        // Check if every filter in currentSmartFilter is included in itemSmartFilters.
        const isSmartFilterMatch = currentSmartFilter.some((filter) =>
          itemSmartFilters.includes(filter)
        );

        return isSmartFilterMatch;
      });

      return {
        count: filteredItems.length.toString(),
        title: group.title,
        page: group.page,
        items: filteredItems,
      };
    });

    filteredArray = filteredResults.filter((item) => item.count > 0);

    setIsLoading(false);

    const localSmartFiltersArray = Array.from(uniqueSmartFilters).filter((item) => item !== '');

    setLocalSmartFilters(localSmartFiltersArray);

    return { ...searchResult, results: filteredArray };
  };

  const reorderBasedOnTitles = (titles, response) => {
    const copiedTitles = titles.slice();

    const reversedTitles = copiedTitles.reverse();

    let reorderedResults = [];
    const results = [...response.results];
    const reorderedResponse = {
      ...response,
      results: [],
    };
    const title = reversedTitles.length ? reversedTitles[0] : undefined;

    let found = false;
    if (title) {
      for (let i = 0; i < results.length; i++) {
        if (results[i].page === title) {
          reorderedResults.unshift(results[i]);
          results.splice(i, 1);
          found = true;
          break;
        }
      }
    }
    reorderedResults = reorderedResults.concat(results);
    const firstObject = reorderedResults[0];

    const sortedArray =
      reorderedResults.length > 1
        ? found
          ? reorderedResults.slice(1).sort((a, b) => {
              const titleA = a.title.toUpperCase();
              const titleB = b.title.toUpperCase();

              if (titleA < titleB) {
                return -1;
              }

              if (titleA > titleB) {
                return 1;
              }

              return 0;
            })
          : reorderedResults.sort((a, b) => {
              const titleA = a.title.toUpperCase();
              const titleB = b.title.toUpperCase();

              if (titleA < titleB) {
                return -1;
              }

              if (titleA > titleB) {
                return 1;
              }

              return 0;
            })
        : found
        ? []
        : [firstObject];

    if (found) {
      sortedArray.unshift(firstObject);
    }

    reorderedResponse.results = sortedArray;

    return reorderedResponse;
  };

  const onSegmentPress = (segment) => {
    const currentState = expanded[segment];
    setExpanded({
      ...expanded,
      [segment]: !currentState,
    });
  };

  const getIsSelected = (filter, index) => {
    if (searchResults.mainFilters.length === 2 && index === 0) {
      return true;
    }
    return mainFilter === filter;
  };

  const determineSortName = useCallback((item) => {
    // Check for articles with rendered_html or article_type
    if (item.rendered_html || item.article_type) {
      return item.title ?? item.article_name;
    }

    if (item.source_name) {
      return item.source_name;
    }

    if (item.year_valid && !Object.hasOwn(item, 'chometz')) {
      return item.cat_name;
    }

    if (item.item_brocha) {
      return item.item_name;
    }

    // Check for category items
    if (item.category_id) {
      return item.category_name;
    }

    // Check for subcategories
    if (item.list_id && !item.item_id) {
      return item.name;
    }

    // Check for products within a brand
    if (item.BrandId) {
      // If there's a specific product
      if (item.ProductId) {
        return item.ProductName || item.BrandName;
      }
      // If it's just the brand
      return item.BrandName;
    }

    if (item.item_id) {
      // If there's a certification status
      if (item.item_certificationstatus) {
        return item.liquor_type;
      }
      // For other items
      return item.item_brand;
    }

    // Check for company items
    if (item.urlLoc || item.state_code || item.phone) {
      return item.name;
    }

    // Check for Passover items with kashrus notes
    if (item.kashrus_notes !== undefined && item.product_name !== '') {
      return item.product_name;
    }

    // Check for Passover items
    if (item.chometz !== undefined) {
      return item.product_name;
    }

    // Check for items with a liquor_type property
    if (item.hasOwnProperty('liquor_type')) {
      return item.liquor_type;
    }

    // Default to a name or a brand name if none of the above conditions are met
    return item.item_name;
  }, []);

  const navigateToCategory = (category, parentId) => {
    navigation.navigate(PAGES.passoverPaidSectionList, {
      category,
      parentId,
    });
  };

  const showFiltersProperly = (array) => {
    if (isPassoverTime) {
      if (!array?.includes('Passover')) {
        array?.push('Passover');

        return array;
      }
      return array || [];
    } else {
      if (array?.length === 2) {
        return [array[1]];
      }

      return array || [];
    }
  };

  return (
    <>
      {isPassoverTime && showModal && (
        <View style={[styles.centeredView, styles.backGround]}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              passoverModalIsClosed();
            }}
          >
            <View style={styles.modalWrapper}>
              <View style={styles.modalView}>
                <View style={styles.modalText}>
                  <Text style={styles.modalTextContent}>
                    We are currently in the Pesach season. The 'Passover Only' search is enabled by
                    default. Use the 'toggle' to disable this setting and include ALL search results
                  </Text>
                </View>
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonStyle} onPress={() => passoverModalIsClosed()}>
                    OK
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
      <View style={styles.searchResultsContainer}>
        {isPassoverTime ? (
          <>
            {searchResults.mainFilters?.length > 1 && (
              <View style={styles.filterBy}>
                <View
                  style={searchResults.mainFilters?.length > 1 && styles.filterBySeparator}
                ></View>
                <View style={styles.filterByHeader}>
                  <Typography type="searchHeader">Filter by</Typography>
                </View>

                <ScrollView horizontal={true}>
                  <View style={styles.filterByItem}>
                    {(showFiltersProperly(searchResults.mainFilters) || [])
                      ?.sort((a, b) => {
                        if (a === 'All') return -1;
                        if (b === 'All') return 1;

                        // Put "Passover" second
                        if (a === 'Passover') return b === 'All' ? 1 : -1;
                        if (b === 'Passover') return a === 'All' ? -1 : 1;

                        return a?.localeCompare(b);
                      })
                      ?.map((filter, index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setMainFilter(filter);
                            }}
                            key={filter}
                          >
                            <View style={getIsSelected(filter, index) && styles.selectItem}>
                              <Typography style={mainFilter === filter && { color: COLORS.main }}>
                                {filter}
                              </Typography>
                            </View>
                          </Pressable>
                        );
                      })}
                  </View>
                </ScrollView>
              </View>
            )}

            {!localList.length && !isLoading && !localSpinner && (
              <View style={{ marginTop: 52 }}>
                <Typography type="subtitle">
                  {!emptyState
                    ? !currentSmartFilter.length > 0
                      ? 'Sorry, no results were found for your search. Please try a different keyword or phrase.'
                      : ''
                    : emptyState}
                </Typography>
              </View>
            )}
          </>
        ) : (
          <>
            {searchResults.mainFilters?.length > 1 && (
              <View style={styles.filterBy}>
                <View
                  style={searchResults.mainFilters?.length > 1 && styles.filterBySeparator}
                ></View>
                <View style={styles.filterByHeader}>
                  <Typography type="searchHeader">Filter by</Typography>
                </View>

                <ScrollView horizontal={true}>
                  <View style={styles.filterByItem}>
                    {(showFiltersProperly(searchResults.mainFilters) || [])
                      ?.sort((a, b) => {
                        if (a === 'All') return -1;
                        if (b === 'All') return 1;

                        // Put "Passover" second
                        if (a === 'Passover') return b === 'All' ? 1 : -1;
                        if (b === 'Passover') return a === 'All' ? -1 : 1;

                        return a?.localeCompare(b);
                      })
                      ?.map((filter, index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setMainFilter(filter);
                            }}
                            key={filter}
                          >
                            <View style={getIsSelected(filter, index) && styles.selectItem}>
                              <Typography style={mainFilter === filter && { color: COLORS.main }}>
                                {filter}
                              </Typography>
                            </View>
                          </Pressable>
                        );
                      })}
                  </View>
                </ScrollView>
              </View>
            )}

            {!localList.length && !isLoading && !localSpinner && (
              <View style={{ marginTop: 52 }}>
                <Typography type="subtitle">
                  {!emptyState
                    ? !currentSmartFilter.length > 0
                      ? 'Sorry, no results were found for your search. Please try a different keyword or phrase.'
                      : ''
                    : emptyState}
                </Typography>
              </View>
            )}
          </>
        )}

        {!isLoading && searchResults.smartFilters?.length > 1 && (
          <View>
            <ScrollView horizontal={true}>
              <View
                style={
                  searchResults.smartFilters?.length ? styles.smartFilter : styles.smartFilterNo
                }
              >
                {localSmartFilters
                  ?.sort((a, b) => a?.localeCompare(b))
                  .map((filter) => {
                    return (
                      <SmartFilterBox
                        key={filter}
                        text={filter}
                        smartFilters={currentSmartFilter}
                        setSmartFilter={setSmartFilter}
                      />
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        )}

        {error && (
          <Typography type="subtitle" style={{ color: COLORS.error }}>
            {error}
          </Typography>
        )}
        {isLoading || (isLoading && !(emptyState || error)) || localSpinner ? (
          <View style={{ marginTop: '50%' }}>
            <ActivityIndicator size="large" color={COLORS.main} />
          </View>
        ) : (
          <View style={{ flex: 1, paddingTop: 10 }}>
            <ScrollView
              nestedScrollEnabled={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
            >
              <View>
                <View style={styles.root}>
                  {localList.map((results) => {
                    return (
                      <View key={results.title} style={{ width: '100%' }}>
                        <View style={styles.titleHeader}>
                          <TouchableWithoutFeedback onPress={() => onSegmentPress(results.title)}>
                            <View style={styles.titleText}>
                              {expanded[results.title] ? <ArrowIconUP /> : <ArrowIconDown />}
                              <Text style={styles.searchHeader}>{results.title}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                          <Text style={styles.searchCountNumber}>{results.count}</Text>
                        </View>
                        <Collapsible style={{ padding: 6 }} collapsed={!expanded[results.title]}>
                          {results?.items
                            .map((item) => {
                              return {
                                ...item,
                                sortName: determineSortName(item),
                              };
                            })
                            .sort((a, b) => {
                              return a?.sortName?.localeCompare(b.sortName);
                            })
                            .map((i, index) => {
                              if (i.category_id && !i.source_name) {
                                return (
                                  <Category
                                    key={`${i.category_id}-${index}`}
                                    id={i.category_id}
                                    name={i.category_name}
                                    subCategory={i.parent_id !== null}
                                    icon={i.icon}
                                    wp_keyword={i.wp_keyword}
                                    db_keyword={i.db_keyword}
                                    list_query={i.list_query}
                                    articles={i.articles}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                    searchTerm={searchTerm}
                                    dataType={i.data_type}
                                    item={i}
                                  />
                                );
                              }

                              if (i.year_valid && !Object.hasOwn(i, 'chometz')) {
                                return (
                                  <Pressable
                                    onPress={() => {
                                      navigateToCategory(i, i.parent_id);
                                    }}
                                    key={index}
                                  >
                                    <View style={styles.cardBox}>
                                      <Typography type="categoryTitle" style={{ flex: 1 }}>
                                        {i.cat_name}
                                      </Typography>

                                      {i.html_tag && (
                                        <RenderHTML
                                          contentWidth={contentWidth}
                                          source={{ html: i.html_tag }}
                                          defaultTextProps={{ selectable: true }}
                                        />
                                      )}
                                    </View>
                                  </Pressable>
                                );
                              }

                              if (i.item_brocha) {
                                return <CerealItem key={i.item_brocha} item={i} />;
                              }

                              if (i.list_id && !i.item_id) {
                                // TODO display different types of subcategories
                                return (
                                  <SubCategory
                                    htmlTag={i.html_tag}
                                    key={`${i.list_id}-${index}`}
                                    id={i.list_id}
                                    name={i.name}
                                    parentID={i.parent_id}
                                    icon={i.icon}
                                    certification={i.certification}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                    searchTerm={searchTerm}
                                  />
                                );
                              }

                              if (i.alert_id && !i.source_name) {
                                return (
                                  <SingleAlert
                                    key={i.alert_id}
                                    title={i.alert_title}
                                    desc={i.alert_description_short}
                                    date={i.alert_eventdate}
                                    id={i.alert_id}
                                    read={!!readAlert[i.alert_id]}
                                  />
                                );
                              }

                              if (i.BrandId) {
                                if (i.ProductId) {
                                  // ApplianceItem
                                  return (
                                    <SingleItem
                                      key={`${i.ProductId}-${index}`}
                                      id={i.ProductId}
                                      name={`${i.ProductName}`}
                                      brand={`${i.BrandName}`}
                                      model={i.ProductModelNumber}
                                      features={i.ProductFeatureDisplay}
                                      sabbath={i.productBrandCategorySabbathMode}
                                      isSabbath={i.ProductType}
                                      icon={i.productCategoryIcon}
                                      filterSlug={i.filter_slug}
                                      isSearchResult
                                      searchTerm={searchTerm}
                                      item={i}
                                    />
                                  );
                                }
                                // Appliance
                                return (
                                  <SubCategory
                                    htmlTag={i.html_tag}
                                    key={`${i.BrandId}-${index}`}
                                    id={i.BrandId}
                                    name={i.BrandName}
                                    parentID={i.parent_id}
                                    icon={i.BrandImage}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                    searchTerm={searchTerm}
                                  />
                                );
                              }

                              if (i.item_id && !i.source_name) {
                                if (i.item_certificationstatus) {
                                  return (
                                    <SubCategory
                                      htmlTag={i.html_tag}
                                      key={i.item_id}
                                      name={i.liquor_type}
                                      id={i.liquor_type}
                                      parentID={i.parent_id}
                                      icon={i.BrandIcon}
                                      certification={{
                                        status: i.item_certificationstatus,
                                        info: i.item_excludinginfo,
                                      }}
                                      filterSlug={i.filter_slug}
                                      isSearchResult
                                      searchTerm={searchTerm}
                                    />
                                  );
                                }
                                return (
                                  <SingleItem
                                    key={`${i.item_id}-${index}`}
                                    id={i.item_id}
                                    name={`${i.item_name}`}
                                    brand={`${i.item_brand}`}
                                    footnote={i.item_footNote}
                                    company={i.item_company}
                                    icon={i.item_imageURL}
                                    thumbnail={i.item_thumbNailURL}
                                    instruction={i.item_instruction}
                                    att={i.item_attributes}
                                    item_approved={i.item_approved}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                    searchTerm={searchTerm}
                                    item={i}
                                  />
                                );
                              }
                              if (i?.urlLoc || i?.state_code || i?.phone) {
                                return (
                                  <CompanySingleItem
                                    key={i.id}
                                    name={i.name}
                                    id={i.id}
                                    postal={i.postal}
                                    state_code={i.state_code}
                                    address={i.address}
                                    urlLoc={i.urlLoc}
                                    phone={i.phone}
                                    country={i.country}
                                    city={i.city}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                    searchTerm={searchTerm}
                                  />
                                );
                              }
                              if (i.rendered_html || i.article_type) {
                                return (
                                  <SingleArticle
                                    key={`${i.id}-${index}`}
                                    id={i.id}
                                    name={i.title ?? i.article_name}
                                    url={i.link ?? i.url}
                                    type={i.type ?? i.article_type}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                    searchTerm={searchTerm}
                                    item={i}
                                  />
                                );
                              }
                              // PASSOVER FREE ITEMS
                              if (i.kashrus_notes || i.kashrus_notes === '') {
                                if (i.product_name === '') {
                                  return null;
                                }

                                return (
                                  <PassoverSingleItem
                                    key={`${i.product_name}-${index}`}
                                    category_name={i.category_name}
                                    product_name={i.product_name}
                                    description={i.description}
                                    is_chometz={i.is_chometz}
                                    kashrus_notes={i.kashrus_notes}
                                    brand={i?.brand}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                    searchTerm={searchTerm}
                                  />
                                );
                              }
                              if (i.chometz) {
                                // PASSOVER
                                return (
                                  <PassoverPaidItem
                                    key={`${i.product_name}-${index}`}
                                    chometz={i.chometz}
                                    name={i.product_name}
                                    highlight={i.highlight_color}
                                    filterSlug={i.filter_slug}
                                    isSearchResult
                                  />
                                );
                              }

                              if (i.hasOwnProperty('liquor_type') || i.source_name) {
                                return (
                                  <SubCategory
                                    htmlTag={i.html_tag}
                                    key={i.item_id}
                                    name={i.liquor_type || i.source_name}
                                    id={i.liquor_type || i.category_id}
                                    parentID={i.parent_id}
                                    icon={i.BrandIcon}
                                    searchTerm={searchTerm}
                                    isSearchResult
                                    certification={{
                                      status: i.item_certificationstatus,
                                      info: i.item_excludinginfo,
                                    }}
                                  />
                                );
                              }

                              return (
                                <SubCategory
                                  name={i.name ? i.name : i.BrandName}
                                  key={i.item_id}
                                  id={i.db_keyword}
                                  parentID={i.parent_id}
                                  icon={i.BrandIcon}
                                  isSearchResult
                                  htmlTag={i.html_tag}
                                />
                              );
                            })}
                        </Collapsible>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchResultsContainer: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    marginVertical: 0,
    paddingBottom: 10,
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  filterBySeparator: {
    position: 'absolute',
    width: '100%',
    top: Platform.OS === 'ios' ? 59 : 75,
    height: 2,
    backgroundColor: 'white',
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  titleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 2,
    marginBottom: 16,
  },
  titleText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '80%',
  },
  collapsedBox: { marginBottom: 16 },
  smartFilterNo: { display: 'none' },
  filterBy: {
    height: 'auto',
    display: 'flex',
  },
  filterByHeader: {
    padding: 8,
  },
  filterByItem: {
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
  },
  selectItem: {
    color: COLORS.main,
    paddingBottom: 4,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1.5,
    zIndex: 10,
  },
  smartFilter: {
    padding: 6,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  searchHeader: {
    fontWeight: '500',
    fontSize: 18,
    fontStyle: 'normal',
    color: COLORS.mainTextColor,
  },
  searchCountNumber: {
    fontWeight: '500',
    fontSize: 18,
    fontStyle: 'normal',
    color: COLORS.mainTextColor,
    marginLeft: 'auto',
  },
  title: {
    flex: 1,
  },
  cardBox: {
    backgroundColor: COLORS.mainLight,
    borderRadius: 10,
    minHeight: 70,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 17,
    flexDirection: 'row',

    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android shadow
    elevation: 3,
  },

  textBox: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: COLORS.labelColor,
  },
  centeredView: {
    position: 'absolute',
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backGround: {
    backgroundColor: 'grey',
    opacity: 0.6,
    zIndex: 200,
  },
  modalWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    zIndex: 500,
  },
  modalTextContent: {
    textAlign: 'center',
  },
  modalText: {
    padding: 10,
    width: '100%',
  },
  modalButton: {
    borderTopWidth: 1,
    borderTopColor: '#DAE6EB',
    padding: 10,
    width: '100%',
    textAlign: 'center',
  },
  modalButtonStyle: {
    textAlign: 'center',
  },
});
