// BISMILLAH
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const pug = require("pug");
// const routerFile = require("./router");
const qrCode = require("qrcode");
const port = process.env.PORT || 9000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "templates")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const qr = qrCode.toString("i am a student!", function(err, url) {
//     console.log(url);
// });
// Home Route
app.get("/", (req, res) => {
    res.status(200).render("base", { title: "QR Application!" });
    console.log("hi, it working!");
});

app.post("/getQRcode", (req, res, err) => {
    if (!req.body.QRtext) {
        res.render("emptyData", { title: "Empty Data!" });
    } else if (req.body.QRtext) {
        let textData = req.body.QRtext;
        qrCode.toDataURL(textData, { type: "terminal" }, (err, url) => {
            if (err) res.send(err.message);
            res.render("qrContainer", { data: url, title: "Your QRcode!" });
            console.log(url);
        });
    }
});

app.listen(port, () => {
    console.log("Hello from server!");
});