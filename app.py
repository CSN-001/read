# -*- coding:utf-8 -*-
#from gen_transformer.apis.super_model import SuperPredictionModel
from flask import Flask, request
from flask_cors import CORS
from aip import AipSpeech

APP_ID = '20061732'
API_KEY = 'yTZDnkz9055xjPb34IhKfE1g'
SECRET_KEY = 'X5KFAZnypD4SUylY0SHRPaq56kBVXGYS'

a_text = ""      #用于存储打字需要返回的文本
r_text = ""      #用于存储语音需要返回的文本

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/about1', methods=['GET', 'POST'])
def about_music():
    # 传入文字, 返回语音
    data = request.get_json(silent=True)
    trans = predict(data['text'])
    music = voice(trans)
    global a_text
    a_text = trans
    return music

@app.route('/about2', methods=['GET', 'POST'])
def about_text():
    # 另一个api接口，返回文本信息
    return '结果：' + a_text

@app.route('/recorder1', methods=['GET', 'POST'])
def recorder_music():
    # 另一个api接口，返回hello, world
    f = request.files.get('file').stream.read()     #获取文件
    #f.save('test.pcm')              #保存文件，实际生产这条注释掉
    music = to_text(f)
    return music

@app.route('/recorder2', methods=['GET', 'POST'])
def recorder_text():
    # 另一个api接口，返回hello, world
    return '文件传输成功: ' + r_text

def voice(text):
    client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)
    result = client.synthesis(text, 'zh', 1, {
        'vol': 5, 'per': 4
    })
    if not isinstance(result, dict):
        return result

def to_text(file):
    client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)
    result = client.asr(file, 'pcm', 16000, {
        'dev_pid': 1537
    })
    print(result)
    return result

def predict(source):

  params = {
    "model_file": "./data/model_data.tar.gz",
    "model_info": {
      "type": "transformer"
    }
  }
  #model = SuperPredictionModel(params)

  #res, _ = model.predict(source, """{"max_length": 20}""")
  #return res


if __name__ == '__main__':
    app.run(debug=True)
