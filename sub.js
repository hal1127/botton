'use strict';
$(function() {
  let remain = Math.pow(10, 6);
  let btn = $('#btn')[0];

  btn.innerHTML = remain.toLocaleString();
  // $('#btn').css('fontSize', String(Math.pow(14-String(remain).length, 2))+'px');
  $('#btn').css('fontSize', String((14-String(remain).length) * 8)+'px');
  
  $('#btn').on('click',
  function() {
    if (remain === 0) {
      btn.innerHTML = 'おめでとう!';
    } else {
      remain--;
      btn.innerHTML = remain.toLocaleString();
    }
    // $('#btn').css('fontSize', String(Math.pow(14-String(remain).length, 2))+'px');
    $('#btn').css('fontSize', String((14-String(remain).length) * 8)+'px');
  }
  );
});