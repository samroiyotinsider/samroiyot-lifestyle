import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  const [rows] = await connection.execute('SELECT * FROM properties WHERE listingType = "sale" ORDER BY featured DESC, createdAt DESC');
  console.log(JSON.stringify(rows, null, 2));
} catch (error) {
  console.error('Export failed:', error);
  process.exit(1);
} finally {
  await connection.end();
}
