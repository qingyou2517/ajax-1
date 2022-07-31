

console.log('我是main.js')

getHTML.onclick=()=>{
    const request=new XMLHttpRequest()
    // 路径名必须和server.js里的path相同:path充当路由
    request.open('get','/2.html') //ready.State===1
    request.onreadystatechange=()=>{
        // 浏览器下载完成(request.readyState===4)，但不知道是访问成功（状态码：2XX），还是失败（状态码4XX，5XX）
        if(request.readyState===4){
            // 状态码3XX会重新访问
            if(request.status>=200 && request.status<300){
                const div=document.createElement('div')
                // innerHTML会自动把字符串中<>包含的内容作为标签处理
                div.innerHTML=request.response
                document.body.appendChild(div)
            }else{
                alert('html请求失败')
            }     
        }
    }
    request.send()
}

getCSS.onclick=()=>{
    const request=new XMLHttpRequest()
    
    request.open('GET','/style.css')
    request.onreadystatechange=()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                // 创建style标签(参数必须用引号包裹)：存样式
                const style=document.createElement('style')
                // 把服务器响应给request请求对象的关于style.css的内容插入style
                style.innerHTML=request.response
                // 把style插入head
                document.head.appendChild(style)
            }else{
                alert('css请求失败')
            }
        }
    }
    request.send()
}

getJS.onclick=()=>{
    const request=new XMLHttpRequest()
    request.open('get','/2.js')
    request.onreadystatechange=()=>{      
        if(request.readyState===4){ 
            if(request.status>=200 && request.status<300){
                const script=document.createElement('script')
                script.innerHTML=request.response
                document.body.appendChild(script)
            }
            else{
                alert('JS请求失败');
             }
        }    
    }
    request.send()
}

getXML.onclick=()=>{
    const request=new XMLHttpRequest()
    request.open('get','/4.xml')
    request.onreadystatechange=()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                const dom=request.responseXML
                // getElementsByTagName 返回的是伪数组
                // string.trim(): 除去string两端的换行符和空格
                const text=dom.getElementsByTagName('warning')[0].textContent.trim()
                console.log(text);
            }else{
                alert('请求xml失败')
            }
        }
    }
    request.send()
}

getJSON.onclick=()=>{
    const request=new XMLHttpRequest()
    request.open('get','/5.json')
    request.onreadystatechange=()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                // 符合JSON语法的字符串转为对应js的数据（对象或其他：json有）
                let obj
                // try和catch 检验转换是否正确，万一出错则catch捕获error
                try{
                    obj=JSON.parse(request.response)
                }catch(error){
                    alert('JSON与JS格式转换error! 将采用默认赋值')
                    obj={'name':'no name'}
                }
                myName.textContent=obj.name
            }else{
                alert('json请求失败')
            }
        }
    }
    request.send()
}

let n=1
getPage.onclick=()=>{
    const request=new XMLHttpRequest()
    request.open('get',`/page${n+1}.json`)
    request.onreadystatechange=()=>{
        if(request.readyState===4){
            if(request.status>=200 && request.status<300){
                const array=JSON.parse(request.response)
                console.log(array);
                // forEach(fn),而不是forEach=(fn)
                array.forEach(item=>{
                    const li=document.createElement('li')
                    li.textContent=item.id
                    isUl.appendChild(li)
                })
                n+=1
            }else{
                alert('下一页请求失败')
            }
        }  
    }
    request.send()
}
