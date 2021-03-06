function initMap() {
    // Thiết lập ban đầu
    let options = {
        center: { lat: 9.281294, lng: 105.721824 },
        zoom: 15,
        controls: true,
    };
    let map = new map4d.Map(document.getElementById("map"), options);
    map.setPOIsEnabled(false); //Tắt địa điểm mặc định
    //Giới hạn vùng di chuyển
    map.setRestrictionBounds(new map4d.LatLngBounds([9.362071, 105.642207, 9.191152, 105.830422]));

    // Bật tắt 3D mode
    // map.enable3dMode(true)

    // Hàm bắt sự kiện - click thêm marker
    // map.addListener(
    //     "click",
    //     function (args) {
    //         let marker = new map4d.Marker({
    //             position: args.location
    //         })
    //         marker.setMap(map)
    //     }
    // )

    // Tạo đối tượng marker từ MarkerOption
    let marker1 = new map4d.Marker({
        // Form thông tin
        title: "Trạm 1",
        snippet: "....",
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 1",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: 9.283603, lng: 105.7234 },
    });

    let marker2 = new map4d.Marker({
        // Form thông tin
        title: "Trạm 2",
        snippet: "....",
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 2",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: 9.283539, lng: 105.717714 },
    });

    let marker3 = new map4d.Marker({
        // Form thông tin
        title: "Trạm 3",
        snippet: "....",
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 3",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: 9.278525, lng: 105.72178 },
    });

    // Thêm marker vào bản đồ
    marker1.setMap(map);
    marker2.setMap(map);
    marker3.setMap(map);
}