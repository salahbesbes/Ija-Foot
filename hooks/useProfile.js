import db from '@react-native-firebase/firestore';
import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';
import getPath from '@flyerhq/react-native-android-uri-path';
import storage from '@react-native-firebase/storage';

import DocumentPicker from 'react-native-document-picker';

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
      // ListningToChanges(newProfile);
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
              .update({...newProfile, avatar: url})
              .then(_ => {
                ListningToChanges({...newProfile, avatar: url});
              });
            userDispatch(
              actionCreators.loadUser({
                ...newProfile,
                uid: user.uid,
                avatar: url,
              }),
            );
          } catch (error) {
            console.log('UpdateOnlyFieldText ERROR => ', error.message);
          }
        });
      }
    },
    [user, userDispatch, ListningToChanges],
  );
  const UpdateOnlyFieldText = useCallback(
    async newProfile => {
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .update(newProfile)
          .then(_ => {
            ListningToChanges(newProfile);
          });
        userDispatch(actionCreators.loadUser({...newProfile, uid: user.uid}));
      } catch (error) {
        console.log('UpdateOnlyFieldText ERROR => ', error.message);
      }
    },
    [user, userDispatch, ListningToChanges],
  );

  const ListningToChanges = useCallback(
    async newProfile => {
      try {
        console.log('from Frofile => we are listnig');
        db()
          .collection('players')
          .doc(user.uid)
          .onSnapshot(async _ => {
            //* update the profile inside the friends list

            const friendDocs = await db()
              .collection('players')
              .doc(user.uid)
              .collection('friends')
              .get();
            const lisFriends = friendDocs.docs;
            lisFriends.forEach(async friendDoc => {
              // friendDoc.ref.id friend id
              try {
                await db()
                  .doc(
                    `players/${friendDoc.ref.id.trim()}/friends/${user.uid.trim()}`,
                  )
                  .update(newProfile);
              } catch (error) {
                console.log(
                  'i dont exist on my friend List of friends =>> ',
                  error.message,
                );
              }
            });

            // * update user profile in the team
            //* if the player has a team
            if (team.uid) {
              const {availabilityData, isAvailable, uid, ...restProps} = user;
              await db()
                .doc(`teams/${team.uid}/members/${user.uid}`)
                .set(restProps);
              console.log('you updated your doc in the members collection ');
            }
          });
      } catch (error) {
        userDispatch(actionCreators.failure(error.message));
        console.log('updateProfile ERROR => ', error.message);
        return;
      }
    },
    [team, user, userDispatch],
  );

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
