const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
client.connect(async (err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  // Database name
  const dbName = 'contact';

  // Collection name
  const collectionName = 'contactlist';

  // Database and collection references
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  try {
    // Insert documents into the 'contactlist' collection
    const contacts = [
      { "Last name": "Ben", "First name": "Moris", "Email": "ben@gmail.com", "age": 26 },
      { "Last name": "Kefi", "First name": "Seif", "Email": "kefi@gmail.com", "age": 15 },
      { "Last name": "Emilie", "First name": "brouge", "Email": "emilie.b@gmail.com", "age": 40 },
      { "Last name": "Alex", "First name": "brown", "age": 4 },
      { "Last name": "Denzel", "First name": "Washington", "age": 3 }
    ];
    await collection.insertMany(contacts);

    // Display all contacts
    const allContacts = await collection.find({}).toArray();
    console.log('All contacts:', allContacts);

    // Display information about one person using their ID
    const onePerson = await collection.findOne({ "First name": "Moris" });
    console.log('One person:', onePerson);

    // Display contacts with age > 18
    const contactsOver18 = await collection.find({ age: { $gt: 18 } }).toArray();
    console.log('Contacts over 18:', contactsOver18);

    // Display contacts with age > 18 and name containing "ah"
    const contactsOver18Ah = await collection.find({ age: { $gt: 18 }, "First name": { $regex: "ah" } }).toArray();
    console.log('Contacts over 18 with "ah":', contactsOver18Ah);

    // Change the first name of "Kefi Seif" to "Kefi Anis"
    await collection.updateOne({ "First name": "Seif" }, { $set: { "First name": "Anis" } });

    // Delete contacts aged under 5
    await collection.deleteMany({ age: { $lt: 5 } });

    // Display all contacts after modifications
    const allContactsAfterModifications = await collection.find({}).toArray();
    console.log('All contacts after modifications:', allContactsAfterModifications);
  } catch (error) {
    console.error('Error performing CRUD operations:', error);
  } finally {
    // Close the connection
    await client.close();
  }
});
