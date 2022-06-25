from importlib.resources import path
import os
from dotenv import load_dotenv
from tqdm import tqdm
import cv2
import numpy as np
import json
import pickle
from glob import glob
from collections import defaultdict
import pandas as pd
import shutil
from sklearn.model_selection import StratifiedKFold

NUM_FOLDS = 5
def wrong_annotation(items):
    '''
    wrong annotation 제거 후 해당 클래스의 이미지 개수 확인
    '''
    img_path = os.environ['IMGS']
    for classname, dlt_num in items:
        num_imgs = len(os.listdir(img_path + classname)) - dlt_num
        print(classname, num_imgs)     

def annotation():
    load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
    path = os.environ['LABELS']
    dirs = os.listdir(path)
    ko_to_num = dict()
    num_to_ko = dict()
    wrong = defaultdict(int)
    dlt = []
    for i, dir in enumerate(tqdm(dirs)):
        num_to_ko[i] = dir
        ko_to_num[dir] = i
        labels = os.listdir(path + dir)
        for label in labels:
            with open(f'{path}{dir}/{label}', "r", encoding='utf-8') as jsonfile:
                anno = json.load(jsonfile)
            shape = (anno['images'][0]['width'], anno['images'][0]['height'])
            filename = anno['images'][0]['file_name']
            name = anno['categories'][0]['name']
            bbox = anno['annotations'][0]['bbox']
            lt = (bbox[0], bbox[1])
            rb = (bbox[2], bbox[3])
            x, y = (lt[0] + rb[0]) / 2 / shape[0], (lt[1] + rb[1]) / 2 / shape[1]
            w, h = (rb[0] - lt[0]) / shape[0], (rb[1] - lt[1]) / shape[1]
            # wrong annotation 확인
            if x > 1 or y > 1 or w > 1 or h > 1:
                wrong[dir] += 1
                dlt.append(filename + '\n')
                continue

            with open(f'./ai/data/labels/{filename[:-4]}.txt', 'w') as f:
                f.write(f'{ko_to_num[name]} {x} {y} {w} {h}')

    # wrong annotaion 확인
    # wrong_annotation(wrong.items())

    with open('ai/data/dlt_files.txt', 'w', encoding='utf-8') as f:
        f.writelines(dlt)
    with open('ai/data/ko_to_num.pkl', 'wb') as fw:
        pickle.dump(ko_to_num, fw)
    with open('ai/data/num_to_ko.pkl', 'wb') as fw:
        pickle.dump(num_to_ko, fw)

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

def dlt_labels():
    img_path = os.environ['DEST_IMGS']
    label_path = os.environ['DEST_LABELS']
    # imgs = [img.split('.')[0] for img in os.listdir(img_path)]
    # labels = [label.split('.')[0] for label in os.listdir(label_path)]
    imgs = [img[:-4] for img in os.listdir(img_path)]
    labels = [label[:-4] for label in os.listdir(label_path)]
    dlts = set(labels) - set(imgs)
    for dlt in list(dlts):
        try:
            os.remove(label_path + dlt + '.txt')
        except FileNotFoundError:
            os.remove(label_path + dlt + '..txt')
    print(len(os.listdir(img_path)))
    print(len(os.listdir(label_path)))

def cross_valid(num_fold):
    df = pd.DataFrame(columns=['filename', 'class', 'path', 'fold'])
    img_path = os.environ['DEST_IMGS']
    label_path = os.environ['DEST_LABELS']
    imgs = os.listdir(img_path)
    filenames = []
    classes = []
    paths = []
    for img in tqdm(imgs):
        filenames.append(img)
        with open(f'{label_path}{img[:-4]}.txt', 'r') as f:
            class_ = f.readline().split()[0]
            classes.append(class_)
        paths.append(img_path + img)
    df['filename'] = filenames
    df['class'] = classes
    df['path'] = paths

    Fold = StratifiedKFold(n_splits=num_fold, shuffle=True, random_state=112)
    for n, (train_index, val_index) in enumerate(Fold.split(df, df['class'])):
        df.loc[val_index, 'fold'] = int(n)
    df['fold'] = df['fold'].astype(int)

    df.to_excel(f'ai/data/df_{num_fold}-fold.xlsx', index=False)

