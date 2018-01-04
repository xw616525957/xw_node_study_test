//文件工具类  Create By Xu Wei 2017/09/06

(function() {
    var fs = require('fs');
    var path = require('path');
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

    //获取文件后缀
    fileUtil.getFileSuffix = function(filename) {
        if (!filename) return '';
        var index = filename.lastIndexOf(".");
        if (index > -1 && filename != ".") {
            return filename.substr(index + 1);
        } else {
            return "";
        }
    }

    //复制文件夹
    fileUtil.copyFolder = function(sourcePath, desPath) {
        var files = getAllFiles(sourcePath, []);

        files.forEach(function(item, index) {
            if (index <= 2) {
                var sourceFile = path.join(__dirname, item.path);
                var destPath = path.join(__dirname, item.path.replace(sourcePath, desPath)); //item.path.substring(0, item.path.lastIndexOf(item.filename)).replace(sourcePath, desPath);
                var readStream = fs.createReadStream(sourceFile);
                var writeStream = fs.createWriteStream(destPath);
                readStream.pipe(writeStream);

                logUtil.log(destPath, "完成复制");
            }


        });
        logUtil.log("复制结束");
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