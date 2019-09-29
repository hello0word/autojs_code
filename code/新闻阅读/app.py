

from flask import Flask,request,jsonify
from flask import send_file, send_from_directory
import os
from flask import make_response
app=Flask(__name__)
@app.route("/download/<filename>", methods=['GET'])
def download_file(filename):
     # 需要知道2个参数, 第1个参数是本地目录的path, 第2个参数是文件名(带扩展名)
    directory = os.getcwd()  # 假设在当前目录
    response = make_response(send_from_directory(directory, filename, as_attachment=True))
    response.headers["Content-Disposition"] = "attachment; filename={}".format(filename.encode().decode('latin-1'))
    return response