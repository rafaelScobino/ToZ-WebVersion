import json
from battle import dice_roll


def life_enemy(t_level):
    e_str = dice_roll(1,10);
    e_skl = 10 - e_str;
    e_mgk = 1      
    e_life = 15 + ((t_level + dice_roll(1,5)) * 5)
    return (e_life,e_str,e_skl,e_mgk)
    
def str_enemy(t_level):
    e_str = dice_roll(7 + (t_level),(10 + (t_level * 2)));
    e_skl = 10 + (t_level * 2) - e_str;
    e_mgk = 1
    e_life = 25 + (t_level * 3)
    return (e_life,e_str,e_skl,e_mgk)

def skl_enemy(t_level):
    e_skl = dice_roll(7 + (t_level),(10 + (t_level * 2)));
    e_str = 10 + (t_level * 2) - e_skl;
    e_mgk = 1
    e_life = 25 + (t_level * 3)
    return (e_life,e_str,e_skl,e_mgk)

def mgk_enemy(t_level):
    e_str = dice_roll(1,10);
    e_skl = 10 - e_str;
    e_mgk = 1 + dice_roll(1,t_level)     
    e_life = 25 + (t_level / 2)
    return (e_life,e_str,e_skl,e_mgk)


def new_enemy(t_level):
    rnd_choice = dice_roll(1,4)
    enemy = 0
    if(rnd_choice == 1 ):
        enemy =  life_enemy(t_level)
    elif(rnd_choice == 2):
        enemy = str_enemy(t_level)
    elif(rnd_choice == 3):
        enemy = skl_enemy(t_level)
    else:
        enemy = mgk_enemy(t_level)
    return enemy
    


def enemy_request(t_level):
    result = new_enemy(t_level)

    response_json = {
        'e_life':result[0],
        'e_str':result[1],
        'e_skl':result[2],
        'e_mgk':result[3]
    }
    
    json.dumps(response_json)
    
    return response_json
     
print("New Enemy")
print(new_enemy(10))