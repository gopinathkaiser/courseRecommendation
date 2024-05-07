from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import numpy as np
import pandas as pd
import warnings

def safe_label_encode(encoder, labels):
    unknown_labels = set(labels) - set(encoder.classes_)
    for label in unknown_labels:
        encoder.classes_ = np.append(encoder.classes_, label)
    return encoder.transform(labels)

def success_response(statuscode=200, content="Success"):
    responseData = {
        'status': "Success",
        'status_code': statuscode,
        'content': content
    }
    resp = jsonify(responseData)
    resp.headers.add('Access-Control-Allow-Credentials', 'true')
    return resp, statuscode


def failure_response(statuscode=500, content="Internal Server Error"):
    responseData = {
        'status': 'Failed',
        'status_code': statuscode,
        'content': content,
    }
    return jsonify(responseData), statuscode

app = Flask(__name__)
CORS(app, origins="*")


@app.route('/pred/recommend',methods = ['POST'])
def get_recommendation():
    body = request.get_json()
    if len(body) != 4:
        return failure_response(statuscode=400,content={'message': 'Data count mismatch'})
    try:
        warnings.filterwarnings('ignore')
        data = {
            "technical_interests": [
                'coding', 'problem solving', 'logical thinking', 'statistics', 'ux/ui',
                'data analysis', 'machine learning', 'artificial intelligence', 'robotics', 'cybersecurity',
                'networking', 'cloud computing', 'web development', 'mobile app development', 'game development',
                'database management', 'software testing', 'algorithm design', 'mathematics', 'physics',
                'chemistry', 'biology', 'electronics', 'mechanics', 'digital logic design', 'computer architecture',
                'operating systems', 'data visualization', 'natural language processing', 'computer vision',
                'big data', 'blockchain', 'IoT', 'AR/VR', '3D printing', 'quantum computing', 'bioinformatics',
                'computational biology', 'geographic information systems', 'computational biology'
            ],
            'interests': [
                'science', 'anatomy', 'psychology', 'media and communications', 'video editing',
                'history', 'literature', 'writing', 'sociology', 'politics',
                'music', 'art', 'photography', 'fashion', 'design',
                'technology', 'gaming', 'sports', 'cooking', 'traveling',
                'nature', 'animals', 'space', 'philosophy', 'culture',
                'languages', 'education', 'health', 'fitness', 'finance',
                'business', 'entrepreneurship', 'leadership', 'innovation', 'creativity',
                'social media', 'volunteering', 'community service', 'human rights', 'environmental sustainability'
            ],
            'non_technical_interests': [
                'mathematics', 'physics', 'chemistry', 'management', 'entrepreneurship',
                'economics', 'law', 'medicine', 'geography', 'architecture',
                'history', 'literature', 'writing', 'sociology', 'politics',
                'music', 'art', 'photography', 'fashion', 'design',
                'technology', 'gaming', 'sports', 'cooking', 'traveling',
                'nature', 'animals', 'space', 'philosophy', 'culture',
                'languages', 'education', 'health', 'fitness', 'finance',
                'business', 'entrepreneurship', 'leadership', 'innovation', 'creativity'
            ],
            'achievements': [
                'academic excellence', 'sports achievements', 'artistic accomplishments', 'leadership roles',
                'community service awards',
                'public speaking awards', 'scientific research awards', 'literary awards', 'musical achievements',
                'entrepreneurial ventures',
                'volunteer work', 'internship experiences', 'travel experiences', 'cultural exchange programs',
                'hackathon wins',
                'coding competition wins', 'robotics competition wins', 'mathematics competition wins',
                'science fair awards',
                'debate competition wins',
                'writing competition wins', 'publications', 'exhibitions', 'performances', 'patents',
                'certifications', 'scholarships', 'grants', 'awards', 'recognition',
                'special projects', 'startups', 'business ventures', 'charity work', 'social initiatives',
                'environmental initiatives', 'philanthropic work', 'fundraising efforts', 'community building',
                'social media influence'
            ],
            'career': [21, 9, 3, 13, 38, 12, 19, 37, 32, 30, 1, 28, 18, 5, 29, 14, 2, 20, 36, 25, 11, 16, 39, 31, 10,
                       34, 23, 7, 17, 24, 40, 22, 26, 33, 4, 15, 27, 6, 35, 8]
        }

        # outcome = {
        #     '1': 'Engineering (Various disciplines such as Computer Science, Mechanical, Electrical, etc.)',
        #     '2': 'Medicine (MBBS, BDS, etc.)',
        #     '3': 'Pharmacy (B.Pharma)',
        #     '4': 'Commerce (B.Com, BBA, etc.)',
        #     '5': 'Arts (BA, BFA, etc.)',
        #     '6': 'Design (Fashion Design, Interior Design, etc.)',
        #     '7': 'Law (LLB)',
        #     '8': 'Hotel Management',
        #     '9': 'Mass Communication (Journalism, Advertising, etc.)',
        #     '10': 'Animation and Multimedia',
        #     '11': 'Biotechnology',
        #     '12': 'Agriculture and Allied Fields',
        #     '13': 'Forensic Science',
        #     '14': 'Environmental Science',
        #     '15': 'Fine Arts (BFA, MFA, etc.)',
        #     '16': 'Event Management',
        #     '17': 'Digital Marketing',
        #     '18': 'Human Resources Management',
        #     '19': 'Fashion Technology',
        #     '20': 'Culinary Arts',
        #     '21': 'Travel and Tourism Management',
        #     '22': 'Hospitality Management',
        #     '23': 'Social Work',
        #     '24': 'Psychology',
        #     '25': 'Sociology',
        #     '26': 'Political Science',
        #     '27': 'History',
        #     '28': 'Geography',
        #     '29': 'Economics',
        #     '30': 'English Literature',
        #     '31': 'Foreign Languages',
        #     '32': 'Physical Education',
        #     '33': 'Library Science',
        #     '34': 'Philosophy',
        #     '35': 'Performing Arts (Drama, Dance, Music, etc.)',
        #     '36': 'Public Relations',
        #     '37': 'Healthcare Management',
        #     '38': 'Nutrition and Dietetics',
        #     '39': 'Sports Management',
        #     '40': 'Defense Services (Army, Navy, Air Force)'
        # }

        outcome = {
             "1": {
    "Name": "Engineering (Various disciplines such as Computer Science, Mechanical, Electrical, etc.)",
    "RequiredSkills": [
      "Strong analytical skills",
      "Problem-solving abilities",
      "Aptitude for mathematics and science",
      "Programming skills (varies by specialization)",
      "Logical thinking",
      "Ability to work in teams"
    ],
    "UpskillingCourses": [
      "Data Science and Machine Learning",
      "Cloud Computing",
      "Project Management",
      "Domain-specific specializations (e.g., Robotics, Cybersecurity)"
    ],
    "FutureDemand": "High - Automation, innovation across industries"
  },
  "2": {
    "Name": "Medicine (MBBS, BDS, etc.)",
    "RequiredSkills": [
      "Excellent communication and interpersonal skills",
      "Compassion and empathy",
      "Strong work ethic and ability to handle pressure",
      "Scientific reasoning and critical thinking",
      "Dexterity and hand-eye coordination (for some specializations)"
    ],
    "UpskillingCourses": [
      "Telemedicine and Digital Health",
      "Specialization in emerging fields (e.g., Genomics, Personalized Medicine)",
      "Medical Education and Communication Skills"
    ],
    "FutureDemand": "High - Growing population, increasing focus on preventive care"
  },
  "3": {
    "Name": "Pharmacy (B.Pharma)",
    "RequiredSkills": [
      "Strong foundation in chemistry and biology",
      "Attention to detail and accuracy",
      "Analytical and problem-solving skills",
      "Excellent communication and interpersonal skills",
      "Ability to work independently and as part of a team"
    ],
    "UpskillingCourses": [
      "Clinical Pharmacy",
      "Pharmaceutical Regulatory Affairs",
      "Drug Discovery and Development",
      "Business and Marketing for Pharmaceuticals"
    ],
    "FutureDemand": "Moderate - Growing demand for medication, automation in some areas"
  },
  "4": {
    "Name": "Commerce (B.Com, BBA, etc.)",
    "RequiredSkills": [
      "Strong analytical and problem-solving skills",
      "Excellent communication and interpersonal skills",
      "Financial literacy and numeracy",
      "Business acumen and understanding of market trends",
      "Ability to work independently and as part of a team"
    ],
    "UpskillingCourses": [
      "Business Analytics and Data Visualization",
      "Digital Marketing and E-commerce",
      "Financial Modeling and Risk Management",
      "Entrepreneurship and Innovation"
    ],
    "FutureDemand": "High - Evolving business landscape, need for data-driven decisions"
  },
  "5": {
    "Name": "Arts (BA, BFA, etc.)",
    "RequiredSkills": [
      "Strong written and verbal communication skills",
      "Critical thinking and analytical abilities",
      "Creativity and imagination",
      "Research and information literacy skills (may vary by specialization)",
      "Ability to express oneself through various artistic mediums (may vary by specialization)"
    ],
    "UpskillingCourses": [
      "Digital Content Creation and Storytelling",
      "Graphic Design and User Experience (UX) Design",
      "Arts Management and Entrepreneurship",
      "Data Visualization and Infographics"
    ],
    "FutureDemand": "Moderate - Demand for creative skills in various fields, competition may be high"
  },
  "6": {
    "Name": "Design (Fashion Design, Interior Design, etc.)",
    "RequiredSkills": [
      "Creativity and a strong sense of aesthetics",
      "Visual thinking and spatial awareness",
      "Problem-solving and critical thinking skills",
      "Technical skills specific to the design field (e.g., software, sketching)",
      "Excellent communication and collaboration skills"
    ],
    "UpskillingCourses": [
      "3D Modeling and Design Software",
      "Sustainable Design Practices",
      "User-Centered Design (UCD) principles",
      "Design Thinking and Innovation"
    ],
    "FutureDemand": "Moderate - Evolving design needs, competition may be high"
  },
  "7": {
    "Name": "Law (LLB)",
    "RequiredSkills": [
      "Excellent analytical and research skills",
      "Strong written and verbal communication skills",
      "Critical thinking and problem-solving abilities",
      "Ability to interpret complex legal documents",
      "Attention to detail and accuracy"
    ],
    "UpskillingCourses": [
      "Cyber Law and Intellectual Property Rights",
      "Alternative Dispute Resolution (ADR)",
      "Legal Technology and Data Privacy"
    ],
    "FutureDemand": "Moderate - Need for legal expertise in various sectors, competition may be high"
  },
  "8": {
    "Name": "Hotel Management",
    "RequiredSkills": [
      "Excellent communication and interpersonal skills",
      "Organizational and time management skills",
      "Customer service orientation and ability to handle difficult situations",
      "Business acumen and understanding of hospitality industry trends",
      "Ability to work in a fast-paced and demanding environment"
    ],
    "UpskillingCourses": [
      "Revenue Management and Hospitality Marketing",
      "Sustainable Hospitality Practices",
      "Data Analytics for Hospitality Industry"
    ],
    "FutureDemand": "Moderate - Recovery expected post-pandemic, automation may impact some roles"
  },
  "9": {
    "Name": "Mass Communication (Journalism, Advertising, etc.)",
    "RequiredSkills": [
      "Excellent written and verbal communication skills",
      "Research and information literacy skills",
      "Critical thinking and analytical abilities",
      "Creativity and storytelling skills",
      "Understanding of digital media and communication technologies"
    ],
    "UpskillingCourses": [
      "Data Journalism and Visualization",
      "Content Marketing and Copywriting",
      "Social Media Marketing and Analytics"
    ],
    "FutureDemand": "High - Need for skilled communicators in the digital age"
  },
  "10": {
    "Name": "Animation and Multimedia",
    "RequiredSkills": [
      "Strong artistic skills and a visual sense",
      "Creativity and imagination",
      "Technical skills in animation software and multimedia tools",
      "Storytelling and character development skills (for some specializations)",
      "Problem-solving and critical thinking abilities"
    ],
    "UpskillingCourses": [
      "3D Animation and Modeling Software (e.g., Maya, Blender)",
      "Virtual Reality (VR) and Augmented Reality (AR) Technologies",
      "Game Design and Development"
    ],
    "FutureDemand": "High - Growing demand for animation and multimedia skills in various industries"
  },
  "11": {
    "Name": "Biotechnology",
    "RequiredSkills": [
      "Strong foundation in biology and chemistry",
      "Analytical and problem-solving skills",
      "Laboratory skills",
      "Data analysis skills",
      "Attention to detail and accuracy"
    ],
    "UpskillingCourses": [
      "Bioinformatics and Computational Biology",
      "Biomedical Engineering",
      "Medical Genomics and Personalized Medicine"
    ],
    "FutureDemand": "High - Growing demand for expertise in biotechnologies for healthcare, agriculture, etc."
  },
  "12": {
    "Name": "Agriculture and Allied Fields",
    "RequiredSkills": [
      "Understanding of plant and animal science",
      "Problem-solving and critical thinking abilities",
      "Ability to work outdoors in various weather conditions (may vary by specialization)"
    ],
    "UpskillingCourses": [
      "Precision Agriculture and Agritech",
      "Sustainable Agriculture Practices",
      "Food Science and Technology"
    ],
    "FutureDemand": "Moderate - Need for innovation and technology adoption in agriculture, competition may be high"
  },
  "12": {
    "Name": "Agriculture and Allied Fields",
    "RequiredSkills": [
      "Understanding of plant and animal science",
      "Problem-solving and critical thinking abilities",
      "Ability to work outdoors in various weather conditions (may vary by specialization)"
    ],
    "UpskillingCourses": [
      "Precision Agriculture and Agritech",
      "Sustainable Agriculture Practices",
      "Food Science and Technology"
    ],
    "FutureDemand": "Moderate - Need for innovation and technology adoption in agriculture, competition may be high"
  },
  "13": {
    "Name": "Forensic Science",
    "RequiredSkills": [
      "Strong foundation in biology and chemistry (often preferred)"
    ],
    "UpskillingCourses": [
      "Digital Forensics and Cybercrime Investigation",
      "Forensic Toxicology",
      "DNA Analysis and Serology"
    ],
    "FutureDemand": "High - Growing demand for forensic expertise in law enforcement and legal sectors"
  },
  "14": {
    "Name": "Environmental Science",
    "RequiredSkills": [
      "Strong foundation in biology, chemistry, and earth sciences"
    ],
    "UpskillingCourses": [
      "Environmental Policy and Regulations",
      "Renewable Energy and Sustainability Technologies",
      "Geographic Information Systems (GIS) and Remote Sensing"
    ],
    "FutureDemand": "High - Increasing focus on environmental sustainability across industries"
  },
  "15": {
    "Name": "Fine Arts (BFA, MFA, etc.)",
    "RequiredSkills": [
      "Strong artistic skills and a visual sense",
      "Creativity and imagination",
      "Ability to express oneself through various artistic mediums"
    ],
    "UpskillingCourses": [
      "Digital Art and Design (e.g., 3D modeling, animation)",
      "Arts Entrepreneurship and Marketing",
      "Art Therapy and Creative Education"
    ],
    "FutureDemand": "Moderate - Demand for creative skills in various fields, competition may be high"
  },
  "16": {
    "Name": "Event Management",
    "RequiredSkills": [
      "Excellent communication and interpersonal skills",
      "Organizational and time management skills",
      "Attention to detail and accuracy",
      "Ability to work effectively under pressure",
      "Problem-solving and critical thinking abilities"
    ],
    "UpskillingCourses": [
      "Event Technology and Project Management",
      "Experiential Marketing and Sponsorship Management",
      "Sustainable Event Planning and Practices"
    ],
    "FutureDemand": "Moderate - Event industry recovery expected post-pandemic, competition may be high"
  },
  "17": {
    "Name": "Digital Marketing",
    "RequiredSkills": [
      "Strong analytical and problem-solving skills",
      "Understanding of digital marketing concepts and tools (SEO, SEM, social media marketing, etc.)",
      "Excellent communication and writing skills",
      "Creativity and data-driven approach"
    ],
    "UpskillingCourses": [
      "Content Marketing and Social Media Analytics",
      "Search Engine Marketing (SEM) and Pay-Per-Click (PPC) Advertising",
      "Marketing Automation and E-commerce Marketing"
    ],
    "FutureDemand": "High - Evolving digital landscape requires skilled digital marketers"
  },
  "18": {
    "Name": "Human Resources Management (HRM)",
    "RequiredSkills": [
      "Excellent communication and interpersonal skills",
      "Strong organizational and problem-solving skills",
      "Understanding of labor laws and regulations",
      "Ability to build relationships and manage conflict"
    ],
    "UpskillingCourses": [
      "Human Capital Analytics and Talent Management",
      "Organizational Development and Change Management",
      "Employee Relations and Labor Law Compliance"
    ],
    "FutureDemand": "High - Growing emphasis on strategic HR, employee engagement, and talent acquisition"
  },
  "19": {
    "Name": "Fashion Technology",
    "RequiredSkills": [
      "Strong sense of aesthetics and fashion trends",
      "Understanding of textiles and garment construction",
      "Technical skills in design software and production processes (may vary by specialization)"
    ],
    "UpskillingCourses": [
      "Computer-Aided Design (CAD) for Fashion",
      "Sustainable Fashion Practices and Material Innovation",
      "3D Clothing Design and Prototyping"
    ],
    "FutureDemand": "Moderate - Growing demand for technological advancements in the fashion industry"
  },
  "20": {
    "Name": "Culinary Arts",
    "RequiredSkills": [
      "Passion for food and cooking",
      "Knife skills and culinary techniques",
      "Ability to work in a fast-paced and demanding kitchen environment",
      "Attention to detail and hygiene standards"
    ],
    "UpskillingCourses": [
      "Plant-Based Cuisine and Vegan Cooking",
      "Food Styling and Plating Techniques",
      "Restaurant Management and Culinary Entrepreneurship"
    ],
    "FutureDemand": "Moderate - Recovery expected post-pandemic, demand for skilled chefs in various sectors"
  },
  "21": {
    "Name": "Travel and Tourism Management",
    "RequiredSkills": [
      "Excellent communication and interpersonal skills",
      "Organizational and time management skills",
      "Knowledge of travel destinations and tourism industry trends",
      "Customer service orientation and ability to handle difficult situations"
    ],
    "UpskillingCourses": [
      "Sustainable Tourism Practices and Ecotourism",
      "Travel Technology and Online Distribution Channels",
      "Destination Marketing and Event Management in Tourism"
    ],
    "FutureDemand": "High - Travel industry expected to rebound post-pandemic, with a focus on sustainability"
  },
  "22": {
  "Name": "Hospital Management",
  "RequiredSkills": [
    "Strong analytical and problem-solving skills",
    "Understanding of healthcare systems and regulations",
    "Leadership and business acumen",
    "Excellent communication and interpersonal skills"
  ],
  "UpskillingCourses": [
    "Healthcare Finance and Revenue Cycle Management",
    "Healthcare Policy and Regulatory Affairs",
    "Medical Staff Management and Leadership in Healthcare Organizations"
  ],
  "FutureDemand": "High - Growing demand for healthcare managers due to an aging population and complex healthcare systems"
},
  "23": {
    "Name": "Social Work",
    "RequiredSkills": [
      "Strong communication and interpersonal skills",
      "Compassion and empathy",
      "Problem-solving and critical thinking abilities",
      "Ability to work effectively with diverse populations"
    ],
    "UpskillingCourses": [
      "Trauma-Informed Care and Mental Health",
      "Social Policy and Advocacy",
      "Community Development and Program Management"
    ],
    "FutureDemand": "High - Growing need for social workers in various sectors (healthcare, child welfare, etc.)"
  },
  "24": {
    "Name": "Psychology",
    "RequiredSkills": [
      "Strong analytical and research skills",
      "Excellent communication and interpersonal skills",
      "Active listening skills and empathy",
      "Attention to detail and accuracy"
    ],
    "UpskillingCourses": [
      "Clinical Psychology and Mental Health Interventions",
      "Industrial-Organizational Psychology and Workplace Issues",
      "Data Analysis and Statistics for Psychology Research"
    ],
    "FutureDemand": "High - Increasing demand for psychologists in various settings (clinical, educational, industrial)"
  },
  "25": {
    "Name": "Accounting",
    "RequiredSkills": [
      "Strong analytical and problem-solving skills",
      "Attention to detail and accuracy",
      "Understanding of accounting principles and financial statements",
      "Excellent communication and interpersonal skills (may vary by specialization)"
    ],
    "UpskillingCourses": [
      "Financial Modeling and Valuation",
      "Forensic Accounting and Fraud Detection",
      "Accounting Software and Technology"
    ],
    "FutureDemand": "High - Continued demand for accountants in various industries"
  },
  "26": {
    "Name": "Entrepreneurship",
    "RequiredSkills": [
      "Creativity and innovation",
      "Business acumen and understanding of market trends",
      "Strong work ethic and ability to handle pressure",
      "Excellent communication and interpersonal skills"
    ],
    "UpskillingCourses": [
      "Lean Startup Methodology and Business Model Canvas",
      "Digital Marketing and E-commerce for Startups",
      "Venture Capital and Fundraising for Entrepreneurs"
    ],
    "FutureDemand": "High - Growing interest in entrepreneurship, but competition can be high"
  },
  "27": {
    "Name": "Data Science",
    "RequiredSkills": [
      "Strong analytical and problem-solving skills",
      "Programming skills (Python, R, etc.)",
      "Statistical knowledge and data analysis skills",
      "Communication skills to present findings"
    ],
    "UpskillingCourses": [
      "Machine Learning and Artificial Intelligence",
      "Big Data Analytics and Cloud Computing",
      "Data Visualization and Storytelling"
    ],
    "FutureDemand": "Very High - Increasing demand for data science expertise across industries"
  },
  "28": {
    "Name": "Computer Science",
    "RequiredSkills": [
      "Strong analytical and problem-solving skills",
      "Programming skills in various languages",
      "Logical thinking and algorithmic thinking",
      "Ability to work independently and as part of a team"
    ],
    "UpskillingCourses": [
      "Software Engineering and Web Development",
      "Cybersecurity and Network Security",
      "Artificial Intelligence and Machine Learning"
    ],
    "FutureDemand": "Very High - Strong demand for skilled computer scientists in various fields"
  },
  "29": {
    "Name": "Information Technology (IT)",
    "RequiredSkills": [
      "Strong analytical and problem-solving skills",
      "Understanding of computer hardware and software",
      "Technical skills in specific IT areas (networking, cybersecurity, etc.)",
      "Ability to learn new technologies quickly"
    ],
    "UpskillingCourses": [
      "Cloud Computing and IT Infrastructure",
      "Cybersecurity and Data Protection",
      "IT Help Desk and Network Administration"
    ],
    "FutureDemand": "High - Demand for IT professionals to support digital transformation"
  },
  "30": {
    "Name": "Teaching (B.Ed., etc.)",
    "RequiredSkills": [
      "Strong subject knowledge and ability to explain concepts clearly",
      "Excellent communication and interpersonal skills",
      "Patience and empathy",
      "Ability to create a positive and engaging learning environment"
    ],
    "UpskillingCourses": [
      "Educational Technology and Instructional Design",
      "Classroom Management and Student Engagement Strategies",
      "Special Education and Inclusive Practices"
    ],
    "FutureDemand": "Moderate - Demand varies depending on subject area and location"
  },

  "31": {
    "Name": "Foreign Languages",
    "RequiredSkills": [
      "Strong aptitude for languages and learning new vocabulary",
      "Excellent communication and interpersonal skills",
      "Understanding of grammar and cultural nuances",
      "Ability to learn different language learning methods"
    ],
    "UpskillingCourses": [
      "Computer-Assisted Language Learning (CALL) and Online Resources",
      "Translation and Interpretation Techniques",
      "Teaching English as a Second Language (TESL) or Teaching Other Languages"
    ],
    "FutureDemand": "High - Growing demand for bilingual professionals in various sectors (education, business, tourism)"
  },
  "32": {
    "Name": "Physical Education",
    "RequiredSkills": [
      "Strong understanding of health and fitness principles",
      "Excellent communication and interpersonal skills",
      "Ability to motivate and inspire others",
      "Leadership skills and ability to organize activities"
    ],
    "UpskillingCourses": [
      "Sports Coaching and Conditioning",
      "Adapted Physical Education and Inclusive Practices",
      "Health Education and Wellness Programs"
    ],
    "FutureDemand": "Moderate - Demand varies depending on the specific area (teaching, coaching, fitness)"
  },
  "33": {
    "Name": "Library Science",
    "RequiredSkills": [
      "Strong organizational and information management skills",
      "Excellent research and information literacy skills",
      "Understanding of library systems and technologies",
      "Communication and interpersonal skills to assist patrons"
    ],
    "UpskillingCourses": [
      "Digital Librarianship and Information Technology",
      "Data Curation and Archiving",
      "Library Management and User Services"
    ],
    "FutureDemand": "Moderate - Demand for librarians is evolving, with a need for digital expertise"
  },
  "34": {
    "Name": "Philosophy",
    "RequiredSkills": [
      "Strong analytical and critical thinking skills",
      "Excellent communication and writing skills",
      "Ability to read and interpret complex texts",
      "Open-mindedness and a willingness to consider different perspectives"
    ],
    "UpskillingCourses": [
      "Bioethics and Applied Ethics",
      "Logic and Argumentation",
      "History of Philosophy and Philosophical Traditions"
    ],
    "FutureDemand": "Moderate - Philosophy graduates can find careers in research, education, law, and other fields requiring strong analytical skills"
  },
  "35": {
    "Name": "Performing Arts (Drama, Dance, Music, etc.)",
    "RequiredSkills": [
      "Strong talent and passion for the chosen performing art",
      "Discipline and perseverance",
      "Communication and stage presence",
      "Creativity and ability to interpret artistic works"
    ],
    "UpskillingCourses": [
      "Acting Techniques (for Drama)",
      "Dance Techniques (for Dance)",
      "Music Theory and Performance (for Music)",
      "Arts Management and Entrepreneurship"
    ],
    "FutureDemand": "Competitive - High demand for talent, but limited opportunities in professional performance roles"
  },
  "36": {
    "Name": "Public Relations",
    "RequiredSkills": [
      "Excellent communication and writing skills",
      "Strong analytical and problem-solving skills",
      "Media literacy and understanding of public relations strategies",
      "Ability to build relationships and manage reputation"
    ],
    "UpskillingCourses": [
      "Social Media Marketing and Public Relations",
      "Crisis Communication and Reputation Management",
      "Public Relations Writing and Content Marketing"
    ],
    "FutureDemand": "High - Demand for skilled public relations professionals across industries"
  },
  "37": {
    "Name": "Healthcare Management",
    "RequiredSkills": [
      "Strong analytical and problem-solving skills",
      "Understanding of healthcare systems and regulations",
      "Leadership and business acumen",
      "Excellent communication and interpersonal skills"
    ],
    "UpskillingCourses": [
      "Healthcare Finance and Revenue Cycle Management",
      "Healthcare Policy and Regulatory Affairs",
      "Medical Staff Management and Leadership in Healthcare Organizations"
    ],
    "FutureDemand": "High - Growing demand for healthcare managers due to an aging population and complex healthcare systems"
  },
  "38": {
    "Name": "Nutrition and Dietetics",
    "RequiredSkills": [
      "Strong foundation in science (biology, chemistry)",
      "Understanding of nutrition principles and dietary needs",
      "Excellent communication and interpersonal skills",
      "Ability to educate and motivate individuals towards healthy eating habits"
    ],
    "UpskillingCourses": [
      "Sports Nutrition and Performance Enhancement",
      "Public Health Nutrition and Food Policy",
      "Clinical Nutrition and Dietary Management for Chronic Diseases"
    ],
    "FutureDemand": "High - Growing emphasis on preventive healthcare and personalized nutrition plans"
  },
  "39": {
    "Name": "Sports Management",
    "RequiredSkills": [
      "Strong understanding of the sports industry",
      "Business acumen and marketing skills",
      "Excellent communication and interpersonal skills",
      "Leadership and organizational skills"
    ],
    "UpskillingCourses": [
      "Sports Marketing and Sponsorship Management",
      "Event Management in Sports",
      "Sports Analytics and Performance Management"
    ],
    "FutureDemand": "High - Growing demand for professionals to manage the business side of sports"
  },
  "40": {
    "Name": "Defense Services (Army, Navy, Air Force)",
    "RequiredSkills": [
      "Physical fitness and stamina",
      "Discipline and leadership qualities",
      "Teamwork and collaboration skills",
      "Ability to follow orders and work under pressure"
    ],
    "UpskillingCourses": [
      "Military Training and Specialization Courses (vary by service branch)",
      "Leadership Development and Strategic Studies",
      "Defense Technology and Weapon Systems (vary by service branch)"
    ],
    "FutureDemand": "Varies - Depends on geopolitical situations and national defense needs"
  }
}
        

        df = pd.DataFrame(data)
        label_encoder = LabelEncoder()
        df['technical_interests'] = label_encoder.fit_transform(df['technical_interests'])
        df['interests'] = label_encoder.fit_transform(df['interests'])
        df['non_technical_interests'] = label_encoder.fit_transform(df['non_technical_interests'])
        df['achievements'] = label_encoder.fit_transform(df['achievements'])

        X = df.drop('career', axis=1)
        y = df['career']

        rf_model = RandomForestClassifier(n_estimators=100, random_state=42)

        # Train the model
        rf_model.fit(X, y)
        tech = safe_label_encode(label_encoder, [body['technical_interests']])
        interest = safe_label_encode(label_encoder, [body['interests']])
        non_tech = safe_label_encode(label_encoder, [body['non_technical_interests']])
        ach = safe_label_encode(label_encoder, [body['achievements']])
        # print(tech , interest ,non_tech)

        print(tech, interest, non_tech, ach)

        # print(tech, interest, non_tech, ach)
         pred = rf_model.predict([[tech[0], interest[0], non_tech[0], ach[0]]])

        choice = int(pred[0])
        content = {'recommend': [outcome[str(choice)],
                        outcome[str(choice-1)],
                        outcome[str(choice + 1)]]}   


        content = {'recommend': [outcome[str(choice)], outcome[str(choice - 1)], outcome[str(choice + 1)]]}

        print(content)

        # content['recommend'] = content['recommend'].replace('\n', '\n\n')

        return success_response(statuscode=200, content=content)

        
    except Exception as e:
        return failure_response(statuscode=500, content={'message': str(e)})    

