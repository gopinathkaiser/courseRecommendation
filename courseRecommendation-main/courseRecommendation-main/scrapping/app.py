# 

from flask import Flask, jsonify
from bs4 import BeautifulSoup
from itertools import islice
import datetime
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins="*")


def get_entries():
    current_year = datetime.datetime.now().year
    url = f"https://www.topuniversities.com/sites/default/files/qs-rankings-data/en/3740566_indicators.txt?1637817445?v={current_year}"

    headers = {
        "user-agent": "Mozilla/5.0",
        "x-requested-with": "XMLHttpRequest"
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    def make_pretty(entry):
        return {
            "name": BeautifulSoup(entry["uni"], "html.parser").select_one(".uni-link").get_text(strip=True),
            "rank": entry["overall_rank"],
            "reputation": BeautifulSoup(entry["ind_76"], "html.parser").select_one(".td-wrap-in").get_text(strip=True),
            "website" :  "https://www.topuniversities.com/" + BeautifulSoup(entry["uni"], "html.parser").select_one(".uni-link")['href'].replace(' ', '-'),
        }

    yield from map(make_pretty, response.json()["data"])

@app.route('/api/universities')
def universities():
    entries = get_entries()
    return jsonify([entry for entry in entries])

if __name__ == '__main__':
    app.run(debug=True,port=5000)
