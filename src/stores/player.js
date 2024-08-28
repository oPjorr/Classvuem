import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const usePlayerStore = defineStore("player", () => {
  const player = ref(null);
  const isReady = ref(false);
  const deviceId = ref(null);

  const track = ref(null);
  const isPaused = ref(true);
  const isActive = ref(false);

  const authStore = useAuthStore();

  function initializePlayer() {
    if (player.value) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new Spotify.Player({
        name: "Spotvue Player",
        getOAuthToken: (cb) => {
          cb(authStore.token);
        },
        volume: 0.5,
        enableMediaSession: true,
      });

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        deviceId.value = device_id;
        isReady.value = true;
        console.info("Ready with Device ID", device_id);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        isReady.value = false;
        console.info("Device ID has gone offline", device_id);
      });

      // Handling Errors
      spotifyPlayer.addListener("autoplay_failed", () => {
        console.error("Autoplay is not allowed by the browser autoplay rules");
      });

      spotifyPlayer.on("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
      });

      spotifyPlayer.on("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
      });

      spotifyPlayer.on("account_error", ({ message }) => {
        console.error("Failed to validate Spotify account", message);
      });

      spotifyPlayer.on("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
      });

      // State
      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        track.value = state.track_window.current_track;
        isPaused.value = state.paused;

        spotifyPlayer.getCurrentState().then((state) => {
          isActive.value = !!state;
        });
      });

      // Spotify Conect
      spotifyPlayer.connect().then((success) => {
        if (success) {
          console.info(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
      player.value = spotifyPlayer;
    };
  }

  function $reset() {
    player.value.disconnect();
    isReady.value = false;
    deviceId.value = null;
    track.value = null;
    isPaused.value = true;
    isActive.value = false;
  }

  return {
    player,
    isReady,
    deviceId,
    track,
    isPaused,
    isActive,
    initializePlayer,
    $reset,
  };
});
