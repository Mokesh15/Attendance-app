// screens/HomeScreen.js
import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [showAttendanceSummary, setShowAttendanceSummary] = useState(false);
  const [showSubjectWise, setShowSubjectWise] = useState(false);
  const [showAttendanceProgress, setShowAttendanceProgress] = useState(false);

  const overallAttendance = 75;
  const totalClasses = 100;
  const consistencyLevel = 85;
  const punctualityScore = 90;

  const today = new Date();
  const day = today.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[today.getMonth()];

  // Attendance Chart Data
  const attendanceData = [
    { name: "Attended", population: overallAttendance, color: "#4CAF50", legendFontColor: "#FFF" },
    { name: "Missed", population: totalClasses - overallAttendance, color: "#F44336", legendFontColor: "#FFF" }
  ];

  // Android-specific adjustments
  const androidPaddingTop = Platform.OS === 'android' ? 30 : 0;
  const cardMarginBottom = Platform.OS === 'android' ? 12 : 15;
  const buttonMarginTop = Platform.OS === 'android' ? 16 : 20;

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: androidPaddingTop }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header with Menu Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.heading}>📊 Attendance Dashboard</Text>
      </View>

      {/* Overall Attendance Stats */}
      <View style={[styles.attendanceSummary, { marginBottom: cardMarginBottom }]}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Overall Attendance</Text>
          <Text style={styles.summaryValue}>{overallAttendance}%</Text>
          <Text style={styles.summarySubtext}>{overallAttendance}/{totalClasses} classes</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Consistency</Text>
          <Text style={styles.summaryValue}>{consistencyLevel}%</Text>
          <Text style={styles.summarySubtext}>Weekly average</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Punctuality</Text>
          <Text style={styles.summaryValue}>{punctualityScore}%</Text>
          <Text style={styles.summarySubtext}>On-time arrivals</Text>
        </View>
      </View>

      {/* Attendance Summary (Pie Chart) */}
      <TouchableOpacity 
        onPress={() => setShowAttendanceSummary(!showAttendanceSummary)} 
        style={[styles.cardHeader, { marginBottom: showAttendanceSummary ? 5 : cardMarginBottom }]}
      >
        <Text style={styles.subHeading}>Attendance Summary {showAttendanceSummary ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {showAttendanceSummary && (
        <View style={[styles.card, { marginBottom: cardMarginBottom }]}>
          <PieChart
            data={attendanceData}
            width={screenWidth * 0.9}
            height={180}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )}

      {/* Subject-wise Attendance (Bar Chart) */}
      <TouchableOpacity 
        onPress={() => setShowSubjectWise(!showSubjectWise)} 
        style={[styles.cardHeader, { marginBottom: showSubjectWise ? 5 : cardMarginBottom }]}
      >
        <Text style={styles.subHeading}>Subject-wise Attendance {showSubjectWise ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {showSubjectWise && (
        <View style={[styles.card, { marginBottom: cardMarginBottom }]}>
          <BarChart
            data={{
              labels: ["SC", "OS", "DT", "PSS", "IOT"],
              datasets: [{ data: [60, 70, 65, 100, 80] }]
            }}
            width={screenWidth * 0.9}
            height={220}
            yAxisSuffix="%"
            chartConfig={chartConfig}
            fromZero
            showBarTops={false}
            withInnerLines={false}
          />
        </View>
      )}

      {/* Attendance Progress (Line Chart) */}
      <TouchableOpacity 
        onPress={() => setShowAttendanceProgress(!showAttendanceProgress)} 
        style={[styles.cardHeader, { marginBottom: showAttendanceProgress ? 5 : cardMarginBottom }]}
      >
        <Text style={styles.subHeading}>Attendance Trend {showAttendanceProgress ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {showAttendanceProgress && (
        <View style={[styles.card, { marginBottom: cardMarginBottom }]}>
          <LineChart
            data={{
              labels: ["W1", "W2", "W3", "W4", "W5"],
              datasets: [{ 
                data: [10, 25, 15, 30, 35],
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                strokeWidth: 2
              }]
            }}
            width={screenWidth * 0.9}
            height={220}
            yAxisSuffix="%"
            chartConfig={chartConfig}
            bezier
            withVerticalLines={false}
            withHorizontalLines={false}
          />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { marginTop: buttonMarginTop }]} 
          onPress={() => navigation.navigate("Timetable")}
        >
          <LinearGradient 
            colors={["#26a69a", "#00796b"]} 
            style={styles.buttonIcon}
          >
            <Ionicons name="calendar" size={24} color="#FFF" />
          </LinearGradient>
          <Text style={styles.buttonText}>Timetable</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { marginTop: buttonMarginTop }]} 
          onPress={() => navigation.navigate("QRScanner")}
        >
          <LinearGradient 
            colors={["#5C6BC0", "#3949AB"]} 
            style={styles.buttonIcon}
          >
            <Ionicons name="qr-code" size={24} color="#FFF" />
          </LinearGradient>
          <Text style={styles.buttonText}>Scan QR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Chart configuration
const chartConfig = {
  backgroundGradientFrom: "#1E1E1E",
  backgroundGradientTo: "#1E1E1E",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForLabels: {
    fontSize: 12,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#4CAF50"
  },
  decimalPlaces: 0,
  barPercentage: 0.7,
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS === 'android' ? 10 : 0,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  heading: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  attendanceSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
  },
  summaryCard: {
    alignItems: "center",
    flex: 1,
  },
  summaryTitle: {
    color: "#BBB",
    fontSize: 14,
    fontWeight: "500",
  },
  summaryValue: {
    color: "#4CAF50",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  summarySubtext: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },
  cardHeader: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
  },
  subHeading: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 14,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});