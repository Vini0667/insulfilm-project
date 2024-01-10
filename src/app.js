// Requiring packages
    const express = require("express");
    const mongoose = require("mongoose");
    const handlebars = require("express-handlebars");
    const path = require("path");
    const session = require("express-session");
    const flash = require("connect-flash");

// Requiring my files
    const url = require("./config/db");
    const { secret } = require("./define_secret_to_session.json");
    const client_router = require("./routers/client");
    const material_router = require("./routers/material");
    const extract_router = require("./routers/extract");
    const service_route = require("./routers/service");

// Defining variables
    const app = express();
    const PORT = 9000;

// Mongodb config
    mongoose.Promise = global.Promise
    mongoose.connect(url).then(() => {
        console.log(`The connection was a successful`);
    }).catch((error) => {
        console.log(`We has an error ${error}`);
    });

// Handlebars config
    app.engine("handlebars", handlebars.engine({
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts"
    }));
    
    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "/views"));

// Static files config
    app.use(express.static(path.join(__dirname
        , "/public")));

// Parser config
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

// Session config
    app.use(session({
        secret: secret,
        resave: true,
        saveUninitialized: true
    }));

// Flash config
    app.use(flash());

// Middleware config
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    });

app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});

// Defining routers
    app.use("/client", client_router);
    app.use("/material", material_router);
    app.use("/service", service_route);
    app.use("/extract", extract_router);

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT} port`)
});