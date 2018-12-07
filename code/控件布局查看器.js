var 绘布 = function(view) {
    if (view.accessibilityClassName != "android.widget.ImageView") {
        throw "我报错";
    };
    this.width = view.getWidth();
    this.height = view.getHeight();
    this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(this.bitmap);
    this.matrix = new android.graphics.Matrix();
    setInterval(() => {
        if (view.getWidth() != this.width || view.getHeight() != this.height) {
            this.width = view.getWidth();
            this.height = view.getHeight();
            this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
            this.canvas = new android.graphics.Canvas(this.bitmap);
        };
    }, 500);
    this.OnTouchListener = function() {};
    this.setOnTouchListener = function(fun) {
        if (typeof fun == "function") {
            this.OnTouchListener = fun;
        };
    };
    this.Draw = function() {};
    this.setDraw = function(fun) {
        if (typeof fun == "function") {
            this.Draw = fun;
        };
    };
    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        //this.bitmap = android.graphics.Bitmap.createBitmap(view.getWidth(), view.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
        //this.canvas = new android.graphics.Canvas(this.bitmap);
        try {
            this.OnTouchListener(view, event);
            return true;
        } catch (e) {
            toastLog(e);
            return true;
        };
    }));
    setInterval(() => {
        try {
            this.bitmap.eraseColor(0);
            this.canvas.setMatrix(this.matrix);
            this.Draw(this.canvas);
            ui.run(() => {
                view.setImageBitmap(this.bitmap);
            });
        } catch (e) {
            toastLog(e);
        };
    }, 100);
};

importClass(android.graphics.Paint);
auto();
var csx = device.width / 1080;
var csy = device.height / 1920;
var window = floaty.rawWindow(
    <ImageView id="img" bg="#40000000"/>
);
window.setSize(-1, -1);
window.setTouchable(false);
var paint = new android.graphics.Paint;
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
paint.setColor(colors.RED);

var ad = new 绘布(window.img);
ad.setDraw(function(canvas) {
    生成(selector().findOne(), canvas);
});

function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = s / sum;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return {
        x: x,
        y: y
    };
};



function 生成(UiObject, canvas, C) {
    try {
        canvas.drawRect(UiObject.bounds(), paint);
        if (UiObject.childCount() && ((!C && C != 0) || C > 0)) {
            for (var i = 0; i < UiObject.childCount(); i++) {
                生成(UiObject.child(i), canvas, C - 1);
            };
        };
    } catch (e) {};
};