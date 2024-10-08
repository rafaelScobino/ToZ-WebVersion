import json, random
from flask import jsonify

def dice_roll(x,y):
    dice = random.randint(x,y)
    print("Dice Result: " + str(dice))
    return dice

def e_next_roll_type(e_life,e_str,e_skl,e_mgk):
    roll_type = ''
    next_roll_dice = dice_roll(1,10)
    mgk_bool = mgk_chance(e_life,e_mgk)
    mgk_choice_bool = mgk_use_choice(e_life,e_mgk)
    
    if(mgk_bool):
        if(mgk_choice_bool):
            roll_type = 'HEAL'
        else:
            roll_type = 'MAGICKA'
    else:
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
def str_action(opt,h_str_o,h_skl_o,h_mgk_o,e_str_o,e_skl_o,e_mgk_o):
    #print('str works')
    h_roll = dice_roll(1,10)
    e_roll = dice_roll(1,10)
    h_str = h_str_o + h_roll
    e_mgk = 10 + e_skl_o + e_str_o
    e_str = e_str_o + e_roll
    e_skl = e_skl_o + e_roll
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
        e_roll = 'm'
        if(h_str > e_mgk):
            damage_value = h_str - e_mgk
            loser = 'e'
        elif(h_str < e_mgk):
            damage_value = e_mgk - h_str
            loser = 'h'
            
    else:
        damage_value = 0
        
    if(e_str_o == 0 and e_skl_o == 0):
        e_roll = 'h'
        
    return loser , damage_value, h_roll, e_roll

#opt 1 -> skl x skl | opt 2 -> skl x str | opt 3 -> skl x mgk
def skl_action(opt,h_str_o,h_skl_o,h_mgk_o,e_str_o,e_skl_o,e_mgk_o):
    #print('skl works')
    h_roll = dice_roll(1,10)
    e_roll = dice_roll(1,10)
    h_skl = h_skl_o + h_roll
    e_mgk = 10 + e_skl_o + e_str_o
    e_str = e_str_o + e_roll
    e_skl = e_skl_o + e_roll
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
        elif(h_skl < e_str):
            damage_value = 10
            loser = 'h'
            
    elif(opt == 3):
        e_roll = 'm'
        if(h_skl > e_mgk):
            damage_value = h_skl - e_mgk
            loser = 'e'
        elif(h_skl < e_mgk):
            damage_value = e_mgk - h_skl
            loser = 'h'
            
    else:
        damage_value = 0
    
    if(e_str_o == 0 and e_skl_o == 0):
        e_roll = 'h'
         
    return loser , damage_value,h_roll,e_roll

#opt 1 -> mgk x mgk | opt 2 -> mgk x str | opt 3 -> mgk x skl
def mgk_action(opt,h_str_o,h_skl_o,h_mgk_o,e_str_o,e_skl_o,e_mgk_o):
    #print('mgk works')
    h_roll = dice_roll(1,10)
    e_roll = dice_roll(1,10)
    h_mgk = 10 + h_str_o + h_skl_o
    e_mgk = 10 + e_skl_o + e_str_o
    e_str = e_str_o + e_roll
    e_skl = e_skl_o + e_roll
    damage_value = 0
    loser = ''
        
    if(opt == 1):
        if(h_mgk > e_mgk):
            e_roll = 'm'
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
        elif(h_mgk < e_skl):
            damage_value = 15
            loser = 'h'
            
    else:
        damage_value = 0
        
    if(e_str_o == 0 and e_skl_o == 0):
        e_roll = 'h'
          
    return loser,damage_value,h_roll,e_roll

def heal_action(life,mgk):
    heal_dice = dice_roll(1,10)
    heal_value = 0
    
    if(mgk > 0):
        
        if(life <= 50):
            heal_value = 15 + heal_dice
        elif(life <= 30):
            heal_value = 20 + heal_dice
        elif(life <=20):
            heal_value = 25 + heal_dice
        else:
            heal_value = 10 + heal_dice
    else:
        heal_value = 0
    return heal_value

