import {useCallback, useContext} from 'react';
import getPath from '@flyerhq/react-native-android-uri-path';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

export const useUploadFile = () => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;
  const selectFile = useCallback(async () => {
    // Opening Document Picker to select one file
    try {
      const fileObj = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      userDispatch(actionCreators.loadUser({...user, avatar: fileObj.uri}));
      return fileObj;
    } catch (err) {
      if (DocumentPicker.isCancel) {
      }
      console.log('DocPicker ERROR =>> ', err);
    }
  }, [user, userDispatch]);

  const uploadFileToStorage = useCallback(
    async fileObj => {
      console.log('fileObj :>> ', fileObj);
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

  return {selectFile, uploadFileToStorage};
};
