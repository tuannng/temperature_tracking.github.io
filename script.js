const data = {
    labels: [],
    datasets: [
        {
            label: 'Cảm biến số 1',
            data: [],
            borderColor: 'rgba(255, 0, 0, 0.8)',
            backgroundColor: 'rgba(255,0, 0, 0.7)',

        },
        {
            label: 'Cảm biến số 2',
            data: [],
            borderColor: 'rgba(255, 128, 0, 0.8)',
            backgroundColor: 'rgba(255, 128, 0, 0.7)',
        }
    ]
};
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
                font: {
                    size: 20
                }
            },

        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Thời gian trong ngày (time)'
                }
            },
            y: {
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: 'Nhiệt độ °C'
                }
            }
        }
    },
};

const chart1 = new Chart(document.getElementById('chart1'), config);
const chart2 = new Chart(document.getElementById('chart2'), config);
const chart3 = new Chart(document.getElementById('chart3'), config);

AWS.config.update({
    region: "ap-northeast-1",
    endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
    accessKeyId: "AKIAXKZISWAEZWPSCIVL",
    secretAccessKey: "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",
});

function initChart(id, chart) {
    var text_id = `station${id}`;
    var text = document.getElementById(text_id);
    var params = {
        TableName: "TrackingDB",
        KeyConditionExpression: "device_id = :a",
        ExpressionAttributeValues: {
            ":a": id,
        },
        Limit: 100,
    };
    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.query(params, function (err, data) {
        if (err) {
            console.log(err);
            chart.options.plugins.title.text = `Đồ thị nhiệt độ trạm số ${id}`;
            chart.update();
            text.innerHTML = `Trạm số ${id}: <i>(Không kết nối)</i>`;
        } else {
            chart.options.plugins.title.text = `Đồ thị nhiệt độ trạm số ${id}`;
            var device_data = dataParse(data);
            if (device_data[0].length <= 0) {
                text.innerHTML = `Trạm số ${id} <i>(Không có dữ liệu)</i>`;
            } else {
                text.innerHTML = `Trạm số ${id}: <i>(Đang hoạt động)</i>`;
                chart.data.labels = device_data[0];
                var count = 1;
                chart.data.datasets.forEach(dataset => {
                    dataset.data = device_data[count++];
                });
                chart.update();
            }
        }
    });
}
function dataParse(data) {
    var labels = [];
    var temperature1 = [];
    var temperature2 = [];
    for (let i = 0; i < data.Items.length; i++) {
        var timestamp = JSON.parse(data.Items[i].sample_time);
        //get sample_time
        const time_stamp3 = new Date(timestamp);
        var min = time_stamp3.getMinutes();
        var hour = time_stamp3.getHours();
        var time = hour + ':' + min;
        labels.push(time);
        temperature1.push(data.Items[i].device_data.temperature1);
        temperature2.push(data.Items[i].device_data.temperature2);
    }
    return [labels, temperature1, temperature2];
}
function updateNotification(str) {

    var noti = document.getElementById("notification");
    noti.innerHTML = str;
}
function updateDateTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    date_time = document.getElementById("date_time");
    date_time.innerHTML = `Bạc Liêu, ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()} ${time}`;
}