#!/usr/bin/env python3
"""
CSV to Coding Questions API Script
This script reads a CSV file containing LeetCode-style coding problems
and creates them in your database via API calls.

Requirements:
- pandas
- requests

Usage:
1. Update the csv_file_path variable in main()
2. Ensure your API server is running at http://localhost:3000
3. Run: python csv_to_api_script.py
"""

import pandas as pd
import requests
import json
import re
import random
import string
from typing import List, Dict, Optional, Tuple

# Add your authentication token
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyRkY2STR2a0xodGZsc2RESU96UTYiLCJyb2xlIjoiYWRtaW4iLCJ0b2tlblZlcnNpb24iOiIwIiwiaWF0IjoxNzUxNjczNDIwLCJleHAiOjE3NTE3NTk4MjB9.hAANSAlWW-TUJFLBhxIgxLk3VxXKwuXl1_9ftUpbICI"

# Common headers for all API requests
API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {AUTH_TOKEN}'
}

def generate_random_id(length=21):
    """Generate a random alphanumeric ID of specified length"""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def _split_blocks(raw: str) -> List[str]:
    """
    Split `raw` text into blocks separated by ≥1 blank lines.
    Trailing/leading blank lines are ignored.
    """
    blocks, current = [], []
    for line in str(raw).splitlines():
        if line.strip() == "":          # blank line → boundary
            if current:
                blocks.append("\n".join(current).rstrip())
                current = []
        else:
            current.append(line.rstrip())

    # capture last block
    if current:
        blocks.append("\n".join(current).rstrip())
    return blocks



def parse_problem_statement(statement: str) -> Tuple[str, List[Dict], Optional[List[str]], Optional[List[str]]]:
    """
    Parse the problem statement to extract main statement, examples, constraints, and follow-up
    
    Args:
        statement: Raw problem statement from CSV
        
    Returns:
        Tuple of (main_statement, examples, constraints, follow_up)
    """
    # Find the main problem statement (until "Example 1:")
    example_match = re.search(r'Example 1:', statement, re.IGNORECASE)
    if example_match:
        main_statement = statement[:example_match.start()].strip()
        rest_of_statement = statement[example_match.start():]
    else:
        main_statement = statement.strip()
        return main_statement, [], None, None
    
    # Extract examples (from "Example 1:" until "Constraints:")
    constraints_match = re.search(r'Constraints:', rest_of_statement, re.IGNORECASE)
    if constraints_match:
        examples_text = rest_of_statement[:constraints_match.start()]
        constraints_and_followup = rest_of_statement[constraints_match.start():]
    else:
        examples_text = rest_of_statement
        constraints_and_followup = ""
    
    # Parse examples
    examples = []
    example_pattern = r'Example (\d+):(.*?)(?=Example \d+:|$)'
    example_matches = re.findall(example_pattern, examples_text, re.DOTALL | re.IGNORECASE)
    
    for _, example_content in example_matches:
        # Extract input, output, and explanation from each example
        input_match = re.search(r'Input:\s*(.*?)(?=Output:|$)', example_content, re.DOTALL | re.IGNORECASE)
        output_match = re.search(r'Output:\s*(.*?)(?=Explanation:|Example|$)', example_content, re.DOTALL | re.IGNORECASE)
        explanation_match = re.search(r'Explanation:\s*(.*?)(?=Example|$)', example_content, re.DOTALL | re.IGNORECASE)
        
        if input_match and output_match:
            example = {
                "input": input_match.group(1).strip(),
                "output": output_match.group(1).strip()
            }
            if explanation_match:
                example["explanation"] = explanation_match.group(1).strip()
            examples.append(example)
    
    # Extract constraints and follow-up
    constraints = None
    follow_up = None
    
    if constraints_and_followup:
        # Look for "Follow-up:" in the constraints section
        followup_match = re.search(r'Follow-?up:', constraints_and_followup, re.IGNORECASE)
        
        if followup_match:
            # Split at "Follow-up:"
            constraints_text = constraints_and_followup[:followup_match.start()]
            followup_text = constraints_and_followup[followup_match.start():]
            
            # Parse constraints (remove "Constraints:" prefix)
            if constraints_text:
                constraints_content = re.sub(r'^Constraints:\s*', '', constraints_text, flags=re.IGNORECASE).strip()
                # Split by newlines and clean up
                constraints = [c.strip() for c in constraints_content.split('\n') if c.strip()]
            
            # Parse follow-up (remove "Follow-up:" prefix)
            if followup_text:
                followup_content = re.sub(r'^Follow-?up:\s*', '', followup_text, flags=re.IGNORECASE).strip()
                follow_up = [followup_content] if followup_content else None
        else:
            # No follow-up found, everything after "Constraints:" is constraints
            constraints_content = re.sub(r'^Constraints:\s*', '', constraints_and_followup, flags=re.IGNORECASE).strip()
            constraints = [c.strip() for c in constraints_content.split('\n') if c.strip()]
    
    return main_statement, examples, constraints, follow_up

