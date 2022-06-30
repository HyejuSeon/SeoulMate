import torch
from flask import Flask, request
import pickle
from PIL import Image
import urllib
from io import BytesIO

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

def predict(img):
    img = Image.open(BytesIO(img))
    imgs = [img]
    results = model(imgs, size=640)
    return results

model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

@app.route('/', methods=['POST'])
def inference():
    if request.method == 'POST':
        url = request.json['url']
        img = urllib.request.urlopen(url).read()

        predicted = predict(img)

        # num to kor 
        with open('num_to_ko.pkl', 'rb') as f:
            num2ko = pickle.load(f)
        result = num2ko[int(predicted.pandas().xyxy[0]['class'])]

        json = {
            'result': result
        }
        return json

if __name__ == '__main__':
    app.run(port='5002', debug=True)
