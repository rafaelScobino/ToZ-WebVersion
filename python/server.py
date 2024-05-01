from flask import Flask, request, jsonify, send_from_directory
import battle



app = Flask(__name__,static_folder="./../../TowerOfZanas - Web Version")

@app.route('/TowerOfZanas - Web Version/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

@app.route('/tower', methods=['GET'])
def html():
    return send_from_directory('', 'tower.html')

@app.route('/battle', methods=['POST','GET'])
def battle_route():
    return battle.connect_test()




if __name__ =='__main__':
    app.run()
    
    
