// app 에서 redirect를 후킹해 별도 처리하기로 약속했기 때문에 모든 아이템의 redirect url을 변경해야 한다.
// outlink://, inlink:// 로 앞부분을 바꿔서 새창/현재창 열림 구분을 한다.

function setAppSpecificLink() {
  $('a.item-link').each(function (idx, el) {
    const is_ad = $(this).parent().hasClass('item-sp');
    if (is_ad) {
      const outlink = this.href.replace(/^(https?):/, 'outlink://');
      // 데이블 리다이렉트를 따라 로깅됨
      $(this).attr('href', outlink);
    } else {
      const log_url_no_redirect = this.href.replace('click_redirect', 'click');
      const item_id = $(this).parent().attr('data-item_id');
      const publisher_item_url = `inlink://article.html?NID=${item_id}&TB=03&TN=JTBC 뉴스`;
      $(this).attr('href', publisher_item_url).on('click', (e) => {
        e.preventDefault();
        $.get(log_url_no_redirect);

        setTimeout(() => {
          top.location.href = publisher_item_url;
        }, 200);
      });
    }
  });
}
