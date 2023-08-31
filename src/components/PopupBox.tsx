// PopupModal.js
import React from 'react';
import {NativeSyntheticEvent, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {uploadDataType} from '../types/types';
import {capitalize} from '../utils/generalUtils';
import CustomButton from './CustomButton';

interface PopMessageBoxProps {
  isVisible: boolean;
  onClose: ((event: NativeSyntheticEvent<any>) => void) | undefined;
  data: uploadDataType;
}

const PopMessageBox: React.FC<PopMessageBoxProps> = ({
  isVisible,
  onClose,
  data,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.parent}>
          <View style={styles.container} />
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Details</Text>
            </View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.content}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.descHeader}>Amount :</Text>
                  <Text style={styles.descriptionText}>₹{data.amount}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.descHeader}>Category :</Text>
                  <Text style={styles.descriptionText}>
                    {capitalize(data.category)}
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.descHeader}>Date :</Text>
                  <Text style={styles.descriptionText}>
                    {data.date}/{data.eventMonth}/{data.eventYear}
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.descHeader}>Description :</Text>
                  <Text style={styles.descriptionText}>{data.description}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 120,
                  }}>
                  <Text style={styles.descHeader}>Location :</Text>
                  <Text style={styles.descriptionText}>{data.location}</Text>
                </View>
                <View style={{paddingTop: 20, paddingBottom: 20}}>
                  <CustomButton onPress={onClose} text="Close" />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PopMessageBox;
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  headerText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 20,
  },
  body: {
    backgroundColor: '#2B2730',
    width: 300,
    padding: 20,
    borderRadius: 10,
  },

  header: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },

  scrollView: {
    maxHeight: 300,
  },

  content: {
    flex: 1,
  },

  descriptionText: {
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 5,
  },

  descHeader: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
    paddingRight: 10,
  },
});
