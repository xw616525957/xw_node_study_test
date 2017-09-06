//文件工具类  Create By Xu Wei 2017/09/06

(function() {
    var fs = require('fs');
    var logUtil = require("./logUtil").log; //日志封装

    //输出引用项
    var fileUtil = {};

    var filePatten = []; //指定的文件类型
    var filePath = process.cwd(); //默认路径

    //获取路径下所有满足要求的文件 如：path="log/" patten=['js','txt']
    //返回指定目录下所有满足条件的文件（绝对路径，名称）
    fileUtil.getAllFilesByPath = function(path, patten) {
        path = path || filePath;
        patten = patten || filePatten;
        fileList = [];
        return getAllFiles(path, patten);
    };

    function getAllFiles(path, patten) {
        var res = [],
            files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var pathname = path + "/" + file,
                stat = fs.lstatSync(pathname);

            if (!stat.isDirectory()) {
                //过滤指定文件类型
                if (patten && patten.length > 0 && patten.indexOf(fileUtil.getFileSuffix(file)) < 0) {;
                } else {
                    res.push({ "path": pathname, "filename": file });
                }

            } else {
                res = res.concat(getAllFiles(pathname, patten));
            }
        });
        return res;
    }

    fileUtil.getFileSuffix = function(filename) {
        if (!filename) return '';
        var index = filename.lastIndexOf(".");
        if (index > -1 && filename != ".") {
            return filename.substr(index + 1);
        } else {
            return "";
        }
    }

    //删除目录及其下所有文件
    fileUtil.delPath = function(path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    logUtil.delPath(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }

    module.exports.fileUtil = fileUtil;

}());