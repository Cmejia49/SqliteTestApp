
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
      console.debug("create table")
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
          tx.executeSql(
            'create table if not exists table_stock(stock_id INTEGER PRIMARY KEY AUTOINCREMENT, stock_quantity INTEGER, stock_price INTEGER, stock_code VARCHAR(255), item_reference INTEGER, variationvalue_reference INTEGER, FOREIGN KEY (item_reference) REFERENCES table_item(item_id), FOREIGN KEY (variationvalue_reference) REFERENCES table_variationvalue(variationvalue_id));'
        )
      });
  }


  export const selectItem = () =>{
 const db = openDatabase();
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT * FROM table_item",
          [],
          (tx,result)=>{
              console.debug(JSON.stringify(result.rows));
          }
        )
      })
      
      
      /*db.transaction((tx)=>{
        tx.executeSql(
        "SELECT v0.variation_name, v2.variationvalue_name as child, v1.variationvalue_name as parent  FROM table_variation v0 INNER JOIN table_variationvalue v1 ON v0.variation_id = v1.variationvalue_id LEFT JOIN table_variationvalue v2 ON v1.variationvalue_id = v2.parent_reference WHERE v0.variation_id = 1",
          [],
          (tx,result)=>{
            console.debug(JSON.stringify(result.rows))
          }
        )
      })*/
  
  }

  export const getItem = (id) =>{
      return new Promise((resolve, reject)=>{
       const db = openDatabase();
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT table_item.item_name, s.stock_id FROM table_item LEFT JOIN table_stock s ON s.item_reference = table_item.item_id WHERE table_item.item_id = ?",
              [id],
              (tx,result)=>{
                  resolve(result.rows);
              }
            )
          })
      })
  }


export const getItemSingleVar = (id) =>{
  return new Promise((resolve, reject)=>{
   const db = openDatabase();
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT table_item.item_name, table_variation.variation_name, v1.variationvalue_name as Parent, s.stock_id FROM table_item LEFT JOIN table_variation ON table_variation.item_reference = table_item.item_id LEFT JOIN table_variationvalue v1 ON table_variation.variation_id  = v1.variation_reference LEFT JOIN table_stock s ON s.variationvalue_reference = v1.variationvalue_id WHERE table_item.item_id = ?",
          [id],
          (tx,result)=>{
              resolve(result.rows);
          }
        )
      })
  })
}

export const getItemMultiVar = (id) =>{
  return new Promise((resolve, reject)=>{
   const db = openDatabase();
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT table_item.item_name, table_variation.variation_name, v1.variationvalue_name as Parent, v2.variationvalue_name as Child, s.stock_id FROM table_item LEFT JOIN table_variation ON table_variation.item_reference = table_item.item_id LEFT JOIN table_variationvalue v1 ON table_variation.variation_id  = v1.variation_reference LEFT JOIN table_variationvalue v2 ON v1.variationvalue_id = v2.parent_reference LEFT JOIN table_stock s ON s.variationvalue_reference = v2.variationvalue_id WHERE table_item.item_id = ?",
          [id],
          (tx,result)=>{
              resolve(result.rows);
          }
        )
      })
  })
}


  // we will use the insert Item to save the data from the server insert; 
export const insertItemFullVariation = ()=>{
    //Here Think if i will use the generated Key by sqlite or use the existing Key from the server as foreign key and primary key; 
    //Sqlite can provide Primary when you use primary key of Sqlite it will need the generated foreign key 
    // when the Primary key from the server use we need to use it in Foreign key 1 thing only
    const db = openDatabase();
     db.transaction((tx)=>{
        tx.executeSql(
          "INSERT INTO table_item (item_name, item_price) VALUES (?,?)",
          ["MultipleVar","123"],
          (tx,result1)=>{
              console.debug(result1.insertId)
            tx.executeSql("INSERT INTO table_variation (variation_name,item_reference) VALUES (?,?)",
            ["COLOR",result1.insertId],
            (tx,result2)=>{
              tx.executeSql("INSERT INTO table_variationvalue (variationvalue_name, variation_reference) VALUES (?,?)",
              ["RED",result2.insertId],
              (tx,result3)=>{
                tx.executeSql("INSERT INTO table_variationvalue (variationvalue_name, parent_reference) VALUES (?,?)",
                ["11",result3.insertId],
                  (tx,result4)=>{
                    tx.executeSql("INSERT INTO table_stock (stock_quantity, stock_price, stock_code, variationvalue_reference) VALUES (?,?,?,?)",
                    [11,11,"DAS",result4.insertId],
                    (tx,result5)=>{
                        console.debug(result5.insertId);
                      console.debug(result5.rowsAffected);
                  }
                    )
                  }
                )
         
              }

              )}

            )}

        )} 

      )

}



  // we will use the insert Item to save the data from the server insert; 
  export const insertItemSingleVariation = ()=>{
    //Here Think if i will use the generated Key by sqlite or use the existing Key from the server as foreign key and primary key; 
    //Sqlite can provide Primary when you use primary key of Sqlite it will need the generated foreign key 
    // when the Primary key from the server use we need to use it in Foreign key 1 thing only
    const db = openDatabase();
     db.transaction((tx)=>{
        tx.executeSql(
          "INSERT INTO table_item (item_name, item_price) VALUES (?,?)",
          ["SingleVar","123"],
          (tx,result1)=>{
              console.debug(result1.insertId)
            tx.executeSql("INSERT INTO table_variation (variation_name,item_reference) VALUES (?,?)",
            ["COLOR",result1.insertId],
            (tx,result2)=>{
              tx.executeSql("INSERT INTO table_variationvalue (variationvalue_name, variation_reference) VALUES (?,?)",
              ["RED",result2.insertId],
              (tx,result3)=>{
                    tx.executeSql("INSERT INTO table_stock (stock_quantity, stock_price, stock_code, variationvalue_reference) VALUES (?,?,?,?)",
                    [11,11,"DAS",result3.insertId],
                    (tx,result4)=>{
                        console.debug(result4.insertId);
                      console.debug(result4.rowsAffected);
                  })
                })
            })
          })
      })

}

export const insertItem = () =>{
  const db = openDatabase();
  db.transaction((tx)=>{
     tx.executeSql(
       "INSERT INTO table_item (item_name, item_price) VALUES (?,?)",
       ["SingleItem","123"],
       (tx,result1)=>{
           console.debug(result1.insertId)
                 tx.executeSql("INSERT INTO table_stock (stock_quantity, stock_price, stock_code, item_reference) VALUES (?,?,?,?)",
                 [11,11,"DAS",result1.insertId],
                 (tx,result2)=>{
                     console.debug(result2.insertId);
                   console.debug(result2.rowsAffected);
               })
            })         
   })
}



export const update = (q,id)=>{
  const db = openDatabase();

  db.transaction((tx)=>{
    tx.executeSql(
      "UPDATE table_stock SET stock_quantity = stock_quantity - (?) WHERE stock_id = (?)",
      [q,id],
      (tx,result)=>{
        console.debug(result.rowsAffected);
      },
      (tx, error)=>{
        console.debug(error);
      }
    )
  })

  db.transaction((tx)=>{
    tx.executeSql(
      "SELECT * FROM table_stock WHERE (?)",
      [id],
      (tx,result)=>{
        console.debug(JSON.stringify(result.rows));
      },
      (tx, error)=>{
        console.debug(error);
      }
    )
  })
}

  