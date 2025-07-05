#!/usr/bin/env python3

"""
CSV to MCQ Questions API Script

This script reads a CSV file containing MCQ problems and creates them in your database via API calls.

Requirements:
- pandas
- requests

Usage:
1. Update the csv_file_path variable in main()
2. Ensure your API server is running at http://localhost:3000
3. Run: python csv_to_mcq_api_script.py
"""

import pandas as pd
import requests
import json
from typing import List, Dict, Optional

# Add your authentication token
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyRkY2STR2a0xodGZsc2RESU96UTYiLCJyb2xlIjoiYWRtaW4iLCJ0b2tlblZlcnNpb24iOiIwIiwiaWF0IjoxNzUxNjczNDIwLCJleHAiOjE3NTE3NTk4MjB9.hAANSAlWW-TUJFLBhxIgxLk3VxXKwuXl1_9ftUpbICI"

# Common headers for all API requests
API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {AUTH_TOKEN}'
}

def map_experience_to_difficulty(experience_level: str) -> str:
    """
    Map experience level to difficulty
    
    Args:
        experience_level: Experience level from CSV (Entry, Mid, Senior)
    
    Returns:
        Lowercase difficulty string
    """
    mapping = {
        'Entry': 'entry',
        'Mid': 'mid', 
        'Senior': 'senior'
    }
    return mapping.get(experience_level, 'entry')

def map_difficulty_to_points(difficulty: int) -> int:
    """
    Map difficulty number to points
    
    Args:
        difficulty: Difficulty number from CSV (1-4)
    
    Returns:
        Points value
    """
    mapping = {
        1: 10,
        2: 20,
        3: 30,
        4: 40
    }
    return mapping.get(difficulty, 10)

def create_mcq_options(row) -> List[Dict]:
    """
    Create options array for MCQ question
    
    Args:
        row: Pandas DataFrame row containing MCQ data
    
    Returns:
        List of option dictionaries
    """
    options = []
    
    # Define option mapping
    option_columns = ['option_a', 'option_b', 'option_c', 'option_d']
    option_letters = ['A', 'B', 'C', 'D']
    
    correct_answer = str(row['correct_answer']).upper()
    
    for col, letter in zip(option_columns, option_letters):
        if not pd.isna(row[col]):
            option = {
                "optionText": str(row[col]).strip(),
                "isCorrect": letter == correct_answer
            }
            options.append(option)
    
    return options

def parse_tags(subcategory: str) -> List[str]:
    """
    Parse subcategory into tags array
    
    Args:
        subcategory: Subcategory from CSV
    
    Returns:
        List of tags
    """
    if pd.isna(subcategory):
        return []
    
    # Clean and split subcategory, handle various formats
    tags = [tag.strip() for tag in str(subcategory).split(',') if tag.strip()]
    if not tags:
        tags = [str(subcategory).strip()]
    
    return tags

def create_mcq_question_payload(row) -> Dict:
    """
    Create the payload for the MCQ question API
    
    Args:
        row: Pandas DataFrame row containing MCQ data
    
    Returns:
        Dictionary payload for the API
    """
    
    # Map basic fields
    text = str(row['question']).strip()
    difficulty = map_experience_to_difficulty(str(row['experience_level']))
    points = map_difficulty_to_points(int(row['difficulty']))
    
    # Create options
    options = create_mcq_options(row)
    
    # Parse tags from subcategory
    tags = parse_tags(row['subcategory'])
    
    # Create payload
    payload = {
        "text": text,
        "allowMultiple": False,
        "options": options,
        "tags": tags,
        "difficulty": difficulty,
        "points": points
    }
    
    # Add explanation if available
    if not pd.isna(row['explanation']):
        explanation = str(row['explanation']).strip()
        if explanation:
            payload["explanation"] = explanation
    
    return payload

