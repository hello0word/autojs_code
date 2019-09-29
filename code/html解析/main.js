runtime.loadJar("./jsoup.jar")
importPackage(org.jsoup)
importClass(Jsoup)
var re= http.get("http://v4.ok1816.com/share.html?a=shareGroupLink&r=eyJiIjoiMzU1NiIsImEiOiI0MzAiLCJjIjoiOUUxMzUxRDY4OTQ0QkNDODAwNzkyMzUyNzk0RTBERjcifQ==&rk=0.8339636879705989")
re=re.body.string()
log(re)
// var html = files.read(re) 
var  doc = Jsoup.parse(re);
var table = doc.select("table")
toastLog(table);