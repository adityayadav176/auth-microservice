import dotenv from "dotenv"
import { connectToMongo } from "./db/db.js";
import {app} from "./app.js"
import { transporter, verifySmtp } from "./utils/nodemailer.js";
import { APP_NAME } from "./constant/constant.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

connectToMongo()
.then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`${APP_NAME} Is Running On Port : ${PORT}`)
    console.log(`Server Url: http://localhost:${PORT}`)
})
})
.catch((error) => {
    console.log("MongoDb Connection Failed:", error.message);
})

verifySmtp();