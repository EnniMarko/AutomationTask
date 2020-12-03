const SeleniumTest = require("./SeleniumTest.js")
const screenshotPath = "./Results/Selenium/test.png"
const newman = require("newman");
const collectionPath = "./Postman/AutomationTask.postman_collection.json";
const environmentPath = "./Postman/http---www.omdbapi.com-.postman_environment.json";
const jsonExportPath  = "./Results/OmdbApiTestResults.json";

newman.run(
{   
    collection: require(collectionPath),
    environment: require(environmentPath),
    reporters: ["cli","json"],
    reporter : {json: 
        { export : jsonExportPath}
    }
}, 
(err, summary) => {
    if(err) throw err;
    console.log('collection run complete!');
    let stats = summary.run.stats;
    console.log(`The ${stats.items.total} test executed with ${stats.items.failed} failed`);
    console.log(`Total assertions: ${stats.assertions.total}, with ${stats.assertions.failed} failed`);
    console.log(`The report was generated in ${jsonExportPath}`)
});

// not finished, some enviroment-dependent problem ( I am a Linux User)
// console.log("The Selenium test: locate if the Google Logo on the google.com using Google Chrome");
// SeleniumTest.Run();