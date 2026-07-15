/* 

npx playwright test [options] [test-filter...] 
one main command in PW, with options
All options of the cli command are present 
in the official documentation in chapter "Command line" https://playwright.dev/docs/test-cli

npx playwright test   
run all tests from the project throw all flex, except annotated as 'sipped'

npx playwright test tests/lesson-24_storage_garage.spec.ts 
run specific test from the project, path "tests/lesson-24_storage_garage.spec.ts" + all dependency tests (e.g. from setup)

npx playwright test tests/lesson-24_storage_garage.spec.ts  tests/lesson-25_fixtures.spec.ts
run multiple specific tests 

npx playwright test storage_garage
run specific test using partial filename

npx playwright test -g "BMW X5"
add the test(s) using partial string from the filename: test('Add new car - BMW X5', async () => {...}) 
if there are several test names match the string - all those will be run

npx playwright test storage_garage -headed 
run the test(s) with browser(s) 

npx playwright test  --project=setup
run tests from internal project "setup"

npx playwright test --ui 
open project in UI mode

npx playwright test --debug
open debug mode

npx playwright test --workers=1 
override the number of workers in the current test run

npx playwright test my-spec.ts:42
run the test from the specific file, specific line L42

npx playwright test --reporter=dot
select the specific reporter

npx playwright test --help
print available CLI commands

npx playwright test -c <file> 
npx playwright test --config <file>
run the tests with config <file>

npx playwright install
Install all browsers

npx playwright install chromium
Install only Chromium

npx playwright codegen
start generating test steps in a scrypt, using codegen 

npx playwright show-trace
open trace viewer without a specific trace (can load traces via UI)

npx playwright merge-reports ./reports
combine test reports from different machines 

npx playwright clear-cache
clear all Playwright caches.




npx playwright show-report
opens playwright report




npx playwright test --help
print available CLI commands


*/
