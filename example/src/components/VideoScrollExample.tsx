import React, { useEffect } from 'react';
import { VideoScroll } from 'react-native-video-scroll';
import { getVideos } from '../config/utils';
import type { Content, UIMenuItem } from '../../../src/components/ItemCard';

const VideoScrollExample = () => {
  const [content, setContent] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    mockApiCall();
  }, []);

  /**
   * Example usage when refresh is called
   * Call an API and update the content with the new data
   */
  const refresh = async () => {
    const randomIndex = 2;
    const newContent = await getVideos(randomIndex);
    setContent(newContent);
    setIndex(randomIndex);
  };

  /**
   * Example usage when set offset is reached
   * Call an API and update the content with the new data
   */
  const mockApiCall = async () => {
    const newContent = await getVideos(index);
    setContent([...content, ...newContent]);
    setIndex(index + 1);
  };

  /**
   * Example usage when index changes
   * Remove older videos to save memory
   */
  const onIndexChanged = (index: number) => {
    if (index > 10) {
      const newContent = content.slice(5);
      setContent(newContent);
    }
  };

  /**
   * Example of custom menus
   */
  const customMenus = (item: Content) => [
    {
      icon: 'heart',
      value: '1',
      onPress: () => console.log(item),
    } as UIMenuItem,
    {
      icon: 'comment',
      value: '2',
      onPress: () => console.log(item),
    } as UIMenuItem,
    {
      icon: 'share',
      value: '3',
      onPress: () => console.log(item),
    } as UIMenuItem,
  ];

  return (
    <VideoScroll
      content={content}
      refreshOffset={0}
      onRefresh={refresh}
      onOffsetReached={mockApiCall}
      onIndexChanged={onIndexChanged}
      customMenus={customMenus}
    />
  );
};

export default VideoScrollExample;
