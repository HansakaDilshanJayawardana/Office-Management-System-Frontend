import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import { API_BASE_URL } from '../config';
import { Picker } from '@react-native-picker/picker';

const AddEmployee = ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const addEmployee = async () => {
    const data = {
      name: name,
      gender: gender,
      nic: nic,
      address: address,
      contact: contact,
      email: email
    };
 
    await axios.post(API_BASE_URL+'/employee/add', data)
    .then((res) => {
      console.log(res.data);
      if (res.status === 201) {
        alert("Employee Added Successfully!");
        navigate("EmployeeHomeScreen");
      } 
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });
  }

return (
    <ScrollView>
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3
            }}>
            Add Employee
          </Text>
          <Text style={{
              fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              maxWidth: '80%',
              textAlign: 'center'
            }}>
            Fill in the form with new Employee Details
          </Text>
        </View>
        <View style={{ marginVertical: Spacing * 3 }}>
          <AppTextInput placeholder="Name" onChangeText={(text) => setName(text)} />
          <Picker
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
            style={{ fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small, 
              height: 65, padding: Spacing * 2, 
              backgroundColor: Colors.lightPrimary, 
              marginVertical: Spacing,}}
          >
            <Picker.Item label="Select Gender" value="" style={{color: Colors.darkText}} />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
          <AppTextInput placeholder="NIC" onChangeText={(text) => setNic(text)} />
          <AppTextInput placeholder="Address" onChangeText={(text) => setAddress(text)} />
          <AppTextInput placeholder="Contact Number" onChangeText={(text) => setContact(text)} />
          <AppTextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
        </View>
        <TouchableOpacity style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing
          }}
          onPress={() => addEmployee()}
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
      </View>
    </ScrollView>
  );
};

export default AddEmployee;
