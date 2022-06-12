import os
from selenium import webdriver
from dotenv import load_dotenv
import pandas as pd
import time
from tqdm import tqdm
from bs4 import BeautifulSoup as bs
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

load_dotenv(dotenv_path=os.getcwd() + '\\ai\\.env')
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(os.environ['CHROMEDRIVER'], options=options)

path = os.environ['DATASET_PATH']
dirs = os.listdir(path)
data = []
for dir in dirs:
    if '원천' not in dir:
        continue
    names = os.listdir(path + dir)
    for name in tqdm(names):
        row = [name]
        # print(name)
        query = name.replace('_', ' ')
        url = f'https://terms.naver.com/search.naver?query={query}&searchType=&dicType=&subject='
        driver.get(url)
        time.sleep(1)
        html = driver.page_source
        soup = bs(html, 'html.parser')
        # click 
        try:
            driver.find_element(by=By.XPATH, value='//*[@id="content"]/div[3]/ul/li[1]/div[2]/div[1]/strong/a').click()
        except selenium.common.exceptions.NoSuchElementException:
            try:
                driver.find_element(by=By.XPATH, value='//*[@id="content"]/div[2]/ul/li[1]/div[2]/div[1]/strong/a').click()
            except selenium.common.exceptions.NoSuchElementException:
                # print('=' * 100)
                # print(name)
                # print('=' * 100)
                row.append(None)
                data.append(row)
                continue
        time.sleep(1)
        html = driver.page_source
        soup = bs(html, 'html.parser')
        time.sleep(1)
        paragraphs = soup.select('div#size_ct > p')
        description = [p.text for p in paragraphs]
        row.append(' '.join(description))
        data.append(row)

driver.close()
df = pd.DataFrame(data, columns=['name', 'description'])
df.to_excel('ai/description.xlsx', index=False)