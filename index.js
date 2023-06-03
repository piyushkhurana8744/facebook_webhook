const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4004;

// Middleware to parse the request body
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const challenge = req.query['hub.challenge'];
  const verifyToken = req.query['hub.verify_token'];

  if (verifyToken === 'abc123') {
    console.log(challenge);
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const { body } = req;

  if (body.object === 'page') {
    // Iterate over the entry array containing webhook events
    body.entry.forEach(entry => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent); // Log the webhook event for debugging

      if (webhookEvent && webhookEvent.changes && webhookEvent.changes[0].field === 'leadgen') {
        const leadData = webhookEvent.changes[0].value;
        console.log(leadData); // Log the lead data for debugging

        // Process the lead data as per your requirements
        // Add your custom logic here to handle and store the lead data

        // Send a response indicating successful processing
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
