// screens/TimeTableScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons if not already

// Define timetable for Tuesday to Saturday
const timetable = {
  Tuesday: [
    { time: "8:00–9:00 AM", subject: "MA23435 PSS", room: "A 308" },
    { time: "9:00–9:20 AM", subject: "BREAK", room: "🛑" },
    { time: "9:20–10:10 AM", subject: "CS23432 SC", room: "A 308" },
    { time: "10:10–11:50 AM", subject: "GE23627 DT", room: "TLGL1" },
    { time: "11:50 AM–12:30 PM", subject: "LUNCH", room: "🍽️" },
    { time: "12:30–1:20 PM", subject: "NPTEL", room: "A 308" },
    { time: "1:20–3:00 PM", subject: "CS23431 OS LAB", room: "TLFR1/JR3" },
  ],
  Wednesday: [
    { time: "8:00–9:00 AM", subject: "UID/IoT", room: "A 309" },
    { time: "9:00–9:20 AM", subject: "BREAK", room: "🛑" },
    { time: "9:20–10:10 AM", subject: "UID/IoT", room: "A 309" },
    { time: "10:10–11:50 AM", subject: "CS23431 OS LAB / MA23435 PSS LAB", room: "TLFR1/TLFL3" },
    { time: "11:50 AM–12:40 PM", subject: "LUNCH", room: "🍽️" },
    { time: "12:40–1:20 PM", subject: "NPTEL", room: "A 303" },
    { time: "1:20–3:00 PM", subject: "GE23627 DT", room: "TLGL1" },
  ],
  Thursday: [
    { time: "8:00–9:00 AM", subject: "CS23432 SC", room: "A 308" },
    { time: "9:00–9:20 AM", subject: "BREAK", room: "🛑" },
    { time: "9:20–10:10 AM", subject: "COUN", room: "A 308" },
    { time: "10:10–11:50 AM", subject: "CS23431 OS", room: "A 105" },
    { time: "11:50 AM–12:30 PM", subject: "LUNCH", room: "🍽️" },
    { time: "12:30–1:20 PM", subject: "UID/IoT", room: "A 304" },
    { time: "1:20–3:00 PM", subject: "CS23432 SC LAB / OS LAB", room: "JR3/TLFR1" },
  ],
  Friday: [
    { time: "8:00–9:00 AM", subject: "MA23435 PSS", room: "A 309" },
    { time: "9:00–9:20 AM", subject: "BREAK", room: "🛑" },
    { time: "9:20–10:10 AM", subject: "CS23432 SC", room: "A 309" },
    { time: "10:10–11:50 AM", subject: "GE23421 SS", room: "Tifac Core" },
    { time: "11:50 AM–12:30 PM", subject: "LUNCH", room: "🍽️" },
    { time: "12:30–1:20 PM", subject: "UID/IoT", room: "A 304" },
    { time: "1:20–3:00 PM", subject: "CS23431 OS", room: "A 105" },
  ],
  Saturday: [
    { time: "8:00–9:00 AM", subject: "CS23432 SC", room: "A 309" },
    { time: "9:00–9:20 AM", subject: "BREAK", room: "🛑" },
    { time: "9:20–10:10 AM", subject: "MA23435 PSS", room: "A 309" },
    { time: "10:10–11:50 AM", subject: "UID LAB / IoT LAB", room: "TLGL3 & TLFR1 / A 308" },
    { time: "11:50 AM–12:30 PM", subject: "LUNCH", room: "🍽️" },
    { time: "12:30–1:20 PM", subject: "LIB", room: "📚" },
    { time: "1:20–3:00 PM", subject: "MA23435 PSS LAB / OS LAB", room: "TLFLS / JR3" },
  ],
};

export default function TimetableScreen({ navigation }) {
  const [today, setToday] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const dateObj = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayName = days[dateObj.getDay()];
    const dateNumber = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];

    setToday(dayName);
    setCurrentDate(`${dayName}, ${dateNumber} ${monthName}`);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      {/* Display Timetable */}
      {timetable[today] ? (
        <>
          <Text style={styles.heading}>📚 {today}'s Timetable</Text>
          <FlatList
            data={timetable[today]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.card, item.subject === "BREAK" || item.subject === "LUNCH" ? styles.specialCard : null]}>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.subject}>{item.subject}</Text>
                <Text style={styles.room}>🏫 {item.room}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.noClasses}>🎉 No classes today! Enjoy your day!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  dateText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  heading: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  specialCard: {
    backgroundColor: "#444", // Different color for BREAK/LUNCH
  },
  time: {
    color: "#FFA500",
    fontSize: 18,
    fontWeight: "bold",
  },
  subject: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  room: {
    color: "#BBB",
    fontSize: 14,
    marginTop: 5,
  },
  noClasses: {
    color: "#0f0",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});