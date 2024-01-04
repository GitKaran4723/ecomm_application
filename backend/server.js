import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'clothshop'
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
    }
});

//customers.................

app.get('/customers', (req, res) => {
    const sql = "SELECT * FROM customers";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.post('/createcustomer', (req, res) => { 
    const sql = "INSERT INTO Customers ( `name`, `Age`, `Email`, `phone_number`, `address` , `password`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.age, 
        req.body.email,
        req.body.phoneNo, 
        req.body.address, 
        req.body.password,
    ];
    db.query(sql, values, (err, result) => { 
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});

app.get('/readcustomer/:id',(req,res)=>{
    const sql = "SELECT * FROM customers WHERE customer_id =?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    })
})

app.put('/updatecustomer/:id',(req,res)=>{
    const sql = 'UPDATE customers SET `name`=?,`Age`=?,`Email`=?,`phone_number`=?,`address`=?,`password`=? WHERE `customer_id`=?';
    const id= req.params.id;
    db.query(sql,[req.body.name,req.body.age,req.body.email,req.body.phoneNo,req.body.address,req.body.password,id],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);    
    })
})

app.delete('/delete/customer/:id',(req,res)=>{
    const sql = "DELETE FROM customers WHERE customer_id = ?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Error inside server"});
        return res.send(result);    
    })
})




//Employees................

app.get('/employees', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ message: "Error inside server" });
        }
        return res.json(result);
    });
});  //working ok

app.post('/createemployee', (req, res) => { 
    const sql = "INSERT INTO employee ( `name`, `email`, `position`, `phoneNo`, `address` ,`hiredate` ,`salary` , `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.position, 
        req.body.phoneNo, 
        req.body.address, 
        req.body.hiredate, 
        req.body.salary, 
        req.body.password,
    ];
    db.query(sql, values, (err, result) => { 
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
}); //working ok

app.get('/reademployee/:id',(req,res)=>{
    const sql = "SELECT * FROM employee WHERE empid =?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });
});  //working ok

app.put('/updateemployee/:id', (req, res) => {
    const id = req.params.id;
    const {
      name,
      email,
      position,
      phoneNo,
      address,
      hiredate,
      salary,
      password
    } = req.body;
  
    const sql = 'UPDATE employee SET `name`=?, `email`=?, `position`=?, `phoneNo`=?, `address`=?, `hiredate`=?, `salary`=?, `password`=? WHERE `empid`=?';
  
    db.query(
      sql,
      [name, email, position, phoneNo, address, hiredate, salary, password, id],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.json(result);
      }
    );
  });  //working ok
  

app.delete('/delete/employee/:id',(req,res)=>{
    const sql = "DELETE FROM employee WHERE empid = ?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Error inside server"});
        return res.send(result);    
    })
})   //working ok


//products .......................................................................

app.get('/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ message: "Error inside server" });
        }
        return res.json(result);
    });
});  //working ok products

app.post('/createproduct', (req, res) => { 
    const sql = "INSERT INTO products ( `product_name`, `description`, `price`, `size`, `color` ,`category` ,`Stock_quantity`,`imgurl`,`bought_quantity`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.product_name,
        req.body.description,
        req.body.price, 
        req.body.size, 
        req.body.color, 
        req.body.category, 
        req.body.Stock_quantity,
        req.body.imgurl, 
        req.body.bought_quantity, 

    ];
    db.query(sql, values, (err, result) => { 
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
}); //working ok

app.get('/readproduct/:id',(req,res)=>{
    const sql = "SELECT * FROM products WHERE product_id =?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });
});  //working ok

app.put('/updateproduct/:id', (req, res) => {
    const id = req.params.id;
    const {
        product_name,
        description,
        price,
        size,
        color,
        category,
        Stock_quantity,
        imgurl,
        bought_quantity
    } = req.body;
  
    const sql = 'UPDATE products SET `product_name`=?, `description`=?, `price`=?, `size`=?, `color`=?, `category`=?, `Stock_quantity`=?,`imgurl`=?, `bought_quantity`=? WHERE `product_id`=?';
  
    db.query(
      sql,
      [product_name, description, price, size, color, category, Stock_quantity,imgurl,bought_quantity, id],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.json(result);
      }
    );
  });  //working ok


  app.post('/updateStockInProducttable/:product_id/:newStock',(req,res)=>{
    const stock = req.params.newStock;
    const id = req.params.product_id;
    const sql = 'UPDATE products SET `Stock_quantity`=? WHERE `product_id`=?';
    db.query(sql,[stock,id],(err,result)=>{
        if(err){
            return res.json(err);
        }
        return res.json(result);
    })

  })
  

app.delete('/deleteproduct/:id',(req,res)=>{
    const sql = "DELETE FROM products WHERE product_id = ?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Error inside server"});
        return res.send(result);    
    })
})   //working ok

//supliers...................................................................

app.get('/suppliers', (req, res) => {
    const sql = "SELECT * FROM suppliers";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ message: "Error inside server" });
        }
        return res.json(result);
    });
});  //working ok


