/**
 *
 * cityPicker.js
 * cityPicker is made by Framework picker component which effects like iOS native select.
 *
 * nzb329@163.com
 *
 * 2017-10-28
 *
 */
;
(function(window, $, undefined) {

    /**
     * [getProvince 获取省]
     * @param  {[Object]} regions [省市区数据]
     * @return {[Array]}          [省数组]
     */
    function getProvince(regions) {

        var provinceArr = [];

        $.each(regions, function(province) {

            provinceArr.push(province);

        });

        return provinceArr;
    }

    /**
     * [getCity 获取市]
     * @param  {[Object]} regions      [省市区数据]
     * @param  {[String]} provinceName [省名]
     * @return {[Array]}               [市数组]
     */
    function getCity(regions, provinceName) {

        var cityArr = [];

        $.each(regions[provinceName]['cities'], function(city) {

            cityArr.push(city);

        });

        return cityArr;
    }

    /**
     * [getArea 获取区]
     * @param  {[Object]} regions      [省市区数据]
     * @param  {[String]} provinceName [省名]
     * @param  {[String]} cityName     [市名]
     * @return {[Array]}               [区数组]
     */
    function getArea(regions, provinceName, cityName) {

        var areaArr = [];

        $.each(regions[provinceName]['cities'][cityName]['areas'], function(area) {

            areaArr.push(area);

        });

        return areaArr;
    }

    // 初始化 Framework7
    var myApp = new Framework7();

    // 初始化省市区
    var province = getProvince(regions),
        city = getCity(regions, '北京市'),
        area = getArea(regions, '北京市', '北京市');

    // 保存 picker 选择的省
    var provinceSelect = '';

    // 省市区联动 / Framework7 picker
    var pickerLocation = myApp.picker({
        input: '#location',
        rotateEffect: true,
        toolbarTemplate: '<div class="toolbar">\
                            <div class="toolbar-inner">\
                                <div class="left">\
                                    <a href="#" class="link close-picker">取消</a>\
                                </div>\
                                <div class="right">\
                                    <a href="#" class="link close-picker">完成</a>\
                                </div>\
                            </div>\
                        </div>',
        cols: [{
                cssClass: 'f-s-14',
                width: '33.33%',
                textAlign: 'left',
                values: province,
                onChange: function(picker, province) {
                    if (picker.cols[1].replaceValues) {
                        provinceSelect = province;
                        city = getCity(regions, province);
                        area = getArea(regions, province, city[0]);
                        picker.cols[1].replaceValues(city);
                        picker.cols[2].replaceValues(area);
                    }
                }
            },
            {
                cssClass: 'f-s-14',
                width: '33.33%',
                textAlign: 'center',
                values: city,
                onChange: function(picker, city) {
                    if (picker.cols[2].replaceValues) {
                        area = getArea(regions, provinceSelect, city);
                        picker.cols[2].replaceValues(area);
                    }
                }
            },
            {
                cssClass: 'f-s-14',
                width: '33.33%',
                textAlign: 'right',
                values: area,
            }
        ]
    });


})(window, jQuery);
