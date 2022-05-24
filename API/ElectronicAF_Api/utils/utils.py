import os
import requests
import json


def delete_file_from_github(file):
    username = os.environ.get("GITHUB_USERNAME")
    token = os.environ.get("GITHUB_ACCESS_TOKEN")
    url = os.environ.get("GITHUB_REPO_URL") + "/" + file
    response = requests.get(url, auth=(username, token))
    message = f"deleted file: {file}"
    try:
        sha = json.loads(response.text)["sha"]
        payload = {"sha": sha, "message": message}
        req = requests.delete(url, auth=(username, token), params=payload)
        print(f"Delete request status code: HTTP-{req.status_code}")
    except KeyError:
        print(f"File not found on github! status code: HTTP_{response.status_code}")
    except:
        print(f"Cannot delete file from github")
