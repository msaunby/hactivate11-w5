#!/usr/bin/env python

import httplib, urllib
import cgi, simplejson

def main():
    form=cgi.FieldStorage()
    uri = form["uri"].value
    callback=form["callback"].value
    URL="/v1?mask={'uri':'.','name':'label','lat':'geo:lat','lon':'geo:long'}&q=/str(%22"+uri+"%22)/x:locations"
    conn = httplib.HTTPConnection("api.headup.com")
    conn.request("GET", URL)
    response = conn.getresponse()
    data=simplejson.loads(response.read())

    for p in data:
        p['map'] = "http://m.ovi.me/?c=%(lat)s,%(lon)s&z=2&nord" % p
        pass

    print "Content-type: text/json\n"
    print callback+'('+simplejson.dumps(data)+');'
    return

if __name__ == '__main__':
  main()
