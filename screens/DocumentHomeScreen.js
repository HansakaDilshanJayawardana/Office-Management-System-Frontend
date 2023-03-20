import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { React, useEffect, useState } from "react";
import {
  Text, TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { API_BASE_URL } from "../config";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const DocumentHomeScreen = ({ navigation: { navigate } }) => {

  const [files, setFiles] = useState([]);
  const [userID, setUserID] = useState('64126902c6d195b55d636a26');
  const [refreshing, setRefreshing] = useState(false);

  console.log(files)
  //get all files
  useEffect(() => {
    getFiles();
  }, []);


  const getFiles = async () => {
    console.log("getting files");
    await axios.get(API_BASE_URL + 'document/get/' + userID + '/')
      .then((res) => {
        setFiles(res.data.data);
      }).catch((err) => {
        console.log(err);
        alert("get files error " + err);
      })
  }

  const onRefresh = () => {
    console.log("refreshing");
    setRefreshing(true);
    // Your code to refresh the page goes here
    // For example, you could call a function that fetches new data and updates the state
    getFiles();
    setTimeout(() => setRefreshing(false), 2000); // Simulate a delay for demonstration purposes
  };

  return (
    <View

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {
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
          }

        </ScrollView>



      </View>
    </View>
  );
};

export default DocumentHomeScreen;
