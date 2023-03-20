import { React, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  PermissionsAndroid,
  Switch,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import * as DocumentPicker from 'expo-document-picker';
import { API_BASE_URL } from '../config';
import axios from 'axios';



const AddDocument = ({ navigation: { navigate } }) => {

  const [file, setFile] = useState(null);
  const [access, setAccess] = useState(false);
  const [user, setUser] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);


  useEffect(() => {
    console.log(file);
  }, [file]);

  // async function requestExternalStoragePermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'File Access Permission',
  //         message: 'App needs access to your files',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('External storage permission granted');
  //     } else {
  //       console.log('External storage permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }


  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', "test token");
      formData.append('access', isEnabled);
      await axios.post('http://192.168.8.100:4000/document/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          }
          })
      .then((res) => {
        console.log(res.data);
        alert(res.data);

      }).catch((err) => {
        console.log(err);
        alert(err);
      })

      // console.log(response.data);
      // alert(response.data);
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
      console.log(
        result.uri,
        result.type, // mime type
        result.name,
        result.size
      );
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
            <Text style={{ fontFamily: Font["poppins-regular"] }}>Tap Here to Upload File</Text>


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
