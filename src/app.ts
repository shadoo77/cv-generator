import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import RoutesLoader from './loadres/routesLoader';
// require("./services/db.connection");



const app = express();

app.use(cors());

app.use(express.urlencoded({
  extended: false,
  limit: "50mb",
  parameterLimit: 1000000
}));
app.use(express.json());

const morganConfig = morgan(process.env.NODE_ENV === "production" ? "combined" : "dev");

app.use(morganConfig);

//access for anywhere on the server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

// load routes
RoutesLoader(app);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
  );
}

app.use((req, res, next) => {
  const error: any = new Error("inserted request is not found!");
  error.status = 404;
  next(error);
});

app.use((error: any, req: any, res: any, next: Function) => {
  res.status(error.status || 500).json({ Error: error.message });
});

const server = {
  host: "http://localhost",
  port: 3123
};

const port = process.env.PORT || server.port;
app.listen(port, () => {
  console.log(`Listening on ${server.host}:${port} ..`);
});
