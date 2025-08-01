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
        if((args.includes('#') &&
        ((args.includes('\\ ')) ||
        !args.includes(' '))) ||
        single==1){
            return document.querySelector(args);
        }
        return document.querySelectorAll(args);       
    }
};

$x(()=>{
    let dvo, dstr, rStr, str='', sign, astr, bstr,
        videoList, videosPerPage, currentPage;
    const { Hex, Base64, Utf8 } = CryptoJS.enc;
    const setSty = (dv, sty) => {for(let k in sty){dv.style[k] = sty[k]}};
    const token_ = () => localStorage.setItem('ban_token', sign);
    !function (strings){
        dvo = $x('#header');
        dstr = localStorage.getItem('yoncms')||'yoncms';
        rStr = randStr(videos);
        sign = strings.slice(32, 48);
        token_();
        astr = strings.slice(-32);
        bstr = strings.slice(0, 32);
        // 视频文件名
        videoList = JSON.parse(dvCrypto(videos));
        videosPerPage = 12;
        currentPage = 1;
        document.title = 'VideoLists';
        dvo.innerHTML = rStr;
    }('a71f9c69651dd923432e67b7708f25d294c6140c'+
        '3aea4cc46d0501e76f98291186065d7ddc4a9dbd');
  
    function uidVid(arr){
        let obj = {};
        for(let x of arr){
            obj[x] = enCrypto(x, 1);
        }
        return obj;
    }

    function renderPage(page) {
        dvo.innerHTML = ''; // 清空旧内容
        const start = (page - 1) * videosPerPage;
        const end = start + videosPerPage;
        const pageVideos = videoList.slice(start, end);
        const uvid = uidVid(pageVideos);

        pageVideos.forEach(name => {
            const {w, y} = uvid[name];
            const container = document.createElement('div');
            container.className = 'video-preview-container';
            container.innerHTML = `
            <img src="../thumbs/${name}.jpg" class="preview-thumb" uid="${w}" vid="${y}"/>
            <video src="../files/${name}.webm" muted loop preload="none" class="preview-video"></video>
            `;
            dvo.appendChild(container);
        });

        bindHoverEvents();
        renderPagination();
    }

    function bindHoverEvents() {
        const previewContainers = $x('.video-preview-container');
        previewContainers.forEach(container => {
            const video = container.querySelector('video');

            container.addEventListener('mouseenter', () => {
            if (video.readyState >= 2) {
                video.currentTime = 0;
                video.play();
            } else {
                video.load();
                video.addEventListener('loadeddata', () => {
                video.currentTime = 0;
                video.play();
                }, { once: true });
            }
            });

            container.addEventListener('mouseleave', () => {
            video.pause();
            });
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(videoList.length / videosPerPage);
        const pagination = $x('#pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            setSty(btn, {
                margin: '0 5px', padding: '5px 10px', cursor: 'pointer',
                background: (i === currentPage) ? '#007bff' : '#f0f0f0',
                color: (i === currentPage) ? '#fff' : '#000'
            });
            btn.onclick = () => {
            currentPage = i;
            renderPage(currentPage);
            };
            pagination.appendChild(btn);
        }
    }

    dvo.addEventListener('click', (e)=>{
        // 获取所有的属性，包括自定义的属性uid和vid
        const {uid, vid} = e.target.attributes;
        if(!uid || !vid) return;
        // 这里都写uid不是写错，是方便后面提取
        params = 'uvid=' + uid.value + '&uvid=' + vid.value;
        window.open('./play.html?'+params, '_blank');
    });

    function enCrypto(text, single=0){
        let iv, rand, xKey, Key;
        if(single==0){
            Key = CryptoJS.lib.WordArray.random(16);
            iv = CryptoJS.lib.WordArray.random(16);
        }else{
            rand = crypto.randomUUID().replace(/-/g, '');
            xKey = rand.slice(0, 16);
            Key = Hex.parse(xKey);
            iv = Hex.parse(sign);
        }

        const encrypted = CryptoJS.AES.encrypt(text, Key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const hexCiphertext = encrypted.ciphertext.toString(Hex);
        // console.log("KEY、密文（Hex）:", xKey, hexCiphertext);
        return single==0 ? hexCiphertext : {w:xKey, y:hexCiphertext};
    }

    // 这里是在python加的密，在JS端解密
    function dvCrypto(hexCiphertext) {
        const Key = Hex.parse(astr);
        const iv = Hex.parse(bstr);
        const encryptedHexStr = Hex.parse(hexCiphertext);
        const encryptedBase64Str = Base64.stringify(encryptedHexStr);

        const decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, Key, {   
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedText = decrypted.toString(Utf8);
        // console.log(decryptedText);
        return decryptedText;
    }

    function isNo(str, rStr, single=0){
        const strslice = str.slice(6);
        if(!single && dstr!='yoncms') return true;
        if(str.length==14 &&
            str.slice(0,6)=='yoncms' &&
            rStr.includes(strslice)){
                localStorage.setItem('yoncms', strslice);
                return true;
            }
    };

    setSty(dvo, {
        width: '100%',
        height: '625px',
        marginTop: '15px',
        fontSize: '25px',
        fontWeight: '700',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
        color: '#456789E1',
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        overflow: 'hidden'
    });

    function randStr(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换位置
        }
        return arr.join('');
    }

    document.addEventListener('keydown', (e)=>{
        const k = e.key; 
        if(' []\\;\',./`'.includes(k)){
            str = '';
            localStorage.clear();
            dvo.innerHTML = rStr;
            $x('#pagination').innerHTML=null;
        }else if(k=='Backspace'){
            str = str.slice(0, str.length-1);
        }else{
            str += k;
        }
        if(isNo(str, rStr, 1)){
            str = '';
            token_();
            renderPage(currentPage);
        }
        document.title = (str ? str : 'VideoList') + ' <' + str.length + '>';
    });


    (dstr!='yoncms') && renderPage(currentPage);

});

