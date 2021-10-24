import "dotenv/config";
import "reflect-metadata";
import { User } from "../user/user.model";
import { ArtImported } from "../art/arts.model";

import { users } from "./users-dev-data";
import { arts } from "./arts-dev-data";
import { DBContext } from "../db.context";
// import ArtM
const db = new DBContext();
db.connect();

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await ArtImported.insertMany(arts);
    for (let i = 0; i < users.length; i++) await User.create(users[i]);

    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await ArtImported.deleteMany();
    await User.deleteMany();
    console.log("deleted all data");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

const updateData = async () => {
  await deleteData();
  await importData();
};
updateData();
