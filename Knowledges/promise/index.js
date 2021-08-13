const Promise = require('bluebird');

const promise1 = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success promise2")
    }, 3000);
  })
  console.log("[JONGMAN_LOG] 323", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));

}

const main = async () => {
  console.log("[JONGMAN_LOG] here", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  const result = await Promise.all([
    promise1,
  ]);
  return result;
};

main()
.then((result) => {
  console.log("[JONGMAN_LOG] result", result, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
});


const run = async () => {
  await updateImageLibraryPossessionByOldThumbnails();
  await reflectCampaignStatus();
};

if (require.main === module) {
  run().then( () => {
    console.info('OK');
    process.exit(0);
  } )
  .catch( (err) => {
    console.error(err);
    process.exit(1);
  } );
} else {
  module.exports = { run };
}
