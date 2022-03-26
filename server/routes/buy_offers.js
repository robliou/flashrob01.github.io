const express = require('express');
const buyOffersRouter = express.Router();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pfloyd2717',
  port: 5432,
})

//'/' refers to the path name, not database name!
buyOffersRouter.get('/', (request, response) => {
  pool.query('SELECT * FROM buy_offers ORDER BY buy_offer_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

buyOffersRouter.get('/:buy_offer_id', (request, response) => {
  const buy_offer_id = parseInt(request.params.buy_offer_id)

  pool.query('SELECT * FROM buy_offers WHERE buy_offer_id = $1', [buy_offer_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

buyOffersRouter.post('/', (request, response) => {
  const { industry, offer_type, offer_details, price, qualifications, headline, buy_offer_id, user_id } = request.body
  //the program picks up these values because of the app.use() command in the main file!

  pool.query('INSERT INTO buy_offers (industry, offer_type, offer_details, price, qualifications, headline, buy_offer_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
  //Rows cannot be split in this language!
  [industry, offer_type, offer_details, price, qualifications, headline, buy_offer_id, user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New buy offer added with ID: ${buy_offer_id}`)
  })
})

buyOffersRouter.put('/:buy_offer_id', (request, response) => {
  const buy_offer_id = parseInt(request.params.buy_offer_id)
  const {industry, offer_type, offer_details, price, qualifications, user_id} = request.body;

  pool.query(
    'UPDATE buy_offers SET industry=$1, offer_type=$2, offer_details=$3, price=$4, qualifications=$5, user_id=$6 WHERE buy_offer_id=$7',
    [industry, offer_type, offer_details, price, qualifications, user_id, buy_offer_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Buy offer modified with ID: ${buy_offer_id}`)
    }
  )
})

//it would appear that this put command takes in id and then allows you to update name/ email / etc. 
//https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/comment-page-1/#comments

buyOffersRouter.delete('/:buy_offer_id', (request, response) => {
  const buy_offer_id = parseInt(request.params.buy_offer_id)

  pool.query('DELETE FROM buy_offers WHERE buy_offer_id = $1', [buy_offer_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${buy_offer_id}`)
  })
})

module.exports = 
  buyOffersRouter;
