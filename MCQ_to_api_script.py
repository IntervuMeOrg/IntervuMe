"""
CSV to MCQ Questions API Script (Parallel Version)

This script reads a CSV file containing MCQ problems and creates them in your database via parallel API calls.

Requirements:
- pandas
- requests
- tqdm

Usage:
1. Update the `csv_file_path` variable in main()
2. Ensure your API server is running at http://localhost:3000
3. Run: python csv_to_mcq_api_script_parallel.py
"""

import pandas as pd
import requests
import json
from typing import List, Dict
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm

# Add your authentication token
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDODNQWW5UNTFQaEt1NVJ4WG5NY0siLCJyb2xlIjoiYWRtaW4iLCJ0b2tlblZlcnNpb24iOiIwIiwiaWF0IjoxNzUxNjkxMDQ3LCJleHAiOjE3NTE3Nzc0NDd9.VUXlvPCOsYv2gCMvQh7RkSr53pGglfNDzigrC9mugjw"

# Common headers for all API requests
API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {AUTH_TOKEN}'
}

# Parallelism settings
MAX_WORKERS = 10  # Adjust based on your CPU/IO capacity


def map_experience_to_difficulty(experience_level: str) -> str:
    mapping = {
        'Entry': 'entry',
        'Mid': 'mid',
        'Senior': 'senior'
    }
    return mapping.get(experience_level, 'entry')


def map_difficulty_to_points(difficulty: int) -> int:
    mapping = {1: 10, 2: 20, 3: 30, 4: 40}
    return mapping.get(difficulty, 10)


def create_mcq_options(row) -> List[Dict]:
    options = []
    cols = ['option_a', 'option_b', 'option_c', 'option_d']
    letters = ['A', 'B', 'C', 'D']
    correct = str(row['correct_answer']).upper()

    for col, letter in zip(cols, letters):
        if pd.notna(row[col]):
            options.append({
                'optionText': str(row[col]).strip(),
                'isCorrect': letter == correct
            })
    return options


def parse_tags(subcategory: str) -> List[str]:
    if pd.isna(subcategory):
        return []
    tags = [tag.strip() for tag in str(subcategory).split(',') if tag.strip()]
    return tags or [str(subcategory).strip()]


def create_mcq_payload(row) -> Dict:
    payload = {
        'text': str(row['question']).strip(),
        'allowMultiple': False,
        'options': create_mcq_options(row),
        'tags': parse_tags(row['subcategory']),
        'difficulty': map_experience_to_difficulty(str(row['experience_level'])),
        'points': map_difficulty_to_points(int(row['difficulty']))
    }
    if pd.notna(row.get('explanation', None)):
        expl = str(row['explanation']).strip()
        if expl:
            payload['explanation'] = expl
    return payload


def send_question(index: int, row, url: str) -> Dict:
    """
    Send a single MCQ question payload to the API.
    Returns result dict with status and index.
    """
    try:
        payload = create_mcq_payload(row)
        resp = requests.post(url, json=payload, headers=API_HEADERS, timeout=30)
        if resp.status_code in (200, 201):
            return {'index': index, 'status': 'success'}
        else:
            return {'index': index, 'status': 'error', 'code': resp.status_code, 'text': resp.text}
    except Exception as e:
        return {'index': index, 'status': 'error', 'exception': str(e)}


def process_csv_parallel(csv_file_path: str, base_url: str = "http://localhost:3000"):
    df = pd.read_csv(csv_file_path)
    total = len(df)
    url = f"{base_url}/api/mcq-question/"

    success = 0
    errors = 0
    results = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(send_question, idx, row, url): idx for idx, row in df.iterrows()}

        for future in tqdm(as_completed(futures), total=total, desc="Uploading MCQs"):
            res = future.result()
            results.append(res)
            if res['status'] == 'success':
                success += 1
            else:
                errors += 1
                print(f"✗ Question {res['index']+1} failed: {res.get('code', '')} {res.get('exception', '')} {res.get('text', '')}")

    print(f"\n=== Summary ===")
    print(f"Total: {total}, Success: {success}, Errors: {errors}")


def validate_csv(csv_file_path: str) -> pd.DataFrame:
    required = ['question', 'option_a', 'option_b', 'option_c', 'option_d', 
                'correct_answer', 'subcategory', 'experience_level', 'difficulty']
    df = pd.read_csv(csv_file_path)
    missing = [c for c in required if c not in df.columns]
    if missing:
        raise ValueError(f"Missing columns: {missing}")
    return df


def test_connection(base_url: str) -> bool:
    try:
        resp = requests.get(f"{base_url}/health", headers=API_HEADERS, timeout=5)
        return resp.ok
    except:
        try:
            resp = requests.get(base_url, headers=API_HEADERS, timeout=5)
            return resp.ok
        except:
            return False


def main():
    print("=== CSV to MCQ Parallel Uploader ===\n")
    csv_file = "faang_mcq_final_cleaned_576.csv"
    base = "http://localhost:3000"

    print(f"CSV file: {csv_file}")
    print(f"API URL: {base}\n")

    try:
        validate_csv(csv_file)
        print("CSV validation passed.")
    except Exception as e:
        print(f"CSV validation error: {e}")
        return

    if not test_connection(base):
        print(f"✗ Cannot reach API at {base}")
        return
    print("API connection OK.\n")

    cont = input("Proceed with uploading questions? (y/n): ")
    if cont.lower() != 'y':
        print("Cancelled.")
        return

    process_csv_parallel(csv_file, base)

if __name__ == '__main__':
    main()
