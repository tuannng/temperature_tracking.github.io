
var array_nhietdo_chart3 = new Array();
// var array_time_chart1 = new Array();
var time3 = new Array();
var array_time3 = new Array();
AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
  accessKeyId: "AKIAXKZISWAEZWPSCIVL",
  secretAccessKey: "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",
});

var params_chart3 = {
  TableName: "Tram1",
  KeyConditionExpression: "device_id = :a",
  ExpressionAttributeValues: {
    ":a": 3,
  },
};
var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart3, function (err, data) {
  if (err) {
    alert("Error !!!");
  } else {
    for (let i = 0; i < data.Items.length; i++) {
      nhietdo_data_chart3 = JSON.parse(data.Items[i].device_data.Temperature3);
      array_nhietdo_chart3.push(nhietdo_data_chart3);
      if (array_nhietdo_chart3.length>10){
        array_nhietdo_chart3.shift();
      }
      console.log(array_nhietdo_chart3);
    }
    // for (let i = 0; i < data.Items.length; i++) {
    //   sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
    //   array_time_chart1.push(sample_time_data_chart1);
    // }
    for (let i = 0; i < data.Items.length; i++) {
      sample_time_data = JSON.parse(data.Items[i].sample_time);
      const time_stamp3 = new Date(sample_time_data);
      min3 = time_stamp3.getMinutes();
      hour3 = time_stamp3.getHours();
      time3 = hour3 + ':' + min3;
      array_time3.push(time3);
      if (array_time3.length > 10) {
        array_time3.shift();
    }
  }
  console.log(time3);

    const x_data_chart3 = array_time3;
    const y_data_chart3 = array_nhietdo_chart3;
    const chart3 = document.getElementById("chart-3").getContext("2d");
    const myChart3 = new Chart(chart3, {
      type: "line",
      data: {
        labels: x_data_chart3,
        datasets: [
          {
            label: "Trạm 3",
            data: y_data_chart3,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(99, 10,255, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});