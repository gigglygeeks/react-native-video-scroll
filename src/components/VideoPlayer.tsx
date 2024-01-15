import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { TouchableOpacity } from 'react-native';

const { height } = Dimensions.get('window');

interface Props {
  url: string;
  shouldPlay: boolean;
}

// @ts-ignore:next-line
const VideoPlayer: React.FC<Props> = ({ url, shouldPlay = false }) => {
  const videoRef = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});

  const playFunction = async () => {
    if (!videoRef.current) {
      return;
    }

    if (status.isPlaying) await videoRef.current.pause();
    else await videoRef.current.resume();
  };
  return (
    <TouchableOpacity onPress={playFunction}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri: url,
        }}
        repeat
        paused={!shouldPlay}
        controls={false}
        fullscreen
        resizeMode="cover"
        // @ts-ignore
        onPlaybackStateChanged={(state: any) => setStatus(() => state)}
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
