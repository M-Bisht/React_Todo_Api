import { app } from "./app.js";
import { mongoDBserver } from "./data/mongoDB.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listining on port ${port}. Mode = ${process.env.NODE_ENV}`);
});

mongoDBserver();
