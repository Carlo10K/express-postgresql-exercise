const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'Test12345.',
    database: 'db_store'
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
