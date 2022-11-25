const client = require('@sendgrid/mail');

export default client.setApiKey(process.env.SENDGRID_SEC);
