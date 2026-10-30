import urllib.request
import json

def test_soil(desc, ph, n, p, k, rain, moisture):
    crops = ['Chickpea', 'Maize', 'Rice', 'Cotton', 'Soybean', 'Wheat', 'Bajra']
    payload = [{'crop': c, 'ph': ph, 'n': n, 'p': p, 'k': k, 'rain_sum': rain, 'moisture': moisture} for c in crops]
    req = urllib.request.Request(
        'http://127.0.0.1:5000/api/ml/predict',
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode('utf-8'))
    details = sorted(data['details'], key=lambda x: x['yield_q_per_ha'], reverse=True)
    print(f"=== {desc} (pH {ph}) ===")
    for idx, d in enumerate(details):
        print(f"  #{idx+1} {d['crop']:<10}: {d['yield_q_per_ha']:>5.2f} q/ha ({d['yield_q_per_acre']:>5.2f} q/acre) | {d['ph_note']}")
    print()

if __name__ == '__main__':
    test_soil("Extremely Acidic Soil", 4.2, 80, 40, 40, 200, 26)
    test_soil("Balanced Neutral Soil", 7.2, 95, 45, 42, 190, 24)
    test_soil("Extremely Alkaline Soil", 8.8, 90, 40, 40, 150, 20)
    test_soil("Highly Sodic / Sodic Land", 9.5, 70, 30, 35, 120, 18)
