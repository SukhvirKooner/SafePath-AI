import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Login attempt with:", { name, password });
    } else {
      console.log("Signup attempt with:", { name, email, password });
    }
  };

  return (
    <View style={styles.container}>
      {/* Circular Logo */}
      {/* <Image source={require("./assets/logo.png")} style={styles.logo} /> */}
      
      {/* SafePath AI Title */}
      <Text style={styles.title}>SafePath AI</Text>

      {/* Auth Form */}
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>
        <Text style={styles.subText}>
          {isLogin ? "Sign in to continue" : "Create a new account"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#7D7D7D"
        />
        
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#7D7D7D"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#7D7D7D"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText} onPress={() => navigation.replace('Info')} >{isLogin ? "Log In" : "Sign Up"}</Text>
        </TouchableOpacity>

        {isLogin ? (
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={styles.switchText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FBEF",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 40,
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
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
  button: {
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
});


export default LoginScreen;
