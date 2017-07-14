import pymysql.cursors
import datetime

connection1 = pymysql.connect(user='root', password='root', database='PT')
cursor1 = connection1.cursor()
commit = "select * from cs_AI;"
cursor1.execute(commit)
db = cursor1.fetchall()

connection2 = pymysql.connect(user='root', password='root', database='paper')

for result in db:
    Title = result[2]
    Address = result[5]
    Abstract = result[7]
    Star = result[8]
    Authors = result[3]
    Publish_time = result[1].split(" (")[0]
    Subjects = result[4].split("; ")

    cursor2 = connection2.cursor()
    commit = "INSERT INTO Papers (Title, Address, Abstract, Stars, Authors, Pulish_time) VALUES " \
             "(%s, %s, %s, %s, %s, %s);"
    cursor2.execute(commit, (Title, Address, Abstract, Star, Authors, datetime.datetime.strptime(Publish_time,'%d %b %Y') ))
    connection2.commit()

    commit = "Select Paper_ID from Papers where Address='%s';" % Address
    cursor2.execute(commit)
    connection2.commit()
    paper_ID = cursor2.fetchall()[0][0]

    for a in Subjects:
        Tag = a.split(" (")[1].replace(")", "")
        Name = a.split(" (")[0]

        commit = "SELECT COUNT(*) FROM Subjects WHERE Tag='%s';" % Tag
        cursor2.execute(commit)
        connection2.commit()
        check = cursor2.fetchall()[0][0]
        if check == 0:
            commit = "INSERT INTO Subjects (Tag, Name) VALUES (%s, %s);"
            cursor2.execute(commit, (Tag, Name))
            connection2.commit()

        commit = "SELECT Subject_ID FROM Subjects WHERE Tag='%s';" % Tag
        cursor2.execute(commit)
        connection2.commit()
        Subject_ID = cursor2.fetchall()[0][0]

        commit = "INSERT INTO In_Subject (Paper_ID,Subject_ID) VALUES (%s, %s);"
        cursor2.execute(commit, (paper_ID, Subject_ID))
        connection2.commit()


