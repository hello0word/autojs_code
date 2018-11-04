
function 枚举方法(obj){      
    var names="";  
           
    for(var name in obj){         
       names+=name+"\n ";    
    }    
    log(names);    
}


var storage = storages.create("3316538544@qq.com:微博")
let ss= storage.get("抢热评_路径输入框","ss")
//log(枚举方法(global.ui))
//枚举方法(global.log())
// let ls = engines.all()[1]
// let sc =ls.emit("夏季想")
// var x = parseInt(10); // 10
// log(typeof x)
// // let sc = engines.myEngine().source
// log(sc)
// for(let fr in ls){
//     log(fr)
// }
// log(engines.all())

/*
getClass
console.ts:136 [Extension Host] 19:33:44.038/D: wait
console.ts:136 [Extension Host] 19:33:44.038/D: getScriptable
console.ts:136 [Extension Host] 19:33:44.038/D: notifyAll
console.ts:136 [Extension Host] 19:33:44.038/D: getId
console.ts:136 [Extension Host] 19:33:44.038/D: source
console.ts:136 [Extension Host] 19:33:44.039/D: put
console.ts:136 [Extension Host] 19:33:44.039/D: notify
console.ts:136 [Extension Host] 19:33:44.039/D: setOnDestroyListener
console.ts:136 [Extension Host] 19:33:44.039/D: doExecution
console.ts:136 [Extension Host] 19:33:44.039/D: hashCode
console.ts:136 [Extension Host] 19:33:44.039/D: context
console.ts:136 [Extension Host] 19:33:44.039/D: setId
console.ts:136 [Extension Host] 19:33:44.039/D: setTag
console.ts:136 [Extension Host] 19:33:44.040/D: id
console.ts:136 [Extension Host] 19:33:44.040/D: tag
console.ts:136 [Extension Host] 19:33:44.040/D: getRuntime
console.ts:136 [Extension Host] 19:33:44.040/D: class
console.ts:136 [Extension Host] 19:33:44.040/D: forceStop
console.ts:136 [Extension Host] 19:33:44.040/D: enterContext
console.ts:136 [Extension Host] 19:33:44.040/D: init
console.ts:136 [Extension Host] 19:33:44.040/D: setRuntime
console.ts:136 [Extension Host] 19:33:44.041/D: isDestroyed
console.ts:136 [Extension Host] 19:33:44.041/D: destroy
console.ts:136 [Extension Host] 19:33:44.041/D: runtime
console.ts:136 [Extension Host] 19:33:44.041/D: thread
console.ts:136 [Extension Host] 19:33:44.041/D: getTag
console.ts:136 [Extension Host] 19:33:44.041/D: execute
console.ts:136 [Extension Host] 19:33:44.041/D: cwd
console.ts:136 [Extension Host] 19:33:44.041/D: getUncaughtException
console.ts:136 [Extension Host] 19:33:44.041/D: destroyed
console.ts:136 [Extension Host] 19:33:44.042/D: getSource
console.ts:136 [Extension Host] 19:33:44.042/D: equals
console.ts:136 [Extension Host] 19:33:44.042/D: getThread
console.ts:136 [Extension Host] 19:33:44.042/D: onDestroyListener
console.ts:136 [Extension Host] 19:33:44.042/D: toString
console.ts:136 [Extension Host] 19:33:44.042/D: uncaughtException
console.ts:136 [Extension Host] 19:33:44.042/D: emit
console.ts:136 [Extension Host] 19:33:44.042/D: getContext
console.ts:136 [Extension Host] 19:33:44.043/D: scriptable
*/