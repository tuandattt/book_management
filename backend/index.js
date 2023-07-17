var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())

var {conn, sql} = require('./connect');
app.use(express.static('public'));

app.post('/register', async (req, res) => {
  try {
    // Connect to the database
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password_res = req.body.password1;

    const pool = await conn;

    const sqlQuery = "Select * from signup where email = @email";
    const result1 = await pool.request().input('email', sql.VarChar, email).query(sqlQuery);
    console.log(result1.recordset[0]);
    if(result1.recordset[0] == null){
      const request = pool.request();
      request.input('firstname', sql.NVarChar(40), firstname);
      request.input('lastname', sql.NVarChar(40), lastname);
      request.input('email', sql.VarChar(40), email);
      request.input('phone_num', sql.VarChar(40), phone);
      request.input('pass', sql.VarChar(40), password_res);
      const result = await request.query('INSERT INTO signup(firstname, lastname, email, phone_num, pass) VALUES (@firstname, @lastname, @email, @phone_num, @pass)');

      res.status(200).json({ message: 'Registered successful'});
    } else {
      res.status(401).json({ message: 'This email existed, please reload and re-signup'});
    }
  } catch (error) {
    console.error('Error during customer registration:', error);
    res.status(500).send('An error occurred during registration.');
  }
});

app.post('/signedin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log('Received login request:', username, password);

  var pool = await conn;
  const sqlQuery = "Select pass, CusID from signup where email = @email"
  const sqlQuery1 = "Insert into order1(CusID) values (@cus_id)"
  const result = await pool.request().input('email', sql.VarChar, username).query(sqlQuery);
  if(result.recordset[0] != null){
    const pass_check = result.recordset[0].pass;
    const cus_id = result.recordset[0].CusID;
    if (pass_check === password) {
      await pool.request().input('cus_id', sql.VarChar, cus_id).query(sqlQuery1);
      const sqlQuery2 = "Select OrID from order1 where CusID = @cus_id order by Or_id DESC"
      const result1 = await pool.request().input('cus_id', sql.VarChar, cus_id).query(sqlQuery2);
      const orid = result1.recordset[0].OrID;
      res.status(200).json({ message: 'Login successful', ID: cus_id, orid: orid, code : 1 });
    } else {
      res.status(401).json({ message: 'Invalid username or password, please reload', code : 0 });
  }
} else {
  res.status(401).json({ message: 'Invalid username or password, please reload', code : 0 });
}
});

app.post('/order1', async (req, res) => {
  //insert into 
  const title = req.body.title;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const cus_id = req.body.cus_id;
  const orid = req.body.orid;
  console.log('Received login request:', orid, cus_id, title, price, quantity);

  var pool = await conn;
  const sqlQuery1 = "Select BookID, quantity_books from bookinfo where title = @title"
  const result1 = await pool.request().input('title', sql.VarChar, title).query(sqlQuery1);
  const book_id = result1.recordset[0].BookID;
  const number = result1.recordset[0].quantity_books;
  const sqlQuery = "Insert into order_details(OrID, BookID, quantity) values (@orid, @book_id, @quantity)"
  if(quantity <= number){
    var left = number - quantity;
    const sqlQuery2 = "Update bookinfo set quantity_books = @left where BookID = @book_id"
    await pool.request().input('left', sql.Int, left).input('book_id', sql.VarChar, book_id).query(sqlQuery2);
    await pool.request()
    .input('orid', sql.VarChar, orid)
    .input('book_id', sql.VarChar, book_id)
    .input('quantity', sql.Int, quantity)
    .query(sqlQuery, function(err, data) {
      if(!err){
        res.status(200).json({ message: 'Order successfully'});
      } else{
        res.status(401).json({ message: 'Order failed'});
      }
    });
  } else {
    res.status(401).json({ message: 'Out of stock'});
  }
});

