
'''
    - Flask endpoint to fetch data from react frontend and post to LLM model to generate response for mermaid.js code
    - Setup gemini api
    - fine tune the prompt
    - define endpoints
    - test
    - deploy

    - Attributes required from frontend: project_name, project_description, technologies
    - Attributes optional from frontend: target_indsutry, target_audience, use_cases, addtional info
    
    - Attributes to be generated in json: system, components. For each component: name, type, description, interactions

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
    "project_name": "ArtisansHub",
    "project_description": "A marketplace connecting local artisans with consumers for handmade products.",
    "technologies": ["Vue.js", "Django", "PostgreSQL"],
    "target_industry": "E-commerce",
    "target_audience": "Individuals interested in unique, handmade goods and local artisans",
    "use_cases": ["Browsing products", "Creating artisan profiles", "Placing and managing orders", "Leaving reviews", "Secure payment processing"],
    "additional_info": "Includes location-based search and product recommendations."
}

sample_data_2 = {
    "project_name": "EduConnect",
    "project_description": "An online platform for connecting students with tutors for personalized learning experiences.",
    "technologies": ["React", "Node.js", "MongoDB"],
    "target_audience": "Students of all ages and tutors in various subjects",
    "use_cases": ["Finding tutors", "Scheduling sessions", "Conducting online lessons", "Managing tutor profiles", "Secure video conferencing"],
   
}

sample_data_3 = {
    "project_name": "FitTrack",
    "project_description": "A mobile application to track workouts, set fitness goals, and monitor health progress.",
    "technologies": ["React Native", "Firebase"],
    "target_industry": "Health and Fitness",
    "target_audience": "Individuals interested in fitness tracking and health monitoring.",
     "use_cases": ["Tracking daily exercise", "Setting fitness goals", "Monitoring health data", "Visualizing progress", "User profiles and challenges"],
    "additional_info": "Integrates with wearable devices."
}

#User Input Dict
user_input = {}

#Using sample data
samples = {1: sample_data_1, 2: sample_data_2, 3: sample_data_3}
user_input = samples[random.randint(1, 3)]

def generate_UML_content(user_input):


    #Required Attributes
    project_name = user_input.get('project_name')
    project_description = user_input.get('project_description')
    technologies = user_input.get('technologies')

    #Optional Attributes
    target_indsutry = user_input.get('target_indsutry', '')
    target_audience = user_input.get('target_audience', '')
    use_cases = user_input.get('use_cases', '')
    addtional_info = user_input.get('addtional_info', '')

    #Required Output Attributes
    output_features = "system, components. For each component: name, type, description, interactions"

    #Prompt
    text_prompt = f"Generate a UML diagram for a project named {project_name} that is described as {project_description}. The project uses {technologies}. The target industry is {target_indsutry}. The target audience is {target_audience}. The use cases are {use_cases}. Additional information: {addtional_info}. The output should include {output_features}. The output should be json format that will be further used to create the diagram using mermaid.js."
    print(text_prompt)

    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={api_key}'
    data = dict(contents=[dict(parts=[dict(text=text_prompt)])])
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=data, headers=headers)
    res = response.json()['candidates'][0]['content']['parts'][0]['text']
    return jsonify('message', res)

#Testing the function
#generated_content = generate_UML_content(user_input)
#print(generated_content)



#Endpoint to fetch data from react frontend
@app.route('/get-input', methods=['POST'])
def get_input():

    user_input = request.get_json()

    # Required Attributes
    project_name = user_input.get('project_name')
    project_description = user_input.get('project_description')
    technologies = user_input.get('technologies')

    # Optional Attributes
    target_indsutry = user_input.get('target_indsutry', '')
    target_audience = user_input.get('target_audience', '')
    use_cases = user_input.get('use_cases', '')
    addtional_info = user_input.get('addtional_info', '')

    # Create dictionary of attributes
    attributes = {
        'project_name': project_name,
        'project_description': project_description,
        'technologies': technologies,
        'target_indsutry': target_indsutry,
        'target_audience': target_audience,
        'use_cases': use_cases,
        'addtional_info': addtional_info
    }

    # Generate UML content
    generated_content = generate_UML_content(attributes)

    return generated_content

if __name__ == '__main__':
    app.run(debug=True, port=5002)
