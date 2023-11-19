import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { NoteItem } from './models/NoteItem.js';

const tableName = 'dateNotes';

enablePromise(true);

let db: SQLiteDatabase;

export const getDBConnection = async () => {
    if (!db) {
        db = await openDatabase({ name: 'dates-data.db', location: 'default' });
        await createTable();
    }
    return db;
};

export const createTable = async () => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT UNIQUE,
        sexualActivity INTEGER,
        symptomsActivity INTEGER,
        moods INTEGER,
        contraception INTEGER
    );`;

    await db.executeSql(query);
};

export const saveNote = async (noteItems: NoteItem) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName} (date, sexualActivity, symptomsActivity, moods, contraception) VALUES (?, ?, ?, ?, ?)`;

    const values = [
        noteItems.date,
        noteItems.sexualActivity,
        noteItems.symptomsActivity,
        noteItems.moods,
        noteItems.contraception,
    ];

    try {
        const result = await db.executeSql(insertQuery, values);
        return result;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error; // Rethrow the error for the calling code to handle
    }
};

export const deleteNote = async (id: number) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

export const readData = async () => {
    const query = `SELECT * FROM ${tableName}`;

    try {
        const [results] = await db.executeSql(query);
        const rawData = results.rows.raw();
        return rawData;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error; // Rethrow the error for the calling code to handle
    }
};

export const getNote = async (targetDate: string) => {
    const query = `SELECT * FROM ${tableName} WHERE date = ?`;

    try {
        const [results] = await db.executeSql(query, [targetDate]);
        const rawData = results.rows.raw();
        return rawData;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error; // Rethrow the error for the calling code to handle
    }
};

export const deleteTable = async () => {
    try {
        const query = `drop table ${tableName}`;
        await db.executeSql(query);
    } catch (error) {
        console.error(error)
    }
};