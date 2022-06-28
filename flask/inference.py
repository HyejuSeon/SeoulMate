import torch
from flask import Flask, request
import pickle
from PIL import Image
from urllib import request
from io import BytesIO

app = Flask(__name__)

def predict(img):
    img = Image.open(BytesIO(img))
    imgs = [img]
    results = model(imgs, size=640)
    return results

model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

@app.route('/', methods=['POST'])
def inference():
    if request.method == 'POST':
        file = request.files['file']
        file = request.urlopen(file).read()

        predicted = predict(file)

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
