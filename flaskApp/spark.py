from pyspark.sql import SparkSession
from pyspark.ml.feature import StringIndexer
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml import Pipeline
import pickle
from pyspark.sql.functions import col
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

# Create a Spark session
spark = SparkSession.builder \
    .appName("RandomForestClassifierExample") \
    .getOrCreate()

# Read the CSV file into a Spark DataFrame
df = spark.read.csv('new_dataframe.csv', header=True, inferSchema=True)

# Encode categorical columns using StringIndexer
indexers = [StringIndexer(inputCol=column, outputCol="career").fit(df) for column in ['technical_interests', 'interests', 'non_technical_interests', 'achievements']]
pipeline = Pipeline(stages=indexers)
df_indexed = pipeline.fit(df).transform(df)


# Create feature vector
assembler = VectorAssembler(
    inputCols=['technical_interests_index', 'interests_index', 'non_technical_interests_index', 'achievements_index'],
    outputCol="career")
output = assembler.transform(df_indexed.drop("career"))


# Split the data into training and test sets
(trainingData, testData) = output.randomSplit([0.8, 0.2], seed=42)

# Train a RandomForestClassifier model
rf = RandomForestClassifier(labelCol="career", featuresCol="features", numTrees=100, maxBins=40, seed=42)
model = rf.fit(trainingData)

# Make predictions on the test data
predictions = model.transform(testData)

with open('rf_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Evaluate the model
evaluator = MulticlassClassificationEvaluator(labelCol="career", predictionCol="prediction", metricName="accuracy")
accuracy = evaluator.evaluate(predictions)
print("Test Accuracy = %g" % accuracy)

# Stop the Spark session
spark.stop()
