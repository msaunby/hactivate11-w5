#!/usr/bin/env python

import httplib, urllib
import cgi, simplejson

def main():
    form=cgi.FieldStorage()
    uri = form["uri"].value
    URL="/v1?mask={'uri':'.','name':'label','lat':'geo:lat','lon':'geo:long'}&q=/str(%22"+uri+"%22)/x:locations"
    conn = httplib.HTTPConnection("api.headup.com")
    conn.request("GET", URL)
    response = conn.getresponse()
    data=simplejson.loads(response.read())
    
    
    print "Content-type: text/html\n"
    print """<HTML><head>
    <script type="text/javascript">
    function set_map(lat,lon){
     document.getElementById("map").src="http://m.ovi.me/?c=" + lat + "," + lon + "&z=2&nord";
    }
    function facts(uri){
     //alert(uri);
     location.href="http://en.wikipedia.org/wiki/" + uri.split(':')[1];
    }
    </script> 
    </head><body>"""
    print """<img id="map" src="http://m.ovi.me/?c=%(lat)s,%(lon)s&z=2&nord"><br>""" % data[0]

    for p in data:
        print '<a href="#" onclick="set_map(%(lat)s,%(lon)s)">%(name)s</a>' % p
        print """&nbsp;<a href="#" onclick="facts('%(uri)s')">W</a><br>""" %p
        pass

    print """</body>
    </HTML>"""
    return

if __name__ == '__main__':
  main()
