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

  