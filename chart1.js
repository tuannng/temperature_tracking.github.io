
var array_nhietdo_chart1 = new Array();
var array_time_chart1 = new Array();
var array_time1 = new Array();
// var time1 = new Array();

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
  accessKeyId: "AKIAXKZISWAEZWPSCIVL",
  secretAccessKey: "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",
});

var params_chart1 = {
  TableName: "Tram1",
  KeyConditionExpression: "device_id = :a",
  ExpressionAttributeValues: {
    ":a": 3,
  },
};
var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart1, function (err, data) {
  if (err) {
    alert("Error !!!");
  } else {
    for (let i = 0; i < data.Items.length; i++) {
      nhietdo_data_chart1 = JSON.parse(data.Items[i].device_data.Temperature1);
      array_nhietdo_chart1.push(nhietdo_data_chart1);
      if(array_nhietdo_chart1.length>10){
        array_nhietdo_chart1.shift();
      }
    }
    console.log(data);
    // for (let i = 0; i < data.Items.length; i++) {
    //   sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
    //   array_time_chart1.push(sample_time_data_chart1);
    // }
    for (let i = 0; i < data.Items.length; i++) {
      sample_time_data1 = JSON.parse(data.Items[i].sample_time);
      const time_stamp_char1 = new Date(sample_time_data1);
      min1 = time_stamp_char1.getMinutes();
      hour1 = time_stamp_char1.getHours();
      time1 = hour1 + ':' + min1;
      array_time1.push(time1);
      if (array_time1.length > 10) {
        array_time1.shift();
      }

    }
    // console.log(time1);

    const x_data_chart1 = array_time1;
    const y_data_chart1 = array_nhietdo_chart1;
    const ctx = document.getElementById("chart-1").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: x_data_chart1,
        datasets: [
          {
            label: "Trạm 1",
            data: y_data_chart1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
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