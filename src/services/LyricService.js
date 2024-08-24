import musixmatchClient from "../plugins/musixmatch";

class LyricService {
  async get(track, artist) {
    const { data } = await musixmatchClient.get("/matcher.lyrics.get", {
      params: {
        q_track: track,
        q_artist: artist,
        f_has_lyrics: 1,
        apikey: import.meta.env.VITE_MUSIXMATCH_API_KEY,
      },
    });

    return data;
  }
}

export default new LyricService();
