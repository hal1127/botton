'use strict';
$(function()
{
  // let path = 'https://button-to-press-n-times.herokuapp.com/history/';
  let path = 'http://localhost:8000/history/';
  $.ajax(path, 
    {
      type: 'get',
      data: {},
      dataType: 'json',
    })
    .done(function(data)
    {
      data.forEach(element => {
        $('tbody').append(`<tr>
                            <td>${element['timestamp']}</td>
                            <td>${parseInt(element['achieve']).toLocaleString()}回達成！</td>
                          </tr>`);
        
      });
      
    })
    .fail(function()
    {
      alert("接続に失敗しました。1");
    });
});