from track_your_life.settings import DEBUG

CLIENT_ID = "25eefa7ce4284c59bc30ff393c576da1"
CLIENT_SECRET = "aa878aec6bfa43be86defdd86dcf6516"

if DEBUG == False:
    REDIRECT_URI = "https://track-your-life1.herokuapp.com/spotify/redirect"
else:
    REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect"
