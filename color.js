
function showa()
{
    let loac = location.href.split('?');
	loac = loac.length==1 ? 'default' : loac.slice(-1);
	console.log(loac);
	const navData = datax[loac];
    // 生成导航按钮
    for (const [text, url] of Object.entries(navData)) {
        if(text == 0){
            document.title = url;
            continue;
        }else{
			const link = document.createElement('a');
			link.href = url;
			link.className = 'btn';
			link.innerHTML = text;
			link.target = '_blank';
			document.body.appendChild(link);
		}
    }
}

function $(arg, flag)
{
	let D = document;
	if(!flag)
	{
		return D.querySelectorAll(arg);
	}else{
		return D.querySelector(arg);
	}
}

function getsty(obj, sty)
{
	return parseInt(getComputedStyle(obj, null)[sty]);
}


function Css(){
	let aa = $('a');

	let ln = aa.length;
	if(!!ln)
	{
		var i=0;
		for(; i<ln; i++) 
		{
			let em = aa[i];
			em.onmouseover = function(){
				let ts = this.style;
				ts.backgroundColor = '#33333380';
				ts.color = '#00ff00E6';
				ts.fontSize = '32px';
				ts.lineHeight = '72px';
				ts.fontFamily = 'Impact,Charcoal,sans-serif';
				asty(this);
				ts.top = getsty(this, 'top')-6 + 'px';
				ts.left = getsty(this, 'left') -12 + 'px';
				ts.width = getsty(this, 'width') + 24 + 'px';
				ts.height = getsty(this, 'height') + 12 + 'px';
			};
			em.onmouseout = function(){
				let ts = this.style;
				ts.backgroundColor = '#333333E6';
				ts.color = '#aaa';
				ts.fontSize = '20px';
				ts.fontFamily = '';
				ts.lineHeight = '60px';
				ts.top = getsty(this, 'top') + 6 + 'px';
				ts.left = getsty(this, 'left') + 12 + 'px';
				ts.width = getsty(this, 'width') - 24 + 'px';
				ts.height = getsty(this, 'height') - 12 + 'px';
				ts.zIndex = 1;
			};
		}
	}
};

var ev = {
	x: 1,
	mouse: function (dv, str)
	{ console.log(this.x);
		if(this.x == 1){
			dv.innerHTML = decodeURIComponent(atob(str));
			this.x = 2
		}else{
			dv.innerHTML = str;
			this.x = 1;	
		}
	}
};

function asty(obj)
{
	let as = $('a');
	for(let em of as){
		let es = em.style;
		es.zIndex = 1;
	}
	obj.style.zIndex = 100;
}

function buju()
{
	let as = $('a');
	let i = 0;
	let x = 0;
	let l = as.length;
	for( i; i<l; i++){
		let j = i % 7;
		let em = as[i];
		em.style.left = j * 192 + 'px';
		em.style.top = x * 82 + 'px';
		if(j==6 && i!=0)
			x++;
	}
}


function subshow(){
	let locat = '';
	let x = '';
	let str = '';
	if(location.href.indexOf('?'))
	{
		locat = location.href.split('?');
		if(locat.length==1){
			locat = 'default';
		}else{
			locat = locat.slice(-1);
		}
		console.log(locat);
		if(locat in datax){
			x = datax[locat];
			for(let ix in x){
				if(ix!=0){
					str += '<a href="'+x[ix]+'">'+ix+'</a>';
				}
			}
			document.title = x['0'];
			$('#model',1).innerHTML = str;
		}
	}
	Css();
}




function actr(dv)
{
    var i=0;
    var l=act.length;
    var str = '';
    var num = 0;
    var em = '';
    for(; i<l; i++) 
    {
        em = act[i];
        if(em=='')
        {
            continue;
        }else
        {
          num += em.length;
//          console.log(num);
        }
        let rand = Math.floor(Math.random()*89) + 10;
        str += rand + em;
        if(num >= 60 && i != 0)
        {
            num = 0;
            str += '</p>';
        }
    }
    let bstr = btoa(encodeURIComponent(str));
    dv.innerHTML = bstr;
    document.onkeypress = function(e)
    {
        if(e.keyCode==96){
            ev.mouse(dv, bstr);
        }
    };
}


function otherexec()
{
    let z = $('#othercts', 1);
    let x=null, n=1, cts='';
    for(x in datas)
    {
        let w = Math.floor(Math.random()*9)+1;
        let mark = n%10==0 ? '</p>' : '';
        cts += w + x + mark;
    }
    let bstr = btoa(encodeURIComponent(cts));
    z.innerHTML = bstr;
    var str = '';
    document.onkeypress = (e)=>{
        var ktr = String.fromCharCode(e.keyCode);
        str += ktr;
        console.log(str);
        document.title = str;
        if(e.keyCode==96){
            str = '';
            ev.mouse(z, bstr);
            document.title = 'Other';
        }
        else if(e.keyCode==13)
        {          
            str = '';
        }else{
            for(x in datas) 
            {
                var inner = x.toLowerCase();
                if(str == inner)
                {
                    str = '';
                    console.log('>', datas[x]);
                    open(datas[x], '_blank');
                }
            }
        }
    };
}




function createdata(cc)
{
	let aa = $('a');
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