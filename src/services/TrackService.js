import spotifyClient from "../plugins/spotify";

class TrackService {
  async get(trackId) {
    const { data } = await spotifyClient.get(`/tracks/${trackId}`);

    return data;
  }

  async getAudioFeatures(trackId) {
    const { data } = await spotifyClient.get(`/audio-features/${trackId}`);

    return data;
  }

  async getRecommendations(
    seed_track,
    seed_artists,
    popularity,
    audioFeatures
  ) {
    const { data } = await spotifyClient.get("/recommendations", {
      params: {
        seed_tracks: seed_track,
        seed_artists: seed_artists.join(","),
        target_acousticness: audioFeatures.acousticness,
        target_danceability: audioFeatures.danceability,
        target_duration_ms: audioFeatures.duration_ms,
        target_energy: audioFeatures.energy,
        target_instrumentalness: audioFeatures.instrumentalness,
        target_key: audioFeatures.key,
        target_liveness: audioFeatures.liveness,
        target_loudness: audioFeatures.loudness,
        target_mode: audioFeatures.mode,
        target_popularity: popularity,
        target_speechiness: audioFeatures.speechiness,
        target_tempo: audioFeatures.tempo,
        target_time_signature: audioFeatures.time_signature,
        target_valence: audioFeatures.valence,
        limit: 6,
        market: "BR",
      },
    });

    return data;
  }
}

export default new TrackService();
