import os
import webview
import re
import json
from Crypto.Cipher import AES 
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes
import base64


class wvw:
	def __init__(self):
		self.fstr = ('<body style="background:#87CEEB33">'
				'<div id="dv">\n<script>\nconst videos = \n"')
		# self.farr = []
		self.win = None

	def encry(self, text):
		# 将 hex 字符串解析为 bytes
		key = bytes.fromhex('6d0501e76f98291186065d7ddc4a9dbd')
		iv  = bytes.fromhex('a71f9c69651dd923432e67b7708f25d2')
		
		data = json.dumps(text).encode('utf-8')
		cipher = AES.new(key, AES.MODE_CBC, iv)
		ciphertext = cipher.encrypt(pad(data, AES.block_size))

		# 输出十六进制密文
		res = ciphertext.hex()
		# print("hex 密文:", res)
		return res

		# 5. 输出 base64 编码（包含 IV + 密文）
		# ciphertext_b64 = base64.b64encode(iv + ciphertext).decode()
		# print("加密结果（IV+密文 Base64）：", ciphertext_b64)
		# return ciphertext_b64

	# 生成一个包含加密的视频列表字符串的html文件
	def setfarr(self):
		# 这是在当前目录下查找所有的mp4文件，并生成一个html字符串
		# for root, dirs, files in os.walk(".", topdown=False):
		vs = []
		# 这是指定目录下查找所有的mp4文件，并生成一个html字符串
		# for root, dirs, files in os.walk("../index", topdown=False):
		for root, dirs, files in os.walk("../index", topdown=False):
			for name in files:
				# self.fstr += os.path.join(root, name) + ';'
				opj = os.path.join(root, name)
				fn = opj.split('.')[2][7:]  
				mtype = opj.split('.')[3]
				# fn = opj.split('.')[1][7:]  
				# mtype = opj.split('.')[2]
				# print('>', fn, mtype)
				if mtype=='mp4':
					vs.append(fn)
		sev = self.encry(vs)
		self.fstr += sev
		self.fstr += (
			'";\n</script>\n</div>\n</body>\n<script src="./crypto.js">'
			'</script>\n<script src="./video.js"></script>'
		)  

	def showfarr(self):
		self.setfarr()
		print(self.fstr)
		return self.fstr[:-1]

	def setview(self):
		self.win = webview.create_window('hello', 'indexs.htm', js_api=wvw())
		webview.start(debug=True)

	def seta(self):
		self.setfarr()
		with open('../temp/index.htm', 'w') as f:
			f.write(self.fstr)
		print('>>>>> 视频列表已生成，并加密保存到index.html')

	# 只要得到一个加密的视频列表字符串，就可以在前端使用了。
	# 不需要生成一个html文件。
	def getEnArr(self):
		# 这是在当前目录下查找所有的mp4文件
		# for root, dirs, files in os.walk(".", topdown=False):
		videos = []
		# 这是指定目录下查找所有的mp4文件
		# for root, dirs, files in os.walk("../index", topdown=False):
		for root, dirs, files in os.walk("../index", topdown=False):
			for name in files:
				opj = os.path.join(root, name)
				fn = opj.split('.')[2][7:]  
				mtype = opj.split('.')[3]
				if mtype=='mp4':
					videos.append(fn)
		if videos == []:
			print('>>>>> 请注意视频所在目录不能被隐藏！')
			return
		sev = self.encry(videos)
		sev = ''.join(["'" + sev[i:i+99] + "'+\n" for i in range(0, len(sev), 99)])
		print(sev)
		with open('../temp/videoList.htm', 'w') as f:
			f.write(sev[0:-2] + ';')
		print('>>>>> 视频列表已生成，并加密保存到videoList.htm')


if __name__ == '__main__':
	w = wvw()

	# 生成html文件
	# w.seta()

	# 生成加密的视频列表字符串
	w.getEnArr()

