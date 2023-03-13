//@author Armanjeet singh 3136363
const express = require('express');
const app = express();
const path = require('path');
const data = require('./data.json');
const handlebars = require('express-handlebars').create({ defaultLayout: '' });


// Set up Handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


// Handle incoming requests to the root URL
  app.get('/', function(req, res) {
    const milestone = req.query.milestone || 'The-Birth';
    const milestoneData = data[milestone];
    if (!milestoneData) {
      // Return a 404 error if the specified milestone doesn't exist
      return res.status(404).send('Milestone not found');
    }
    const templateData = {
      milestones: "Some milestones of internet history",
      title: milestoneData.title,
      year: milestoneData.year,
      next: milestoneData.next
    };
    res.render(`${milestone}.handlebars`, templateData);
  });
  
app.listen(4016, function() {
  console.log(`Server listening on port 4016`);
});
