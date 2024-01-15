import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { TouchableOpacity } from 'react-native';

const { height } = Dimensions.get('window');

interface Props {
  url: string;
  shouldPlay: boolean;
}

const VideoPlayer: React.FC<Props> = ({ url, shouldPlay = false }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <TouchableOpacity
      onPress={() =>
        status.isPlaying
          ? video.current.pauseAsync()
          : video.current.playAsync()
      }
    >
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={shouldPlay}
        useNativeControls={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  video: {
    height: height,
  },
});

export default VideoPlayer;
