const fs = require('fs');
const util = require('util');
const twitter = require('twitter-text');

const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);

const getTweets = async ({ account }) => {
  const tweets = [];
  const directory = await readdirAsync(`./accounts/${account}/tweets/`);
  for (const file of directory) {
    const text = await readFileAsync(`./accounts/${account}/tweets/${file}`, { encoding: 'utf8' });
    tweets.push(...text.replace(/\r\n/g, '\n').split('---').map(t => t.trim()));
  }
  return tweets;
};

(async () => {
  const tweets = await getTweets({ account: 'kirara_jbo' });
  for (const tweet of tweets) {
    const parsed = twitter.parseTweet(tweet);
    if (parsed.permillage > 1000) {
      console.error(`文字数オーバー: ${JSON.stringify(tweet)}`);
    }
  }
})();
