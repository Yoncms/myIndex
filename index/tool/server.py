
# 这是一个多线程的HTTP服务器示例
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import functools

# 指定你的根目录路径
root_dir = '../index'

handler = functools.partial(SimpleHTTPRequestHandler, directory=root_dir)

server_address = ('', 8000)
httpd = ThreadingHTTPServer(server_address, handler)

print('Starting server, listen at: %s:%s' % server_address, '\n....')
httpd.serve_forever()




# 多线程WEB Server，根目录为当前目录

# from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

# server_address = ('', 8000)

# httpd = ThreadingHTTPServer(server_address, SimpleHTTPRequestHandler)

# print('Starting server, listen at: %s:%s' % server_address)

# httpd.serve_forever()





# 多线程WEB Server，根目录为当前目录
#import http.server
#
#from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
#
#Handler = http.server.SimpleHTTPRequestHandler
#
#server_address = ('', 8000)
#
#httpd = ThreadingHTTPServer(server_address, Handler)
#
#print('Starting server, listen at: %s:%s' % server_address)
#
#httpd.serve_forever()