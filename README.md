**Instructions how to test this project:**
to test this application: please click on any image on the home page to see the processing
or please write it in url: "http://localhost:3000/images?filename=fish&width=100&height=100"
after that you can change width or height manualy, then the image will resized to new params you wrote and will save in [public/images/resized] Directory

**Steps to complete this project:**
1- Initialize npm automatically select all defaults
    $ npm init -y 

2- Install type definitions for express
    $ npm install express                   // it's save to dependencies
    $ npm i --save-dev @types/express       // it's save to devDependencies    

3- Install an image resize libraries like sharp
    $ npm i sharp
    $ npm i --save-dev @types/sharp
    $ npm install --platform=win32 --arch=ia32 sharp  (only if you have win32)

20- Add Typescript and its dependencies
    $ npm i --save-dev typescript	

21- Install ts-node
    $ npm i --save-dev ts-node

22- the type definitions of node
    $ npm i --save-dev @types/node

5- Install nodemon
    $ npm install nodemon           // it's save to dependencies
    $ npm i --save-dev nodemon      // it's save to devDependencies

6- Add a start script for nodemon in the package.json file
    "start": "nodemon src/index.ts"

7- Import express into index.ts
    import express from 'express';

8- Create your application object with express() into index.ts
    const app = express();

9- Set a port into index.js
    const port = 3000;

11- File system (fs) allows for reading and writing into index.ts 
    const fs = require('fs');

12- Set your application to listen on your port 
    and output a message to the console with app.listen  into index.ts
    app.listen(port, ()=> {
      console.log(`Server Started at localhost:${port}`)
    });

10- Create your application object with sharp() into image-resizing.ts
    import sharp from 'sharp';

13- Installed Prettier
    $ npm i --save-dev prettier
    <!-- $ npm run prettier-format -->

14- Installed ESLint
    $ npm i --save-dev eslint

15- Installed ESLint Config Prettier
    $ npm i --save-dev eslint-config-prettier

16- Installed ESLint Prettier Plugin
    $ npm i --save-dev eslint-plugin-prettier

17- Created scripts for both prettier and ESLint in package.json
    "lint": "eslint --ext .js'",
    "prettier": "prettier --config .prettierrc '*.ts' --write"

18- Run prettier and ESLint to find errors  then Fixed errors
    $ npm run lint
    $ npm run prettier

23- Add the Typescript configuration
    $ npx tsc --init

24- NPX and Creating your package.json Script
    "scripts": {
        "build": "npx tsc"
    },

25- Configuring TypeScript
    tsconfig.json can also be named jsconfig.json
    To install the config file, run
    $ npx tsc --init 

26- To execute your "build" script use the following:
    $ npm run build
    $ node build/.

27 Create a folder called public in the root
    then put html, CSS and JS files 

28- Add the following code inside the index.js file
    app.use(express.static('public'));

29- Create an index.html file inside the public folder

30- Now in the routes/index.ts file, we need to const resize middleware like Sharp
    import express from 'express';
    import sharp from 'sharp';

32- Install Unit Testing Jasmine 
    $ npm i jasmine

33- Add a reporter for outputting Jasmine results to the terminal
    $ npm i jasmine-spec-reporter     

34- Add type definitions for Jasmine
    $ npm i --save-dev @types/jasmine
    $ npm install --save-dev jasmine

>>- I also recommend to install Jasmine globally in case you need to run your tests directly
    $ npm install -g jasmine

35- Add Testing Scripts in package.json       
    "jasmine": "jasmine"

36- Set Up the File Structure:
    - In the root directory of the project, create a folder named spec.
    - In the spec folder, create a folder named support.
    - In the support folder, create a file named jasmine.json to hold the primary configurations for Jasmine.
    - In the src folder, add a folder named tests.
    - In tests add a file named indexSpec.ts to hold the tests for code in the index.js file.
    - In the tests folder, add another folder named helpers.
    - In helpers, add a file named reporter.ts. This will be the primary configuration for your spec reporter.

    File Structure
    ├── node_modules
    ├── spec
    │      └── support
    │           └── jasmine.json
    ├── src
    │     ├──  tests
    │     │     ├── helpers
    │     │     │      └── reporter.ts
    │     │     └── indexSpec.ts
    │     └── index.ts
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json

37- In reporter.ts, add the following code from the jasmine-spec-reporter TypeScript support documentation
    import {DisplayProcessor, SpecReporter, StacktraceOption} from "jasmine-spec-reporter";
    import SuiteInfo = jasmine.SuiteInfo;

    class CustomProcessor extends DisplayProcessor {
        public displayJasmineStarted(info: SuiteInfo, log: string): string {
            return `${log}`;
        }
    }

    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
            displayStacktrace: StacktraceOption.NONE
        },
        customProcessors: [CustomProcessor],
    }));    

38- In the jasmine.json add the following configurations for a basic Jasmine configuration:
    {
        "spec_dir": "dist/tests",
        "spec_files": [
            "**/*[sS]pec.js"
        ],
        "helpers": [
            "helpers/**/*.js"
        ],
        "stopSpecOnExpectationFailure": false,
        "random": false
    }

39- In the tsconfig.json file, add "spec" to the list of folders that we want to exclude.
      //"exclude": ["node_modules", "./build", "spec"]
      "exclude": ["node_modules", "tests", "build", "spec"]

40- Add next code in package.json
    "test": "npx run build && npm run jasmine",

41- Run the build script and then the test script
    $ npm run jasmine
    or $ npm run test

42- Install supertest package to testing HTTP
    $ npm i supertest
    $ npm install supertest --save-dev



