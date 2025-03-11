import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Alert
} from "react-native";

interface AuthFormProps {
  onAuthentication: () => void;
}
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <MainScreen onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <AuthForm onAuthentication={() => setIsLoggedIn(true)} />
      )}
    </View>
  );
};

const AuthForm: React.FC<AuthFormProps> = ({ onAuthentication }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

const handleSubmit = () => {
  if (!password.trim()) {
    Alert.alert("Error", "Please fill in the password.");
    return;
  }

  // Check if name is filled (only required for signup)
  if (!isLogin && !name.trim()) {
    Alert.alert("Error", "Please fill in your name.");
    return;
  }

    // Regular expression for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  

  setError(""); // Clear error if validation passes
  onAuthentication(); // Proceed with authentication
};

return (
  <View style={styles.authContainer}>
    <Image source={require("./assets/logo.png")} style={styles.logo} />

    <View style={styles.authForm}>
      <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>
      <Text style={styles.subText}>
        {isLogin ? "Log in to continue" : "Create a new account"}
      </Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#7D7D7D"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#7D7D7D"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
        

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#7D7D7D"
        secureTextEntry
      />

      <TouchableOpacity style={styles.authButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? "Log In" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.title}>SafePath AI</Text>
  </View>
);
};
// Define the type for MainScreen props
interface MainScreenProps {
  onLogout: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onLogout }) =>  {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const fadeAnimText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeAnimText, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <TouchableOpacity style={styles.logoutButtonNew} onPress={onLogout} activeOpacity={0.8}>
        <Text style={styles.logoutButtonTextNew}>Logout</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.box,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <Animated.View style={{ opacity: fadeAnimText }}>
          <Text style={styles.mainTitle}>
            "No more fear,{"\n"}just safe path{"\n"}ahead!"
          </Text>
        </Animated.View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.locationInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter Your Location"
            placeholderTextColor="#7D7D7D"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.locationInput}
            value={destination}
            onChangeText={setDestination}
            placeholder="Enter Your Destination"
            placeholderTextColor="#7D7D7D"
          />
        </View>
        
        <TouchableOpacity style={styles.authButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Animated.View
          style={{
            opacity: fadeAnimText,
            transform: [{ translateY: translateYAnim }],
          }}
        >
          <View style={styles.assistantMessage}>
            <Text style={styles.assistantText}>
              Hello! I'm your AI assistant, guiding you through the safest and
              fastest routes. Your safety is our priority - let's navigate with
              confidence!
            </Text>
          </View>
          <Text style={styles.assistantName}>SafePath AI</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBEF",
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#F8FBEF",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    marginTop: 30,
  },
  authForm: {
    width: "85%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "#7D7D7D",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "rgba(52, 152, 219, 0.2)",
    borderWidth: 1,
    marginBottom: 15,
    color: "#2C3E50",
  },
  authButton: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  switchText: {
    color: "#3498DB",
    fontSize: 14,
    marginTop: 10,
  },
  box: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FBEF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainerDark: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    padding: 12,
    color: "#2C3E50",
  },
  destinationInput: {
    flex: 1,
    padding: 12,
    color: "#FFFFFF",
  },
  assistantMessage: {
    backgroundColor: "#F0F8FF",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  assistantText: {
    fontSize: 14,
    color: "#2C3E50",
    textAlign: "center",
  },
  assistantName: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  logo: {
    width: 160, // Adjust the size as needed
    height: 160, // Adjust the size as needed
    marginBottom: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 40, // Adjust the position as needed
    right: 20, // Adjust the position as needed
    padding: 10,
    backgroundColor: "#4CAF50", // Match the theme's green color
    borderRadius: 10, // Match the theme's border radius
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Add shadow to match the theme
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  logoutButtonText: {
    color: "#FFFFFF", // White text to match the theme
    fontSize: 14,
    fontWeight: "600",
  },
  logoutButtonNew: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50', // Nice green color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  
  logoutButtonTextNew: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
});

export default App;