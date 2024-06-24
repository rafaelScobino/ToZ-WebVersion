from flask import Flask, request, jsonify, send_from_directory
import battle
import sqlite3



def insert_name_email(name,email):
    db = sqlite3.connect("test.db")
    cur = db.cursor()
    
    query_string ="INSERT INTO email (name,email) VALUES (?,?)" 
    cur.execute(query_string,(name,email))
    db.commit()



app = Flask(__name__,static_folder="")

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

@app.route('/db_post', methods=['POST','GET'])
def query_route():
    info = request.json
    
    user_name = info['name']
    user_email = info['email'] 
    jsonify(insert_name_email(user_name,user_email))
    return "Succesful"
    
@app.route('/dbtesting_get', methods=['POST','GET'])
#def query_get_route():
    
    
@app.route('/tower', methods=['GET'])
def html():
    return send_from_directory('', 'tower.html')

@app.route('/battle', methods=['POST','GET'])
def battle_route():
    
    data = request.json
    
    action = data['action']
    h_life =  data['hLife']
    h_str = data['hStrength']
    h_skl = data['hSkill']
    h_mgk = data['hMagicka']
    e_life = data['eLife']
    e_str = data['eStrength']
    e_skl = data['eSkill']
    e_mgk = data['eMagicka']
    e_next_roll = data['eNextAtk']
    turn = data['turn']
    t_level = data['tLevel']
        
    return jsonify(battle.request_handler(action,h_life,h_str,h_skl,h_mgk,e_life,e_str,e_skl,e_mgk,e_next_roll,turn,t_level))
        
if __name__ =='__main__':
    app.run()