def getInteretsData():
    data = {
            "technical_interests": [
                'coding', 'problem solving', 'logical thinking', 'statistics', 'ux/ui',
                'data analysis', 'machine learning', 'artificial intelligence', 'robotics', 'cybersecurity',
                'networking', 'cloud computing', 'web development', 'mobile app development', 'game development',
                'database management', 'software testing', 'algorithm design', 'mathematics', 'physics',
                'chemistry', 'biology', 'electronics', 'mechanics', 'digital logic design', 'computer architecture',
                'operating systems', 'data visualization', 'natural language processing', 'computer vision',
                'big data', 'blockchain', 'IoT', 'AR/VR', '3D printing', 'quantum computing', 'bioinformatics',
                'computational biology', 'geographic information systems', 'computational biology'
            ],
            'interests': [
                'science', 'anatomy', 'psychology', 'media and communications', 'video editing',
                'history', 'literature', 'writing', 'sociology', 'politics',
                'music', 'art', 'photography', 'fashion', 'design',
                'technology', 'gaming', 'sports', 'cooking', 'traveling',
                'nature', 'animals', 'space', 'philosophy', 'culture',
                'languages', 'education', 'health', 'fitness', 'finance',
                'business', 'entrepreneurship', 'leadership', 'innovation', 'creativity',
                'social media', 'volunteering', 'community service', 'human rights', 'environmental sustainability'
            ],
            'non_technical_interests': [
                'mathematics', 'physics', 'chemistry', 'management', 'entrepreneurship',
                'economics', 'law', 'medicine', 'geography', 'architecture',
                'history', 'literature', 'writing', 'sociology', 'politics',
                'music', 'art', 'photography', 'fashion', 'design',
                'technology', 'gaming', 'sports', 'cooking', 'traveling',
                'nature', 'animals', 'space', 'philosophy', 'culture',
                'languages', 'education', 'health', 'fitness', 'finance',
                'business', 'entrepreneurship', 'leadership', 'innovation', 'creativity'
            ],
            'achievements': [
                'academic excellence', 'sports achievements', 'artistic accomplishments', 'leadership roles',
                'community service awards',
                'public speaking awards', 'scientific research awards', 'literary awards', 'musical achievements',
                'entrepreneurial ventures',
                'volunteer work', 'internship experiences', 'travel experiences', 'cultural exchange programs',
                'hackathon wins',
                'coding competition wins', 'robotics competition wins', 'mathematics competition wins',
                'science fair awards',
                'debate competition wins',
                'writing competition wins', 'publications', 'exhibitions', 'performances', 'patents',
                'certifications', 'scholarships', 'grants', 'awards', 'recognition',
                'special projects', 'startups', 'business ventures', 'charity work', 'social initiatives',
                'environmental initiatives', 'philanthropic work', 'fundraising efforts', 'community building',
                'social media influence'
            ]
        }

    return data

@app.route('/getInterets', methods=['GET'])
def getInterets():
    prediction = getInteretsData()
    return prediction


if __name__=='__main__':
    app.run(host = '0.0.0.0',debug=True)
