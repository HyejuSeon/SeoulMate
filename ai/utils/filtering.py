import os
import shutil
from dotenv import load_dotenv

NOT_LANDMARKS = {}
def load_not_landmarks(filename):
    res = set()
    for not_landmark in open(filename, 'r', encoding='utf-8'):
        not_landmark = not_landmark.strip()
        res.add(not_landmark)
    return res

def is_not_landmark(name):
    global NOT_LANDMARKS
    for i in NOT_LANDMARKS:
        if i in name:
            return True
    return False

def main():
    global NOT_LANDMARKS
    load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
    print(os.environ['DATASET'])
    print(os.environ['FILENAME'])
    path = os.environ['DATASET']
    dirnames = os.listdir(path)
    NOT_LANDMARKS = load_not_landmarks(os.environ['FILENAME'])
    dlt_dirnames = list(filter(is_not_landmark, dirnames))
    # print('=' * 00)
    # print(set(dirnames) - set(dlt_dirnames))
    print(len(dirnames))
    for dlt_dirname in dlt_dirnames:
        dir_path = path + dlt_dirname
        if os.path.exists(dir_path):
            shutil.rmtree(dir_path)

if __name__ == '__main__':
    main()
