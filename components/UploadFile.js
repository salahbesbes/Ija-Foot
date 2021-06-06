import db from '@react-native-firebase/firestore';
import {View, Button, Platform} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';

import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import useProfile from '../hooks/useProfile';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';
const UploadFile = () => {
  const reference = storage().ref('avatars/');
  const [singleFile, setSingleFile] = useState(null);
  const {updateProfile, user, dispatch} = useProfile();
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      // const res = await DocumentPicker.pick({
      //   // Provide which type of file you want user to pick
      //   type: [DocumentPicker.types.images],
      //   // There can me more options as well
      //   // DocumentPicker.types.allFiles
      //   // DocumentPicker.types.images
      //   // DocumentPicker.types.plainText
      //   // DocumentPicker.types.audio
      //   // DocumentPicker.types.pdf
      // });
      // // Printing the log realted to the file
      // const avatarUri = res.uri;
      // const {fs, fetch, wrap} = RNFetchBlob;
      // const fileUri = `${utils.FilePath.PICTURES_DIRECTORY}/${avatarUri}`;

      // const newUser = {...user, avatar: avatarUri};
      // dispatch(actionCreators.loadUser(newUser));
      // updateProfile({avatar: avatarUri});
      try {
        const response = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        console.log('response :>> ', JSON.stringify(response));
        console.log('LOCAL :>> ', utils.FilePath.PICTURES_DIRECTORY);
        console.log('uri', response.uri);
        //output: /storage/0/content..://com.android.providers.media.documents/document/image%3A4055
        const ref = storage().ref('images/test.png');
        ref.putFile(response.uri).on('state_changed', snap => {
          console.log('snap', snap);
        });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
          throw err;
        }
      }
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err.message)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err.message));
        throw err;
      }
    }
  };
  let getPlatformURI = imagePath => {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = {uri: this.state.imagePath};
      if (Platform.OS === 'android') {
        imgSource.uri = 'file:///' + imgSource.uri;
      }
    }
    return imgSource;
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
      {/*Showing the data of selected Single file*/}
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {singleFile.name ? singleFile.name : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size ? singleFile.size : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        // onPress={uploadImage}
      >
        <Text style={styles.buttonTextStyle}>Upload File</Text>
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
