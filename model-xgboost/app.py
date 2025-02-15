from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Load the trained model and label encoder
model = joblib.load("security_guard_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Initialize Flask app
app = Flask(__name__)

# Define the prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    # Get the JSON data from the request
    data = request.json

    # Convert JSON to DataFrame
    input_data = pd.DataFrame([data])

    # Extract workplace type
    input_data['workPlaceType'] = input_data['prevExperience'].apply(
        lambda x: x[0]['workPlace'] if x and isinstance(x, list) and len(x) > 0 else 'unknown'
    )

    # Encode categorical features
    input_data['workPlaceType'] = label_encoder.transform(input_data['workPlaceType'])

    # Select features
    X = input_data[['totalExperienceYears', 'averageRating', 'workPlaceType']]

    # Make prediction
    prediction = model.predict(X)
    predicted_label = label_encoder.inverse_transform(prediction)

    # Return the prediction as JSON
    return jsonify({"predicted_bestSuitedFor": predicted_label[0]})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)