//@ts-check
const express = require("express");
const config = require("./config");
const Router = require("./router");
const server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

let app = express();

Router.init(app, config);

if (process.env.OPENSHIFT_NODEJS_PORT) {
  app.listen(server_port, server_ip_address, () => {
    // tslint:disable-next-line:no-console
    console.log(`Worker ${process.pid} running a ${config.env} server listening on port ${server_port}`);
  });
}
else {
  app.listen(server_port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Worker ${process.pid} running a ${config.env} server listening on port ${server_port}`);
  });
}