app.post('/order1_full', async (req, res) => {
  //insert into 
  const title = req.body.title;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const cus_id = req.body.cus_id;
  const orid = req.body.orid;
  console.log('Received login request:', orid, cus_id, title, price, quantity);

  var pool = await conn;
  const sqlQuery1 = "Select BookID, quantity_books from bookinfo where title = @title"
  const result1 = await pool.request().input('title', sql.VarChar, title).query(sqlQuery1);
  const book_id = result1.recordset[0].BookID;
  const number = result1.recordset[0].quantity_books;
  const sqlQuery = "Insert into order_details(OrID, BookID, quantity) values (@orid, @book_id, @quantity)"
  if(quantity <= number){
    var left = number - quantity;
    const sqlQuery2 = "Update bookinfo set quantity_books = @left where BookID = @book_id"
    await pool.request().input('left', sql.Int, left).input('book_id', sql.VarChar, book_id).query(sqlQuery2);
    await pool.request()
    .input('orid', sql.VarChar, orid)
    .input('book_id', sql.VarChar, book_id)
    .input('quantity', sql.Int, quantity)
    .query(sqlQuery, function(err, data) {
      if(!err){
        res.status(200).json({ message: 'Order successfully'});
      } else{
        res.status(401).json({ message: 'Order failed'});
      }
    });
  } else {
    res.status(401).json({ message: 'Out of stock'});
  }
});

app.post('/delete', async (req, res) => {
  //Delete from
  const title = req.body.title;
  const orid = req.body.orid;
  console.log('Received login request:', title, orid);

  var pool = await conn;
  const sqlQuery1 = "Select BookID, quantity_books from bookinfo where title = @title"
  const result1 = await pool.request().input('title', sql.VarChar, title).query(sqlQuery1);
  const book_id = result1.recordset[0].book_id;
  const number = result1.recordset[0].quantity_books;
  const sqlQuery = "Delete from order_details where BookID = @book_id AND OrID = @orid"
  const sqlQuery2 = "Select quantity from order_details where BookID = @book_id AND OrID = @orid"
  const result2 = await pool.request().input('book_id', sql.VarChar, BookID).input('orid', sql.VarChar, OrID).query(sqlQuery2);
  const quantity = result2.recordset[0].quantity;
  const sqlQuery3 = "Update bookinfo set quantity_books = @left where BookID = @book_id"
  var left = number + quantity;
  await pool.request().input('left', sql.Int, left).input('book_id', sql.VarChar, book_id).query(sqlQuery2);
  await pool.request()
  .input('orid', sql.VarChar, orid)
  .input('book_id', sql.VarChar, book_id)
  .query(sqlQuery, function(err, data) {
    if(!err){
      res.status(200).json({ message: 'Delete successfully'});
    } else{
      console.log(err);
      res.status(401).json({ message: 'Delete failed'});
    }
  });
});

app.post('/delete_full', async (req, res) => {
  //Delete from
  const title = req.body.title;
  const orid = req.body.orid;
  console.log('Received login request:', title, orid);

  var pool = await conn;
  const sqlQuery1 = "Select BookID, quantity_books from bookinfo where title = @title"
  const result1 = await pool.request().input('title', sql.VarChar, title).query(sqlQuery1);
  const book_id = result1.recordset[0].book_id;
  const number = result1.recordset[0].quantity_books;
  const sqlQuery = "Delete from order_details where BookID = @book_id AND OrID = @orid"
  const sqlQuery2 = "Select quantity from order_details where BookID = @book_id AND OrID = @orid"
  const result2 = await pool.request().input('book_id', sql.VarChar, BookID).input('orid', sql.VarChar, OrID).query(sqlQuery2);
  const quantity = result2.recordset[0].quantity;
  const sqlQuery3 = "Update bookinfo set quantity_books = @left where BookID = @book_id"
  var left = number + quantity;
  await pool.request().input('left', sql.Int, left).input('book_id', sql.VarChar, book_id).query(sqlQuery2);
  await pool.request()
  .input('orid', sql.VarChar, orid)
  .input('book_id', sql.VarChar, book_id)
  .query(sqlQuery, function(err, data) {
    if(!err){
      res.status(200).json({ message: 'Delete successfully'});
    } else{
      console.log(err);
      res.status(401).json({ message: 'Delete failed'});
    }
  });
});