def mgk_chance(e_life,e_mgk):
    chance_dice = dice_roll(1,10)
    mgk_use = False
    
    if(e_mgk > 0):
        if(e_life <= 50):
            if(chance_dice <= 5):
                mgk_use = True
        if(e_life <= 30):
            if(chance_dice <= 9):
                mgk_use = True
        if(e_life <=20):
            mgk_use = True         
        else:
            if(chance_dice <= 3):
                mgk_use = True
    else:
        mgk_use = False
            
    return mgk_use

def mgk_use_choice(e_life,e_mgk):
    use_chance_dice = dice_roll(1,10)
    heal = False

    if(e_life <= 50):
        if(use_chance_dice <= 5):
            heal = True
    elif(e_life <= 30):
        if(use_chance_dice <= 9):
            heal = True
    elif(e_life <=20):
        heal = True
    else:
        if(use_chance_dice <= 3):
            heal = True
        
    return heal

def game_over(h_life,e_life,turn):
    is_over = False
    
    if(turn >= 30):
        is_over = True
    elif(h_life <= 0 or e_life <= 0):
        is_over = True
    else:
        is_over = False
    
    return is_over


def battle_response(action,h_life,h_str,h_skl,h_mgk,e_life,e_str,e_skl,e_mgk,e_next_roll,turn,t_level):
    #print('br works')
    h_heal_value = 0
    e_heal_value = 0
    result = ("",0,0,0)
    next_roll = e_next_roll_type(e_life,e_str,e_skl,e_mgk)
    over = game_over(h_life,e_life,turn)
    
    
    if not over:
        if(e_next_roll == 'HEAL'):
            if(action == 0 ):
                e_heal_value = heal_action(e_life,e_mgk)
                result =  str_action(1,h_str,h_skl,h_mgk,0,0,e_mgk)
            elif(action == 1):
                e_heal_value = heal_action(e_life,e_mgk)
                result =  skl_action(1,h_str,h_skl,h_mgk,0,0,e_mgk)
            elif(action == 2):
                e_heal_value = heal_action(e_life,e_mgk)
                result =  mgk_action(1,h_str,h_skl,h_mgk,0,0,e_mgk)
            elif(action == 3):
                h_heal_value = heal_action(h_life,h_mgk)
                e_heal_value = heal_action(e_life,e_mgk)
                result = ("",0,0,'h')
                
        else:
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
            
            elif(action == 3):
                h_heal_value = heal_action(h_life,h_mgk)
                if(e_next_roll == 'MAGICKA'):
                    result =  mgk_action(1,0,0,h_mgk,e_str,e_skl,e_mgk)
                elif(e_next_roll == 'STRENGTH'):
                    result =  str_action(1,0,0,h_mgk,e_str,e_skl,e_mgk)
                elif(e_next_roll == 'SKILL'):
                    result =  skl_action(1,0,0,h_mgk,e_str,e_skl,e_mgk)
                else:
                    e_heal_value = heal_action(e_life,e_mgk)
    # oh -> hero life over | oe -> enemy life over | ot -> time out over 
    else:
        if(h_life <= 0):
            result = ('oh',0,0,0)
        elif(e_life <= 0 ):
            result = ('oe',0,0,0)
        else:
            result = ('ot',0,0,0)
        
    result_tuple= (result[0],result[1],result[2],result[3],
                   h_heal_value,e_heal_value,
                   next_roll)
    
    #print(result_tuple)
    return result_tuple

def request_handler(action,h_life,h_str,h_skl,h_mgk,e_life,e_str,e_skl,e_mgk,e_next_roll,turn,t_level):

    result =  battle_response(action,h_life,h_str,h_skl,h_mgk,e_life,e_str,e_skl,e_mgk,e_next_roll,turn,t_level)

    response_json = {
        
        'loser': result[0],
        'damageValue': result[1],
        'hRoll': result[2],
        'eRoll': result[3],
        'hHeal': result[4],
        'eHeal': result[5],
        'nextRoll': result[6]
        
    }

    json.dumps(response_json)
                       

    return response_json  


request_handler(2,20,20,20,20,10,10,10,10,"SKILL",1,1)