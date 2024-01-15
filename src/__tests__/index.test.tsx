import React from 'react';
import { View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import VideoScroll from '../components/VideoScroll';
import { getVideos } from '../../example/src/config/utils';

jest.mock('expo-av', () => undefined);

test('check initial content length', async () => {
  const videos = await getVideos(0);
  const { getByTestId } = render(
    <VideoScroll
      content={videos}
      customElement={() => <View></View>}
      onIndexChanged={() => console.log('')}
    />
  );

  const flatlist = getByTestId('flatlist');
  expect(flatlist.children.length).toBe(2);
});
