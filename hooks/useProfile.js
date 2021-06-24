import {useCallback, useContext} from 'react';
import db from '@react-native-firebase/firestore';
import getPath from '@flyerhq/react-native-android-uri-path';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

const useProfile = () => {
  // we are using the reducer here so we returning its value
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;
  // since we need sinIn to call it on Click events we returning it with the reducer state modified
  const updateProfile = useCallback(
    async (newProfile, fileObj) => {
      userDispatch(actionCreators.loading());
      if (!fileObj) {
        await UpdateOnlyFieldText(newProfile);
      } else {
        await updateProfileAndUploadAvatar(fileObj, newProfile);
      }
    },
    [UpdateOnlyFieldText, updateProfileAndUploadAvatar, userDispatch],
  );

  const updateProfileAndUploadAvatar = useCallback(
    async (fileObj, newProfile) => {
      console.log('update Profile And Upload Avatar');
      if (fileObj) {
        const imageName = user.nickName + fileObj.name; // salou7IMG20210520010840.jpg
        const avatarRef = storage().ref(`images/avatar/${imageName}`);
        const AbsImagePath = getPath(fileObj.uri);

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
          [],
        );

        // after upload is complete
        uploadImageToStorage.then(async snap => {
          const url = await avatarRef.getDownloadURL();
          // send the url to the database and create a timestamp on create
          console.log('we download the url from storage');
          // we add the avatar url from the storage to the user localy first then
          // when the user press submit the update the db with the new profile
          try {
            await db()
              .collection('players')
              .doc(user.uid)
              .update({...newProfile, avatar: url});

            // userDispatch(
            //   actionCreators.loadUser({
            //     ...newProfile,
            //     uid: user.uid,
            //     avatar: url,
            //   }),
            // );
          } catch (error) {
            console.log(
              'updateProfileAndUploadAvatar ERROR => ',
              error.message,
            );
          }
        });
      }
    },
    [user],
  );
  const UpdateOnlyFieldText = useCallback(
    async newProfile => {
      try {
        // update profile in db
        await db().collection('players').doc(user.uid).update(newProfile);

        // update loacal state
        // userDispatch(actionCreators.loadUser({...newProfile, uid: user.uid}));
      } catch (error) {
        console.log('UpdateOnlyFieldText ERROR => ', error.message);
      }
    },
    [user.uid],
  );

  const selectFile = useCallback(
    async setFile => {
      // Opening Document Picker to select one file
      try {
        const fileObj = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        // update the profile form
        setFile(fileObj);
        // immediately after select the user can see his image
        userDispatch(actionCreators.loadUser({...user, avatar: fileObj.uri}));
        return fileObj;
      } catch (err) {
        if (DocumentPicker.isCancel) {
        }
        console.log('DocPicker ERROR =>> ', err);
      }
    },
    [user, userDispatch],
  );

  const uploadFileToStorage = useCallback(
    async fileObj => {
      if (fileObj) {
        const imageName = user.nickName + fileObj.name; // salou7IMG20210520010840.jpg
        const avatarRef = storage().ref(`images/avatar/${imageName}`);
        const AbsImagePath = getPath(fileObj.uri);

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
          userDispatch(actionCreators.loadUser({...user, avatar: url}));
        });
      }
    },
    [user, userDispatch],
  );
  return {
    ...authState,
    userDispatch,
    updateProfile,
    ...teamState,
    teamDispatch,
    uploadFileToStorage,
    selectFile,
  };
};

export default useProfile;
