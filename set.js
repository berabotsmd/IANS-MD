const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEdhbjM2c1R0UWxsazNYeDF5ZlM2V1hXSTRMbHg1a1J1WFhsU05LVTcyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTF4Q1h1WWFucU1FZ21IZnZLbE82TEhvaFFuV3VaM3hqVThDdlcwTEFYdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTkhSNlNVS3FxNHM5NXNOQ251d0txTjlTd0o0OWFoN3VDayttS2FpaUg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQnlCckdFWFVYaHl5SmRLSTYxNVlBQ1pLYWMzNVk3WTRNZlZ0bE9WZW5vPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZPUjI0RzV3UVVock1aTk5oMjU0MlVnUm55cXRpZ2xxUE41VHplMzJBVUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVTQ3hvNU5MOVBOcHVzTWFxQk1FTWVmY05HU0plTDlmVHJHNDN5T2RUQW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU1qZzVjUUp4Zitsb3RLMmwxdFR5ZUN3WTh3UkJ6eUpGQWcxQlJucEgyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMitjMkVDZFF1dUhHTnNYbnNCVHdGZUZSQ1JxdzhtYjBPeDBjTjRCZjRnYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9XYTkySFM5ZktRNUdFdTNKYnBFRmo1UG1MZkdtLzdOR1ZTR05td0lBZ09ILzRrdGxRdjlsaTRjQStNSytDQlI2K0s3a0gwVXJ2M3MxcWdXNytJU0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE5LCJhZHZTZWNyZXRLZXkiOiJQb0tzZ3ViOWZpaG9CRWVvTU9qYk1yclZGMDN6c240Mm9iUWFqb0dpOG5NPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTZDliYk1ZS1Q0bXoxMFJLZ0Rnc3ZBIiwicGhvbmVJZCI6IjEwZTgwZDY5LTgxNzAtNGNkMi1iZDM1LWRkYjBkNzVlZDA0NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRL1Jack1QYTdXYkthWG4xRnBXRlZTQTFWbE09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVpkejhQUDhSalRlUVVTOUJTSUdtVHBzTk9RPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlMzWjM3NE5LIiwibWUiOnsiaWQiOiIyNTQ3NDM5ODIyMDY6NzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoifmBgYEJFUkEgVEVDSGBgYH4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01qeDlOb0dFSjd5L3JVR0dBa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRPcVVvc3MwUjZWeUpFOWtNSWM2ZzBrV3duUkhGaHp3RUR3akZMZU9weEE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkEzSDlYcDF6VHU0ZjZSMzd6RXlGSFlzNlhmOURkNUErWUhJa3d5SWVNYWJubUsrR2ZRZTl6b2tjeXBCeko1MjBQbjY1d3hLZWhMRFg3b3kwN2oxYUFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtdzJqaGcvdlpjV0xSSUFIMzV6MU9ycjhHRmNuZml5QS9NcEpZWGJSaFo0RmZYdWIvbXo5V0RaUXNtUmZzRHV3QzhaRU1aZFJyLzR3NENaZVhZVTVBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0Mzk4MjIwNjo3OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYVHFsS0xMTkVlbGNpUlBaRENIT29OSkZzSjBSeFljOEJBOEl4UzNqcWNRIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzODQwODEyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxjbiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "BRUCE BERA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254743982206",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BEST CODER MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/76337c73fe48a2aa4466b.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
