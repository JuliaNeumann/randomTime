//@ts-check
const express = require("express");
const config = require("./config");
const Router = require("./router");
const server_port = process.env.OPENSHIFT_NODEJS_PORT || 9000;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

let app = express();

Router.init(app, config);

app.listen(server_port, server_ip_address, () => {
    // tslint:disable-next-line:no-console
    console.log(`Worker ${process.pid} running a ${config.env} server listening on port ${server_port}`);
});
