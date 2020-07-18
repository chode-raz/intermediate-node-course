const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8001;
const app = express();

const User = require('./models/User');
mongoose.connect('mongodb://localhost/userData')

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users', (req, res) => {
  User.create(
    { ...req.body.newData },
    (err, data) => { sendResponse(err, res, data) }
  )
})

app.route('/users/:id')
  .get((req, res) => {
    User.findById(req.params.id,
      (err, data) => { sendResponse(err, res, data) }
    )
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      { new: true },
      (err, data) => { sendResponse(err, res, data) }
    )
  })

  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(
      req.params.id,
      (err, data) => { sendResponse(err, res, data) }
    )
  })

function sendResponse(err, res, data) {
  if (err) {
    res.json({
      success: false,
      message: err
    });
  }
  else if (!data) {
    res.json({
      success: false,
      message: "Not Found"
    });
  }
  else {
    res.json({
      success: true,
      data: data
    });
  }
}