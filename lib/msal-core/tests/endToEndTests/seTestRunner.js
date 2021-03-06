var exec = require('child_process').exec;
var keyVault = require('./keyvault');

var configurationFiles = [
    "se.conf.chrome.js",
    "se.conf.firefox.js",
    "se.conf.edge.js",
    "se.conf.safari.js",
    "se.conf.ie.js",
];

var i = 0;

var secretIds = {
    msaljs_browserstack_user: 'msaljs-browserstack-user',
    msaljs_browserstack_key: 'msaljs-browserstack-key',
    msidlab4: 'msidlab4',
    MSA_MSIDLAB4_Password: 'MSA-MSIDLAB4-Password'
}

var runSeleniumConfig = function () {
    var configFile =  configurationFiles[i];
    console.log("Running " + configFile);
    var config = require('./' + configFile);
    var testCommand = 'mocha spec/e2eCoreTestsSpec.js ' + configFile;
//    keyVault.getAllSecrets(secretIds).then(function (result) {
//            process.env.browserstackKey = result.msaljs_browserstack_key;
//            process.env.browserstackUser = result.msaljs_browserstack_user;
//            process.env.loginPassword = result.loginPassword;
//            process.env.MSA_MSIDLAB4_Password = result.MSA_MSIDLAB4_Password;
//    });
    exec(testCommand, function(error, stdout, stderr) {
        console.log("Completed " + configFile);
        console.log(stdout);
        if(error) {
            console.log(error);
            console.log(stderr);
        }
        i++;
        if(i < configurationFiles.length) {
            runSeleniumConfig();
        }
    });
}

runSeleniumConfig();