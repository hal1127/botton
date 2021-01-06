'use strict';
$(function() {
  let path = 'https://button-to-press-n-times.herokuapp.com/';
  // let path = 'http://localhost:8000/';
  let remain;
  let cnt = 0;
  let interval_cnt = 0;
  let btn = $('#btn')[0];
  let toid;
  let itid;

  // ボタンの回数の取得
  $.ajax(path, 
  {
    type: 'get',
    data: {method: 'show'},
    dataType: 'json',
  })
  .done(function(data)
  {
    remain = data[0].remain;
    isCongratulations(remain);
  })
  .fail(function()
  {
    alert("接続に失敗しました。1");
  });

  // cookieのバックアップがあれば使用
  if ($.cookie('cnt')) {
    cnt = $.cookie('cnt');
    button_post();
  }


  $('#btn').on('click', function(e) {click_handler(e)});
  
  $('#refresh').on('click', button_get);
  
  $('input').on('click', function() {
    if ($('input').prop('checked') === true) {
      itid = setInterval(interval_handler, 1000);
      $('#btn').off('click');
      $('#message')[0].innerHTML = 'ボタンは無効になっています';
    } else {
      clearInterval(itid);
      $('#btn').on('click', function(e) {click_handler(e)});
      $('#message')[0].innerHTML = '';
    }
  });
  
  function button_post()
  {
    $.ajax(path,
      {
        type: 'post',
        data: {method: 'press', cnt: cnt},
        dataType: 'json',
      })
      .done(function(data) {
        cnt = 0;
        remain = data[0].remain;
        isCongratulations(remain);
        // cntのバックアップの削除
        $.removeCookie('cnt');
      })
      .fail(function() {
        alert("接続に失敗しました。2");
      })
    }
    
    function button_get()
    {
      $.ajax(path,
        {
          type: 'get',
          data: {method: 'show'},
          dataType: 'json',
        })
        .done(function(data)
        {
          remain = data[0].remain;
          isCongratulations(remain);
        })
        .fail(function()
        {
          alert("接続に失敗しました。1");
        });
      }
      
      function click_handler (e) {
        if (remain-cnt > 0) {
          cnt++;
          clearTimeout(toid);
          toid = setTimeout(button_post, 1000);
          
          // cntのバックアップ
          if (cnt % 10 === 0) {
            $.cookie('cnt', cnt, {expires: 7});
          }
        }
        isCongratulations(remain-cnt);
      }
      
      function interval_handler () {
        button_get();
        if(interval_cnt >= 30) {
          $('input').prop('checked', false)
          $('#btn').on('click', function(e) {click_handler(e)});
          $('#message')[0].innerHTML = '';
          clearInterval(itid);
          interval_cnt = 0;
        }
        interval_cnt++;
      }

      // ボタン回数のが0ならおめでとう、そうじゃないならコンマつきの数字を表示
      function isCongratulations (remain) {
        if (typeof remain === 'string') {
          remain = parseInt(remain);
        }
        if (remain === 0) {
          btn.innerHTML = 'おめでとう!';
          $('#btn').css('fontSize', '50px');
        } else {
          btn.innerHTML = parseInt(remain).toLocaleString();
          $('#btn').css('fontSize', String((14-String(remain).length) * 8)+'px');
        }
      }
    });