# COMMANDS # 


npx playwright codegen https://guest:welcome2qauto@qauto.forstudy.space/    call codegen


npx playwright test [options] [test-filter...] 
- one main command in PW, with options
- All options of the cli command are present 
  in the official documentation in chapter "Command line" https://playwright.dev/docs/test-cli

npx playwright test   
- run all tests from the project throw all flex, except annotated as 'sipped'

npx playwright test tests/lesson-24_storage_garage.spec.ts 
- run specific test from the project, path "tests/lesson-24_storage_garage.spec.ts" 
  and all dependency tests (e.g. from setup)

npx playwright test tests/lesson-24_storage_garage.spec.ts  tests/lesson-25_fixtures.spec.ts
- run multiple specific tests 

npx playwright test storage_garage
- run specific test using partial filename

npx playwright test -g "BMW X5"
- add the test(s) using partial string from the filename: test('Add new car - BMW X5', async () => {...}) 
- if there are several test names match the string - all those will be run

npx playwright test storage_garage -headed 
- run the test(s) with browser(s) 

npx playwright test  --project=setup
- run tests from internal project "setup"

npx playwright test --ui 
- open project in UI mode

npx playwright test --debug
- open debug mode

npx playwright test --workers=1 
- override the number of workers in the current test run

npx playwright test my-spec.ts:42
- run the test from the specific file, specific line L42

npx playwright test --reporter=dot
- select the specific reporter

npx playwright test --help
- print available CLI commands

npx playwright test -c <file> 
npx playwright test --config <file>
- run the tests with config <file>

npx playwright install
- Install all browsers

npx playwright install chromium
- Install only Chromium

npx playwright codegen
- start generating test steps in a scrypt, using codegen 

npx playwright show-trace
- open trace viewer without a specific trace (can load traces via UI)

npx playwright merge-reports ./reports
- combine test reports from different machines 

npx playwright clear-cache
- clear all Playwright caches.



npm install dotenv
- setup lib 'dotenv'


npx playwright show-report
- opens playwright report

allure generate ./allure-results -o ./allure-report
- generate Allure Report

allure open ./allure-report
- Open Allure Report


npx playwright test <test-name>.spec.ts --update-snapshots
- for compare with a new expected screenshots


npx playwright test --help
- print available CLI commands



-------------------------
========= DOCKER ========
-------------------------

docker run alpine
- first time: Docker pull "alpine" image from docker hub and run "alpine" image, open-close container
- all next times: run "alpine" image, open-close container with name "randomWord1_randomWord2"

docker run --name container-name alpine
- run "alpine" image, open-close container with custom name "container-name"

docker ps -a
- show all containers running & closed

docker run -it alpine sh
- run container in interactive mode which allow to stay at container after it started 
  (doesn't close the container immediately after start); 
  run it from image "alpine";
  and run in the container shell (terminal)
  container will be started: 
  in terminal it looks like the new line doesn't starts from a usual path:   C:\local\path>
  but starts from hash sign:  /#     or    /path#

exit
- close the container
  container will be closed: 
  in terminal it looks like the new line doesn't starts from hash sign:   /#     or    /path#
  but starts from a usual path:   C:\local\path>


docker run -it -v .:/tests alpine sh
- run the new container from image "alpine" with started shell (terminal)
  leave it active (-it)
  synchronize the container (-v)
  with current dir (.) from which the command run
  the name of new synced dir on docker side will be "tests" (create if missing)
  Playwright project (as a dir) will be synced with docker container:
  everything we change on local - will be done in container and vice versa


In shell we can operate usual linux commands: mkdir, cd, ls, ls -a  (show all including hidden)

But we cannot run playwright tests from "alpine" image - it's to lite and doesn't have node.js, etc.
So, we need the image for playwright tests.
But playwright keeps such docker images in their MS repo (not in docker hub)
The command for install docker image from MS repo can find in official pw doc - 
https://playwright.dev/docs/docker
The command include the latest pw version 
And our pw ver MUST be synced with it -> upgrade pw to latest before run the command:

npx playwright install
- updates pw to the latest ver, which will be the same as ver in the desired command

docker pull mcr.microsoft.com/playwright:v1.61.0-noble
- install the image "mcr.microsoft.com/playwright:v1.61.0-noble" (but not run the container)

docker run -it -v .:/playwright-test mcr.microsoft.com/playwright:v1.61.0-noble sh
- run the interactive container from image "mcr.microsoft.com/playwright:v1.61.0-noble"
  sync the current dir with new created dir "playwright-test" 
  and run shell (terminal)

#ls 
- check the list for verify "playwright-test" dir is there

#cd playwright-test
- go to "playwright-test" dir

#ls
- check the list to verify all config files are there

#npx playwright test --project=e2e
- run our pw tests, "e2e" project in the container
  usual terminal inline report displaying:

  Running X tests using Y workers
  [1/X] [e2e] > tests/..............


Create in root of desired pw project file "Dockerfile" (w/o extension, blueprint for image)
Dockerfile  : 
-----
#Base Image
FROM mcr.microsoft.com/playwright:v1.61.0-noble

#Set the working directory
WORKDIR /playwright-test

#Copy package files
COPY package*.json ./

#Install dependencies
RUN npm install

#Copying files
COPY . .

#Run tests
CMD ["npx", "playwright", "test", "--project=e2e"]
-------

docker build -t playwright-tests .
- built (create) the image from Dockerfile
  give the name (-t) "playwright-tests"
  and look for the Dockerfile in current dir (.) 
- after run the command - the image building process starts: 
  start executing commands from Dockerfile
  build is completed
  image "playwright-tests" is ready 
  each time the container starts from this image - the command from Docker file, that runs test, 
  will be executed:
  CMD ["npx", "playwright", "test", "--project=e2e"]

docker run playwright-tests
- start container from "playwright-tests" image
  immediately after the command run - tests for e2e project start executing 
  (due to command CMD ["npx", "playwright", "test", "--project=e2e"] included in the image)

  Running X tests using Y workers
  [1/X] [e2e] > tests/..............

