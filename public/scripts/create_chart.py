# This script generates a time series "financial" line chart with random data
# and applies a subtle rotation/skew to give it a stock-image aesthetic.

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.transforms as transforms
from datetime import datetime, timedelta

# ---- Configuration ----
np.random.seed(42)
num_points = 120
rotation_degrees = -15  # change this for different angles (e.g. -5 to 5)

# ---- Generate fake time series data ----
start_date = datetime(2023, 1, 1)
dates = [start_date + timedelta(days=i) for i in range(num_points)]

profit = 10 + np.cumsum(np.random.normal(0.2, 1.5, num_points))
revenue = profit + np.cumsum(np.random.normal(0.2, 1.5, num_points))

# ---- Plot ----
fig, ax = plt.subplots(figsize=(10, 6))


ax.plot(dates, profit, label="Profit")
ax.plot(dates, revenue, label="Revenue")
ax.set_title("Financials YTD", fontsize=20)
ax.set_xlabel("Date", fontsize=20)
ax.set_ylabel("GBP (£m)", fontsize=20)

ax.legend(fontsize=12, loc='upper left')
ax.grid(True, alpha=0.3)

# ---- Final layout ----
fig.autofmt_xdate()
plt.tight_layout(pad=3.0)

# ---- Save image ----
output_path = "../images/financial_timeseries_stock_image.png"
plt.savefig(output_path, dpi=300, bbox_inches='tight', pad_inches=0.5)
plt.close()

output_path
