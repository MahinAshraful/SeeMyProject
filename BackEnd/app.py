'''
    - Flask endpoint to fetch data from react frontend and post to LLM model to generate response for mermaid.js code
    done - Setup gemini api
    - fine tune the prompt
    done - define endpoints
    done - test
    - deploy

    - Attributes required from frontend: project_name, project_description, technologies
    - Attributes optional from frontend: target_indsutry, target_audience, use_cases, addtional info
    
    - Attributes to be generated in json: system, components. For each component: name, type, description, interactions

    
    1. Redefine the input and ask gemini to expand on the project. 
    2. Use the expanded text to generate the 5 components
'''

import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import random

load_dotenv()
app = Flask(__name__)


#Gemini API Key
api_key = os.getenv('GEMINI_API_KEY')

#Sample Data
sample_data_1 = {
    "project_name": "FitTrack",
    "project_description": "be able to track user workouts, set fitness goals and monitor health progress",
    "technologies": ["React Native, Firebase"],
    "new_technologies": ["React Native"],
}

#User Input Dict
user_input = {}
user_input = sample_data_1
def generate_project_explanation(user_input):

    #Required Attributes
    project_name = user_input.get('project_name')
    project_description = user_input.get('project_description')
    technologies = user_input.get('technologies')
    new_technologies = user_input.get('new_technologies', 'n/a')

    #Optional Attributes
    target_indsutry = user_input.get('target_indsutry', '')
    target_audience = user_input.get('target_audience', '')
    addtional_info = user_input.get('addtional_info', '')

    #Required Output Attributes
    output_features = "system, components. For each component: name, type, description, interactions"

    #Prompt
    text_prompt = f"We want to create a {project_name} app. The app will {project_description}. We want to try to use {technologies}. We are relatively new to using {new_technologies}. Create a step-by-step plan to create this project. Suggest the tools and technologies to use and best practices. Return a plan that covers everything from frontend, backend, database, apis and packages to deployment."
    print(text_prompt)

    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={api_key}'
    data = dict(contents=[dict(parts=[dict(text=text_prompt)])])
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=data, headers=headers)
    res = response.json()['candidates'][0]['content']['parts'][0]['text']
    return res


def generate_components(lllm_output):


    #Prompt
    text_prompt = f"Use the following explanation to formally structure and categorize our project plan into json format. I want the plan to have 5 components: frontend, backend, database, API and packages, Deployment. Each of these components will further have: Tech Stack, Alternative technologies, Purpose and Getting-Started. \n\n {lllm_output}"

    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={api_key}'
    data = dict(contents=[dict(parts=[dict(text=text_prompt)])])
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=data, headers=headers)
    res = response.json()['candidates'][0]['content']['parts'][0]['text']
    return res

#Testing the function
#generated_content = generate_project_explanation(user_input)
#final_res = generate_components(generated_content)
#print(final_res)


#Endpoint to fetch data from react frontend
@app.route('/get-input', methods=['POST'])
def get_input():

    user_input = request.get_json()

    # Required Attributes
    required_fields = ['project_name', 'project_description', 'technologies']
    missing_fields = [field for field in required_fields if field not in user_input]

    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    project_name = user_input.get('project_name')
    project_description = user_input.get('project_description')
    technologies = user_input.get('technologies')

    # Optional Attributes
    target_indsutry = user_input.get('target_indsutry', 'general')
    target_audience = user_input.get('target_audience', 'general')
    addtional_info = user_input.get('addtional_info', 'not provided')

    # Create dictionary of attributes
    attributes = {
        'project_name': project_name,
        'project_description': project_description,
        'technologies': technologies,
        'target_indsutry': target_indsutry,
        'target_audience': target_audience,
        'addtional_info': addtional_info
    }

    # Generate UML content
    generated_content = generate_project_explanation(attributes)
    final_output = generate_components(generated_content)

    return jsonify({'message': final_output})

if __name__ == '__main__':
    app.run(debug=True, port=5002)
