import React from "react";
import {View,TextInput,StyleSheet} from "react-native"
import * as SQLite from "expo-sqlite";
import {openDatabase, createTable,getItem,insertItemFullVariation,selectItem,insertItemSingleVariation, insertItem,
  getItemSingleVar,getItemMultiVar,update} from "../Service.js";

  import { ApplicationProvider, Layout, Text,Button,Input  } from '@ui-kitten/components';
  const db = openDatabase();
const LoginScreen = ({navigation}) =>{
        const [itemId, setItemId] = React.useState(null);
      const [variationId,setVariationId] = React.useState(null);
      const [valueId,setValueId] = React.useState(null);
    const [username, onChangeUserName] = React.useState("");
    const [Password, onChangePassword] = React.useState("");

    React.useEffect(async ()=>{
      await createTable();
    },[])


    const login =()=>{
     update(3,1)
    }

    const genTest = async() => {
      await getItem(3).then((value) =>{
        console.debug(JSON.stringify(value));
      })
      await getItemSingleVar(2).then((value) =>{
        console.debug(JSON.stringify(value));
      })
      await getItemMultiVar(1).then((value) =>{
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

                <Button style={{margin:5}} status='primary' onPress={()=>{genTest()}}>GEN</Button>
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