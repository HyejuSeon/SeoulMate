import os
import pandas as pd
from tqdm import tqdm
import json
from collections import defaultdict
import pickle
from dotenv import load_dotenv
from matplotlib import pyplot as plt
from matplotlib import rc, font_manager
f_path = "C:/windows/Fonts/malgun.ttf"
font_manager.FontProperties(fname=f_path).get_name()
rc('font', family='Malgun Gothic')

def dump_pkl(obj, filename):
    with open(filename, 'wb') as fw:
        pickle.dump(obj, fw)

def load_pkl(filename):
    with open(filename, 'rb') as fr:
        return pickle.load(fr)

def bar_plot(x, y, filename, title='', fontsize=10):
    plt.figure(figsize=(20, 10))
    plt.bar(x, y)
    plt.title(title)
    plt.xticks(rotation=90, fontsize=fontsize)
    plt.savefig(filename)

def cnt_img():
    # Excel
    path = os.environ['DATASET_PATH']
    dirs = os.listdir(path)
    data = []
    for dir in dirs:
        landmarks = os.listdir(path + dir)
        data.append([dir, len(landmarks)])
    df = pd.DataFrame(data, columns=['name', 'img_num'])
    df.to_excel('ai/eda.xlsx', index=False)
    df = pd.read_excel('ai/eda.xlsx')
    img_num = df['img_num']

    # 최소, 최대, 평균값
    print(min(img_num), max(img_num), img_num.mean())
    df = df.sort_values('img_num')
    bar_plot(df['name'], df['img_num'], 'ai/imgs/frame_num_per_landmark.png', '랜드마크 별 프레임 개수', 6)

def category():
    path = os.environ['LABELS']
    dirs = os.listdir(path)
    locations = defaultdict(set)
    supercategories = defaultdict(set)
    subcategories = defaultdict(set)
    for dir in tqdm(dirs):
        label = os.listdir(path + dir)[0]
        with open(f'{path}{dir}/{label}', "r", encoding='utf-8') as jsonfile:
            anno = json.load(jsonfile)
        category = anno['categories'][0]['metainfo']
        location = category['location2']
        supercategory = category['Type1']
        subcategory = category['Type2']
        locations[location].add(dir)
        supercategories[supercategory].add(dir)
        subcategories[subcategory].add(dir)

    dump_pkl(locations, 'ai/data/locations.pkl')
    dump_pkl(supercategories, 'ai/data/supercategories.pkl')
    dump_pkl(subcategories, 'ai/data/subcategories.pkl')

def draw_category(dict, filename, title='', fontsize=10):
    category, classes = zip(*dict.items())
    classes = [len(c) for c in classes]
    # 최소, 최대, 평균값
    print(min(classes), max(classes), sum(classes) / len(classes))
    bar_plot(category, classes, filename, title, fontsize)

def cnt_category():
    locations = load_pkl('ai/data/locations.pkl')
    supercategories = load_pkl('ai/data/supercategories.pkl')
    subcategories = load_pkl('ai/data/subcategories.pkl')
    print('location')
    draw_category(locations, 'ai/imgs/class_num_per_location.png', '장소 별 클래스 개수', 12)
    print('supercategory')
    draw_category(supercategories, 'ai/imgs/class_num_per_supercategory.png', 'supercategory 별 클래스 개수', 12)
    print('subcategory')
    draw_category(subcategories, 'ai/imgs/class_num_per_subcategory.png', 'subcategory 별 클래스 개수', 12)

def main():
    load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
    cnt_img()
    category()
    cnt_category()

if __name__ == '__main__':
    main()