import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { React, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  StyleSheet, Text, TouchableHighlight, TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { API_BASE_URL } from "../config";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

import { A } from '@expo/html-elements';
import { SwipeListView } from 'react-native-swipe-list-view';


const DocumentHomeScreen = ({ navigation: { navigate } }) => {

  const [files, setFiles] = useState([]);
  console.log("files", files)
  const [userID, setUserID] = useState('64126902c6d195b55d636a26');
  const [refreshing, setRefreshing] = useState(false);

  //get all files
  useEffect(() => {
    getFiles();
  }, []);


  const getFiles = async () => {
    await axios.get(API_BASE_URL + '/document/get/' + userID + '/')
      .then((res) => {
        //insert key to each object
        res.data.data.map((item, index) => {
          item.key = index.toString();
        })
        setFiles(res.data.data);
      }).catch((err) => {
        console.log(err);
        alert("get files error " + err);
      })
  }

  const deleteDocument = async (key) => {
    //get document _id using key
    const documentID = files[key]._id;

    await axios.delete(API_BASE_URL + '/document/delete/' + documentID)
      .then((res) => {
        alert("delete success");
        getFiles();
      }).catch((err) => {
        console.log(err);
        alert("delete error " + err);
      })
  }

  const onRefresh = () => {
    setRefreshing(true);
    // Your code to refresh the page goes here
    // For example, you could call a function that fetches new data and updates the state
    getFiles();
    setTimeout(() => setRefreshing(false), 2000); // Simulate a delay for demonstration purposes
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);

    //aleart confirmation
    alert("Are you sure you want to delete this document?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed")
      },
      {
        text: "OK",
        onPress: () => console.log("ok Pressed")
      }
    ]);

    //delete document
    deleteDocument(rowKey);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItem = files => (

    <TouchableHighlight
      // onPress={() => Linking.openURL(files.item.url)}
      style={styles.rowFront}
      underlayColor={'#AAA'}
    >
      <A href={files.item.url}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {

              files.item.type === "application/pdf" ? (
                <Image source={require('../assets/images/pdf.png')} style={{ width: 75, height: 75, marginRight: 10 }} />
              ) : files.item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <Image source={require('../assets/images/word.png')} style={{ width: 70, height: 70, marginRight: 15 }} />
              ) : files.item.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                <Image source={require('../assets/images/excel.png')} style={{ width: 70, height: 70, marginRight: 15 }} />
              ) : files.item.type === "text/csv" ? (
                <Image source={require('../assets/images/excel.png')} style={{ width: 70, height: 70, marginRight: 15 }} />
              ) : files.item.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                <Image source={require('../assets/images/ppt.png')} style={{ width: 65, height: 65, marginRight: 20 }} />
              ) : files.item.type === "image/jpeg" ? (
                <Image source={require('../assets/images/jpg.png')} style={{ width: 75, height: 75, marginRight: 10 }} />
              ) : (
                <Image source={require('../assets/images/unknown.png')} style={{ width: 75, height: 75, marginRight: 10 }} />
              )
            }
            <View
              style={{
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.darkText,
                  fontFamily: Font["poppins-regular"],
                  overflow: "hidden",
                  maxWidth: 300,
                }}
              >
                {files.item.title}
              </Text>
              <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.darkText,
                  fontFamily: Font["poppins-regular"],
                }}
              >
                Access: {files.item.access}
              </Text>
              <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.darkText,
                  fontFamily: Font["poppins-regular"],
                }}
              >
                Size: {(files.item.size / (1000000)).toFixed(2)} MB
              </Text>

            </View>


          </View>
        </View>
      </A>
    </TouchableHighlight>
  );

  const renderHiddenItem = (files, rowMap) => (
    <View style={styles.rowBack}>
      {/* <Text>Left</Text> */}
      <TouchableOpacity
        style={[styles.backLeftBtn]}
        onPress={() => closeRow(rowMap, files.item.key)}
      >
        <Text style={styles.backTextWhite}>update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, files.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
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
            Document Home Page
          </Text>
        </View>

        {/* //add document */}
        <TouchableOpacity

          style={{
            backgroundColor: Colors.lightPrimary,
            padding: Spacing * 2,
            borderRadius: 10,
            marginBottom: Spacing * 2,
          }}

          onPress={() => navigate("AddDocument")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // alignItems: "center",
              backgroundColor: Colors.light,
            }}
          >

            <Text
              style={{
                fontSize: FontSize.large,
                color: Colors.darkText,
                fontFamily: Font["poppins-regular"],
              }}
            >
              Add Document
            </Text>

            <Ionicons

              name="add-circle-outline"
              size={24}
              color={Colors.primary}
            />
          </View>
        </TouchableOpacity>

        {/* //display files  */}
        <ScrollView

        >
          {/* {
            refreshing ? (
              <View
                style={{
                  marginTop: Spacing * 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <Text
                  style={{
                    fontSize: FontSize.large,
                    color: Colors.darkText,
                    fontFamily: Font["poppins-regular"],

                  }}
                >loading...</Text>
              </View>
            ) : (
              files.map((file, index) => (

                <View
                  key={index}
                  style={{
                    backgroundColor: Colors.light,
                    padding: Spacing * 2,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: Colors.background,
                      width: "100%",
                      // padding: Spacing * 2,
                      borderRadius: Spacing,
                      elevation: 5, // this adds a shadow to the view
                      shadowColor: '#000', // shadow color
                      shadowOffset: { width: 0, height: 2 }, // shadow offset
                      shadowOpacity: 0.2, // shadow opacity
                      shadowRadius: 4, // shadow radius
                      padding: 20, // padding
                    }}
                  >
                    {

                      file.type === "application/pdf" ? (
                        <Image source={require('../assets/images/pdf.png')} style={{ width: 75, height: 75, marginRight: 10 }} />
                      ) : file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                        <Image source={require('../assets/images/word.png')} style={{ width: 70, height: 70, marginRight: 15 }} />
                      ) : file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                        <Image source={require('../assets/images/excel.png')} style={{ width: 70, height: 70, marginRight: 15 }} />
                      ) : file.type === "text/csv" ? (
                        <Image source={require('../assets/images/excel.png')} style={{ width: 70, height: 70, marginRight: 15 }} />
                      ) : file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                        <Image source={require('../assets/images/ppt.png')} style={{ width: 65, height: 65, marginRight: 20 }} />
                      ) : file.type === "image/jpeg" ? (
                        <Image source={require('../assets/images/jpg.png')} style={{ width: 75, height: 75, marginRight: 10 }} />
                      ) : (
                        <Image source={require('../assets/images/unknown.png')} style={{ width: 75, height: 75, marginRight: 10 }} />
                      )
                    }
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FontSize.large,
                          color: Colors.darkText,
                          fontFamily: Font["poppins-regular"],
                          overflow: "hidden",
                          maxWidth: 300,
                        }}
                      >
                        {file.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.large,
                          color: Colors.darkText,
                          fontFamily: Font["poppins-regular"],
                        }}
                      >
                        Access: {file.access}
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.large,
                          color: Colors.darkText,
                          fontFamily: Font["poppins-regular"],
                        }}
                      >
                        Size: {(file.size / (1000000)).toFixed(2)} MB
                      </Text>

                    </View>


                  </View>
                </View>
              ))
            )
          } */}
          <View style={styles.container}>
            <SwipeListView
              data={files}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-75}
              previewRowKey={'0'}
              previewOpenValue={-75}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          </View>
        </ScrollView>



      </View>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: Spacing,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {

    backgroundColor: Colors.background,
    width: "100%",
    borderRadius: Spacing,
    elevation: 5, // this adds a shadow to the view
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.2, // shadow opacity
    shadowRadius: 4, // shadow radius
    padding: 20, // padding
    marginBottom: Spacing,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    width: "98%",
    borderRadius: Spacing,
    height: 120,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderRadius: Spacing,
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    top: 0,
    position: 'absolute',
    width: 75,
    backgroundColor: 'blue',
    borderRadius: Spacing,
    justifyContent: 'center',
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderRadius: Spacing,
  },
});

export default DocumentHomeScreen;
