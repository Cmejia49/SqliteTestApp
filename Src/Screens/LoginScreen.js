import React from "react";
import {StyleSheet} from "react-native"
import {openDatabase, createTable} from "../Service.js";
import {Layout,Button,Input  } from '@ui-kitten/components';

const db = openDatabase();

const LoginScreen = ({navigation}) =>{
    const [username, onChangeUserName] = React.useState("");
    const [Password, onChangePassword] = React.useState("");

    React.useEffect(async ()=>{
      await createTable();
    },[])


 
    const login =()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                'SELECT * FROM table_user WHERE user_name = ? AND user_pass = ?',
                [username,Password],
                (tx, results) => {
                  var len = results.rows.length;

                  if (len > 0) {
                    navigation.navigate("Home")
                  } else {
                    alert('Username or Password is wrong');
                  }
                }
              );
        })
    }

  
    

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
                value={Password}
                placeholder="Password"
                secureTextEntry={true} 
            />
              <Layout style={{flexDirection:'row', justifyContent:'center', marginTop:15}}>
                <Button style={{margin:5}}  status='primary'
                    onPress={()=>{
                        login();
                    }}>Login</Button>
                <Button style={{margin:5}}  status='primary' onPress={() => navigation.navigate('Register')}>Register</Button>

              </Layout>

            </Layout>
      
        </Layout>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },

    inputeView:{
        flex:1,
        marginBottom:20,
        justifyContent:'center'
    },
    
    input:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10
    },

    
})
export default LoginScreen;