app.post('/order', async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const cus_id = req.body.cus_id;
  const orid = req.body.orid;
  console.log('Received login request:', orid, cus_id, title, price, quantity);

  var pool = await conn;
  const sqlQuery1 = "Select BookID, quantity_books from bookinfo where title = @title"
  const result1 = await pool.request().input('title', sql.VarChar, title).query(sqlQuery1);
  const book_id = result1.recordset[0].BookID;
  const number = result1.recordset[0].quantity_books;
  const sqlQuery = "Update order_details set quantity = @quantity where BookID = @book_id and OrID = @orid"
  if(quantity <= number){
    var left = number - quantit;
    const sqlQuery2 = "Update bookinfo set quantity_books = @left where BookID = @book_id";
    await pool.request().input('left', sql.Int, left).input('book_id', sql.VarChar, book_id).query(sqlQuery2);
    await pool.request()
    .input('orid', sql.VarChar, orid)
    .input('book_id', sql.VarChar, book_id)
    .input('quantity', sql.Int, quantity)
    .query(sqlQuery, function(err, data) {
      if(!err){
        res.status(200).json({ message: 'Order successfully'});
      } else{
        res.status(401).json({ message: 'Order failed'});
      }
    });
  } else {
    res.status(401).json({ message: 'Out of stock'});
  }
});

app.post('/order_full', async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const cus_id = req.body.cus_id;
  const orid = req.body.orid;
  console.log('Received login request:', orid, cus_id, title, price, quantity);

  var pool = await conn;
  const sqlQuery1 = "Select BookID, quantity_books from bookinfo where title = @title"
  const result1 = await pool.request().input('title', sql.VarChar, title).query(sqlQuery1);
  const book_id = result1.recordset[0].BookID;
  const number = result1.recordset[0].quantity_books;
  const sqlQuery = "Update order_details set quantity = @quantity where BookID = @book_id and OrID = @orid"
  if(quantity <= number){
    var left = number - quantity;
    const sqlQuery2 = "Update bookinfo set quantity_books = @left where BookID = @book_id";
    await pool.request().input('left', sql.Int, left).input('book_id', sql.VarChar, book_id).query(sqlQuery2);
    await pool.request()
    .input('orid', sql.VarChar, orid)
    .input('book_id', sql.VarChar, book_id)
    .input('quantity', sql.Int, quantity)
    .query(sqlQuery, function(err, data) {
      if(!err){
        res.status(200).json({ message: 'Order successfully'});
      } else{
        res.status(401).json({ message: 'Order failed'});
      }
    });
  } else {
    res.status(401).json({ message: 'Out of stock'});
  }
});

app.post('/shipping', async (req, res) => {
  //insert into 
  const street_number = req.body.street_number;
  const street_name = req.body.street_name;
  const country = req.body.country;
  const country_id = req.body.country_id;
  const orid = req.body.orid;
  const cus_id = req.body.cus_id;
  console.log('Received login request:', orid, cus_id, street_number, street_name, country, country_id);

  var pool = await conn;
  const sqlQuery1 = "Insert into shipping(OrID, CusID, street_number, street_name, country, post_code) values (@orid, @cus_id, @street_number, @street_name, @country, @country_id)"
  await pool.request()
  .input('orid', sql.VarChar, orid)
  .input('cus_id', sql.VarChar, cus_id)
  .input('street_number', sql.Int, street_number)
  .input('street_name', sql.VarChar, street_name)
  .input('country', sql.VarChar, country)
  .input('country_id', sql.Int, country_id)
  .query(sqlQuery1, function(err, data) {
    if(!err){
      res.status(200).json({ message: 'Order successfully', code : 1});
    } else{
      console.log(err);
      res.status(401).json({ message: 'Order failed', code : 0});
    }
  });
});

app.post('/reorder', async (req, res) => {
  //insert into 
  const cus_id = req.body.cus_id;
  console.log('Received login request:', cus_id);

  var pool = await conn;
  const sqlQuery1 = "Insert into order1(CusID) values (@cus_id)";
  await pool.request().input('cus_id', sql.VarChar, cus_id).query(sqlQuery1);
  const sqlQuery2 = "Select OrID from order1 where CusID = @cus_id order by Or_id DESC";
  const result1 = await pool.request().input('cus_id', sql.VarChar, cus_id).query(sqlQuery2);
  const orid = result1.recordset[0].OrID;
  res.status(200).json({orid: orid});
});

app.listen(3000, function(){
    console.log("Dang chay tai port 3000");
} )