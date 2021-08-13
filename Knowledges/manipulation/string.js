const removeSomethingToEnd = 'aaaa/amp';
const idx = removeSomethingToEnd.indexOf('/amp'); /*?*/

const result = removeSomethingToEnd.slice(0, idx); /*?*/
result


recom_item = {link: 'aaa/amp' };
if (recom_item.link) {
  const idx1 = recom_item.link.indexOf('/amp');
  const idx2 = recom_item.link.indexOf('?amp');
  if (idx1 > -1) {
    recom_item.link = recom_item.link.slice(0, idx1);
  }
  if (idx2 > -1) {
    recom_item.link = recom_item.link.slice(0, idx2);
  }
}
recom_item
