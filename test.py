import MySQLdb
from flask import Flask, render_template, request, jsonify
import requests
from flask_mysqldb import MySQL
from flask_cors import CORS
import os,time


app = Flask(__name__) 
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'pass,123'
app.config['MYSQL_DB'] = 'to_do'
# app.run(debug=True)

## Connection to mysql with above config
mysql = MySQL(app)

@app.route("/")
def index():

   return "WELCOME!!! This is the home page"

@app.route("/activities")
def allActivity():
    cur = mysql.connection.cursor()

    query_allActivity="select activity,activity_desc,id FROM user_activity where is_deleted=0" # WHERE State like %s AND County like %s "
    cur.execute(query_allActivity)#, (STATEABBRV+ "%", COUNTY+ "%"))

    res=cur.fetchall()
    activity_Dict = {'Activity_Name': res[0][0],'Activity_Desc': res[0][1],'ID': res[0][2]}
    return jsonify(res)

# @app.route('/insert')
# def insertActivity():
@app.route('/insert/<string:activity>/<string:activity_desc>',methods = ['POST'])
def insertActivity(activity_desc,activity):

    ## Cursor objects interact with the MySQL server using a MySQLConnection object.
    cur = mysql.connection.cursor()


    query_addActivity="INSERT INTO user_activity VALUES (%s,%s,default,0)"
    cur.execute(query_addActivity,(activity,activity_desc) )

    ## Since auto commit does not happens....using commit to modify the table
    mysql.connection.commit()


    print('Added entry')

    return "Added entry"


@app.route('/delete/<int:id>')
def deleteActivity(id):

    ## Cursor objects interact with the MySQL server using a MySQLConnection object.
    cur = mysql.connection.cursor()
    

    query_deleteActivity="UPDATE user_activity SET is_deleted = 1 WHERE id = %s" # WHERE State like %s AND County like %s "
    cur.execute(query_deleteActivity,(id,) )

    ## Since auto commit does not happens....using commit to modify the table
    mysql.connection.commit()


    print('Deleted entry')

    return "Deleted entry"


@app.route('/update/<int:id>/<string:activity>/<string:activity_desc>')
def updateActivity(id,activity,activity_desc):
    try:
        ## Cursor objects interact with the MySQL server using a MySQLConnection object.
        cur = mysql.connection.cursor()

        query_addActivity="UPDATE to_do.user_activity SET activity_desc=%s,activity=%s WHERE id=%s"
        cur.execute(query_addActivity,(activity_desc,activity,id) )

        ## Since auto commit does not happens....using commit to modify the table
        mysql.connection.commit()


        print('Updated entry')

        return "Updated entry"
    
    except Exception as e:
        print(e)
        return jsonify(e)



if __name__ == '__main__':
    #app.run()
    app.run(host="127.0.0.1", port=5000)