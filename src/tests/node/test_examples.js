const userAgentDatabase = require('../../user-agents.json');

let failed = false;
userAgentDatabase.forEach(app => {
  var regExps = app.user_agents.map(ua => new RegExp(ua, 'g'));
  var examples = app.examples;
  if (!examples) return;

  examples.forEach(example => {
    let matched = regExps.some(regexp => example.match(regexp))
    if (!matched) {
      console.warn(`${app.app}: Example "${example}" doesn't match any of the user_agent regexps (${regExps})`)
      failed = true;
    }
  })
})

process.exit(failed ? 1 : 0);
