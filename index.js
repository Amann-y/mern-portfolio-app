import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/portfolioRoute.js";
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const getDirName = function (moduleUrl) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}

const __dirname = getDirName(import.meta.url)
console.log(__dirname)

//static files access
app.use(express.static(path.join(__dirname, './client/dist')))

app.use("/api/v1/portfolio", router);

app.get('*', function(req,res){
res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
