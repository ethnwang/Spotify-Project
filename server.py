from importlib.util import spec_from_file_location
from time import time
from flask import Flask, request, url_for, session, redirect
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time

app = Flask(__name__)

app.secret_key = "testsecretkey"
app.config['SESSION_COOKIE_NAME'] = 'Test Cookie'
TOKEN_INFO = "token_info"

# Members API Route

@app.route('/')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)
    
@app.route('/redirect')
def redirectPage():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(url_for('getTracks', _external=True))
    
@app.route('/getTracks')
def getTracks():
    try:
        token_info = get_token()
    except:
        print("user not logged in")
        return redirect("/")
        
    sp = spotipy.Spotify(auth=token_info['access_token'])
    all_songs = []
    iteration = 0
    while True:
        items = sp.current_user_saved_tracks(limit=50, offset = iteration * 50)['items']
        iteration+=1
        all_songs += items
        if(len(items) < 50):
            break
        
    return str(len(all_songs))

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise "exception"
    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60
    if(is_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info
    
def create_spotify_oauth():
    return SpotifyOAuth(
        client_id = "b18b8eb359e841a3bacd99f2cd303fa2",
        client_secret= "3a608da658d0443fad56d8147f3c05c6",
        redirect_uri=url_for('redirectPage', _external=True),
        scope = "user-library-read")
    
if __name__ == "__main__":
    app.run(debug=True)