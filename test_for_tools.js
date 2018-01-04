var logUtil = require("./logUtil").log; //日志封装
var fileUtil = require("./fileUtil").fileUtil; //文件相关封装

//测试读取路径下所有指定类型文件
//var path = fileUtil.getAllFilesByPath("./node_modules", ["js"]); //process.cwd()

//记录日志
//logUtil.log(path, "info");

//删除日志文件
//fileUtil.delPath('./log/');

//
fileUtil.copyFolder("./node_modules", "./copy_node_modules");