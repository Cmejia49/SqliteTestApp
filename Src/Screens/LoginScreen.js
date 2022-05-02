import React from "react";
import {View,Text,TextInput ,Button,StyleSheet} from "react-native"
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
const LoginScreen = ({navigation}) =>{
        const [itemId, setItemId] = React.useState(null);
      const [variationId,setVariationId] = React.useState(null);
      const [valueId,setValueId] = React.useState(null);
    const [username, onChangeUserName] = React.useState("");
    const [Password, onChangePassword] = React.useState("");

    React.useEffect(()=>{
        db.transaction((tx) => {
            tx.executeSql(
              "create table if not exists table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,user_name VARCHAR(20),user_pass VARCHAR(255));"
            );
            tx.executeSql(
                "create table if not exists table_categories(cat_id INTEGER PRIMARY KEY AUTOINCREMENT,cat_name VARCHAR(20));"
              );
            tx.executeSql(
                "create table if not exists table_item(item_id INTEGER PRIMARY KEY AUTOINCREMENT,item_name VARCHAR(20),item_price VARCHAR(10),  categories_reference INTEGER, FOREIGN KEY (categories_reference) REFERENCES table_categories(cat_id));"
              );
            tx.executeSql(
                "create table if not exists table_variation(variation_id INTEGER PRIMARY KEY AUTOINCREMENT,variation_name VARCHAR(255),  item_reference INTEGER, FOREIGN KEY (item_reference) REFERENCES table_item(item_id));"
              );

              tx.executeSql(
                'create table if not exists table_variationvalue(variationvalue_id INTEGER PRIMARY KEY AUTOINCREMENT,variationvalue_name VARCHAR(255),variation_reference INTEGER, parent_reference INTEGER, FOREIGN KEY (variation_reference) REFERENCES table_variation(variation_id));'
              );
          });
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

    const genTest =()=>{

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
     
        db.transaction((tx)=>{
          tx.executeSql(
            "SELECT table_item.item_name, table_variation.variation_name, v1.variationvalue_name as Parent, v2.variationvalue_name as Child FROM table_item LEFT JOIN table_variation ON table_variation.item_reference = table_item.item_id LEFT JOIN table_variationvalue v1 ON table_variation.variation_id  = v1.variation_reference LEFT JOIN table_variationvalue v2 ON v1.variationvalue_id = v2.parent_reference WHERE table_item.item_id = 1",
            [],
            (tx,result)=>{
              console.debug(JSON.stringify(result.rows))
            }
          )
        })

        
        
        db.transaction((tx)=>{
          tx.executeSql(
          "SELECT v0.variation_name, v2.variationvalue_name as child, v1.variationvalue_name as parent  FROM table_variation v0 INNER JOIN table_variationvalue v1 ON v0.variation_id = v1.variationvalue_id LEFT JOIN table_variationvalue v2 ON v1.variationvalue_id = v2.parent_reference WHERE v0.variation_id = 1",
            [],
            (tx,result)=>{
              console.debug(JSON.stringify(result.rows))
            }
          )
        })
        console.debug("itemId" + itemId + "variationId" + variationId + "valueId" + valueId);

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