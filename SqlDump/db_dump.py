from sqlalchemy import create_engine
import pandas as pd
df=pd.read_csv('exams.csv')
con_str = 'postgresql://postgres:123456789@localhost:5432/CourseRecommendation'
engine = create_engine(con_str)
for col in df:
    df[col] = df[col].astype(str)
df.to_sql("entrance_exams", engine, if_exists="replace")
sch = pd.read_csv('sch.csv')
sch.to_sql("scholarship", engine, if_exists="replace", index=False)