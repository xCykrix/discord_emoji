// this is here for nice requires in nodejs
// all you need to do is require this ("var x = require('discord-emoji')") and then you have x.food.pizza

module.exports = {
  activity = require('./activity.js'),
  emoji = require('./emoji.js'),
  flags = require('./flags.js'),
  food = require('./food.js'),
  nature = require('./nature.js'),
  objects = require('./objects.js'),
  people = require('./people.js'),
  symbols = require('./symbols.js'),
  travel = require('./travel.js')
}
