from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS
from datetime import datetime,timedelta
import calendar

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json

    goal = float(data["goal"])
    frequency = data["frequency"]
    start_day = data["start_day"]

    start_date = datetime.strptime(start_day, "%Y-%m-%d")

    if frequency == "daily":
        periods = 30
        step_days = 1
    elif frequency == "weekly":
        periods = 12
        step_days = 7
    else:
        periods = 6
        step_days = 30

    saving_per_period = round(goal / periods, 2)
    finish_date = start_date + timedelta(days=periods * step_days)
    total_days = (finish_date - start_date).days + 1 
    
    day_name = start_date.strftime("%A")
    weekday_index = start_date.weekday() 
    days_left_in_week = 6 - weekday_index

    year = start_date.year
    month = start_date.month
    day = start_date.day

    total_days_in_month = calendar.monthrange(year, month)[1]
    days_left_in_month = total_days_in_month - day

    return jsonify({
        "saving_amount": saving_per_period,
        "frequency": frequency,
        "estimated_finish": finish_date.strftime("%a, %d %b %Y"),
        "total_days": total_days,
        
        "start_day_name": day_name,
        "finish_date": finish_date,
        "days_left_in_week": days_left_in_week,
        "days_left_in_month": days_left_in_month
    })

app.run(debug=True)
