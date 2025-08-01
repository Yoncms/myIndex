// JS里的字符串如果太长，里面还有换行，可以使用`号来解决
rdata = [
	["请接上文继续","ollama run deepseek-r1:latest"],
	[
		"python发送请求时，如果存在重定向，而我们又不需要重定向时，",
		"可以在发送请求时加上参数allow_redirects=False。这样就可以得",
		"到重定向前的response的cookies或headers"
	],
	[
		'ffmpeg视频转换命令：',
		'基本命令：',
		'ffmpeg -i input.ts -c:v copy -c:a copy output.mp4',
		'-c:v copy: 视频流直接复制，不重新编码，速度快且无损；-c:a copy: 音频流直接复制，不重新编码',
		'ffmpeg -i input.ts -c:v libx264 -c:a aac output.mp4',
		'-c:v libx264: 使用 H.264 编码器重新编码视频；-c:a aac: 使用 AAC 编码器重新编码音频'
	],
	[
		'ffmpeg视频里提取音频：',
		'ffmpeg -i input.mp4 -q:a 0 -map a output.mp3',
		'音频质量，0 是最高质量（可选）；-map a：只提取音频流'
	],
	[
		"python打包使用pyinstaller，命令是：pyinstaller xxx.py或pyinstaller xxx.spec；",
		"如果打包时，有的文件不需要打包到exe文件里，可以在spec文件的a.datas进行设置：",
		"在datas的值里写入一个元组('xxx','www')，xxx是不打包的文件，www是把它导到www",
		"的目录下。需要注意的是，因为进行了设置，打包时的导入也要是相同的www.packagename。",
		"如果需要指定可以执行文件的ico，在exe的最后添加：icon=['xxx.ico']，xxx是ico的文件名。"
	],
	[
		'绕过无限debugger',
		'在debugger语句所在的行的行号上单击鼠标右键， 选择Never pause here 这个选项',
		'或选择 Add conditional breakpoint 选项，直接填入 false 然后回车即可',
		'利用 Overrides文件替换，打开 Sources 面板下的 Overrides 面板，将修改后的完整 JavaScript 文件复制进去',
	],
	['通过cmd指定目录安装：xxxx.exe /DIR="H:\\xxx\\xxx"'],
	[
		"diskpart",
		"list volume",
		"select volume=5（“5”代表需要隐藏的序号）",
		"remove letter=I（“I”代表需要隐藏的盘符）"
	],
	[
		"Gmail中别名是可以在[+]号之后填写任意字符。如：user+001@gmail.com、user+002@gmail.com",
		"或者：u.s.e.r@gmail.com、u.ser@gmail.com；可以多个点号或者单个点号。都会发送到user@gmail.com主邮箱。"
	],
	[
		"在使用burpsuite抓包时，如果同时还开启了代理，就要在burpsuite的setting->user",
		"->network->connections->SOCKS proxy->选中Use SOCKS proxy->host:127.0.0.1",
		"->port:(端口号10808)；如果不设置SOCKS proxy，也可以设置upstream proxy server，",
		"add：127.0.0.1：端口号10808；proxy listeners的端口号要与浏览器的代理端口号相同为：8080",
	],
	[
		'&nbs p;：一个字符的半角的不断行的空格，如果需要在网页中插入多个空格，可以将“ ”代码写多遍（常用方式）；',
		'&ens p; ：一个字符的半角的空格，也可以将“ ”写多遍来插入多个空格；',
		'&ems p; ：两个字符的全角的空格，也可以将“ ”写多遍来插入更多的空格；',
		'&thins p;：小于一个字符的空格；'
	],
	[
		"在使用burpsuite抓包时，如果同时还开启了代理，就要在burpsuite的setting->user",
		"->network->connections->SOCKS proxy->选中Use SOCKS proxy",
		"->host: 127.0.0.1; port:10808。同时浏览器的代理设置为：host:127.0.0.1; port:8080"
	],
	[
		"在 JavaScript 中，可以使用 btoa() 进行 Base64 编码，使用 atob() 进行 Base64 解码。",
		"对于 中文或其他 Unicode 字符，可以使用 TextEncoder 和 TextDecoder 进行编码和解码，或者使用 encodeURIComponent() 处理。"
	],
	[
		'JS环境补全：',
		'Window = function(){};','window = new Window();','Document = function(){};','document = new Document();',
		'Navigator = function(){};','navigator = new Navigator();','location = {"href": "xxxxxx"};','self = window',
		'window = {navigator: navigator};'
	],
	[
		"Youtube音视频下载命令：",
		"youtube-dl -F URL",
		"下载指定格式（format）视频",
		"youtube-dl -f format URL",
		"youtube-dl -f bestvideo+bestaudio URL",
		"format可以使用上面列出的，也可以使用如下单词：",
		"best 选择最佳质量的音/视频文件 worst 选择质量最差的格式（视频和音频）",
		"bestvideo 选择最佳质量的仅视频格式（例如DASH视频），可能无法使用。",
		"worstvideo选择质量最差的纯视频格式，可能无法使用。",
		"bestaudio 选择最优质的音频格式，可能无法使用。",
		"worstaudio 选择质量最差的音频格式，可能无法使用。",
		"如果只需要一次从 Youtube 上下载多个不同的视频，此时我们只需用空格将多个 URL 分隔开即可：",
		"youtube-dl <url1> <url2>",
		"或者，可以将要下载视频的 URL 全部放在文本文件中，并将其作为参数传递给 Youtube-dl 也行：",
		"youtube-dl -a url.txt",
		"Youtube-dl 允许我们仅从 Youtube 视频下载其音频，例如：",
		"youtube-dl -x https://www.youtube.com/watch?v=iJvr0VPsn-s",
		"默认情况下，Youtube-dl 将以 Ogg（opus）格式保存音频，如果想以任何其他格式下载音频，例如 mp3 请运行：",
		"youtube-dl -x --audio-format mp3 https://www.youtube.com/watch?v=iJvr0VPsn-s"
	],
	"©twilio©:::banjbl2024@2925///S162020#",
	"Cursor:::修改机器码==>C:Users\banjbAppDataRoamingCursorUserglobalStoragestorage.json",
	"修改telemetry.macMachineId、telemetry.machineId、telemetry.devDeviceId的值",
	"合并视频文件的cmd命令：copy /b *.ts xxx.mp4",
	"图片代码注入的cmd命令：copy aaa.jpg/b bbb.txt/a ccc.jpg----其中的/b表示二进制文件，/a表示ASCII码文件",
	"tearmview::::banjbl@126 ------saq20#",
	[
		"百度：电脑学堂CS:::::::dnxtcms@gmail.com:::::::s20zq",
		"阿里云：yoncms2020::::::bjbl@163:::::s20z"
	],
	[
		"powercfg -a（查看休眠功能）",
		"打开/关闭休眠功能",
		"powercfg -h off (关闭休眠功能)",
		"powercfg -h on (打开休眠功能)"
	],
	[
		"释放ip：ipconfig /release",
		"获取新ip：ipconfig /renew",
		"清除DNS：ipconfig / flushdns"
	],
	[
		"bing::::sq20",
		"无限邮::::bbl2024::::p::::sq0----ycszrq::::sq0",
		"sms: email--daog psw--Sq20",
		"路由器：：：zcf750416"
	],
	[
		"dnxt@gm 1998 9 8",
		"https://anycodes.cn/editor //// banjbl ////sq",
		"claude账号(俩）daoguu@gcom /////banjbl@gcom",
		"chatGPT的账号：banjbl@gcom 密：sq20",
		"yccxzx:::gmail///126.com",
		"banjbl:::gmail///126.com///163.com",
		"gmail:::jyjxwz///gudianw///gusdkt///daoguu///dnxtcms"
	],
	[
		"百度：电脑学堂CS--dnxtcms(gm)--s20zq  百度：贵族后裔啦--dnxtcms(gm)--s20zq  github:::::mail.qq//////sq20",
		"https://yoncms.github.io/",
		"智学网：zxt2850562 密：zxt28505621",
		"人人：https://bbs.672z.org/2048/index.php yhnujm2024 M:Saq0",
		'猿人学:yoncms---sa2020'
	]

];
