import os
from dotenv import load_dotenv
from tqdm import tqdm
import cv2
import numpy as np
import json
import pickle
from glob import glob

# custom_dataset
# │
# ├── train/
# │   ├── imgs/                    
# │   └── labels/             
# │
# ├── valid/
# │   ├── imgs/                
# │   └── labels/               
# │
# ├── test/
# │   ├── imgs/                    
# │   └── labels/   
# │
# └── data.yaml

def annotation():
    load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
    path = os.environ['LABELS']
    dirs = os.listdir(path)
    ko_to_num = dict()
    num_to_ko = dict()
    for i, dir in enumerate(tqdm(dirs)):
        num_to_ko[i] = dir
        ko_to_num[dir] = i
        labels = os.listdir(path + dir)
        for label in labels:
            with open(f'{path}{dir}/{label}', "r", encoding='utf-8') as jsonfile:
                anno = json.load(jsonfile)
            filename = anno['images'][0]['file_name']
            name = anno['categories'][0]['name']
            bbox = anno['annotations'][0]['bbox']
            lt = (int(bbox[0]), int(bbox[1]))
            rb = (int(bbox[2]), int(bbox[3]))
            x, y = int((lt[0] + rb[0]) // 2), int((lt[1] + rb[1]) // 2)
            w, h = rb[0] - lt[0], rb[1] - lt[1]
            with open(f'./ai/data/labels/{filename[:-5]}.txt', 'w') as file:
                file.write(f'{ko_to_num[name]} {x} {y} {w} {h}')

    with open('ai/data/ko_to_num.pkl', 'wb') as fw:
        pickle.dump(ko_to_num, fw)
    with open('ai/data/num_to_ko.pkl', 'wb') as fw:
        pickle.dump(num_to_ko, fw)
    # print(ko_to_num)
    # print(num_to_ko)

def rm_imgs_without_anno(dataset):
    load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
    path = os.environ['IMGS']
    dirs = os.listdir(path)
    imgs = []
    for dir in tqdm(dirs):
        imgs.extend(glob(path + dir + '\\*.jpg'))
    
    with open(f'./ai/data/{dataset}.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(imgs).replace('\\', '/').replace(path, f'custom_dataset/{dataset}/imgs/') + '\n')

def dump_pkl():
    path = os.environ['IMGS']
    dirs = os.listdir(path)
    X = []
    y = []  
    for dir in tqdm(dirs):
        # cv2.imread 한글 경로 에러
        imgs = [cv2.imdecode(np.fromfile(img.replace('\\', '/'), np.uint8), cv2.IMREAD_COLOR) for img in glob(f'{path}{dir}/*')]
        imgs = [cv2.resize(img, dsize=(224, 224), interpolation=cv2.INTER_AREA) for img in imgs]
        X.extend(imgs)
        y.extend([dir] * len(imgs))

    with open(os.environ['PKL'] + 'X.pkl', 'wb') as fw:
        pickle.dump(X, fw)
    with open(os.environ['PKL'] + 'y.pkl', 'wb') as fw:
        pickle.dump(y, fw)

def main():
    load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
    annotation()
    rm_imgs_without_anno('train')
    dump_pkl()

if __name__ == '__main__':
    main()

