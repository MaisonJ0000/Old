const run = async () => {
  const a = [{"abc": 2, "bcd": 2, "cdf": 3, "a_b": 4, "cd_de": 55, "widget_name1": 78, "widget_name2":"중C_가로6IF_EMP", "widget_id":"38Jbeg6M"}];
  console.log(1);
  const stringifyed = JSON.stringify(a);
  console.log(stringifyed);
  console.log(JSON.parse(stringifyed));
  // [1, 2, 3].forEach(n => {
  //   console.log("[JONGMAN_LOG] n", n, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  //
  //   try {
  //     if (n === 2) throw new Error('error');
  //   } catch (e) {
  //     console.error('oh my god');
  //   }
  //
  //
  //   console.log("[JONGMAN_LOG] reach please", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  //   console.log("[JONGMAN_LOG] n", n, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  // })
  //
  //
  // console.log("[JONGMAN_LOG] reach please", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
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
