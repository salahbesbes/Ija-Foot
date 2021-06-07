import db from '@react-native-firebase/firestore';
import {View, Button, Platform, Alert} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
import getPath from '@flyerhq/react-native-android-uri-path';

import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import useProfile from '../hooks/useProfile';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

const UploadFile = () => {
  const {updateProfile, user, dispatch} = useProfile();
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const imageName = user.nickName + response.name; // salou7IMG20210520010840.jpg
      const avatarRef = storage().ref(`images/avatar/${imageName}`);
      const AbsImagePath = getPath(response.uri);

      const uploadImageToStorage = avatarRef.putFile(AbsImagePath);

      //while uploading
      uploadImageToStorage.on(
        'state_changed',
        snap => {
          //todo: Set the loading component
          let percentage = Math.floor(
            (snap.bytesTransferred / snap.totalBytes) * 100,
          );
          console.log(percentage);
        },
        err => {
          console.log('Progess ERROR =>> ', err);
        },
      );
      // after upload is complete
      uploadImageToStorage.then(async () => {
        const url = await avatarRef.getDownloadURL();
        // send the url to the database and create a timestamp on create
        console.log('we download the url from storage');
        // we add the avatar url from the storage to the user localy first then
        // when the user press submit the update the db with the new profile
        dispatch(actionCreators.loadUser({...user, avatar: url}));
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.mainBody}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>
          React Native File Upload Example
        </Text>
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            marginBottom: 30,
            textAlign: 'center',
          }}>
          www.aboutreact.com
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});
export default UploadFile;
