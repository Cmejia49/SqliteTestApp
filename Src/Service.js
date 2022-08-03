
import * as SQLite from "expo-sqlite";
export const openDatabase =  () => {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db =  SQLite.openDatabase("db.db");
    return db;
  }

  export const createTable = ()=>{
      const db =  openDatabase();
    db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,user_name VARCHAR(20),user_pass VARCHAR(255));"
        );
      });
  }
