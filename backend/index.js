const connectToDatabase = require('./db');

async function main() {
  const db = await connectToDatabase();
  
  if (db) {
    const collections = await db.collections();
    console.log("Collections:", collections.map(col => col.collectionName));
  }
}

main();