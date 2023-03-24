import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { React, useEffect, useState } from 'react';
import {
  Image, Switch, Text, TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { API_BASE_URL, storage } from '../config';
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";


const AddDocument = ({ navigation: { navigate } }) => {

  const [file, setFile] = useState(null);
  console.log(file)
  const [access, setAccess] = useState(false);
  const [user, setUser] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);



  useEffect(() => {
  }, [file]);

  const UploadFile = (blobFile, fileName, isUploadCompleted) => {
    if (!blobFile) return;
    const sotrageRef = ref(storage, `myDocs/${fileName}`); //LINE A
    const uploadTask = uploadBytesResumable(sotrageRef, blobFile); //LINE B
    uploadTask.on(
      "state_changed", null,
      (error) => console.log(error),
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { //LINE C
          console.log("File available at", downloadURL);
          setDownloadURL(downloadURL);
          isUploadCompleted(true)
          return downloadURL
        });
      }
    );
  }

  const handleFileUpload = async () => {
    try {
      const blobFile = new Blob([file], { type: file.mimeType });
      console.log("blob file" + blobFile)

      UploadFile(blobFile, file.name, async (isUploadCompleted) => {
        if (isUploadCompleted) {

          data = {
            title: file.name,
            url: downloadURL,
            type: file.mimeType,
            size: file.size,
            access: isEnabled ? 'public' : 'private',
            user: '64126902c6d195b55d636a26'
          }

          await axios.post(API_BASE_URL + 'document/add', data)
            .then((res) => {
              alert(res.data.message);
              navigate('DocumentHomeScreen');
            }).catch((err) => {
              console.log(err);
              // alert(err);
            })

        }
      });


    } catch (err) {
      console.log(err);
      alert(err);

    }
  };

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });
      //set File
      setFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        alert("cancelled");
      } else {
        console.log(err)
        alert(err);
      }
    }
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <ScrollView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Add Document
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Add your document
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.background,
              width: "100%",
              padding: Spacing * 2,
              borderRadius: Spacing,
              elevation: 5, // this adds a shadow to the view
              shadowColor: '#000', // shadow color
              shadowOffset: { width: 0, height: 2 }, // shadow offset
              shadowOpacity: 0.2, // shadow opacity
              shadowRadius: 4, // shadow radius
              padding: 20, // padding
            }}
          >
            {file ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: Spacing * 2,
                }}
              >
                <Text>Your selected File is</Text>

                {

                  file.mimeType === "application/pdf" ? (
                    <View
                      style={{
                        alignItems: "center",
                        marginVertical: Spacing * 2,
                      }}

                    >
                      <Image source={require('../assets/images/pdf.png')} style={{ width: 150, height: 150 }} />
                    </View>
                  ) : file.mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                    <View

                      style={{
                        alignItems: "center",
                        marginVertical: Spacing * 2,
                      }}
                    >
                      <Image source={require('../assets/images/word.png')} style={{ width: 150, height: 150 }} />
                    </View>
                  ) : file.mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                    <View

                      style={{
                        alignItems: "center",
                        marginVertical: Spacing * 2,
                      }}
                    >
                      <Image source={require('../assets/images/excel.png')} style={{ width: 150, height: 150 }} />
                    </View>
                  ) : file.mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                    <View

                      style={{
                        alignItems: "center",
                        marginVertical: Spacing * 2,
                      }}
                    >
                      <Image source={require('../assets/images/ppt.png')} style={{ width: 150, height: 150 }} />
                    </View>
                  ) : file.mimeType === "image/jpeg" ? (
                    <View

                      style={{
                        alignItems: "center",
                        marginVertical: Spacing * 2,
                      }}
                    >
                      <Image source={require('../assets/images/jpg.png')} style={{ width: 150, height: 150 }} />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        marginVertical: Spacing * 2,
                      }}

                    >
                      <Image source={require('../assets/images/unknown.png')} style={{ width: 150, height: 150 }} />
                    </View>
                  )
                }
                <Text> {file.name}</Text>
                <Text> {(file.size / (1000000)).toFixed(2)} MB</Text>
              </View>

            ) : (
              <Text>No File Selected</Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              {
                marginVertical: Spacing * 3,
                backgroundColor: Colors.lightPrimary,
                width: "100%",
                padding: Spacing * 2,
                borderRadius: Spacing,
                elevation: 5, // this adds a shadow to the view
                shadowColor: '#000', // shadow color
                shadowOffset: { width: 0, height: 2 }, // shadow offset
                shadowOpacity: 0.2, // shadow opacity
                shadowRadius: 4, // shadow radius
                padding: 20, // padding

              },
            ]}
            title="Upload File" onPress={() => selectFile()} >
            <Text style={{ fontFamily: Font["poppins-regular"] }}>Tap Here to Select File</Text>


          </TouchableOpacity>



          <View style={[
            {
              fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              marginVertical: Spacing,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]} >
            <Text

            >File Access:</Text>
            <Text>{isEnabled ? 'Public' : 'Private'}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{
                transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
          onPress={() => handleFileUpload()}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Add Now
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigate("Login")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            View Inventory
          </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default AddDocument;
