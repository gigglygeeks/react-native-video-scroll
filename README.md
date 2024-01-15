# react-native-video-scroll

VideoScroll is a React Native component for creating a scrollable feed with video content seen in TikTok, Instagram Reels and Youtube Shorts. It provides a smooth scrolling experience with features such as pull-to-refresh, dynamic content loading and customizable rendering.

<img src="https://github.com/gigglygeeks/react-native-video-scroll/blob/HEAD/screenshots/example.gif?raw=true" width="250" />

## Installation

```sh
npm install react-native-video-scroll
npm install --save react-native-video@beta
```

## Usage

### Example of VideoScroll

Below is an example code snippet illustrating how to integrate and use VideoScroll within your React Native application.

```js
import React, { useState } from 'react';
import {VideoScroll, Content } from 'react-native-video-scroll';

// Your initial content data
const initialContent: Content[] = [
  {
    url: 'https://example.com/video1.mp4',
    title: 'Awesome Video 1',
    description: 'This is an amazing video!',
  },
  {
    url: 'https://example.com/video2.mp4',
    title: 'Cool Video 2',
    description: 'Check out this cool content!',
  },
  // ... add more content objects as needed
];

const YourComponent = () => {
  // State to manage the content
  const [content, setContent] = useState<Content[]>(initialContent);

  // Your refresh callback with new data
  const yourRefreshCallback = async () => {
    // Implement your refresh logic here
    console.log('Refreshing...');
    // Example: Simulating an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Replace this with your actual logic to fetch new data
    const newData: Content[] = [
      {
        url: 'https://example.com/newvideo1.mp4',
        title: 'New Video 1',
        description: 'This is a new amazing video!',
      },
      {
        url: 'https://example.com/newvideo2.mp4',
        title: 'New Video 2',
        description: 'Check out this new cool content!',
      },
      // ... add more new content objects as needed
    ];

    // Set the new data to the state
    setContent(newData);

    console.log('Refresh completed!');
  };

  // Your offset reached callback
  const yourOffsetReachedCallback = async () => {
    // Implement your offset reached logic here
    console.log('Offset reached, fetching more data...');
    // Example: Simulating an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Replace this with your actual logic to fetch more data
    const moreData: Content[] = [
      {
        url: 'https://example.com/morevideo1.mp4',
        title: 'More Video 1',
        description: 'This is more amazing content!',
      },
      {
        url: 'https://example.com/morevideo2.mp4',
        title: 'More Video 2',
        description: 'Check out this additional cool content!',
      },
      // ... add more additional content objects as needed
    ];

    // Concatenate the new data with the existing content
    setContent((prevContent) => [...prevContent, ...moreData]);

    console.log('Data fetched!');
  };

  return (
    <VideoScroll
      content={content}
      onRefresh={yourRefreshCallback}
      onOffsetReached={yourOffsetReachedCallback}
      // Other optional props
    />
  );
};

export default YourComponent;

```

#### Custom menus

Custom menus can be added to each content item in the VideoScroll component. The customMenus function provides an array of custom menu items, each specifying an icon, value, and an onPress callback. This allows you to extend the functionality of the VideoScroll by providing additional interactive options for each content item.

```js
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

```

#### Custom element

You can also use the customElement prop to customize the rendering of each content item by providing a callback function that returns a single React element. This can be useful for more complex customization.

```js
const yourCustomElementCallback = (item: Content) => (
  <YourCustomElementComponent item={item} />
);
```

## Props

### VideoScroll

- **content** _(Array)_: Content to display, an array of objects with title, video URL, and description.

- **onRefresh** _(Function)_: Callback function to handle pull-to-refresh. (Optional)

- **refreshOffset** _(Number)_: Number of elements left in the array before triggering the onOffsetReached callback. (Optional, default is 0)

- **onOffsetReached** _(Function)_: Callback function to populate new content data when the end of the list is reached.

- **onIndexChanged** _(Function)_: Callback function when the scroll index changes.

- **hideActivityIndicator** _(Boolean)_: Show or hide the spinner while batching. (Optional, default is false)

- **customElement** _(Function)_: Override the video with your custom element. (Optional)

- **customMenus** _(Function)_: Content to display menus. (Optional)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
