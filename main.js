'use strict';
$(function() {
  // let basePath = 'https://button-to-press-n-times.herokuapp.com/';
  let basePath = 'http://localhost:8000/';
  let remain;
  let cnt = 0;
  let interval_cnt = 0;
  let btn = $('#btn')[0];
  let toid;
  let itid;

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
    alert("接続に失敗しました。1");
  });
  
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
    if (remain === '0') {
      clearInterval(intervalId);
    }
    $.ajax(basePath, 
      {
        type: 'post',
        data: {method: 'press', cnt: cnt},
        dataType: 'json',
      })
      .done(function(data) {
        cnt = 0;
        remain = data[0].remain;
        btn.innerHTML = remain === '0' ? 'おめでとう!' : parseInt(remain).toLocaleString();
        $('#btn').css('fontSize', String((14-String(remain).length) * 8)+'px');
      })
      .fail(function() {
        alert("接続に失敗しました。2");
      })
    }
    
    function button_get()
    {
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
          alert("接続に失敗しました。1");
        });
      }
      
      function click_handler (e) {
        if (remain === '0') {
          btn.innerHTML = 'おめでとう!'
        } else {
          cnt++;
          e.target.innerHTML = parseInt(remain-cnt).toLocaleString();
          $('#btn').css('fontSize', String((14-String(remain-cnt).length) * 8)+'px');
          clearTimeout(toid);
          toid = setTimeout(button_post, 1000);
        }
      }
      
      function interval_handler () {
        button_get();
        if(interval_cnt >= 10) {
          $('input').prop('checked', false)
          $('#btn').on('click', function(e) {click_handler(e)});
          $('#message')[0].innerHTML = '';
          clearInterval(itid);
          interval_cnt = 0;
        }
        interval_cnt++;
      }
    });