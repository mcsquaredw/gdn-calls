const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');

const config = require("../config").getConfig();
const { user, password, host, ssl } = config.EMAIL;

const smtpServer = email.server.connect({
  user, password, host, ssl
});


module.exports = (app, db) => {
  app.use(passwordless.sessionSupport());
  app.use(passwordless.acceptToken({successRedirect: '/'}));
  
  passwordless.init(new MongoStore(config.MONGODB_URI));
  passwordless.addDelivery(
    (tokenToSend, uidToSend, recipient, cb) => {
      var host = config.HOST;
      smtpServer.send({
        text: "",
        from: "sales@thegaragedoornetwork.com",
        to: recipient,
        subject: "GDN Call Log - Sign In",
        attachment: [
          {data:`<html>To Log In To The Garage Door Network Call Log, please click this link: <a href="${host}?token=${tokenToSend}&uid=${encodeUriComponent(uidToSend)}"</html>`}
        ]
      }, (err, message) => {
        if(err) {
          console.eror(err);
        }
        cb(err);
      });
    }
  )
};
