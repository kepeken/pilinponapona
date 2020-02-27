// usage:
//   node . run ${screen_name}
//   node . stat ${screen_name}

const fs = require('fs');
const util = require('util');
const dotenv = require('dotenv');
const yaml = require('js-yaml');
const Twitter = require('twitter');
const twitterText = require('twitter-text');
const SimpleGit = require('simple-git/promise');
const cron = require('node-cron');
const { sample } = require('lodash');

const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);

const git = SimpleGit();

const checkUpdates = async () => {
  const result = await git.pull();
  if (result.summary.changes) {
    require('child_process').exec('npm restart');
  }
};

const runOnce = async ({ account }) => {
  await checkUpdates();
  const env = dotenv.parse(await readFileAsync(`./accounts/${account}/.env`));
  const twitter = new Twitter({
    consumer_key: env.CONSUMER_KEY,
    consumer_secret: env.CONSUMER_SECRET,
    access_token_key: env.ACCESS_TOKEN_KEY,
    access_token_secret: env.ACCESS_TOKEN_SECRET,
  });
  const tweets = [];
  const directory = await readdirAsync(`./accounts/${account}/tweets/`);
  for (const file of directory) {
    const text = await readFileAsync(`./accounts/${account}/tweets/${file}`, { encoding: 'utf8' });
    const data = yaml.safeLoad(text);
    tweets.push(...data);
  }
  const tweet = sample(tweets);
  console.log(JSON.stringify(tweet));
  const responce = await twitter.post('statuses/update', {
    status: tweet,
  });
  console.log(`https://twitter.com/${account}/status/${responce.id_str}`);
};

const stat = async ({ account }) => {
  let count = 0;
  const tweets = [];
  const directory = await readdirAsync(`./accounts/${account}/tweets/`);
  for (const file of directory) {
    const text = await readFileAsync(`./accounts/${account}/tweets/${file}`, { encoding: 'utf8' });
    const data = yaml.safeLoad(text);
    const title = file.replace(/\.yaml$/, '');
    console.log(title, data.length);
    count += data.length;
    tweets.push(...data);
  }
  console.log('all', count);
  for (const tweet of tweets) {
    const parsed = twitterText.parseTweet(tweet);
    if (parsed.permillage > 1000) {
      console.error(`limit exceeded: ${JSON.stringify(tweet)}`);
    }
  }
};

(async () => {
  switch (process.argv[2]) {
    case 'run':
      cron.schedule('* */6 * * *', () => {
        runOnce({ account: process.argv[3] });
      });
      break;
    case 'once':
      runOnce({ account: process.argv[3] });
      break;
    case 'stat':
      stat({ account: process.argv[3] });
      break;
  }
})();
