import json
import os
import shutil
import config


# Define constants
BASE_FILE = "base.json"
JSONS_FOLDER = os.path.join(os.getcwd(), "..", "build", "jsons")


# Remove existing JSONs folder (if any) and create an empty one
if os.path.exists(JSONS_FOLDER):
    shutil.rmtree(JSONS_FOLDER)
os.mkdir(JSONS_FOLDER)


# Load base data from file and update with fields from config
with open(BASE_FILE) as f:
    base_data = json.load(f)
    for field, value in config.field.items():
        base_data[field] = value
        print(f"Added {field}")


# Serialize base data to JSON and write to file
base_data_string = json.dumps(base_data)
with open(BASE_FILE, "w") as f:
    f.write(base_data_string)


# Create duplicate JSON files
count = config.number_of_duplicates
for i in range(1, count+1):
    file_path = os.path.join(JSONS_FOLDER, f"{i}.json")
    with open(file_path, "w") as f:
        f.write(base_data_string.replace("***", f"{i}"))
    print(f"Created {i}.json")

print(f"Duplicated base data {count} times")
