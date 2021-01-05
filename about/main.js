'use strict';
$(function()
{
  // let path = 'https://button-to-press-n-times.herokuapp.com/';
  let path = 'http://localhost:8000/history/';
  let histories;
  $.ajax(path, 
    {
      type: 'get',
      data: {},
      dataType: 'json',
    })
    .done(function(data)
    {
      console.log(data);
      data.forEach(element => {
        $('tbody').append(`<tr>
                            <td>${element['timestamp']}</td>
                            <td>${element['achieve']}回達成！</td>
                          </tr>`);
        
      });
      
    })
    .fail(function()
    {
      alert("接続に失敗しました。1");
    });
});