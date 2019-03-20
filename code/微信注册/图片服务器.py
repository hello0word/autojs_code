from flask import Flask, url_for
from flask import request,json
import uuid
app = Flask(__name__)
app.debug = True
@app.route("/",methods=["POST"])
def hello():
    if request.method =="POST":
        f=request.files["file"]
        uid = str(uuid.uuid4())
        f.save("D://temp//"+uid+".jpg")
        return "ok"

@app.route('/articles')
def api_articles():
    return 'List of ' + url_for('api_articles')

@app.route('/articles/<articleid>')
def api_article(articleid):
    return 'You are reading ' + articleid

@app.route('/messages', methods = ['POST'])
def api_message():

    if request.headers['Content-Type'] == 'text/plain':
        return "Text Message: " + str(request.data)

    elif request.headers['Content-Type'] == 'application/json':
        return "JSON Message: " + json.dumps(request.json)

    elif request.headers['Content-Type'] == 'application/octet-stream':
        #f = open('./binary', 'wb')
        # f.write(request.data)
        #         f.close()
        return "Binary message written!"

    else:
        return "415 Unsupported Media Type ;)"

if __name__ == '__main__':
    app.run(("0.0.0.0"))