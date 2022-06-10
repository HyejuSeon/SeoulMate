import os
import shutil
from dotenv import load_dotenv
from tqdm import tqdm
# 50개
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
    path = os.environ['DATASET']
    NOT_LANDMARKS = load_not_landmarks(os.environ['FILENAME'])
    
    dirnames = os.listdir(path)
    dlt_dirnames = list(filter(is_not_landmark, dirnames))
    for dlt_dirname in tqdm(dlt_dirnames):
        dir_path = path + dlt_dirname
        if os.path.exists(dir_path):
            shutil.rmtree(dir_path)
    print(len(os.listdir(path)))

def none_anno():
    img_path = os.environ['IMGS']
    label_path = os.environ['LABELS']
    label_set = set()
    for dir in os.listdir(label_path):
        label_set.update([label[:-5] for label in os.listdir(label_path + dir)])
    
    for dir in os.listdir(img_path):
        for img in os.listdir(img_path + dir):
            if img[:-4] not in label_set:
                os.remove(f'{img_path}{dir}/{img}')

if __name__ == '__main__':
    main()
    none_anno()
