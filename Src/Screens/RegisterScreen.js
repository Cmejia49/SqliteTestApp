import React from "react";
import {StyleSheet,Alert} from "react-native"
import * as SQLite from "expo-sqlite";
import { Layout, Text,Button,Input  } from '@ui-kitten/components';
import {openDatabase} from "../Service.js";
const db = openDatabase();
const RegisterScreen = ({navigation}) =>{
    const [username, onChangeUserName] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    let register_user = () => {
    
        db.transaction(
            (tx) => {
              tx.executeSql("INSERT INTO table_user (user_name, user_pass) VALUES (?,?)", 
              [username,password],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Login'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else Alert('Registration Failed');
              });
            },
          );
      
      };
    


    return(
        <Layout style={style.container}>
            <Layout style={style.inputeView}>
            <Input
                style={style.input}
                onChangeText={onChangeUserName}
                value={username}
                placeholder="Username"
            />
                 <Input
                style={style.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true} 
            />
            </Layout>
            <Layout style={{margin:5}}>
                <Button onPress={()=>{register_user()}} style={style.btn}>
                   <Text style={{color:"#000"}}>Register</Text>
                </Button>
            </Layout>
        </Layout>
    )
}
const style = StyleSheet.create({
    container:{
        flex:1,
        margin:5
    },

    inputeView:{
        justifyContent:'space-between'
    },
    
    input:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10
    },

    btn:{
        borderWidth:1.5,
        margin:5
    }
})

export default RegisterScreen;