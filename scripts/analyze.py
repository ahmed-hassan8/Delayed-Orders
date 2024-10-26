import pandas as pd
import sys

def analyze_data(input_path, output_path):
    data = pd.read_csv(input_path)
    delayed_orders = data[data['Status'] == 'Delayed']
    delayed_orders.to_csv(output_path, index=False)

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    analyze_data(input_file, output_file)