def parse_test_cases(normalized_input: str, expected_output: str) -> List[Dict]:
    """
    Group inputs by blank lines so multi‑line cases stay together.
    """
    test_cases: List[Dict] = []

    if pd.isna(normalized_input) or pd.isna(expected_output):
        return test_cases

    inputs  = _split_blocks(normalized_input)
    outputs = [line.strip() for line in str(expected_output).splitlines() if line.strip()]

    if len(inputs) != len(outputs):
        print(f"⚠️  Mismatch: {len(inputs)} inputs vs {len(outputs)} outputs")
        # choose the shorter length to avoid IndexError
    for index, (inp, out) in enumerate(zip(inputs, outputs)):
        test_cases.append({
            "input": inp,
            "expectedOutput": out,
            "isHidden": index >= 2  # First two test cases (index 0,1) are visible, rest are hidden
        })
    return test_cases


def create_coding_question_payload(row) -> Dict:
    """
    Create the payload for the coding question API
    
    Args:
        row: Pandas DataFrame row containing problem data
        
    Returns:
        Dictionary payload for the API
    """
    # Parse problem statement
    main_statement, examples, constraints, follow_up = parse_problem_statement(str(row['statement']))
    
    # Parse tags
    tags = []
    if not pd.isna(row['topics']):
        tags = [tag.strip() for tag in str(row['topics']).split(',') if tag.strip()]
    
    # Create starter codes
    starter_codes = {
        "codeHeader": {
            "cpp": str(row['hidden_cpp_header']) if not pd.isna(row['hidden_cpp_header']) else "",
            "java": str(row['hidden_java_header']) if not pd.isna(row['hidden_java_header']) else "",
            "python": str(row['hidden_py_header']) if not pd.isna(row['hidden_py_header']) else ""
        },
        "codeStarter": {
            "cpp": str(row['cpp_stub']) if not pd.isna(row['cpp_stub']) else "",
            "java": str(row['java_stub']) if not pd.isna(row['java_stub']) else "",
            "python": str(row['python_stub']) if not pd.isna(row['python_stub']) else ""
        },
        "codeFooter": {
            "cpp": str(row['hidden_cpp_footer']) if not pd.isna(row['hidden_cpp_footer']) else "",
            "java": str(row['hidden_java_footer']) if not pd.isna(row['hidden_java_footer']) else "",
            "python": str(row['hidden_py_footer']) if not pd.isna(row['hidden_py_footer']) else ""
        }
    }
    
    # Map difficulty
    difficulty_map = {
        'Easy': 'easy',
        'Medium': 'medium', 
        'Hard': 'hard'
    }
    
    # Calculate points based on difficulty
    points_map = {
        'Easy': 50,
        'Medium': 100,
        'Hard': 150
    }
    
    # Calculate time limit based on difficulty
    time_limit_map = {
        'Easy': 30,
        'Medium': 60,
        'Hard': 90
    }
    
    difficulty = str(row['difficulty'])
    mapped_difficulty = difficulty_map.get(difficulty, 'MEDIUM')
    
    print(f"Debug - Original difficulty: '{difficulty}' -> Mapped to: '{mapped_difficulty}'")
    
    # Parse test cases for later use (not included in initial payload)
    test_cases = parse_test_cases(row['normalized_input'], row['expected_output'])
    
    solution_code = str(row['cpp_solution'])

    payload = {
        "title": str(row['name']),
        "category": "Algorithms",
        "difficulty": mapped_difficulty,
        "points": points_map.get(difficulty, 100),
        "timeLimit": time_limit_map.get(difficulty, 60),
        "problemStatement": main_statement,
        "examples": examples if examples else [{"input": "No examples provided", "output": "See problem statement"}],
        "starterCode": starter_codes,
        "isActive": True,
        "solutionCode": solution_code
    }
    
    print(f"Debug - Category: '{payload['category']}'")
    
    # Add optional fields if they exist
    if constraints:
        payload["constraints"] = constraints
    
    if follow_up:
        payload["followUp"] = follow_up
    
    if tags:
        payload["tags"] = tags
    
    # Add simple test cases to the payload
    test_cases_with_ids = []
    for test_case in test_cases:
        test_case_simple = {
            "input": test_case["input"],
            "expectedOutput": test_case["expectedOutput"],
            "isHidden": test_case["isHidden"]
        }
        test_cases_with_ids.append(test_case_simple)
    
    payload['testCases'] = test_cases_with_ids

    return payload

