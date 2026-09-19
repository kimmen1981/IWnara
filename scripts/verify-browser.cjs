const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
 const context = await browser.newContext({ permissions: ['clipboard-read','clipboard-write'] });
 const page = await context.newPage(); const errors = []; const results = [];
 page.on('pageerror', e => errors.push(e.message));
 page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
 const base = process.env.TEST_URL || 'http://127.0.0.1:3012';
 fs.mkdirSync('verification', { recursive: true });
 for (const width of [375,430,1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ['/','/sorberge','/skonsmon','/medlemskap','/butik','/faq','/integritet']) {
   const response = await page.goto(base + route); assert.equal(response.status(), 200, route);
   await page.locator('h1').waitFor(); await page.evaluate(() => document.fonts.ready);
   const audit = await page.evaluate(() => ({
    width: innerWidth, scroll: document.documentElement.scrollWidth,
    brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.getAttribute('href').slice(1))).map(a => a.getAttribute('href')),
    overflow: [...document.querySelectorAll('main h1, main h2, main p, main .button, header, footer')].filter(e => { const r=e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).map(e => e.textContent.slice(0,50)),
    duplicateIds: [...document.querySelectorAll('[id]')].map(e => e.id).filter((id,i,arr) => arr.indexOf(id) !== i),
    smallCtas: [...document.querySelectorAll('.button')].filter(e => e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 48).map(e => e.textContent)
   }));
   assert.equal(audit.scroll, width, `${route} overflow at ${width}`); assert.deepEqual(audit.overflow, [], route); assert.deepEqual(audit.brokenAnchors, [], route); assert.deepEqual(audit.duplicateIds, [], route); assert.deepEqual(audit.smallCtas, [], route);
   await page.screenshot({ path: `verification/${route.slice(1)||'home'}-${width}.png` });
   results.push({route,width,...audit});
  }
 }
 await page.setViewportSize({width:375,height:900});
 await page.goto(base+'/skonsmon');
 assert.equal(await page.locator('#prova-gratis').count(),0);
 assert.equal(await page.getByText('Öppet hus i Skönsmon',{exact:true}).count(),0);
 assert.equal(await page.locator('#forboka input').count(),2);
 await page.locator('#forboka').scrollIntoViewIfNeeded(); await page.screenshot({path:'verification/skonsmon-form-375.png'});
 await page.getByLabel('Namn',{exact:true}).fill('Test Person'); await page.getByLabel('Mobilnummer',{exact:true}).fill('0701234567');
 assert.equal(await page.locator('#forboka form').evaluate(f=>f.checkValidity()), true);
 await page.getByRole('button',{name:'Fortsätt till e-post'}).click();
 await page.getByText('Vi har ännu inte bekräftat att anmälan är mottagen.',{exact:false}).waitFor();
 const email = new URL(await page.getByRole('link',{name:'öppna mejlet igen'}).getAttribute('href'));
 assert.equal(email.pathname,'info@iwnara.se'); assert.equal(email.searchParams.get('subject'),'bokning av medlemskap i Skönsmon'); assert.match(email.searchParams.get('body'),/Test Person/);
 assert.equal(await page.getByText('Tack! Vi har tagit emot din intresseanmälan.',{exact:false}).count(),0);
 const summary = page.locator('.faq-item summary').first(); await summary.click(); assert.equal(await summary.evaluate(e=>e.parentElement.open),true); await summary.press('Enter'); assert.equal(await summary.evaluate(e=>e.parentElement.open),false);
 await page.goto(base+'/medlemskap');
 await page.getByLabel('Student / Pensionär / Ungdom',{exact:false}).check();
 assert.match(await page.getByRole('link',{name:'Fortsätt till GymControl'}).getAttribute('href'),/uid=9452/);
 await page.getByLabel('Gratis träning med introduktion',{exact:false}).check(); assert.equal(await page.getByLabel('Namn',{exact:true}).count(),1);
 await page.getByLabel('Gratis provträning på egen hand',{exact:false}).check(); assert.equal(await page.getByLabel('Namn',{exact:true}).count(),0);
 await page.getByLabel('Jag vill ha hjälp att registrera medlemskap',{exact:false}).check(); assert.equal(await page.getByLabel('Namn',{exact:true}).count(),1);
 await page.getByLabel('Skönsmon',{exact:false}).check(); assert.equal(await page.getByText('Gratis träning med introduktion',{exact:true}).count(),0);
 assert.equal(await page.getByRole('link',{name:'Förboka medlemskap – 299 kr/mån',exact:true}).getAttribute('href'),'/skonsmon#forboka');
 await page.getByLabel('Sörberge',{exact:false}).first().check(); await page.getByLabel('Jag vill bli medlem och registrerar mig själv',{exact:false}).check();
 await page.locator('#starta').scrollIntoViewIfNeeded(); await page.screenshot({path:'verification/membership-options-375.png'});
 await page.goto(base+'/butik');
 const buttons = page.getByRole('button',{name:/Swisha .* kr för/}); assert.equal(await buttons.count(),7);
 for(let i=0;i<7;i++) {
  await buttons.nth(i).click(); const dialog = page.locator('dialog[open]');
  const href = await dialog.getByRole('link',{name:'Öppna Swish'}).getAttribute('href');
  const data = JSON.parse(new URL(href).searchParams.get('data')); assert.equal(data.payee.value,'1235946744'); assert.equal(data.amount.value,[249,249,199,119,299,549,329][i]); assert.ok(data.message.value);
  if(i===0){ await dialog.getByRole('button',{name:'Kopiera Swishnummer'}).click(); assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'1235946744'); await page.screenshot({path:'verification/swish-375.png'}); }
  await page.keyboard.press('Escape'); assert.equal(await page.locator('dialog[open]').count(),0);
 }
 await page.goto(base+'/'); await page.locator('footer').scrollIntoViewIfNeeded(); await page.screenshot({path:'verification/contact-375.png'});
 const phones=await page.locator('footer a[href^="tel:"]').evaluateAll(a=>a.map(e=>e.getAttribute('href'))); assert.deepEqual(phones,['tel:+46707539239','tel:+46767792121','tel:+46723172162']);
 await page.getByRole('link',{name:'Bli medlem',exact:true}).first().click(); await page.waitForURL('**/medlemskap');
 // Browser cannot execute an actual Swish/BankID payment; only deeplink payload is tested.
 fs.writeFileSync('verification/report.json',JSON.stringify({results,errors},null,2));
 await browser.close(); assert.deepEqual(errors.filter(e=>!e.includes('mailto:')),[]);
 console.log(`PASS ${results.length} page/viewport checks; FAQ keyboard, membership paths, email fallback and all 7 Swish payloads. Errors: ${errors.length}`);
})().catch(e=>{console.error(e);process.exit(1)});

