import json, random
from flask import jsonify

def dice_roll(x,y):
    dice = random.randint(x,y)
    print(dice)
    return dice

def e_next_roll_type(e_str,e_skl,e_mgk):
    roll_type = ''
    next_roll_dice = dice_roll(1,10)    
    if(e_str > e_skl):
        if(next_roll_dice >= 7):
            roll_type = 'STRENGTH'
        else:
            roll_type = 'SKILL'
            
    elif(e_skl > e_str): 
        if(next_roll_dice >=7 ):
            roll_type = 'SKILL'
        else:
            roll_type = 'STRENGTH'
            
    else:
        if(next_roll_dice >= 5):
            roll_type = 'SKILL'
        else:
            roll_type = 'STRENGTH'
    return roll_type


#opt 1 -> str x str | opt 2 -> str x skl | opt 3 -> str x mgk
def str_action(opt,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk):
    print('str works')
    h_roll = dice_roll(1,10)
    e_roll = dice_roll(1,10)
    h_str = h_str + h_roll
    e_mgk = 10 + e_skl + e_str
    e_str = e_str + e_roll
    e_skl = e_skl + e_roll
    damage_value = 0
    loser = ''
    
    if(opt == 1):
        if(h_str > e_str):
            damage_value = h_str - e_str
            loser = 'e'
        elif(h_str < e_str):
            damage_value = e_str - h_str
            loser = 'h'
            
    elif(opt == 2):
        if(h_str > e_skl):
            damage_value = 10
            loser = 'e'
        elif(h_str < e_skl):
            damage_value = 10
            loser = 'h'
            
    elif(opt == 3):
        if(h_str > e_mgk):
            damage_value = 15
            loser = 'e'
        elif(h_str < e_mgk):
            damage_value = 15
            loser = 'h'
            
    else:
        damage_value = 0
        loser = 'b'    
    
    return loser , damage_value, h_roll, e_roll

#opt 1 -> skl x skl | opt 2 -> skl x str | opt 3 -> skl x mgk
def skl_action(opt,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk):
    print('skl works')
    h_roll = dice_roll(1,10)
    e_roll = dice_roll(1,10)
    h_skl = h_skl + h_roll
    e_mgk = 10 + e_skl + e_str
    e_str = e_str + e_roll
    e_skl = e_skl + e_roll
    damage_value = 0
    loser = ''
        
    if(opt == 1):
        if(h_skl > e_skl):
            damage_value = h_skl - e_skl
            loser = 'e'
        elif(h_skl < e_skl):
            damage_value = e_skl - h_skl
            loser = 'h'
            
    elif(opt == 2):
        if(h_skl > e_str):
            damage_value = 10
            loser = 'e'
        elif(h_str < e_str):
            damage_value = 10
            loser = 'h'
            
    elif(opt == 3):
        if(h_skl > e_mgk):
            damage_value = 15
            loser = 'e'
        elif(h_skl < e_mgk):
            damage_value = 15
            loser = 'h'
            
    else:
        damage_value = 0
        loser = 'b'    
    
    return loser , damage_value,h_roll,e_roll

#opt 1 -> mgk x mgk | opt 2 -> mgk x str | opt 3 -> mgk x skl
def mgk_action(opt,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk):
    print('mgk works')
    h_roll = dice_roll(1,10)
    e_roll = dice_roll(1,10)
    h_mgk = 10 + h_skl + h_str
    e_mgk = 10 + e_skl + e_str
    e_str = e_str + e_roll
    e_skl = e_skl + e_roll
    damage_value = 0
    loser = ''
        
    if(opt == 1):
        if(h_mgk > e_mgk):
            damage_value = h_mgk - e_mgk
            loser = 'e'
        elif(h_mgk < e_mgk):
            damage_value = e_mgk - h_mgk
            loser = 'h'
            
    elif(opt == 2):
        if(h_mgk > e_str):
            damage_value = 15
            loser = 'e'
        elif(h_mgk < e_str):
            damage_value = 15
            loser = 'h'
            
    elif(opt == 3):
        if(h_mgk > e_skl):
            damage_value = 15
            loser = 'e'
        elif(h_skl < e_skl):
            damage_value = 15
            loser = 'h'
            
    else:
        damage_value = 0
        loser = 'b'    
    

    return loser , damage_value,h_roll,e_roll

def heal_action(opt,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk):

    return "works"


def battle_response(action,h_life,h_str,h_skl,h_mgk,e_life,e_str,e_skl,e_mgk,e_next_roll,turn,t_level):
    print('br works')
    result = ('',0)
    next_roll = e_next_roll_type(e_str,e_skl,e_mgk)

    if(action == 0 ):
        if(e_next_roll == 'STRENGTH'):
           result =  str_action(1,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
        elif(e_next_roll == 'SKILL'):
           result =  str_action(2,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
        else:
           result =  str_action(3,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
    
    elif(action == 1):
        if(e_next_roll == 'SKILL'):
           result =  skl_action(1,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
        elif(e_next_roll == 'STRENGTH'):
           result =  skl_action(2,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
        else:
           result =  skl_action(3,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
            
    elif(action == 2):
        if(e_next_roll == 'MAGICKA'):
           result =  mgk_action(1,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
        elif(e_next_roll == 'STRENGTH'):
           result =  mgk_action(2,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
        else:
           result =  mgk_action(3,h_str,h_skl,h_mgk,e_str,e_skl,e_mgk)
    else:
        result = ("",0)
    
    result_tuple= (result[0],result[1],next_roll)
    return result_tuple

def request_handler(action,h_life,h_str,h_skl,h_mgk,e_life,e_str,e_skl,e_mgk,e_next_roll,turn,t_level):

    result =  battle_response(action,h_life,h_str,h_skl,h_mgk,e_life,e_str,e_skl,e_mgk,e_next_roll,turn,t_level)

    response_json = {
        
        'loser': result[0],
        'damageValue': result[1],
        'nextRoll': result[2]
    }

    json_string = json.dumps(response_json)
                       

    return response_json  


request_handler(2,20,20,20,20,10,10,10,10,"SKILL",1,1)