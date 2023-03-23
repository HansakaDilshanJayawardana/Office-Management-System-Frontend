import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { ScrollView } from "react-native-gesture-handler";
import { API_BASE_URL } from "../config";
import axios from "axios";

const ViewAllEmployees = ({ navigation: { navigate } }) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        getEmployees();
    }, []);
    
    const getEmployees = async () => {
        await axios.get(API_BASE_URL + '/employee/get-all')
        .then((res) => {
            console.log(res.data);
            setEmployees(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteEmployee = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmed) return;
        
        try {
            await axios.delete(API_BASE_URL + '/employee/delete/' + id);
            alert("Employee Deleted Successfully!");
            getEmployees();
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Employees</Text>
                <Text style={styles.subtitle}>Here are our Employees</Text>
            </View>
            <View style={styles.cardContainer}>
                { employees.length > 0 ? (
                    employees.map((item,index) => (
                        <TouchableOpacity
                            style={styles.card}
                            key={index}
                            onPress={() => navigate("EmployeeDetails", { employee: item })}
                        >
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardDescription}>{item.gender}</Text>
                            <Text style={styles.cardDescription}>{item.nic}</Text>
                            <Text style={styles.cardDescription}>{item.address}</Text>
                            <Text style={styles.cardDescription}>{item.contact}</Text>
                            <Text style={styles.cardDescription}>{item.email}</Text>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Ionicons name="trash-outline" size={24} color="red" style={styles.leftIcon} onPress={() => { deleteEmployee(item._id) }} />
                                <Ionicons name="pencil-outline" size={24} color="Colors.primary" style={styles.rightIcon} onPress={() => navigate("UpdateEmployee", { employee: item })} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                ):(
                    <Text style={styles.emptyText}>No employees found.</Text>
                )}
                <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.btnTxt} onPress={() => navigate("AddInventory")}>Add New Inventory</Text>
                </TouchableOpacity>
            </View>   
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingVertical: Spacing * 4,
        paddingHorizontal: Spacing * 3,
        marginBottom: Spacing * 3,
        alignItems: "center"
    },
    title: {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
        fontFamily: Font["poppins-bold"],
        marginVertical: Spacing * 3,
    },
    subtitle: {
        fontFamily: Font["poppins-regular"],
        fontSize: FontSize.small,
        marginTop: Spacing,
        maxWidth: "80%",
        textAlign: "center",
    },
    cardContainer: {
        paddingHorizontal: Spacing,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#e7feff',
        overflow: 'hidden',
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    leftIcon: {
        flex: 1,
    },
    rightIcon: {
        flex: 1,
        textAlign: 'right',
    },
    cardTitle: {
        fontFamily: Font["poppins-medium"],
        fontSize: FontSize.large,
        fontWeight: 'bold',
        color: Colors.primary,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    cardDescription: {
        fontFamily: Font["poppins-regular"],
        fontSize: FontSize.small,
        color: Colors.text,
        marginTop: Spacing,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    emptyText: {
        fontFamily: Font["poppins-medium"],
        fontSize: FontSize.medium,
        color: Colors.text,
        marginTop: Spacing * 2,
        textAlign: "center",
    },
    addBtn:{
        padding: Spacing * 1,
        backgroundColor: Colors.primary,
        marginVertical: 0,
        borderRadius: Spacing,
        marginTop: 20,
    },
    btnTxt:{
        fontFamily: Font["poppins-bold"],
        color: Colors.onPrimary,
        textAlign: "center",
        fontSize: FontSize.small,
    },
});

export default ViewAllEmployees;