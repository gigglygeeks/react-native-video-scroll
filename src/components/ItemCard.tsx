import { StyleSheet, Text, View } from 'react-native';
import React, { type FC, type ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShare, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from './VideoPlayer';

type Props = {
  item: Content;
  customElement?: ReactElement;
  customMenus?: UIMenuItem[];
  shouldPlay: boolean;
};

type UIOverlay = {
  menuItems?: UIMenuItem[];
};

export type Icon = 'heart' | 'comment' | 'share';

export type UIMenuItem = {
  icon: Icon | ReactElement;
  value: string | number;
  onPress?: () => void;
};

export type UIDescriptionItem = {
  title?: string;
  desc?: string;
};

export type Content = {
  url: string;
  title?: string;
  description?: string;
};

const iconMappings = {
  heart: faHeart,
  comment: faComment,
  share: faShare,
};

const ItemCard: FC<Props> = ({
  item,
  customElement,
  customMenus,
  shouldPlay,
}) => {
  const { url, title, description } = item;
  return (
    <View style={styles.item}>
      {customElement || <VideoPlayer url={url} shouldPlay={shouldPlay} />}
      <UIDescriptionItem title={title} desc={description} />
      <UIOverlay menuItems={customMenus} />
    </View>
  );
};

const UIDescriptionItem: FC<UIDescriptionItem> = ({ title, desc }) => {
  return (
    <View style={styles.descriptionItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

const UIMenuItem: FC<UIMenuItem> = ({ icon, value, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {typeof icon === 'string' ? (
        <FontAwesomeIcon color="white" size={40} icon={iconMappings[icon]} />
      ) : (
        icon
      )}
      <Text style={styles.value}>{value}</Text>
    </TouchableOpacity>
  );
};

const UIOverlay: FC<UIOverlay> = ({ menuItems }) => {
  return (
    <View style={styles.overlayItem}>
      {menuItems?.map((item, index) => (
        <UIMenuItem
          key={index}
          value={item.value}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
  },
  item: {
    flex: 1,
    backgroundColor: 'green',
  },
  overlayItem: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    margin: 10,
  },
  buttonContainer: {
    height: 60,
    width: 60,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionItem: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    margin: 20,
    marginRight: 80,
  },
  value: {
    fontSize: 14,
    color: 'white',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: '800',
  },
  desc: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
});
