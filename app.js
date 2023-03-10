const express = require("express");

const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");

const fileUpload = require("express-fileupload");

const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const { default: axios } = require("axios");

const nodemailer = require("nodemailer");
const { users } = require("./data");

app.use("/public", static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 5000000,
    },
    abortOnLimit: true,
  })
);

const handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
  },
  partialsDir: ["views/partials/"],
});

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "MyPaws",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 6000000 },
  })
);

var hbs = exphbs.create({});

// register new handlebars function
hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.use("/live", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login?e=l");
  } else {
    next();
  }
});

app.use("/post", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
});

app.use("/auth/login", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/live");
  } else {
    next();
  }
});

app.use("/auth/register", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/live");
  } else {
    next();
  }
});
app.use("/auth/profile", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login?e=l");
  } else {
    next();
  }
});

app.use("/pets/lost", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login?e=l&ref=lp");
  } else {
    next();
  }
});

app.use("/pet-stores/review-post", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/login?e=l");
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("Running MyPaws at http://localhost:3000");
});

setInterval(() => {
  console.log("Request sent to match");
  axios.post("http://localhost:3000/pets/match").then(async (res) => {
    console.log(res.data);
    if (res.data.match == true) {
      const userId = res.data.lost.userId;
      const user = await users.getUserById(userId);
      let email = process.env.EMAIL;
      let pass = process.env.PASS;
      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: email,
          pass: pass,
        },
      });

      let mailOptions = {
        from: email,
        to: user.email,
        subject: "MyPaws" + " | MATCH FOUND !",
        text: "contact:" + res.data.found.email + " for you pet information",
      };
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
      });
    }
  });
}, 60000 * 10);
