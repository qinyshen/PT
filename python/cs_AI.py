# coding=utf-8
import urllib2
import re
import time
import pymysql.cursors
import requests
from bs4 import BeautifulSoup
import datetime

while True:
    try:
        # Connect to the database
        connection = pymysql.connect(user='root', password='root', database='paper')
        cursor = connection.cursor()

        catalogue_url = "https://arxiv.org/list/cs.AI/pastweek?show=50"
        catalogue = urllib2.urlopen(catalogue_url).read()
        papers = re.findall(r'<a href="(.*?)" title="Abstract">.*?</a>', catalogue)
        papers.reverse()

        commit = "select Subject_ID from Subjects where Tag='cs.AI';"
        cursor.execute(commit)
        ID = cursor.fetchall()[0][0]
        # print ID


        commit = "select max(Paper_ID) from In_Subject where Subject_ID=%s;" % ID
        cursor.execute(commit)
        num = cursor.fetchall()[0][0]
        # print num

        if not num is None:
            commit = "select Address from Papers where Paper_ID=%s;" % num
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
            Publish_time = Date.split(" (")[0]
            Authors = re.findall(r'<a href="/find/.*?">(.*?)</a>', paper)
            Author = ""
            for i in Authors[:-1]:
                Author += i + ", "
            Author += Authors[-1]
            Subject = re.findall(r'<td class="tablecell subjects"><span class="primary-subject">(.*?)</span>.*?</td>', paper)[0]
            Subject += re.findall(r'<td class="tablecell subjects"><span class="primary-subject">.*?</span>(.*?)</td>', paper)[0]
            Abstract = soup.blockquote.get_text().encode("utf-8").replace("\n", " ").replace(" Abstract: ", "")
            Star = 0

            # print Title
            # print Address
            # print Abstract
            # print Author
            # print Publish_time

            cursor = connection.cursor()
            commit = "INSERT INTO Papers (Title, Address, Abstract, Stars, Authors, Pulish_time) VALUES " \
                     "(%s, %s, %s, %s, %s, %s);"
            cursor.execute(commit, (Title, Address, Abstract, Star, Author, datetime.datetime.strptime(Publish_time,'%d %b %Y') ))
            connection.commit()

            commit = "Select Paper_ID from Papers where Address='%s';" % Address
            cursor.execute(commit)
            connection.commit()
            paper_ID = cursor.fetchall()[0][0]
            # print paper_ID

            Subject = Subject.split("; ")

            for a in Subject:
                Tag = a.split(" (")[1].replace(")", "")
                Name = a.split(" (")[0]

                commit = "SELECT COUNT(*) FROM Subjects WHERE Tag='%s';" % Tag
                cursor.execute(commit)
                connection.commit()
                check = cursor.fetchall()[0][0]
                if check == 0:
                    commit = "INSERT INTO Subjects (Tag, Name) VALUES (%s, %s);"
                    cursor.execute(commit, (Tag, Name))
                    connection.commit()

                commit = "SELECT Subject_ID FROM Subjects WHERE Tag='%s';" % Tag
                cursor.execute(commit)
                connection.commit()
                Subject_ID = cursor.fetchall()[0][0]
                # print Subject_ID

                commit = "INSERT INTO In_Subject (Paper_ID,Subject_ID) VALUES (%s, %s);"
                cursor.execute(commit, (paper_ID, Subject_ID))
                connection.commit()
        end = num
        print "No.%s - No.%s Update Success!" % (start, end)
        connection.close()
        time.sleep(60 * 30)
    except urllib2.URLError:
        print "Connection Error & Retry!"
        pass



