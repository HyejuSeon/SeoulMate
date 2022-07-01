import os
import pandas as pd
from dotenv import load_dotenv
from matplotlib import pyplot as plt
from matplotlib import rc, font_manager
f_path = "C:/windows/Fonts/malgun.ttf"
font_manager.FontProperties(fname=f_path).get_name()
rc('font', family='Malgun Gothic')

# Excel
load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
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
plt.figure(figsize=(20, 10))
plt.bar(df['name'], df['img_num'])
plt.title('랜드마크 별 프레임 개수')
plt.xticks(rotation=90, fontsize=6)
plt.savefig('ai/imgs/frame_num_per_landmark.png')
# plt.show()
