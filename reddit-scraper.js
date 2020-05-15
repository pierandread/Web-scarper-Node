// Some websites rely exclusively on JavaScript to load their content, so using an HTTP request library like axios 
// to request the HTML will not work because it will not wait for any JavaScript to execute like a browser would before 
// returning a response.

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.reddit.com/r/news/';

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    $('h3').each(function() {
      newsHeadlines.push({
        title: $(this).text(),
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);