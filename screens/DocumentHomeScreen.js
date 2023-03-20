import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import { ScrollView } from "react-native-gesture-handler";

const DocumentHomeScreen = ({ navigation: { navigate } }) => {
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

      </View>
    </ScrollView>
  );
};

export default DocumentHomeScreen;
