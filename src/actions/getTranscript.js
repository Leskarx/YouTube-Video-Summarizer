import axios from 'axios';
import { getSummary } from './getSummary';

export async function getTranscript(url) {
  // Array of API keys to try in case one fails
  const apiKeys = [import.meta.env.VITE_RAPIDAPI_KEY, import.meta.env.VITE_RAPIDAPI_KEY_2,import.meta.env.VITE_RAPIDAPI_KEY_3,import.meta.env.VITE_RAPIDAPI_KEY_4];

  for (let i = 0; i < apiKeys.length; i++) {
    try {
      // Extract videoId from the URL
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v'); // Get the 'v' parameter from the URL

      if (!videoId) {
        throw new Error('Invalid YouTube URL: Missing videoId');
      }

      const options = {
        method: 'GET',
        url: 'https://youtube-transcripts.p.rapidapi.com/youtube/transcript',
        params: {
          url: url,
          videoId: videoId, // Use the extracted videoId here
          chunkSize: '500',
        },
        headers: {
          'x-rapidapi-key': apiKeys[i], // Use the current API key from the array
          'x-rapidapi-host': 'youtube-transcripts.p.rapidapi.com',
        },
      };

      // Make the request
      const response = await axios.request(options);
      const arrayOfText = response.data.content;

      // Use map and join to efficiently construct the transcript
      const transcript = arrayOfText.map((item) => item.text).join(' ');

      // console.log('Optimized Transcript Data:', transcript);
      const summary = await getSummary(transcript);
      return summary; // If successful, return the transcript
    } catch (error) {
      console.error(`Error with API key ${i + 1}:`, error);

      // If the error is caused by API limit or other issues, try the next key
      if (i === apiKeys.length - 1) {
        throw new Error('Both API keys failed. Unable to fetch transcript.');
      }
    }
  }
}
