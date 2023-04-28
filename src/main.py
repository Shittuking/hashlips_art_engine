from tkinter import Tk, filedialog
import json
import config
import os
import shutil


folder_path = os.path.join(os.getcwd(), "..", "build", "jsons")

shutil.rmtree(folder_path)
os.mkdir(folder_path)


root = Tk()
root.withdraw()
 
root.destroy()

base_file = open("base.json")

base_data = json.loads(base_file.read()) 
 
if len(config.field.keys()) > 0:
    for field, value in config.field.items():
        base_data[field] = value
        print("Added ", field)
        
base_data_string = json.dumps(base_data)
base_file.close()

base_file = open("base.json", 'w')
base_file.write(base_data_string)


count = config.number_of_duplicates

for i in range(1, count+1):
    file_path = os.path.join("..", "build", "jsons", f"{i}.json")
    with open(file_path, "w") as file:
        file.write(base_data_string.replace("***", f"{i}"))
        file.close()
print(f"Duplicated base data {count} times")

base_file.close()