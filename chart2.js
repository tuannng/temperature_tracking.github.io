
var array_nhietdo_chart2 = new Array();
var array_time_chart1 = new Array();
var time2 = new Array();
var array_time2 = Array();

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
  accessKeyId: "AKIAXKZISWAEZWPSCIVL",
  secretAccessKey: "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",
});

var params_chart2 = {
  TableName: "Tram1",
  KeyConditionExpression: "device_id = :a",
  ExpressionAttributeValues: {
    ":a": 3,
  },
};
var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart2, function (err, data) {
  if (err) {
    alert("Error !!!");
  } else {
    for (let i = 0; i < data.Items.length; i++) {
      nhietdo_data_chart2= JSON.parse(data.Items[i].device_data.Temperature2);
      array_nhietdo_chart2.push(nhietdo_data_chart2);
      if (array_nhietdo_chart2.length>10){
        array_nhietdo_chart2.shift();
      }
    }
    // for (let i = 0; i < data.Items.length; i++) {
    //   sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
    //   array_time_chart1.push(sample_time_data_chart1);
    // }
    for (let i = 0; i < data.Items.length; i++) {
      sample_time_data = JSON.parse(data.Items[i].sample_time);
      const time_stamp2 = new Date(sample_time_data);
      min2 = time_stamp2.getMinutes();
      hour2 = time_stamp2.getHours();
      time2 = hour2 + ':' + min2;
      array_time2.push(time2);
      if (array_time2.length > 10) {
        array_time2.shift();
    }
  }
  console.log(time2);

    const x_data_chart2 = array_time2;
    const y_data_chart2 = array_nhietdo_chart2;
    const chart2 = document.getElementById("chart-2").getContext("2d");
    const myChart = new Chart(chart2, {
      type: "line",
      data: {
        labels: x_data_chart2,
        datasets: [
          {
            label: "Trạm 2",
            data: y_data_chart2,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(99, 255, 10, 1)",
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