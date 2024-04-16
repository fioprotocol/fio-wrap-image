const express = require('express')
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const {handler} = require("./controller/api/fio");

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get("/nftimage/:domain", handler);

app.listen(3010, () => {
    console.log(`server listening on *: 3010`)
});
