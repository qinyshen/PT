# coding=utf-8
import urllib2
import re
import time
import pymysql.cursors
import requests
from bs4 import BeautifulSoup

while True:
    try:
        # Connect to the database
        connection = pymysql.connect(user='root', password='root', database='PT')
        cursor = connection.cursor()
        commit = "CREATE TABLE IF NOT EXISTS papers (No int, Date VARCHAR(50), Title VARCHAR(200), Authors VARCHAR(200), " \
                 "Subject VARCHAR(200), Address VARCHAR(100), GitHub VARCHAR(100), Abstract VARCHAR(2000), Stars int, " \
                 "iterm1 VARCHAR(200), iterm2 VARCHAR(200)); "
        cursor.execute(commit)

        catalogue_url = "https://arxiv.org/list/cs.AI/pastweek?show=50"
        catalogue = urllib2.urlopen(catalogue_url).read()
        papers = re.findall(r'<a href="(.*?)" title="Abstract">.*?</a>', catalogue)
        papers.reverse()

        commit = "select max(No) from papers;"
        cursor.execute(commit)
        num = cursor.fetchall()[0][0]

        if not num is None:
            commit = "select Address from papers where No=%s;" % num
            cursor.execute(commit)
            node = cursor.fetchall()[0][0].split("org")[1]
            try:
                index = papers.index(node) + 1
            except ValueError:
                index = 0
        else:
            num = 0
            index = 0

        start = num

        for number in papers[index:]:
            num += 1
            No = num
            paper_url = "https://arxiv.org" + number
            Address = paper_url
            paper = urllib2.urlopen(paper_url).read()
            response = requests.get(paper_url)
            soup = BeautifulSoup(response.text, "lxml")
            Title = re.findall(r'\n(.*?)</h1>', str(soup.find_all("h1", class_="title mathjax")[0]))[0]
            Date = re.findall(r'\(Submitted on (.*?)\)', str(soup.find_all("div", class_="dateline")[0]))[0]
            Authors = re.findall(r'<a href="/find/.*?">(.*?)</a>', paper)
            Author = ""
            for i in Authors[:-1]:
                Author += i + ", "
            Author += Authors[-1]
            Subject = re.findall(r'<td class="tablecell subjects"><span class="primary-subject">(.*?)</span>.*?</td>', paper)[0]
            Subject += re.findall(r'<td class="tablecell subjects"><span class="primary-subject">.*?</span>(.*?)</td>', paper)[0]
            Abstract = soup.blockquote.get_text().encode("utf-8").replace("\n", " ").replace(" Abstract: ", "")
            Stars = 0
            with connection.cursor() as cursor:
                # Create a new record
                sql = "INSERT INTO papers"
                sql += "(No, Date, Title, Authors, Subject, Address, Abstract, Stars) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (No, Date, Title, Author, Subject, Address, Abstract, Stars))
            connection.commit()

        end = num
        print "No.%s - No.%s Update Success!" % (start, end)
        connection.close()
        time.sleep(60 * 30)
    except urllib2.URLError:
        print "Connection Error & Retry!"
        pass

