from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Predefined conversion rates
conversion_rates = {
    'USD': 1.00,
    'EUR': 0.91,
    'CAD': 1.38,
    'JPY': 144.18
}


@app.route('/convert', methods=['POST'])
def convert_currency():
    data = request.get_json()

    if not data or 'amounts' not in data or 'currency' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    amounts = data['amounts']
    currency = data['currency']

    if currency not in conversion_rates:
        return jsonify({'error': 'Unsupported currency'}), 400

    rate = conversion_rates[currency]

    # Filter out any invalid amounts (None or not a number)
    valid_amounts = [amount for amount in amounts if isinstance(amount, (int, float))]

    # Ensure JPY has no decimals
    if currency == 'JPY':
        converted_amounts = [round(amount * rate) for amount in valid_amounts]
    else:
        converted_amounts = [round(amount * rate, 2) for amount in valid_amounts]

    return jsonify({
        'convertedAmounts': converted_amounts
    })


if __name__ == '__main__':
    app.run(port=3001, debug=True)
