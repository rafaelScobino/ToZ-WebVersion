import json
from battle import dice_roll


def life_enemy(t_level):
    e_life,e_str,e_skl,e_mgk = 0;
    e_str = dice_roll(1,10);
    e_skl = 10 - e_str;
    e_mgk = 1      
    e_life = 25 + (e_mgk -  t_level * 10)
    return (e_life,e_str,e_skl,e_mgk)
    
def str_enemy(t_level):
    e_life,e_str,e_skl,e_mgk = 0;
    e_str = dice_roll(7 + (t_level),(10 + (t_level * 2)));
    e_skl = 10 + (t_level * 2) - e_str;
    e_mgk = 1
    e_life = 25 + (t_level * 3)
    return (e_life,e_str,e_skl,e_mgk)

def skl_enemy(t_level):
    e_life,e_str,e_skl,e_mgk = 0;
    e_skl = dice_roll(7 + (t_level),(10 + (t_level * 2)));
    e_str = 10 + (t_level * 2) - e_skl;
    e_mgk = 1
    e_life = 25 + (t_level * 3)
    return (e_life,e_str,e_skl,e_mgk)

def mgk_enemy(t_level):
    e_life,e_str,e_skl,e_mgk = 0;
    e_str = dice_roll(1,10);
    e_skl = 10 - e_str;
    e_mgk = 1 + dice_roll(1,t_level)     
    e_life = 25 + (((e_mgk - 1) - t_level) * 10)
    return (e_life,e_str,e_skl,e_mgk)



def new_enemy(t_level):
    e_life,e_str,e_skl,e_mgk = 0;
    
     