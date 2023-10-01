import os

import js2py

try:
    js2py.translate_file('./static/validator.js', './modules/validator.py')
except:
    print("Validator compilation failed.")
    exit(-1)

print("Validator compiled successfully.")
with open("./modules/validator.py", "a") as f:
    f.write("\n\nCOMPILED_FROM_DATE = '" + str(os.path.getmtime("./static/validator.js")) + "'\n")
