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
    let dvo, dstr, rStr, str='', sign, astr, bstr, totalPages,
        videoList, itemsPerPage, currentPage, totalItems;
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
        itemsPerPage = 12;
        currentPage = 1;
        totalItems = videoList.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);
        document.title = 'plusVideoLists';
        dvo.innerHTML = rStr;
    }('a71f9c69651dd923432e67b7708f25d294c6140c'+
        '3aea4cc46d0501e76f98291186065d7ddc4a9dbd');

    function randStr(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换位置
        }
        return arr.join('');
    }  

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
        console.log(decryptedText);
        return decryptedText;
    }

    function uidVid(arr){
        let obj = {};
        for(let x of arr){
            obj[x] = enCrypto(x, 1);
        }
        return obj;
    }
   
    function renderPage(page) {
      currentPage = page;
      dvo.innerHTML = '';
      for (let i = 0; i < itemsPerPage; i++) {
          const index = (page - 1) * itemsPerPage + i;
          if (index >= totalItems) break;
          const clone = document.createElement('div');
          const name = videoList[index];
          const {w, y} = enCrypto(name, 1)
          clone.className = 'video-preview-container';
          clone.innerHTML = `
              <img src="../thumbs/${name}.jpg" class="preview-thumb" uid="${w}" vid="${y}"/>
              <video muted loop preload="none" class="preview-video">
                <source src="../files/${name}.webm" type="video/mp4" />
              </video>
              `;
              dvo.appendChild(clone);
      }
    
      // 绑定视频预览事件
      const previewContainers = document.querySelectorAll('.video-preview-container');
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
    
      renderPagination();
      window.scrollTo(0, 0);
    }
    
    function renderPagination() {
      const pagination = document.getElementById('pagination');
      pagination.innerHTML = '';
    
      function createBtn(label, page, isActive = false, disabled = false) {
        const span = document.createElement('span');
        span.textContent = label;
        if (isActive) span.classList.add('active');
        if (disabled) span.classList.add('disabled');
        if (!disabled && !isActive) {
          span.addEventListener('click', () => renderPage(page));
        }
        pagination.appendChild(span);
      }
    
      // 首页按钮
      createBtn('首页', 1, false, currentPage === 1);
    
      let start = Math.max(2, currentPage - 4);
      let end = Math.min(totalPages - 1, currentPage + 4);
    
      if (currentPage <= 6) {
        start = 2;
        end = Math.min(9, totalPages - 1);
      } else if (currentPage >= totalPages - 5) {
        start = Math.max(2, totalPages - 8);
        end = totalPages - 1;
      }
    
      createBtn('1', 1, currentPage === 1);
    
      if (start > 2) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.classList.add('disabled');
        pagination.appendChild(dots);
      }
    
      for (let i = start; i <= end; i++) {
        createBtn(i, i, currentPage === i);
      }
    
      if (end < totalPages - 1) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.classList.add('disabled');
        pagination.appendChild(dots);
      }
    
      if (totalPages > 1) {
        createBtn(totalPages, totalPages, currentPage === totalPages);
      }
    
      // 尾页按钮
      createBtn('尾页', totalPages, false, currentPage === totalPages);
    }
    
    // 初次加载第一页
    // renderPage(1);
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
    dvo.addEventListener('click', (e)=>{
        // 获取所有的属性，包括自定义的属性uid和vid
        const {uid, vid} = e.target.attributes;
        if(!uid || !vid) return;
        // 这里都写uid不是写错，是方便后面提取
        params = 'uvid=' + uid.value + '&uvid=' + vid.value;
        window.open('./play.html?'+params, '_blank');
    });

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
        document.title = (str ? str : 'plusVideoList') + ' <' + str.length + '>';
    });

    (dstr!='yoncms') && renderPage(currentPage);

});