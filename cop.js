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
        let waitFor3SecondsPromise = page.waitFor(3000);
        return waitFor3SecondsPromise;
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

    }).then(function () {
        let waitFor3SecondsPromise = page.waitFor(3000);
        return waitFor3SecondsPromise;
    }).then(function () {
        let AllChallengeArrPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 100 });
        return AllChallengeArrPromise;
    })
    .then(function (questionArr) {
        //n question page
        console.log("number of question", questionArr.length);
        let qWillBeSolvedPromise = questionSolver(page, questionArr[0], answers[0]);
        return qWillBeSolvedPromise;
    })
    .then(function () {
        console.log("question is solved");
    })


function waitAndClick(selector, cPage) {
   // console.log("line 126",selector);
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, {visible: true });
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


function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let qWillBeClickedPromise = question.click();
        // code read
        //hk editor -> cntrl A+ ctrl x
        //code type
        qWillBeClickedPromise
        //click
        //code type
        // ctrl A+ ctrl x
        //click on editor
        //ctrl A+ ctrl v
        // reached editor
        .then(function () {
            //focus
            let waitFOrEditorToBeInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitFOrEditorToBeInFocus;
        })
        //click
        .then(function(){
            return waitAndClick(".checkbox-input", page);
        })
        .then(function(){
         return   page.waitForSelector("textarea.custominput" ,{visible:true});
        }).then(function(){
            return page.type("textarea.custominput", answer, {delay:50});
        }).then(function () {
            let ctrlIsPressedP = page.keyboard.down("Control");
            return ctrlIsPressedP;
        })
        .then(function () {
            let AIsPressedP = page.keyboard.press("A", { delay: 100 });
            return AIsPressedP;
        }).then(function () {
            let XIsPressedP = page.keyboard.press("X", { delay: 100 });
            return XIsPressedP;
        }).then(function () {
            ctrlIsPressedP = page.keyboard.up("Control");
            return ctrlIsPressedP;
        })

      .then(function () {
            //focus
            let waitFOrEditorToBeInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitFOrEditorToBeInFocus;
        }).then(function () {
            let ctrlIsPressedP = page.keyboard.down("Control");
            return ctrlIsPressedP;
        })
            .then(function () {
                let AIsPressedP = page.keyboard.press("A", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                let VIsPressedP = page.keyboard.press("V", { delay: 100 });
                return VIsPressedP;
            }).then(function () {
                ctrlIsPressedP = page.keyboard.up("Control");
                return ctrlIsPressedP;
            })
            .then(function () {
                return page.click(".hr-monaco__run-code", { delay: 50 });
            })
            .then(function () {
                resolve();
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
    })
}