def folds(num_fold):
    df = pd.read_excel(f'ai/data/df_{num_fold}-fold.xlsx')
    # Remove existing dirs
    for fold in range(num_fold):
        # Prepare train and valid df
        train_df = df.loc[df.fold != fold].reset_index(drop=True)
        valid_df = df.loc[df.fold == fold].reset_index(drop=True)
        
        try:
            shutil.rmtree(f'ai/data/dataset_folds_{fold}/images')
            shutil.rmtree(f'ai/data/dataset_folds_{fold}/labels')
        except:
            print('No dirs')

        # Make new dirs
        os.makedirs(f'ai/data/dataset_folds_{fold}/images/train', exist_ok=True)
        os.makedirs(f'ai/data/dataset_folds_{fold}/images/valid', exist_ok=True)
        os.makedirs(f'ai/data/dataset_folds_{fold}/labels/train', exist_ok=True)
        os.makedirs(f'ai/data/dataset_folds_{fold}/labels/valid', exist_ok=True)

        # Move the images to relevant split folder.
        for i in tqdm(range(len(train_df))):
            row = train_df.loc[i]
            try:
                shutil.copyfile(row.path, f'ai/data/dataset_folds_{fold}/images/train/{row.filename}')
                shutil.copyfile(row.path.replace('images', 'labels')[:-3] + 'txt', f'ai/data/dataset_folds_{fold}/labels/train/{row.filename[:-3]}txt')
            except FileNotFoundError:
                print(f'{row.filename[:-3]}txt')

        for i in tqdm(range(len(valid_df))):
            row = valid_df.loc[i]
            try:
                shutil.copyfile(row.path, f'ai/data/dataset_folds_{fold}/images/valid/{row.filename}')
                shutil.copyfile(row.path.replace('images', 'labels')[:-3] + 'txt', f'ai/data/dataset_folds_{fold}/labels/valid/{row.filename[:-3]}txt')
            except FileNotFoundError:
                print(f'{row.filename[:-3]}txt')

def union_labels():
    path = os.environ['LABELS']
    labels = os.listdir(path)       
    convert = {'74': '58', '21':'16', '72':'37'}
    keys = convert.keys()
    for label in tqdm(labels):
        with open(path + label, 'r') as f:
            anno = f.readline().split()
        class_ = anno[0]
        if class_ in keys:            
            anno[0] = convert[class_]
            with open(path + label, 'w') as f:
                f.write(' '.join(anno))

def reduce_classes():
    img_path = os.environ['IMGS']
    label_path = os.environ['LABELS']
    img_dest = os.environ['DLT_IMGS']
    label_dest = os.environ['DLT_LABELS']
    imgs = os.listdir(img_path)
    dlts = {'은행나무', '범우관', '재일학도', '포병위령', '국회의정관', '국회헌정기념관', '김옥길', '김수영', '근현대사', '돌담길', '망원정지', '몽촌토성', '문화비축기지', '보현정사', '한양도성', '손기정', '윤동주', '전태일', '청계천', '코엑스'}
    
    for img in tqdm(imgs):
        for dlt in dlts:
            if dlt in img:
                shutil.move(img_path + img, img_dest)
                label = img[:-3] + 'txt'
                shutil.move(label_path + label, label_dest)
                break

def get_class():
    path = os.environ['LABELS']
    labels = os.listdir(path)
    classes = set()
    for label in tqdm(labels):
        with open(path + label, 'r') as f:
            anno = f.readline().split()
        class_ = int(anno[0])
        classes.add(class_)
    print(len(classes))
    print(list(classes))

def main():
    load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
    annotation()
    rm_imgs_without_anno('train')
    dump_pkl()
    dlt_labels()
    cross_valid(NUM_FOLDS)
    folds(NUM_FOLDS)
    union_labels()
    reduce_classes()
    get_class()

if __name__ == '__main__':
    main()
