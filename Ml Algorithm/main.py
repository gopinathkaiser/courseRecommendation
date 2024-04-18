import sklearn
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


def safe_label_encode(encoder, labels):
    unknown_labels = set(labels) - set(encoder.classes_)
    for label in unknown_labels:
        encoder.classes_ = np.append(encoder.classes_, label)
    return encoder.transform(labels)


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
        'coding competition wins', 'robotics competition wins', 'mathematics competition wins', 'science fair awards',
        'debate competition wins',
        'writing competition wins', 'publications', 'exhibitions', 'performances', 'patents',
        'certifications', 'scholarships', 'grants', 'awards', 'recognition',
        'special projects', 'startups', 'business ventures', 'charity work', 'social initiatives',
        'environmental initiatives', 'philanthropic work', 'fundraising efforts', 'community building',
        'social media influence'
    ],
    'career': list(range(1, 41))
}
outcome = {
    '1': 'Engineering (Various disciplines such as Computer Science, Mechanical, Electrical, etc.)',
    '2': 'Medicine (MBBS, BDS, etc.)',
    '3': 'Pharmacy (B.Pharma)',
    '4': 'Commerce (B.Com, BBA, etc.)',
    '5': 'Arts (BA, BFA, etc.)',
    '6': 'Design (Fashion Design, Interior Design, etc.)',
    '7': 'Law (LLB)',
    '8': 'Hotel Management',
    '9': 'Mass Communication (Journalism, Advertising, etc.)',
    '10': 'Animation and Multimedia',
    '11': 'Biotechnology',
    '12': 'Agriculture and Allied Fields',
    '13': 'Forensic Science',
    '14': 'Environmental Science',
    '15': 'Fine Arts (BFA, MFA, etc.)',
    '16': 'Event Management',
    '17': 'Digital Marketing',
    '18': 'Human Resources Management',
    '19': 'Fashion Technology',
    '20': 'Culinary Arts',
    '21': 'Travel and Tourism Management',
    '22': 'Hospitality Management',
    '23': 'Social Work',
    '24': 'Psychology',
    '25': 'Sociology',
    '26': 'Political Science',
    '27': 'History',
    '28': 'Geography',
    '29': 'Economics',
    '30': 'English Literature',
    '31': 'Foreign Languages',
    '32': 'Physical Education',
    '33': 'Library Science',
    '34': 'Philosophy',
    '35': 'Performing Arts (Drama, Dance, Music, etc.)',
    '36': 'Public Relations',
    '37': 'Healthcare Management',
    '38': 'Nutrition and Dietetics',
    '39': 'Sports Management',
    '40': 'Defense Services (Army, Navy, Air Force)'
}

df = pd.DataFrame(data)
label_encoder = LabelEncoder()
df['technical_interests'] = label_encoder.fit_transform(df['technical_interests'])
df['interests'] = label_encoder.fit_transform(df['interests'])
df['non_technical_interests'] = label_encoder.fit_transform(df['non_technical_interests'])
df['achievements'] = label_encoder.fit_transform(df['achievements'])

X = df.drop('career', axis=1)
y = df['career']

rf_model = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model
rf_model.fit(X, y)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
y_pred = rf_model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)
r2 = r2_score(y_test, y_pred)

print(f'Mean Absolute Error (MAE): {mae}')
print(f'Mean Squared Error (MSE): {mse}')
print(f'Root Mean Squared Error (RMSE): {rmse}')
print(f'R^2 Score: {r2}')

# pred = rf_model.predict([[tech, interest, non_tech, ach]])
#
# print(outcome[str(int(pred[0]))])


# tech = input('enter technical intrest')
# interest = input('enter interest')
# non_tech = input('enter non-technical interest')
# ach = input('enter achievements')
#
# tech = safe_label_encode(label_encoder, [tech])[0]
# interest = safe_label_encode(label_encoder, [interest])[0]
# non_tech = safe_label_encode(label_encoder, [non_tech])[0]
# ach = safe_label_encode(label_encoder, [ach])[0]



