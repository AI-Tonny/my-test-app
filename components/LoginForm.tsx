import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const loginUser = () => {
        let isEmailValid = email.includes('@');
        let isPasswordValid = password.length >= 6;

        setEmailError(isEmailValid ? "" : "Incorrect email address, there must be @ in it.");
        setPasswordError(isPasswordValid ? "" : "Password must be at least 6 characters");

        if (!isEmailValid || !isPasswordValid) return;

        alert("Login process...");
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoWithText}>
                <Image style={styles.logoImage} source={require("../assets/images/logo/SencereLogo.png")}/>
                <Text style={{marginLeft: 12, fontSize: 18}}>Sencere AI</Text>
            </View>

            <Text style={styles.greetingLoginText}>Hi, it&apos;s your time to log in.</Text>

            <TextInput style={styles.emailInput} placeholder="your_email@gmail.com" onChangeText={setEmail} keyboardType="email-address"></TextInput>
            {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}

            <TextInput style={styles.passwordInput} placeholder="******" onChangeText={setPassword} secureTextEntry={true}></TextInput>
            {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text>: null}

            <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
                <Text style={{fontSize: 15}}>Log in</Text>
            </TouchableOpacity>

            <View style={styles.suggestionSignupText}>
                <Text>Don&apos;t have an account? </Text>
                <TouchableOpacity><Text style={styles.signupText}>Sign up!</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',

        borderRadius: 15,
        backgroundColor: 'rgba(1,133,212,0.75)',

        width: '85%',
        height: '60%'
    },

    logoWithText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        height: '15%',
        width: '70%',

        marginTop: 15
    },

    logoImage: {
        width: '25%',
        height: '70%'
    },

    greetingLoginText: {
        fontSize: 22,
        marginTop: 30
    },

    emailInput: {
        borderRadius: 15,
        backgroundColor: '#fff',

        width: '80%',
        height: '10%',

        marginTop: 35,
        paddingLeft: 10
    },

    passwordInput: {
        borderRadius: 15,
        backgroundColor: '#fff',

        width: '80%',
        height: '10%',

        marginTop: 25,
        paddingLeft: 10
    },

    errorMessage: {
        color: 'red',
        fontSize: 13,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: 5
    },

    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 15,
        backgroundColor: '#00609a',

        width: '30%',
        height: '10%',

        marginTop: 40
    },

    suggestionSignupText: {
        flexDirection: 'row',

        marginTop: 35
    },

    signupText: {
        color: '#ffffff',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    }
})

export default LoginForm