def process_csv_and_create_mcq_questions(csv_file_path: str, base_url: str = "http://localhost:3000"):
    """
    Main function to process CSV file and create MCQ questions via API
    
    Args:
        csv_file_path: Path to the CSV file
        base_url: Base URL of the API server
    """
    try:
        # Read the CSV file
        print(f"Reading CSV file: {csv_file_path}")
        df = pd.read_csv(csv_file_path)
        print(f"Found {len(df)} MCQ questions in the CSV file")
        
        # API endpoint
        mcq_question_url = f"{base_url}/api/mcq-question/"
        
        success_count = 0
        error_count = 0
        
        for index, row in df.iterrows():
            if index == 100:
                break
            try:
                print(f"\nProcessing MCQ question {index + 1}/{len(df)}")
                
                # Create MCQ question payload
                question_payload = create_mcq_question_payload(row)
                
                # Debug: Show payload structure for first few questions
                if index < 3:
                    print(f"Sample payload: {json.dumps(question_payload, indent=2)}")
                
                # Create MCQ question
                print(f"Creating MCQ question...")
                response = requests.post(
                    mcq_question_url,
                    json=question_payload,
                    headers=API_HEADERS,
                    timeout=30
                )
                
                if response.status_code in [200, 201]:
                    success_count += 1
                    print(f"✓ Successfully created MCQ question {index + 1}")
                else:
                    error_count += 1
                    print(f"✗ Failed to create MCQ question {index + 1}: {response.status_code}")
                    print(f"Response: {response.text}")
                    
            except requests.exceptions.RequestException as e:
                error_count += 1
                print(f"✗ Network error processing MCQ question {index + 1}: {str(e)}")
                continue
            except Exception as e:
                error_count += 1
                print(f"✗ Error processing MCQ question {index + 1}: {str(e)}")
                continue
        
        print(f"\n=== MCQ Questions Summary ===")
        print(f"Total MCQ questions: {len(df)}")
        print(f"Successfully created: {success_count}")
        print(f"Failed: {error_count}")
        
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_file_path}' not found")
    except Exception as e:
        print(f"Error reading CSV file: {str(e)}")

def validate_mcq_csv_structure(csv_file_path: str) -> bool:
    """
    Validate that the CSV has all required columns for MCQ questions
    
    Args:
        csv_file_path: Path to the CSV file
    
    Returns:
        True if validation passes, False otherwise
    """
    required_columns = [
        'question', 'option_a', 'option_b', 'option_c', 'option_d', 
        'correct_answer', 'subcategory', 'experience_level', 'difficulty'
    ]
    
    try:
        df = pd.read_csv(csv_file_path)
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            print(f"Error: Missing required columns: {missing_columns}")
            print(f"Available columns: {list(df.columns)}")
            return False
        
        print("✓ MCQ CSV structure validation passed")
        print(f"Found {len(df)} rows in the CSV file")
        
        # Show sample data
        print(f"\nSample data preview:")
        print(f"Experience levels: {df['experience_level'].unique()}")
        print(f"Difficulties: {df['difficulty'].unique()}")
        print(f"Correct answers: {df['correct_answer'].unique()}")
        
        return True
        
    except Exception as e:
        print(f"Error validating CSV: {str(e)}")
        return False

def test_api_connection(base_url: str) -> bool:
    """
    Test if the API server is reachable
    
    Args:
        base_url: Base URL of the API server
    
    Returns:
        True if server is reachable, False otherwise
    """
    try:
        response = requests.get(f"{base_url}/health", headers=API_HEADERS, timeout=5)
        print("✓ API server is reachable")
        return True
    except:
        try:
            # Try a simple GET to the base URL
            response = requests.get(base_url, headers=API_HEADERS, timeout=5)
            print("✓ API server is reachable (no health endpoint)")
            return True
        except:
            print(f"✗ Warning: Cannot reach API server at {base_url}")
            print("Make sure your API server is running before proceeding")
            return False

def main():
    """
    Main execution function
    """
    print("=== CSV to MCQ Questions API Script ===\n")
    
    # Configuration
    csv_file_path = "faang_mcq_final_cleaned_576.csv"  # Update this to your CSV file path
    base_url = "http://localhost:3000"
    
    print(f"CSV File: {csv_file_path}")
    print(f"API Server: {base_url}\n")
    
    # Validate CSV structure
    if not validate_mcq_csv_structure(csv_file_path):
        return
    
    # Test API connection
    test_api_connection(base_url)
    
    # Process confirmation
    print(f"\nReady to process CSV file and create MCQ questions.")
    response = input("Do you want to continue? (y/n): ")
    if response.lower() != 'y':
        print("Operation cancelled")
        return
    
    # Process the CSV
    process_csv_and_create_mcq_questions(csv_file_path, base_url)

if __name__ == "__main__":
    main()
