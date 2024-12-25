from flask import Flask, request, jsonify, session
from g4f.client import Client
from flask_cors import CORS
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Secure secret key for session management
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)  # Allow local dev origin

client = Client()

@app.route('/generate-path', methods=['POST'])
def generate_path():
    data = request.get_json()
    print("Received data:", data)  # Debugging line to check the request data

    # Check if the 'goals' field is provided
    if 'goals' not in data or not data['goals']:
        print("Missing 'goals' field")  # Debugging line for missing 'goals'
        return jsonify({"error": "Please provide your learning goal."}), 400

    learning_goal = data['goals']  # Get the learning goal input

    # Construct the GPT prompt with the learning goal
    prompt = f"Suggest personalized learning paths based on the following learning goal: {learning_goal}. Provide short and precise points only. Don't use any special charcters in your response. Suggest necessary courses and colleges. Consider the person is from India and use the information thoroughly. Add as many emojis as possible."

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )

        if response.choices and response.choices[0].message.content:
            paths = response.choices[0].message.content.strip().split('\n')
            paths = [path.strip() for path in paths if path.strip()]
            formatted_paths = '\n'.join(paths)

            session['learning_paths'] = paths
            return jsonify({"paths": formatted_paths})

    except Exception as e:
        print("Error:", str(e))  # Debugging line for catching exceptions
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Use PORT from environment for Render.com
    app.run(debug=True, host="0.0.0.0", port=port)