def process_csv_and_create_questions(csv_file_path: str, base_url: str = "http://localhost:3000"):
    """
    Main function to process CSV file and create coding questions via API
    
    Args:
        csv_file_path: Path to the CSV file
        base_url: Base URL of the API server
    """
    try:
        # Read the CSV file
        print(f"Reading CSV file: {csv_file_path}")
        df = pd.read_csv(csv_file_path)
        print(f"Found {len(df)} problems in the CSV file")
        
        # API endpoints
        coding_question_url = f"{base_url}/api/coding-question/"
        test_case_url = f"{base_url}/api/testcase"
        
        success_count = 0
        error_count = 0
        idx = 0
        for index, row in df.iterrows():
            if idx >= 20:
                break
            idx += 1
            try:
                print(f"\nProcessing problem {index + 1}/{len(df)}: {row['name']}")
                
                # Create coding question payload
                question_payload = create_coding_question_payload(row)
                
                # Debug: Show payload structure
                print(f"Payload keys: {list(question_payload.keys())}")
                print(f"Test cases count: {len(question_payload['testCases'])}")
                
                # Create coding question with test cases included
                print(f"Creating coding question: {question_payload['title']}")
                response = requests.post(
                    coding_question_url,
                    json=question_payload,
                    headers=API_HEADERS,
                    timeout=30
                )
                
                if response.status_code in [200, 201]:
                    success_count += 1
                    print(f"✓ Successfully created problem: {question_payload['title']}")
                else:
                    error_count += 1
                    print(f"✗ Failed to create problem: {response.status_code} - {response.text}")
                    
            except requests.exceptions.RequestException as e:
                error_count += 1
                print(f"✗ Network error processing problem {row['name']}: {str(e)}")
                continue
            except Exception as e:
                error_count += 1
                print(f"✗ Error processing problem {row['name']}: {str(e)}")
                continue
        
        print(f"\n=== Summary ===")
        print(f"Total problems: {len(df)}")
        print(f"Successfully created: {success_count}")
        print(f"Failed: {error_count}")
        
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_file_path}' not found")
    except Exception as e:
        print(f"Error reading CSV file: {str(e)}")

def validate_csv_structure(csv_file_path: str) -> bool:
    """
    Validate that the CSV has all required columns
    
    Args:
        csv_file_path: Path to the CSV file
        
    Returns:
        True if validation passes, False otherwise
    """
    required_columns = [
        'name', 'statement', 'difficulty', 'topics', 'normalized_input', 
        'expected_output', 'python_stub', 'cpp_stub', 'java_stub',
        'hidden_py_header', 'hidden_py_footer', 'hidden_cpp_header', 
        'hidden_cpp_footer', 'hidden_java_header', 'hidden_java_footer'
    ]
    
    try:
        df = pd.read_csv(csv_file_path)
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            print(f"Error: Missing required columns: {missing_columns}")
            print(f"Available columns: {list(df.columns)}")
            return False
        
        print("✓ CSV structure validation passed")
        print(f"Found {len(df)} rows in the CSV file")
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
    print("=== CSV to Coding Questions API Script ===\n")
    
    # Configuration
    csv_file_path = "testing_problems.csv"  # Update this to your CSV file path
    base_url = "http://localhost:3000"
    
    print(f"CSV File: {csv_file_path}")
    print(f"API Server: {base_url}\n")
    
    # Validate CSV structure
    if not validate_csv_structure(csv_file_path):
        return
    
    # Test API connection
    test_api_connection(base_url)
    
    # Process confirmation
    print(f"\nReady to process CSV file and create problems.")
    response = input("Do you want to continue? (y/n): ")
    if response.lower() != 'y':
        print("Operation cancelled")
        return
    
    # Process the CSV
    process_csv_and_create_questions(csv_file_path, base_url)

if __name__ == "__main__":
    main()