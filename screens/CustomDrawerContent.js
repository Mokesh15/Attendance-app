// screens/CustomDrawerContent.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: "#121212" }}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source = {'../assets/logo.png'} style={styles.logo} />
        <Text style={styles.welcomeText}>WELCOME !!</Text>
        <Text style={styles.nameText}>Name : Manoharan</Text>
        <Text style={styles.departmentText}>Department : CSE</Text>
        <Text style={styles.registerNumberText}>Register Number : 230701177</Text>
      </View>

      {/* Drawer Items */}
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} labelStyle={{ color: "#FFF" }} />
      </View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.drawerItem} onPress={() => alert("Light Mode Coming Soon!")}>
        <Ionicons name="settings-outline" size={22} color="#FFF" />
        <Text style={styles.drawerLabel}>Settings</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333"
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },
  nameText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  departmentText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center"
  },
  registerNumberText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center"
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333"
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#FFF"
  }
});