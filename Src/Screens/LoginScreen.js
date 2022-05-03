import React from "react";
import {View,Text,TextInput ,Button,StyleSheet} from "react-native"
import * as SQLite from "expo-sqlite";
import {openDatabase, createTable,getItem,insertItemFullVariation,selectItem,insertItemSingleVariation, insertItem,
  getItemSingleVar,getItemMultiVar} from "../Service.js";


  const db = openDatabase();
const LoginScreen = ({navigation}) =>{
        const [itemId, setItemId] = React.useState(null);
      const [variationId,setVariationId] = React.useState(null);
      const [valueId,setValueId] = React.useState(null);
    const [username, onChangeUserName] = React.useState("");
    const [Password, onChangePassword] = React.useState("");

    React.useEffect(()=>{
      createTable();
    },[])


    const login =()=>{
      selectItem();
    }

    const genTest = async() => {
      await getItem().then((value) =>{
        console.debug(JSON.stringify(value));
      })
      await getItemSingleVar().then((value) =>{
        console.debug(JSON.stringify(value));
      })
      await getItemMultiVar().then((value) =>{
        console.debug(JSON.stringify(value));
      })

       /* db.transaction((tx)=>{
          tx.executeSql(
            "INSERT INTO table_item (item_name, item_price) VALUES (?,?)",
            ["itemA","123"],
            (tx,result1)=>{
              tx.executeSql("INSERT INTO table_variation (variation_name,item_reference) VALUES (?,?)",
              ["COLOR",result1.insertId],
              (tx,result2)=>{
                tx.executeSql("INSERT INTO table_variationvalue (variationvalue_name, variation_reference) VALUES (?,?)",
                ["RED",result2.insertId],
                (tx,result3)=>{
                  tx.executeSql("INSERT INTO table_variationvalue (variationvalue_name, parent_reference) VALUES (?,?)",
                  ["11",result3.insertId],
                    
                  )
                  console.debug(result3.rowsAffected)
                }

                )}

              )}

          )} 

        )*/
     
      

    }

    return(
        <View style={style.container}>
            <Text>
                This is LoginScreen
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
                value={Password}
                placeholder="Password"
                secureTextEntry={true} 
            />
            </View>
            <View style={{margin:10, flexDirection:'row', justifyContent:'space-between'}}>
                <Button 
                    onPress={()=>{
                        login();
                    }}
                    title="Login"/>
                <Button   
                    onPress={() => navigation.navigate('Register')}
                    title="Register"/>

                <Button   
                    onPress={()=>{genTest()}}
                    title="Gen"/>
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

    
})
export default LoginScreen;