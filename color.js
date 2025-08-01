/**
* Ahthor：Yoncms | Zhangrongquan / yoncms.github.io
* version: 25.07.25
*/

const $x = (args, single=0)=>{
    let tf = typeof args;
    if(tf=='function') {
        args(window);
        return;
    }
    if(tf=='string') {
        if((args.includes('#') && ((args.includes('\\ ')) || !args.includes(' '))) || single==1){
            return document.querySelector(args);
        }
        return document.querySelectorAll(args);       
    }
};
$x((win)=>{
    const reg = ' []\\;\',./`';
    function showa(){
        let loac = location.href.split('?');
        const D = document;
        loac = loac.length==1 ? 'default' : loac.slice(-1);
        // console.log(loac);
        const navData = datax[loac];
        // 生成导航按钮
        for (const [text, url] of Object.entries(navData)) {
            if(text == 0){
                D.title = url;
                continue;
            }else{
                const link = D.createElement('a');
                link.href = url;
                link.className = 'btn';
                link.innerHTML = text;
                link.target = '_blank';
                D.body.appendChild(link);
            }
        }
        bodytop();
    }

    function bodytop(){
        let marg = navigator.userAgent.includes('Edg/') ? '30px' : '25px';
        $x('body',1).style.marginTop = marg;
    }
    function rdmHtml(rm, rdata){
        let i=0, l=rdata.length;
        rm.innerHTML = '';
        for(; i<l; i++){
            let ri = rdata[i];
            if(typeof ri == 'string'){
                rm.innerHTML += '<p>> &nbsp;' + ri + '</p>';
            }else{
                let n=1, x=0, w=ri.length, str='';
                for(; x<w; x++){
                    if(x==0){
                        str = '<p>> '+n+'.&nbsp;' + ri[x] + '</p>';
                    }else{
                        str = '<p>&nbsp;&nbsp; ' + n+ '. ' + ri[x] + '</p>';
                    }
                    rm.innerHTML += str;
                    n++;
                }
            }
        }
    }
    function rdm(rm, rdata){
        const rStr = enObjToHex(rdata);
        if(dstr()){
            rdmHtml(rm, rdata);
        }else{
            rm.innerHTML = rStr;
        }
        let ktr = '';
        document.addEventListener('keydown', (e)=>{
            const k = e.key;
            if(k==' '){
                ktr = '';
                localStorage.clear();
                rm.innerHTML = rStr;
            }else if(k=='Backspace'){
                ktr = ktr.slice(0, ktr.length-1);
            }else{
                ktr += k;
            }
            if(isNo(ktr, rStr)){
                rdmHtml(rm, rdata);
                ktr = '';
            }
            document.title = ktr ? ktr : '说明';
        });
    }
    function deObj(hexStr) { 
        const key = CryptoJS.enc.Utf8.parse('c897b0fd64f9539b3efaa9a1c980fc63'); 
        const iv = CryptoJS.enc.Utf8.parse('48e5ac0ab7268b47fced0cdf655ab2bf');
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Hex.parse(hexStr)
        });
        const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const jsonStr = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(jsonStr);
    }
    function mArr(strKeyIv) {
        const key = CryptoJS.enc.Utf8.parse('v30dz7qips1x6lcy'); 
        const iv = CryptoJS.enc.Utf8.parse('fdg04v8z9kymqt3p');
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Hex.parse(strKeyIv),
        });
        const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        const jsonStr = decrypted.toString(CryptoJS.enc.Utf8);
        // 返回的是数组
        return JSON.parse(jsonStr);
        // return jsonStr;
    }
    function enObjToHex(obj) {
        const Key = CryptoJS.lib.WordArray.random(16);
        const jsonStr = JSON.stringify(obj); // 🧠 必须序列化
        const encrypted = CryptoJS.AES.encrypt(jsonStr, Key, {
            iv: CryptoJS.lib.WordArray.random(16),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // 返回 Hex 密文
    }
    const dstr = ()=>{
        const lg = localStorage.getItem('yoncms')||'yoncms';
        if(lg=='yoncms')return false;
        return true;
    };
    function isNo(str, rStr, single=0){
        const strslice = str ? str.slice(6) : ' ';
        if(!single && dstr()) return true;
        if(str.length == 14 &&
            str.slice(0,6) == 'yoncms' &&
            rStr.includes(strslice)) {
                localStorage.setItem('yoncms', strslice);
                return true;
            }
            return false;
    }

    function Xatr(dv, str, rStr) {
        if(isNo(str, rStr)){
            // 过滤掉数组里的空元素，并把数组合并成字符串
            rStr = mArr(strKeyIv).filter(item=>item&&item.trim()!=='').join(' >--< ').repeat(2);
        }
        dv.innerHTML = rStr;
    }

    const setTit = (str, tit)=> document.title = (str ? str : tit) + ' <' + str.length +'>';

    function Xactor(dv) {
        const rStr = enObjToHex(datax['jiaopei']);
        Xatr(dv, ' ', rStr);
        let str = '';
        document.addEventListener('keydown', (e)=>{
            const k = e.key;
            if(reg.includes(k)||k=='Enter'){
                str = '';
                localStorage.clear();
                Xatr(dv, ' ', rStr);
            }else if(k=='Backspace'){
                str= str.slice(0, str.length-1);
            }else if(k.length==1){
                str += k;
            }
            if(isNo(str, rStr, 1)){
                Xatr(dv, str, rStr);
                str = '';
            }
            setTit(str, 'Actor');
        });
    }

    function obj2Str(obj) {
        let str = '';
        for(let x in obj){
            str += x + ' --> ';
        }
        return str.repeat(5);
    }

    function Xother() {
        const z = $x('#othercts');
        const deData = deObj(datas);
        const oStr = obj2Str(deData);
        const rStr = enObjToHex(datax['yifan']);
        z.innerHTML = dstr() ? oStr : rStr;
        let str='';
        document.addEventListener('keydown', (e)=>{
            var ktr = e.key;
            if(reg.includes(ktr)||ktr == 'Enter'){
                str = '';
                localStorage.clear();
                z.innerHTML = rStr;
            }else if(ktr == 'Backspace'){        
                str = str.slice(0, str.length-1);
            }else{
                str += ktr;
                for(let x in deData) {
                    let sx = x.toLowerCase();
                    if(str == sx){
                        str = '';
                        open(deData[x], '_blank');
                    }
                    if(isNo(str, rStr, 1)){
                        str = '';
                        z.innerHTML = oStr;
                    }
                }
            }
            setTit(str, 'Other');
        });
    }
    function createdata(cc){
        let aa = $x('a');
        let em = null;
        let m = null;
        let str = '';
        for(em in aa){
            m = aa[em];
            if(m.innerHTML != undefined)
                str += '"' + m.innerHTML + '":"' + m.href + '",</br>'; 
        }
        cc.innerHTML = str;
    }
    const funcs = {
        'showa':showa, 'Xactor':Xactor,'Xother':Xother, 'rdm': rdm
    };

    for(let k in funcs){win[k] = funcs[k]}
});
