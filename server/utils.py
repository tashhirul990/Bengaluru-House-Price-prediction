import json
import pickle
import sklearn
import numpy as np
__locations =None
__model = None
__data_columns = None

def get_locations():
    return __locations

def get_data_columns():
    return __data_columns

def get_model():
    return __model

def load_artifacts():
    global __locations
    global __data_columns
    global __model

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']

    __locations = __data_columns[3:]

    with open("./artifacts/banglore_home_price_model.pickle", "rb") as f:
        __model = pickle.load(f)

def get_estimated_price(location, sqft, bath, bhk ):

    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1]=bath
    x[2]=bhk

    if loc_index != -1:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 3)



if __name__ == "__main__":
    print("loading artifacts......")
    load_artifacts()
    print("artifacts loaded successfully")
    print(get_estimated_price("1st block jayanagar", 1000, 2, 2))



