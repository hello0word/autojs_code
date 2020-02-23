function mystorage(path){
    this.path = path;
}

mystorage.prototype.read = function(callback,encoding){
    // log("读取路径：",this.path)
    encoding = encoding||"utf-8"
    content = files.read(this.path,encoding=encoding);
    if(callback && conten && content.length>0) return callback(content)
    else return content
}

mystorage.prototype.write = function(content,encoding){
    // log("存储路径：",this.path,content)
    encoding = encoding||"utf-8"
    files.write(this.path,content,encoding=encoding)
}

module.exports = mystorage;

