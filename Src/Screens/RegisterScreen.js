import React from "react";
import {View,Text,TextInput,TouchableOpacity ,StyleSheet,Alert} from "react-native"
import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("db.db");
    return db;
  }
  
  const db = openDatabase();
const RegisterScreen = ({navigation}) =>{
    const [username, onChangeUserName] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    let register_user = () => {
        console.log(username, password);
    
        db.transaction(
            (tx) => {
              tx.executeSql("INSERT INTO table_user (user_name, user_pass) VALUES (?,?)", 
              [username,password],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
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
        <View style={style.container}>
            <Text>
                This is RegisterScreen
            </Text>
            <View style={style.inputeView}>
            <TextInput
                style={style.input}
                onChangeText={onChangeUserName}
                value={username}
                placeholder="Username"
            />
                 <TextInput
                style={style.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true} 
            />
            </View>
            <View style={{margin:5}}>
                <TouchableOpacity onPress={()=>{register_user()}} style={style.btn}>
                    <Text style={{padding:10, textAlign:'center'}}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        backgroundColor:"#FFF",
        borderWidth:1.5,
        margin:5
    }
})

export default RegisterScreen;