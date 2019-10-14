// 保存cookie（添加）---- 修改和添加相同
//参数：键 值 有效期 
function addCookie(key,value,dayCount,path,domain){
    let d = new Date();
    d.setDate(d.getDate()+dayCount);

    let str = `${key}=${value};expires=${d.toGMTString()}`;

    if(path!=undefined){
        str += `;path=${path}`;
    }
    if(domain!=undefined){
        str += `;domain=${domain}`;
    }
    document.cookie = str;
}

// 获取cookie（查询）
//参数： 键
//返回值：值（键相对应的值）
function getCookie(key){
    var str = document.cookie;//(出来的字符串格式：username=hah;userpass=123)
    //分割成数组
    let arr = str.split(";");
    for(let i in arr){
        if(arr[i].startsWith(key+"=")){//等号必须加上
            let [,value] = arr[i].split("=");
            return value;
        }
    }
    return null;
}

// 删除cookie(不嫩那个直接删除，可以通过设置过期时间为过去进行删除)
//参数: 键
function removeCookie(key){//removeCookie("username")---添加相同cookie会覆盖
    addCookie(key,"",-1);
}