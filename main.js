'use strict';
$(function() {
  let basePath = 'https://button-to-press-n-times.herokuapp.com/';
  // let basePath = 'http://localhost:8000/';
  let remain;
  let cnt = 0;
  let altcnt = 0
  let btn = $('#btn')[0];
  $.ajax(basePath, 
  {
    type: 'get',
    data: {method: 'show'},
    dataType: 'json',
  })
  .done(function(data)
  {
    remain = data[0].remain;
    btn.innerHTML = remain === '0' ? 'おめでとう!' : parseInt(remain).toLocaleString();
    $('#btn').css('fontSize', String((14-String(remain).length) * 8)+'px');
  })
  .fail(function()
  {
    alert("接続に失敗しました。");
  });

  $('#btn').on('click', function(e) {
    if (remain === '0') {
      btn.innerHTML = 'おめでとう!'
    } else {
      cnt++;
      e.target.innerHTML = parseInt(remain-cnt).toLocaleString();
      $('#btn').css('fontSize', String((14-String(remain-cnt).length) * 8)+'px');
    }
  });
  
  let intervalId = setInterval(function() {
    if (remain === '0') {
      clearInterval(intervalId);
    }
    altcnt = cnt;
    $.ajax(basePath, 
    {
      type: 'post',
      data: {method: 'press', cnt: cnt},
      dataType: 'json',
    })
    .done(function(data) {
      // console.log($('#btn'));
      remain = data[0].remain;
      btn.innerHTML = parseInt(remain).toLocaleString();
      $('#btn').css('fontSize', String((14-String(remain).length) * 8)+'px');
    })
    .fail(function() {
      alert("接続に失敗しました。");
    })
    cnt -= altcnt;
  }, 1000);
});