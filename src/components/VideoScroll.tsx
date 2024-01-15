import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {
  useState,
  type FC,
  type ReactElement,
  useEffect,
  useRef,
} from 'react';
import type { Content, UIMenuItem } from './ItemCard';
import ItemCard from './ItemCard';

type Props = {
  content: Content[] | undefined; // Content to display, array of object with title, url, description
  onRefresh?: () => Promise<void>; // Callback function to handle refresh
  refreshOffset?: number; // Number of elements left in array before callback to add more
  onOffsetReached?: () => Promise<void>; // Callback function to populate new content data
  onIndexChanged?: (newIndex: number) => void; // Callback function when the scroll index changes
  hideActivityIndicator?: boolean; // Show spinner while batching or not
  customElement?: (item: Content) => ReactElement; // Override video with own custom element
  customMenus?: (item: Content) => UIMenuItem[]; // Content to display menus
};

const { height } = Dimensions.get('window');

const VideoScroll: FC<Props> = ({
  content,
  refreshOffset = 0,
  hideActivityIndicator = false,
  onRefresh,
  onOffsetReached,
  onIndexChanged,
  customElement,
  customMenus,
}) => {
  /* Local states */
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [lastFetchedIndex, setLastFetchedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* Listen for changes of current index */
  useEffect(() => {
    onIndexChanged(currentIndex);
    if (
      currentIndex >= content?.length - 1 - refreshOffset &&
      lastFetchedIndex !== currentIndex // prevent refetching when scrolling back
    ) {
      setFetching(true);
      onOffsetReached().then(() => setFetching(false));
      setLastFetchedIndex(currentIndex);
    }
  }, [content?.length, currentIndex]);

  /* Called when scrolling to new video */
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any;
  }) => {
    if (viewableItems.length) {
      const currentItem = viewableItems[0].index;
      setCurrentIndex(currentItem);
    }
  };

  /* Called when refreshing / scrolling up */
  const defaultRefresh = () => {
    setRefreshing(true);
    onRefresh
      ? onRefresh().then(() => setRefreshing(false))
      : setTimeout(() => setRefreshing(false), 3000); // incase of no refresh callback use default to prevent crash
  };

  /* Config for the flatlist in order to get viewablechanged functionality */
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: viewabilityConfig,
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]);

  /* Video item in the flatlist */
  const renderItem = ({ item, index }: { item: Content; index: number }) => {
    return (
      <ItemCard
        item={item}
        customElement={customElement && customElement(item)}
        customMenus={customMenus && customMenus(item)}
        shouldPlay={index === currentIndex}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        testID="flatlist"
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        disableIntervalMomentum={true}
        scrollEnabled={true}
        contentContainerStyle={styles.container}
        data={content}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={height}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={defaultRefresh}
        keyExtractor={(item) => item.url}
      />
      {!hideActivityIndicator && !!fetching && (
        <ActivityIndicator size={120} style={styles.activity} color={'white'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    display: 'flex',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    zIndex: 100,
  },
});

export default VideoScroll;
