var version = '1.0.0';

require.config({
    urlArgs:'ver='+ version,
    // urlArgs:'ver='+new Date().getTime(),
    baseUrl: './scripts/',
    paths: {
    	host: '../host',
        echarts:'lib/echarts/dist/echarts',
        china:'lib/map/js/china'
    }
});
$('#version').text(version);

