

/**
 * @class  ViewIdListRegisterListener
 * @param {Array} viewIdList - 控件id列表
 * @param {Storage} storage - 本地存储
 * @method getViewType - 获取控件类型
 * @method listenerFunction - 不同类型控件的监听函数
 * @method registerlistener - 注册监听
 * @method restoreFunction - 还原函数
 * @method restore - 还原界面配置
 */
function ViewIdListRegisterListener (viewIdList, storage) {
  let viewIdListType = getObjType(viewIdList)
  if (('Array' !== viewIdListType) || viewIdList.length < 1) {
    throw new Error('请传入数组, 且至少一个控件id')
  }
  if (!storage) {
    throw new Error('请传入storage')
  }
  this.viewIdList = viewIdList
  this.storage = storage
  let that = this
  this.listenerFunction = {
    EditText: function (viewId) {
      var myTextWatcher = new TextWatcher({
        onTextChanged: function (CharSequence, start, before, count) {
          log(CharSequence)
          that.storage.put(viewId, CharSequence.toString())
        }
      });
      ui[viewId].addTextChangedListener(myTextWatcher)
    },
    RadioButton: function (viewId) {
      var view = ui[viewId]
      view.setOnClickListener(
        function () {
          if (view.isChecked()) {
            that.storage.put(viewId, true)
            that.viewIdList.map((item) => {
              if (viewId !== item) {
                ui[item].setChecked(false)
                that.storage.put(item, false)
              }
            })
          }
        }
      )
    },
    CheckBox: function (viewId) {
      let view = ui[viewId]
      view.on('check', function (checked) {
        that.storage.put(viewId, checked)
      })
    },
    Switch: function (viewId) {
      let view = ui[viewId]
      view.on('check', function (checked) {
        that.storage.put(viewId, checked)
      })
    },
    SeekBar: function (viewId) {
      let view = ui[viewId]
      var seekbarListener = new android.widget.SeekBar.OnSeekBarChangeListener({
        onProgressChanged: function (v, progress, fromUser) {
          that.storage.put(viewId, progress)
        }
      });
      view.setOnSeekBarChangeListener(seekbarListener);
    },
    Spinner: function (viewId) {
      let view = ui[viewId]
      var myAdapterListener = new android.widget.AdapterView.OnItemSelectedListener({
        onItemSelected: function (parent, view, position, id) {
          that.storage.put(viewId, id)
        }
      })
      view.setOnItemSelectedListener(myAdapterListener)
    },
  }
  this.restoreFunction = {
    EditText: function () {
      that.viewIdList.map((viewId) => {
        let value = that.storage.get(viewId) || ''
        ui[viewId].setText(value)
      })
    },
    RadioButton: function () {
      that.viewIdList.map((viewId) => {
        let value = that.storage.get(viewId) || false
        ui[viewId].checked = value
      })
    },
    CheckBox: function () {
      that.viewIdList.map((viewId) => {
        let value = that.storage.get(viewId) || false
        ui[viewId].checked = value
      })
    },
    Switch: function () {
      that.viewIdList.map((viewId) => {
        let value = that.storage.get(viewId) || false
        ui[viewId].checked = value
      })
    },
    SeekBar: function () {
      that.viewIdList.map((viewId) => {
        let value = that.storage.get(viewId) || 0
        ui[viewId].setProgress(value);
      })
    },
    Spinner: function () {
      that.viewIdList.map((viewId) => {
        let value = that.storage.get(viewId) || 0
        ui[viewId].setSelection(value);
      })
    },
  }
}

ViewIdListRegisterListener.prototype.getViewType = function () {
  // log(view.accessibilityClassName)
  // android.widget.TextView 文本控件
  // android.widget.ImageView 图片控件
  // android.widget.Button 按钮控件
  // android.widget.EditText 输入框控件
  // android.widget.RadioButton 单选按钮
  // android.widget.AbsListView 列表控件
  // android.widget.LinearLayout 线性布局
  // android.widget.FrameLayout 帧布局
  // android.widget.RelativeLayout 相对布局
  // android.widget.RelativeLayout 相对布局
  // android.support.v7.widget.RecyclerView 通常也是列表控件
  function getViewType (view) {
    let result = view.accessibilityClassName
    result = result.replace('android.widget.', '')
    return result
  }
  var len = this.viewIdList.length
  if (len === 1) {
    let view = ui[this.viewIdList[0]]
    return this.viewType = getViewType(view)
  }
  let viewType = false;
  for (var i = 0; i < len; i++) {
    if (!viewType) {
      let view = ui[this.viewIdList[0]]
      viewType = getViewType(view)
      continue
    }
    let view = ui[this.viewIdList[i]]
    let viewType2 = getViewType(view)
    if (viewType !== viewType2) {
      throw new Error('请传入相同类型的控件id')
    }
  }
  return this.viewType = viewType
}


ViewIdListRegisterListener.prototype.registerlistener = function () {
  let viewType = this.getViewType()
  if (!(this.listenerFunction[viewType])) {
    throw new Error('没有添加该类型的控件监听函数: ' + viewType)
  }
  this.viewIdList.map((viewId) => {
    this.listenerFunction[viewType](viewId)
  })
}

ViewIdListRegisterListener.prototype.restore = function () {
  let viewType = this.getViewType()
  if (!(this.restoreFunction[viewType])) {
    throw new Error('没有添加该类型的控件还原函数: ' + viewType)
  }
  this.viewIdList.map((viewId) => {
    this.restoreFunction[viewType](viewId)
  })
}


function getObjType (obj) {
  // JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
  var result = Object.prototype.toString.call(obj);
  result = result.match(/ \w+/)[0];
  result = result.replace(/ /g, "");
  return result;
}

module.exports = ViewIdListRegisterListener