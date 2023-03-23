import React, { useState, useEffect } from 'react';
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

const UpdateEmployee = ({ route, navigation: { navigate } }) => {
    const { employee } = route.params;
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setName(employee.name);
        setGender(employee.gender);
        setNic(employee.nic);
        setAddress(employee.address);
        setContact(employee.contact);
        setEmail(employee.email);
        setEmployeeId(employee._id);
        setLoading(false);
    }, []);

    const updateEmployee = async () => {
        setLoading(true);
        const data = {
        name: name,
        gender: gender,
        nic: nic,
        address: address,
        contact: contact,
        email: email
        };
    
        await axios.put(`${API_BASE_URL}/employee/update/${employeeId}`, data)
        .then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                alert("Employee Updated Successfully!");
                navigate("EmployeeHomeScreen");
            } 
        })
        .catch((err) => {
            console.log(err);
            alert(err.response.data.message);
        })
        .finally(() => setLoading(false));
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
                        Update Employee
                    </Text>
                    <Text style={{
                        fontFamily: Font["poppins-regular"],
                        fontSize: FontSize.small,
                        maxWidth: '80%',
                        textAlign: 'center'
                        }}>
                        Fill in the form with updated Employee Details
                    </Text>
                </View>
                <View style={{ marginVertical: Spacing * 3 }}>
                    <AppTextInput placeholder={name} onChangeText={(text) => setName(text)} />
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
                    <AppTextInput placeholder={nic} onChangeText={(text) => setNic(text)} />
                    <AppTextInput placeholder={address} onChangeText={(text) => setAddress(text)} />
                    <AppTextInput placeholder={contact} onChangeText={(text) => setContact(text)} />
                    <AppTextInput placeholder={email} onChangeText={(text) => setEmail(text)} />
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
                onPress={() => updateEmployee(employeeId)}
                >
                    <Text
                        style={{
                        fontFamily: Font["poppins-bold"],
                        color: Colors.onPrimary,
                        textAlign: "center",
                        fontSize: FontSize.large,
                        }}
                    >
                        Update Now
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default UpdateEmployee;