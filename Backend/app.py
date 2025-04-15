import pandas as pd
import random
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)
# Function to load responses from CSV
def load_responses():
    df = pd.read_csv('responses.csv')
    responses = {}
    for category in df['Category'].unique():
        responses[category] = df[df['Category'] == category]['Response'].tolist()
    return responses

# Function to generate insights
def generate_insights(df, responses):
    def convert_year_to_full_date(date_str):
        try:
            return pd.to_datetime(date_str)
        except:
            return pd.to_datetime(f"{date_str}-01-01")
    
    df["Date"] = df["Date"].apply(convert_year_to_full_date)
    df = df.sort_values("Date").reset_index(drop=True)

    min_row = df.loc[df["Value"].idxmin()]
    max_row = df.loc[df["Value"].idxmax()]
    start_row = df.iloc[0]
    end_row = df.iloc[-1]

    df["Delta"] = df["Value"].diff()
    max_delta_idx = df["Delta"].idxmax()
    min_delta_idx = df["Delta"].idxmin()

    if max_delta_idx > 0:
        max_increase_start = df.loc[max_delta_idx - 1]
        max_increase_end = df.loc[max_delta_idx]
    else:
        max_increase_start = max_increase_end = None

    if min_delta_idx > 0:
        max_decrease_start = df.loc[min_delta_idx - 1]
        max_decrease_end = df.loc[min_delta_idx]
    else:
        max_decrease_start = max_decrease_end = None

    insights = []

    # Randomly select responses for each category
    insights.append(random.choice(responses['Lowest Value']).format(date=min_row['Date'].date().year, value=min_row['Value']))
    insights.append(random.choice(responses['Highest Value']).format(date=max_row['Date'].date().year, value=max_row['Value']))
    
    if max_increase_start is not None:
        insights.append(random.choice(responses['Significant Increase']).format(
            start_date=max_increase_start['Date'].date().year,
            end_date=max_increase_end['Date'].date().year,
            start_value=max_increase_start['Value'],
            end_value=max_increase_end['Value']
        ))
    
    if max_decrease_start is not None:
        insights.append(random.choice(responses['Significant Decrease']).format(
            start_date=max_decrease_start['Date'].date().year,
            end_date=max_decrease_end['Date'].date().year,
            start_value=max_decrease_start['Value'],
            end_value=max_decrease_end['Value']
        ))
    
    trend = "upward" if end_row["Value"] > start_row["Value"] else "downward"
    insights.append(random.choice(responses['Overall Trend']).format(
        trend=trend,
        start_date=start_row['Date'].date().year,
        start_value=start_row['Value'],
        end_date=end_row['Date'].date().year,
        end_value=end_row['Value']
    ))

    return insights

# Endpoint to generate insights
@app.route('/generate-insights', methods=['POST'])
def generate_insights_api():
    try:
        data = request.get_json()
        df = pd.DataFrame(data)
        
        responses = load_responses()  # Load the responses from the CSV
        insights = generate_insights(df, responses)
        
        return jsonify({"insights": insights}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
