/**
* Ahthor：Yoncms | Zhangrongquan / yoncms.github.io
* version: 25.07.25
*/
!function(vem){
    function vCrypto(uid, hexCiphertext) {
        const { Hex, Base64, Utf8 } = CryptoJS.enc;
        const Key = Hex.parse(uid); 
        const iv = Hex.parse(localStorage.getItem('ban_token')); 

        const encryptedHexStr = Hex.parse(hexCiphertext);
        const encryptedBase64Str = Base64.stringify(encryptedHexStr);

        const decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, Key, {   
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedText = decrypted.toString(Utf8);
        return decryptedText;
    }

    !function(vem){
        const vdid = document.querySelector('#' + vem);
        const [uid, vid] = new URL(location.href).searchParams.getAll('uvid');
        if(
            (localStorage.getItem('yoncms')||'yoncms')=='yoncms'
        ) {
            document.title = ' No Access ❗';
            return;
        }
        // console.log(uid, vid);
        const fn = vCrypto(uid, vid);
        // console.log(fn);
        vdid.setAttribute('src', '../index/' + fn + '.mp4');
        document.title =  document.title.slice(0, 5) +' ➖ '+ fn;
    }(vem);

    document.addEventListener('keydown', (e)=>{
        if(' []\\;\',./`'.includes(e.key)){
            localStorage.clear();
            location.reload();
        }
    });

}('vdid');


