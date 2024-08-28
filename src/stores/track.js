import { defineStore } from "pinia";
import { ref } from "vue";
import TrackService from "../services/TrackService";

export const useTrackStore = defineStore("track", () => {
  const track = ref({});
  const recommendations = ref({});

  async function fetchTrack(trackId) {
    try {
      const trackResponse = await TrackService.get(trackId);
      track.value = trackResponse;
      console.log(trackResponse); // See the track via Console

      return Promise.resolve(trackResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function fetchAudioFeatures(trackId) {
    try {
      const audioFeaturesResponse = await TrackService.getAudioFeatures(
        trackId
      );

      return audioFeaturesResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function fetchRecommendations(seed_track, seed_artists, popularity) {
    try {
      const audioFeatures = await fetchAudioFeatures(seed_track);

      const recommendationsResponse = await TrackService.getRecommendations(
        seed_track,
        seed_artists,
        popularity,
        audioFeatures
      );
      recommendations.value = recommendationsResponse;
      console.log(recommendationsResponse); // See the recommendations via Console

      return Promise.resolve(recommendationsResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  function $reset() {
    track.value = {};
    recommendations.value = {};
  }

  return {
    track,
    recommendations,
    fetchTrack,
    fetchRecommendations,
    $reset,
  };
});