app.post('/createsupplier', (req, res) => { 
    const sql = "INSERT INTO suppliers ( `suppliername`, `contactpersonname`, `email`, `phoneNum`, `address` ,`password`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.suppliername,
        req.body.contactpersonname,
        req.body.email, 
        req.body.phoneNum,
        req.body.address, 
        req.body.password
    ];
    db.query(sql, values, (err, result) => { 
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
}); //working ok

app.delete('/deletesupplier/:id',(req,res)=>{
    const sql = "DELETE FROM suppliers WHERE supplierid = ?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Error inside server"});
        return res.send(result);    
    })
})   //working ok

app.get('/readsupplier/:id',(req,res)=>{
    const sql = "SELECT * FROM suppliers WHERE supplierid =?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });
});  //working ok

app.put('/updatesupplier/:id', (req, res) => {
    const id = req.params.id;
    const {
        suppliername,
        contactpersonname,
        email,
        phoneNum,
        address,
        password
    } = req.body;
  
    const sql = 'UPDATE suppliers SET `suppliername`=?, `contactpersonname`=?, `email`=?, `phoneNum`=?, `address`=?, `password`=? WHERE `supplierid`=?';
  
    db.query(
      sql,
      [suppliername, contactpersonname, email, phoneNum, address, password, id],
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        return res.json(result);
      }
    );
  });  //working ok

  //orderitemstable table................................................
  app.post('/addorderitems', (req, res) => { 
    const sql = "INSERT INTO orderitemstable ( `orderid`, `productid`, `quantity`, `subtotal`,`customer_id`,`orderstatus`) VALUES (?, ?, ?, ?,?,0)";
    const values = [
        req.body.orderid,
        req.body.productid,
        req.body.quantity, 
        req.body.subtotal,
        req.body.customer_id
    ];
    db.query(sql, values, (err, result) => { 
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
}); //working ok
//customerorderitems
app.get('/customerorderitems/:id',(req,res)=>{
    const sql = "SELECT * FROM orderitemstable  WHERE customer_id = ? and orderstatus = 0";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });
});  //working ok

app.get('/customerordereditems/:id',(req,res)=>{
    const sql = "SELECT * FROM orderitemstable  WHERE orderid = ? ";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });
});  //working ok

//items view by employee
app.get('/emporderview/:id',(req,res)=>{
    const sql = "SELECT DISTINCT c.name, c.Email, p.product_name, p.product_id,p.stock_quantity, i.quantity, i.subtotal,i.orderid FROM orderitemstable i INNER JOIN customers c ON i.customer_id = c.customer_id INNER JOIN products p ON i.productid = p.product_id WHERE i.orderid = ?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });
});  //working ok

app.delete('/delete/ordetitems', (req, res) => {
    const sql = "DELETE FROM orderitemstable WHERE itemid = ? AND orderid = ?";
    const values = [req.query.itemid, req.query.orderid];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inside server:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.send(result);
    });
  });

// orders table................................................................
app.post('/placeorder', (req, res) => { 
    const sql = "INSERT INTO orders ( `orderid`, `customer_id`, `order_date`, `total_amount`,`order_status`,`payment_status`) VALUES (?, ?, ?, ?,'ordered','Pending')";
    const values = [
        req.body.orderid,
        req.body.customer_id,
        req.body.order_date, 
        req.body.total_amount   
    ];
    db.query(sql, values, (err, result) => { 
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
}); //working ok

app.post('/setorderstatus/:orderid',(req,res)=>{
    const sql = "UPDATE orderitemstable SET orderstatus = 1 WHERE orderid = ?;"
    const orderid = req.params.orderid;
    db.query(sql, orderid, (err, result) => { 
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
})

//orders...............

app.get('/myorders/:id',(req,res)=>{
    const sql = "SELECT * FROM orders  WHERE customer_id = ? ";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });
});  //working ok

app.get('/readallorders',(req,res)=>{
    const sql = "SELECT o.customer_id, c.name, o.orderid, o.order_date, o.employeeid, o.order_status, o.payment_status, o.total_amount FROM customers c INNER JOIN orders o ON o.customer_id = c.customer_id ORDER BY o.order_date DESC;";
    db.query(sql,(err,result)=>{
        if(err) return res.json({message:"Error inside server"});
        return res.json(result);
    });
});  //working ok

//order status update update
app.post('/updateorderstatus/:orderid/:empid', (req, res) => {
    const sql = "UPDATE orders SET order_status = 'Delivered', employeeid = ? WHERE orderid = ?;";
    const orderid = req.params.orderid;
    const empid = req.params.empid;
    
    // Pass the parameters in the correct order
    db.query(sql, [empid, orderid], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});

app.post('/updatePaymentStatus/:orderid', (req, res) => {
    const sql = "UPDATE orders SET payment_status = 'Amount Paid' , order_status ='Order Recieved' WHERE orderid = ?;";
    const orderid = req.params.orderid;
    
    // Pass the parameters in the correct order
    db.query(sql, [orderid], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});

//payments...................................
app.get('/readallpaymentsfromorders',(req,res)=>{
    const sql = "SELECT c.name, o.orderid, o.order_date, o.total_amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id WHERE o.payment_status = 'Amount Paid';"

    db.query(sql,(err,result)=>{
        if(err) return res.json({message:"Erron inside server"});
        return res.json(result);
    });


})



app.listen(8081,()=>{
    console.log("Listening")
})