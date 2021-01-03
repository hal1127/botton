'use strict';
$(function() {
  let basePath = 'https://button-to-press-n-times.herokuapp.com/';
  let remain;
  let btn = $('#btn')[0];
  $.ajax(basePath+'/', 
  {
    type: 'get',
    data: {method: 'show'},
    dataType: 'json',
  })
  .done(function(data) {
    remain = data[0].remain;
    btn.innerHTML = remain === '0' ? 'おめでとう!' : remain;
  })
  .fail(function() {
    alert("接続に失敗しました。");
  });

  $('#btn').on('click', function(e) {
    if (remain === '0') {
      btn.innerHTML = 'おめでとう!'
    } else {
      $.ajax(basePath+'/', 
      {
        type: 'post',
        data: {method: 'push'},
        dataType: 'json',
      })
      .done(function(data) {
        remain = data[0].remain;
        e.target.innerHTML = remain;
      })
      .fail(function() {
        alert("接続に失敗しました。");
      });
    }
  });
  
  let intervalId = setInterval(function() {
    if (remain === '0') {
      clearInterval(intervalId);
    }
    $.ajax(basePath+'/', 
    {
      type: 'get',
      data: {method: 'show'},
      dataType: 'json',
    })
    .done(function(data) {
      // console.log($('#btn'));
      remain = data[0].remain;
      btn.innerHTML = remain;
    })
    .fail(function() {
      alert("接続に失敗しました。");
    })
  }, 1000)
});