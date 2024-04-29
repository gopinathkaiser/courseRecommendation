import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.preprocessing import MultiLabelBinarizer

# Assuming 'data' is your dataset
# Convert the dataset into a format suitable for ML
X = data.drop(columns=['Interest'])
y = data['Interest']

# One-hot encode the categorical options
mlb = MultiLabelBinarizer()
y_encoded = mlb.fit_transform(y.str.split(','))

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train a Random Forest Classifier
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier.fit(X_train, y_train)

# Predict on the test set
y_pred = rf_classifier.predict(X_test)

# Decode the predictions
y_pred_decoded = mlb.inverse_transform(y_pred)

# Evaluate the model
print(classification_report(y_test, y_pred, target_names=mlb.classes_))
