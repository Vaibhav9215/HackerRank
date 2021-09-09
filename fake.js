// npm i puppeteer
//const emailpassObj = require("./secrets");
const { answers } = require("./code");
let puppeteer = require("puppeteer");
// create headless browser
let browserStartPromise = puppeteer.launch({
    //visible
    headless: false,
    //type 1sec
    //  slowmo: 1000,
    //
    defaultViewport: null,
    // browser setting
    args: ["--start-maximized", "--disable-notifications"]

});
let page, browser, cTab;
browserStartPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    })
    // .then bhar
    .then(function (newTab) {
        page = newTab
        console.log("new tab opened")
        let gPageOpenPromise = page.goto("https://www.google.com/");
        return gPageOpenPromise;
    }).then(function () {
        console.log("Google home page opened");
        //keyboard -> data entry
        let WaitforTypingPromise = page.type("input[title=Search]", "hackerrank login");
        return WaitforTypingPromise;
    })
    .then(function () {
        //keyboard -> specific keys
        let enterWillBeDonePromise = page.keyboard.press('Enter', { delay: 100 });
        return enterWillBeDonePromise;
    })
    .then(function () {
        //next page
        // wait for element to be visible on the  -> whenever you go on a new page
        console.log("wait for element to be visible")
        let waitForElementPromise = page.waitForSelector(".LC20lb.DKV0Md", { visible: true })
        return waitForElementPromise;
    }).then(function () {
        //mouse function

        let elemClickPromise = page.click(".LC20lb.DKV0Md");
        return elemClickPromise;
    }).then(function () {
        //next page
        // wait for element to be visible on the  -> whenever you go on a new page
        console.log("wait for username to be visible")
        let waitElementPromise = page.waitForSelector("input[name='username']", { visible: true })
        return waitElementPromise;
    })
    .then(function () {
        // console.log(visitPage)
        let emailWillTypedpromise = page.type("input[name='username']", "vanimam287@drlatvia.com");
        return emailWillTypedpromise;
    }).then(function () {
        //next page
        // wait for element to be visible on the  -> whenever you go on a new page
        console.log("wait for password to be visible")
        let waitElementPromise = page.waitForSelector("input[name='password']", { visible: true })
        return waitElementPromise;
    })
    .then(function () {
        let passwordWillTypedpromise = page.type("input[name='password']", "Vanimam287@");
        return passwordWillTypedpromise;
    }).then(function () {
        //     let waitFor3SecondsPromise = page.waitFor(3000);
        //     return waitFor3SecondsPromise;
    })
    .then(function () {
        //next page
        // wait for element to be visible on the  -> whenever you go on a new page
        console.log("wait for loginbutton to be visible")
        let waitElementPromise = page.waitForSelector("button[data-analytics='LoginPassword']", { visible: true })
        return waitElementPromise;
    })

    .then(function () {
        let loginPromise = page.click("button[data-analytics='LoginPassword']", { delay: 100 });
        return loginPromise;

    })
    .then(function () {
        //next page
        // wait for element to be visible on the  -> whenever you go on a new page
        console.log("wait for element to be visible")
        let watForElementPromise = page.waitForSelector(".topic-name", { visible: true });
        return watForElementPromise;
    })
    .then(function () {
        //mouse function
        let elmClickPromise = page.click(".topic-name");
        return elmClickPromise;
    })
    .then(function () {
        let getToWarmUp = waitAndClick("input[value='warmup']", page);
        return getToWarmUp;

        // }).then(function () {
        //     let waitFor3SecondsPromise = page.waitFor(3000);
        //     return waitFor3SecondsPromise;
    }).then(function () {
        let challengeClickPromise = page.click(".challenge-submit-btn", { delay: 100 });
        return challengeClickPromise;
    })
    .then(function () {
        let waitforMan = page.waitForSelector(".monaco-editor.no-user-select.vs", { visible: true });
        return waitforMan;

    }).then(function () {
        let clickforMan = page.click(".monaco-editor.no-user-select.vs", { delay: 100 });
        return clickforMan;
    })
    .then(function () {
        console.log(4);
        let ctrWillBeDownPromise = page.keyboard.down("Control");
        return ctrWillBeDownPromise;
    }).then(function () {
        let aWillBepressedPromise = page.keyboard.press("a");
        return aWillBepressedPromise;
    }).then(function () {
        let xWillBepressedPromise = page.keyboard.press("x");
        return xWillBepressedPromise;
    }).then(function () {
        let pointerWillBeclicked = page.click(".monaco-editor.no-user-select.vs");
        return pointerWillBeclicked;
    })
    .then(function () {
        let ctrWillBeDownPromise = page.keyboard.up("Control");
        return ctrWillBeDownPromise;
    })
    .then(function (result) {

        let pressCtrlPromise = page.type('.view-line', answers);

    }).then(function(){
  let waitforMan = page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled", { visible: true });
        return waitforMan;

    }).then(function () {
        let clickforMan = page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled", { delay: 100 });
        return clickforMan;
    })



function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise
            .then(function () {
                let clickModal =
                    cPage.click(selector, { delay: 100 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err)
            })
    }
    )
}
















 // screenshot of full page

 //.then(function(){
//     let scPromise = page.screenshot({path: 'vbv.png', fullPage:true})
//     return scPromise;
// })

//screenshot of page

//.then(function(){
//     let sPromise = page.screenshot({path: 'vs.png'})
//     return sPromise;
// })

// close the browser

// .then(function(){
//     let browserOb= browser.close();
//     return browserOb
// })

// pdf generation only in headless:true mode
// .then(function(){
//     console.log("pdf ready to generate")
//     let pdfPRomise= page.pdf({path:'vbv.pdf'});
// }) 