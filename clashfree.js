const fs = require("fs");
const puppeteer = require('puppeteer');
const core = require('@actions/core');
const github = require('@actions/github');
const { tFormat, sleep, clearBrowser, getRndInteger, randomOne, randomString,findFrames,findFrame  } = require('./common.js');
Date.prototype.format = tFormat;
const runId = github.context.runId;
let browser;
async function  main () {
    //console.log(await sqlite.open('./freeok.db'))
    const browser = await puppeteer.launch({ 
        headless: runId?true:false ,
        args: ['--window-size=1920,1080'],
        defaultViewport: null,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto('https://suo.yt/i0zeobp',{ timeout: 60000 });
    //let content = await page.$eval('body',e=>e.innerHTML);
    let content = await page.$eval('body > pre',e=>e.innerHTML);
    fs.writeFileSync('./output/clash.yml', content);
    let readme = fs.readFileSync('./README.md', 'utf8');
    readme = readme.replace('tttttttt',(new Date()).format("yyyy-MM-dd hh:mm:ss")).replace('xxxxxxxx',content);
    fs.writeFileSync('./output/README.md', readme);
    //if ( runId?true:false ) await browser.close();
    await browser.close();
}
main();

