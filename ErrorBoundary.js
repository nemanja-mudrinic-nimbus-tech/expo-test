import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Sentry from "sentry-expo";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ Error caught in ErrorBoundary:", error, errorInfo);
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Something went wrong.</Text>
          <Text style={styles.details}>{this.state.errorMessage}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  details: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
});

export default ErrorBoundary;
