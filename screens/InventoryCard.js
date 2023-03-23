import React, { useState, useEffect }  from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  VirtualizedList
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from '../config';
import axios from 'axios'

const InventoryCard = ({ navigation: { navigate } }) => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    getInventories();
  }, []);

  const getInventories = async () => {
    await axios.get(API_BASE_URL+'/inventory/get')
    .then((res) => {
        console.log(res.data.data);
        setInventories(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
  }

  //Delete Items in the Cart by id Function
  const deleteInventory = async (id) => {
    await axios.delete(API_BASE_URL+'/inventory/delete/' + id)
      .then((res) => {
        alert("Inventory Deleted Successfully");
        console.log(res.data);
        getInventories();
      }).catch((err) => {
        console.log(err);
        alert("Inventory Not Deleted");
      });
  }

  return (
  <ScrollView>
      <View style={{
          padding: Spacing * 2,
        }}>
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
    Inventories
            </Text>
            <Text
                style={{
                fontFamily: Font["poppins-regular"],
                fontSize: FontSize.small,
                maxWidth: "80%",
                textAlign: "center",
                }}
            >
                Here are your Inventories
            </Text>
        </View>
        {inventories.length > 0 ? (
        inventories.map((item,index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.name}>Name:           {item.name}</Text>
            <Text style={styles.price}>Price:              {item.price}</Text>
            <Text style={styles.price}>Quantity:        {item.quantity}</Text>
            <Text style={styles.price}>Description:   {item.description}</Text>
            <TouchableOpacity style={styles.buttonContainer}>
                <Ionicons name="trash-outline" size={24} color="red" style={styles.leftIcon} onPress={() => { deleteInventory(item._id) }} />
                <Ionicons name="pencil-outline" size={24} color="Colors.primary" style={styles.rightIcon} onPress={() => navigate("UpdateInventory", { inventory: item })} />
            </TouchableOpacity>
          </View>
        ))
        ):(
          <></>
        )}
        <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.btnTxt} onPress={() => navigate("AddInventory")}>Add New Inventory</Text>
            </TouchableOpacity>
      </View>     
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#87cefa',
    overflow: 'hidden',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  btnTxt:{
    fontFamily: Font["poppins-bold"],
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  delbtn: {
    padding: Spacing * 1,
    backgroundColor: '#ff0000',
    marginVertical: 0,
    borderRadius: Spacing,
    shadowColor: '#ff0000',
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  updteBtn:{
    padding: Spacing * 1,
    backgroundColor: '#333399',
    marginVertical: Spacing * 1,
    borderRadius: Spacing,
    shadowColor: '#333399',
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  addBtn:{
    padding: Spacing * 1,
    backgroundColor: Colors.primary,
    marginVertical: 0,
    borderRadius: Spacing,
    marginTop: 20,
   
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
      color: "#000080",
      flex: 1,
      textAlign: 'right',
  },
});
export default InventoryCard;