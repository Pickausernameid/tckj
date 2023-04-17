//获取id，tagName
function getIdName(id, tagName) {

    if (tagName != 0) {
        return document.getElementById(id).getElementsByTagName(tagName);
    } else {
        return document.getElementById(id);
    }
}


/**
 * 封装ajax
 * @param method:请求的方式get还是post
 * @param url:请求的地址
 * @param params:发送的参数
 * @callback 返回响应调用的函数
 * */
function ajax(method, url, params = null, calleck) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (method.toLowerCase() == 'get') { //判断请求方式
        xhr.send(params);
    } else {
        xhr.setRequestHeader('Content-Type', application / x - www - form - urlencoded);
        var str = '';
        for (p in params) {
            str += `${p}=${params[p]}&`;
        }
        xhr.send(str);
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            calleck(xhr.responseText);
        }
    }
}