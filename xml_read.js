//
var logUtil = require("./logUtil").log; //日志封装
var fs = require("fs"); //文件读写
var xlsx = require("node-xlsx"); //excel文件处理
var xml2js = require('xml2js'); //xml转json



//全局变量
var builder = new xml2js.Builder();
var basefilePath = "./sem_sitemap/"
var excelPath = "./carlist_sem_poi_config_with_status.xlsx";
var startIndex = 0;
var h5xmlList = [];
var pcxmlList = [];
var startTime = new Date(); //用于计算耗时


var parseString = xml2js.parseString;
var xml = "<root>Hello xml2js!</root>";
fs.readFile("./sitemapindex.xml", function(err, result) {
    xml = result;
    logUtil.log(result, "xml");
    parseString(xml, function(err, result) {
        logUtil.log(result, "xml-object");
    });
});


checkAndMkdir(basefilePath);




//生成文件夹
function checkAndMkdir(path) {
    if (fs.existsSync(path)) {
        //log('已经创建过此目录:'+path);
    } else {
        fs.mkdirSync(path);

        logUtil.log('目录已创建成功:' + path);
    }
}