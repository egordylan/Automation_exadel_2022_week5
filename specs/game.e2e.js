const {login} = require('./helper.js');
const email = 'walker@jw.com';
const password = 'password';
const link = 'https://viktor-silakov.github.io/course-sut/index.html?quick';

describe('The game', async function () {
    before('praparing data', async function () {
        await login(email, password, link);
    });

    it('should get more than 100 points ', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/arkanoid.html');
        await browser.pause(1000);
        
        await browser.maximizeWindow();
        const widthPad = await $('#pad').getSize('width');
        const halfOfWidth = Math.floor(widthPad/2 - 15);
        console.log(halfOfWidth);

        await $('button=PLAY').click();
        await browser.waitUntil(async () => {

            const ball = await $('#ball').getLocation('x');
            const pad = await $('#pad').getLocation('x');
            if(ball > pad + halfOfWidth) {
                await browser.keys('D');
            } 
            else if (ball <= pad - halfOfWidth) {
                await browser.keys('A');
            }
            
            const points = parseInt(await $('#points').getText(), 10);
            if (points > 100) {return true;}
            console.log({ points });
        }, { timeout: 600000, interval: 10 })
    });
})


// npx wdio wdio.conf.js --spec specs/game.e2e.js
